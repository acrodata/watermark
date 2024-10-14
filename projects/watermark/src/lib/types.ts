export interface WatermarkContent extends CanvasTextDrawingStyles {
  /** Horizontal gap of watermark contents */
  gapX: number;
  /** Vertical gap of watermark contents */
  gapY: number;
  /** Horizontal offset of the watermark content */
  offsetX: number;
  /** Vertical offset of the watermark content */
  offsetY: number;
  /** Width of the watermark content */
  width: number;
  /** Height of the watermark content */
  height: number;
  /** Opacity of the watermark */
  opacity: number;
  /** Rotation degree of the watermark content */
  rotate: number;
  /** Font size of the text-watermark */
  fontSize: number;
  /** Font weight of the text-watermark */
  fontWeight: string | number;
  /** Font style of the text-watermark */
  fontStyle: 'normal' | 'italic';
  /** Font variant of the text-watermark */
  fontVariant: 'normal' | 'small-caps';
  /** Font color of the text-watermark */
  fontColor: string;
  /** Font family of the text-watermark */
  fontFamily: string;
  /** Text alignment of the text-watermark */
  textAlign: CanvasTextAlign;
  /** Text baseline of the text-watermark */
  textBaseline: CanvasTextBaseline;
}

export interface WatermarkOptions extends Partial<WatermarkContent> {
  /** Container of the watermark */
  container?: HTMLElement | string | null;
  /** Whether prevent the watermark being removed */
  secure?: boolean;
  /** Image suorce of the watermark, it's recommended to use 2x or 3x image */
  image?: string;
  /** Text of the watermark and dispaly multiple lines with array */
  text?: string | string[];
  /** Text of the blind-watermark */
  blindText?: string;
  /** Font size of the blind-watermark */
  blindFontSize?: string | number;
  /** Opacity of the blind-watermark */
  blindOpacity?: number;
  /** Specify how watermarks are repeated */
  repeat?: 'none' | 'normal' | 'multiply';
  /** Specify `background-position` of the watermark */
  position?: string;
  /** Specify `z-index` of the watermark */
  zIndex?: number;
  /** Specify the height of watermark in a scroll container */
  scrollHeight?: number | string;
}

export interface DrawPatternResult {
  url: string;
  width: number;
  height: number;
}
