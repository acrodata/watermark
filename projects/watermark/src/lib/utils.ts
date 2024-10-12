import { WatermarkOptions, DrawPatternResult } from './types';

/** 用于标记是否需要保护 */
export const attributeNameTag = 'data-watermark-tag';

export const observeOptions = {
  childList: true,
  subtree: true,
  attributeFilter: ['style', 'class', attributeNameTag],
};

/** 获取 DataSetKey */
export function getDataSetKey(attributeName: string) {
  return attributeName
    .split('-')
    .slice(1)
    .reduce((prev, cur, index) => {
      if (index === 0) {
        return cur;
      }

      return `${prev}${cur[0].toUpperCase() + cur.slice(1)}`;
    });
}

/** 将样式对象转换为字符串 */
export const getStyleStr = (style: Record<string, string | number>) => {
  let str = '';

  Object.keys(style).forEach(item => {
    const key = item.replace(/([A-Z])/g, '-$1').toLowerCase();
    str += `${key}:${style[item]};`;
  });

  return str;
};

const encrypt = (str: string) => {
  return window.btoa(decodeURI(encodeURIComponent(str)));
};

/** 创建随机 ID */
export const getRandomId = (prefix = '') => {
  return `${encrypt(prefix)}-${new Date().getTime()}-${Math.floor(
    Math.random() * Math.pow(10, 8)
  )}`;
};

/** 获取水印挂载节点 */
export const getContainer = (container: WatermarkOptions['container']) => {
  let dom: HTMLElement | null;

  if (typeof container === 'string') {
    dom = document.querySelector(container);
    if (!dom) {
      throw new Error(`The watermark container element '${container}' not found!`);
    }
  } else {
    dom = container ?? document.body;
  }

  return dom;
};

/** 盲水印解密 */
export const blindDecryption = (ctx: CanvasRenderingContext2D) => {
  const originalData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = originalData.data;
  for (let i = 0; i < data.length; i++) {
    // 筛选每个像素点的R值
    if (i % 4 == 0) {
      if (data[i] % 2 == 0) {
        // 如果 R 值为偶数，说明这个点是没有水印信息的，将其 R 值设为0
        data[i] = 0;
      } else {
        // 如果 R 值为奇数，说明这个点是有水印信息的，将其 R 值设为255
        data[i] = 255;
      }
    } else if (i % 4 == 3) {
      // 透明度不作处理
      continue;
    } else {
      // G、B 值设置为 0，不影响
      data[i] = 0;
    }
  }
  // 至此，带有水印信息的点都将展示为 `255,0,0`，而没有水印信息的点将展示为 `0,0,0`，将结果绘制到画布
  ctx.putImageData(originalData, 0, 0);
};

export const createHost = (watermarkTag: string) => {
  const dom = document.createElement('div');
  dom.setAttribute('style', getStyleStr({ pointerEvents: 'none' }));
  dom.setAttribute(attributeNameTag, watermarkTag);
  return dom;
};

export function getDrawPattern(opts: WatermarkOptions): Promise<DrawPatternResult> {
  const {
    text,
    gapX,
    gapY,
    offsetY,
    offsetX,
    width,
    height,
    rotate,
    opacity,
    fontSize,
    fontStyle,
    fontVariant,
    fontWeight,
    fontFamily,
    fontColor,
    textAlign,
    textBaseline,
    image,
    blindText,
    blindFontSize,
    blindOpacity,
  } = opts as Required<WatermarkOptions>;
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');

    const ctx = canvas.getContext('2d');
    const ratio = 1;

    const canvasWidth = (Number(gapX) + Number(width)) * ratio;
    const canvasHeight = (Number(gapY) + Number(height)) * ratio;
    const canvasOffsetLeft = Number(offsetX) || Number(gapX) / 2;
    const canvasOffsetTop = Number(offsetY) || Number(gapY) / 2;

    canvas.setAttribute('width', `${canvasWidth}px`);
    canvas.setAttribute('height', `${canvasHeight}px`);

    if (ctx) {
      const markWidth = width * ratio;
      const markHeight = height * ratio;

      // 1. 根据元素中心点旋转
      ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
      ctx.translate(markWidth / 2, markHeight / 2); // 1
      ctx.rotate((Math.PI / 180) * Number(rotate));
      ctx.translate(-markWidth / 2, -markHeight / 2); // 1

      // 是否需要增加盲水印文字
      if (blindText) {
        // 盲水印需要低透明度
        ctx.globalAlpha = blindOpacity;
        ctx.font = `${blindFontSize}px normal`;
        ctx.fillText(blindText, 0, 0);
      }

      // 设置透明度
      ctx.globalAlpha = opacity;

      // 优先使用图片
      if (image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.referrerPolicy = 'no-referrer';
        img.src = image;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, markWidth, markHeight);
          resolve({
            url: ctx.canvas.toDataURL(),
            width: canvasWidth,
            height: canvasHeight,
          });
        };
        return;
      }

      // 获取文本的最大宽度
      const texts = Array.isArray(text) ? text : [text];
      const widths = texts.map(item => ctx.measureText(item).width);
      const maxWidth = Math.max(...widths);

      const markSize = Number(fontSize) * ratio;

      // 设置文本对齐方式
      ctx.textAlign = textAlign;
      // 设置文本位置
      ctx.textBaseline = textBaseline;
      // 设置字体颜色
      ctx.fillStyle = fontColor;
      // 设置字体
      ctx.font = getFont(`${markSize}px`);

      // 文案宽度大于画板宽度
      if (maxWidth > width) {
        ctx.font = getFont(`${markSize / 2}px`);
      }

      // 多行文本的上下间距
      const textGap = 4;

      // 获取行高
      const lineHeight = markSize;

      // 计算水印在 y 轴上的初始位置
      let initY = (markHeight - (fontSize + 4) * texts.length - textGap * (texts.length - 1)) / 2;
      initY = initY < 0 ? 0 : initY;

      for (let i = 0; i < texts.length; i++) {
        ctx.fillText(texts[i] || '', markWidth / 2, initY + lineHeight * (i + 1) + textGap * i);
      }
      resolve({
        url: ctx.canvas.toDataURL(),
        width: canvasWidth,
        height: canvasHeight,
      });
    }

    function getFont(fontSize: string) {
      return `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    }

    return reject();
  });
}
