export interface BaseOptions extends CanvasTextDrawingStyles {
  /** 水印之间的水平间距 */
  gapX: number;
  /** 水印之间的垂直间距 */
  gapY: number;
  /** 水印在 canvas 画布上绘制的水平偏移量 */
  offsetX: number;
  /** 水印在 canvas 画布上绘制的垂直偏移量 */
  offsetY: number;
  /** 单个水印宽度 */
  width: number;
  /** 单个水印高度 */
  height: number;
  /** 水印透明度 */
  opacity: number;
  /** 旋转的角度 */
  rotate: number;
  /** 设置字体大小 */
  fontSize: number;
  /** 设置字体粗细 */
  fontWeight: string | number;
  /** 规定字体样式 */
  fontStyle: 'normal' | 'italic';
  /** 规定字体变体 */
  fontVariant: 'normal' | 'small-caps';
  /** 设置字体颜色 */
  fontColor: string;
  /** 设置水印文字的字体 */
  fontFamily: string;
  /** 文字对齐 */
  textAlign: CanvasTextAlign;
  /** 文字基准 */
  textBaseline: CanvasTextBaseline;
}

export interface WatermarkOptions extends Partial<BaseOptions> {
  /** 是否保护水印防止删除 */
  secure?: boolean;
  /** 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印 */
  image?: string;
  /** 水印文本, 为数组时表示多行水印 */
  text?: string | string[];
  /** 盲水印文本 */
  blindText?: string;
  /** 盲水印文本大小 */
  blindFontSize?: string | number;
  /** 盲水印透明度 */
  blindOpacity?: number;
  /** 水印挂载的容器 */
  container?: HTMLElement | string | null;
  /** 水印重复排列的方式 */
  repeat?: 'none' | 'normal' | 'multiply';
  /** 单个水印的位置，同 `background-position` */
  position?: string;
  /** 水印整体高度，在滚动容器中时设置 */
  scrollHeight?: number | string;
  /** 样式层级 */
  zIndex?: number;
}

export interface DrawPatternResult {
  url: string;
  width: number;
  height: number;
}
