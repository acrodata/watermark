import { WatermarkOptions } from './types';
import {
  attributeNameTag,
  createHost,
  getContainer,
  getDataSetKey,
  getDrawPattern,
  getRandomId,
  getStyleStr,
  observeOptions,
} from './utils';

export const defaultOptions: WatermarkOptions = {
  gapX: 100,
  gapY: 100,
  offsetX: 0,
  offsetY: 0,
  width: 120,
  height: 60,
  opacity: 0.15,
  rotate: -24,
  fontSize: 16,
  fontWeight: '400',
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontColor: '#000',
  fontFamily: 'sans-serif',
  textAlign: 'center',
  textBaseline: 'alphabetic',
  secure: true,
  blindFontSize: 16,
  blindOpacity: 0.005,
  repeat: 'multiply',
  zIndex: 9999,
};

export class Watermark {
  /** 水印配置 */
  private options: WatermarkOptions = {};
  /** 水印挂载容器 */
  private container?: HTMLElement;
  /** 水印的宿主节点 */
  private watermarkHost?: HTMLElement;
  /** 水印节点 */
  private watermarkDom?: HTMLElement;
  /** 水印样式 */
  private style: Record<string, string | number> = {
    pointerEvents: 'none',
    position: 'absolute',
    inset: 0,
  };
  private watermarkTag = getRandomId('watermark');
  private shadowRoot?: ShadowRoot | HTMLElement;
  private mutationObserver: MutationObserver | null = null;

  constructor(options: WatermarkOptions = {}) {
    this.options = Object.assign({}, defaultOptions, options);

    this._render();
  }

  update(options: WatermarkOptions = {}) {
    this.options = {
      ...this.options,
      ...options,
    };

    this._render();
  }

  show() {
    if (this.watermarkDom) {
      this.style['display'] = 'block';
      this.watermarkDom.setAttribute('style', getStyleStr(this.style));
    }
  }

  hide() {
    if (this.watermarkDom) {
      this.style['display'] = 'none';
      this.watermarkDom.setAttribute('style', getStyleStr(this.style));
    }
  }

  destroy() {
    this.shadowRoot = undefined;

    if (this.watermarkHost) {
      this.watermarkHost.remove();
      this.watermarkHost = undefined;
    }

    if (this.watermarkDom) {
      this.watermarkDom.remove();
      this.watermarkDom = undefined;
    }

    this._destroyMutationObserver();
  }

  _shouldRerender = (mutation: MutationRecord) => {
    // 修改样式或属性
    if (mutation.type === 'attributes') {
      if (mutation.attributeName === attributeNameTag) {
        return true;
      }
      if (this.watermarkTag === this._getNodeRandomId(mutation.target)) {
        return true;
      }
    }

    // 删除节点
    if (
      mutation.removedNodes.length &&
      this.watermarkTag === this._getNodeRandomId(mutation.removedNodes[0])
    ) {
      return true;
    }

    return false;
  };

  _getNodeRandomId = (node: Node) => {
    return (node as HTMLElement)?.dataset?.[getDataSetKey(attributeNameTag)];
  };

  _destroyMutationObserver = () => {
    if (this.mutationObserver) {
      this.mutationObserver.takeRecords();
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  };

  _getWatermarkDom = async () => {
    if (!this.watermarkDom) {
      this.watermarkDom = document.createElement('div');
    }

    const bgConfig = await getDrawPattern(this.options);

    if (bgConfig?.url) {
      const bgImg = bgConfig.url;

      this.style['zIndex'] = this.options.zIndex!;

      if (this.options.repeat === 'multiply') {
        this.style['backgroundImage'] = `url(${bgImg}), url(${bgImg})`;
        this.style['backgroundPosition'] = `${bgConfig.width / 2}px ${bgConfig.height / 2}px, 0 0`;
      } else {
        this.style['backgroundImage'] = `url(${bgImg})`;

        if (this.options.repeat === 'none') {
          this.style['backgroundRepeat'] = 'no-repeat';
          this.style['backgroundPosition'] = this.options.position || 'center';
        }
      }

      if (!this.options.container) {
        this.style['position'] = 'fixed';
      }

      if (this.options.scrollHeight) {
        const height = this.options.scrollHeight;
        this.style['height'] = typeof height === 'string' ? height : height + 'px';
      }

      this.watermarkDom.setAttribute('style', getStyleStr(this.style));
    }

    this.watermarkDom.setAttribute(attributeNameTag, this.watermarkTag);

    return this.watermarkDom;
  };

  async _render() {
    this._destroyMutationObserver();

    // 获取水印挂载节点
    this.container = getContainer(this.options.container);
    // 获取水印父节点
    if (!this.watermarkHost) {
      this.watermarkHost = createHost(this.watermarkTag);
      this.container.append(this.watermarkHost);
    }

    // 获取水印 DOM
    this.watermarkDom = await this._getWatermarkDom();

    // 删除已有水印
    if (this.watermarkHost) {
      const children = this.watermarkHost.childNodes || [];

      children.forEach(child => {
        this.watermarkHost!.removeChild(child);
      });
    }

    // 判断是否支持 Shadow DOM
    if (typeof this.watermarkHost.attachShadow === 'function') {
      if (!this.shadowRoot) {
        this.shadowRoot = this.watermarkHost.attachShadow({ mode: 'open' });
      }
    } else {
      this.shadowRoot = this.watermarkHost;
    }

    this.shadowRoot.append(this.watermarkDom);

    if (MutationObserver && this.options.secure) {
      this.mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (this._shouldRerender(mutation)) {
            this.destroy();
            this._render();
            return;
          }
        });
      });
      this.mutationObserver.observe(this.container, observeOptions);
      if (this.shadowRoot) {
        this.mutationObserver.observe(this.shadowRoot, observeOptions);
      }
    }
  }
}
