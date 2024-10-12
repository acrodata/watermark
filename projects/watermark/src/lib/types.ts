export interface WatermarkCanvas extends CanvasTextDrawingStyles {
  /** Horizontal gap of watermarks */
  gapX: number;
  /** Vertical gap of watermarks */
  gapY: number;
  /** Horizontal offset of the single watermark */
  offsetX: number;
  /** Vertical offset of the single watermark */
  offsetY: number;
  /** Width of the single watermark */
  width: number;
  /** Height of the single watermark */
  height: number;
  /** Opacity of the watermark */
  opacity: number;
  /** Rotation degree of the watermark */
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

export interface WatermarkOptions extends Partial<WatermarkCanvas> {
  /** Whether prevent the watermark being removed */
  secure?: boolean;
  /** Image of the watermark, it's recommended to use 2x or 3x image */
  image?: string;
  /** Text of the watermark and dispaly multiple lines with array */
  text?: string | string[];
  /** Text of the blind-watermark */
  blindText?: string;
  /** Font size of the blind-watermark */
  blindFontSize?: string | number;
  /** Opacity of the blind-watermark */
  blindOpacity?: number;
  /** Container of the watermark */
  container?: HTMLElement | string | null;
  /** Specify how watermarks are repeated */
  repeat?: 'none' | 'normal' | 'multiply';
  /** Specify the height of watermark in a scroll container */
  scrollHeight?: number | string;
  /** `background-position` of the watermark */
  position?: string;
  /** `z-index` of the watermark */
  zIndex?: number;
}

export interface DrawPatternResult {
  url: string;
  width: number;
  height: number;
}
