import {
  booleanAttribute,
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  numberAttribute,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { WatermarkOptions } from './types';
import { Watermark } from './watermark';

@Directive({
  selector: '[watermark]',
  exportAs: 'watermark',
  host: {
    '[style.position]': '"relative"',
  },
})
export class WatermarkDirective implements OnInit, OnChanges, OnDestroy {
  @Input({ alias: 'watermarkOptions' }) options: WatermarkOptions = {};

  @Input({ alias: 'watermarkContainer' }) container?: HTMLElement | string | null;

  @Input({ alias: 'watermarkSecure', transform: booleanAttribute }) secure = true;

  @Input({ alias: 'watermarkZIndex', transform: numberAttribute }) zIndex = 9999;

  @Input({ alias: 'watermarkScrollHeight' }) scrollHeight?: string | number;

  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _ngZone = inject(NgZone);

  private _watermark?: Watermark;

  ngOnInit(): void {
    const el = this._elementRef.nativeElement;

    this._watermark = this._ngZone.runOutsideAngular(
      () =>
        new Watermark({
          ...this.options,
          container: this.container || (el.childNodes.length > 0 ? el : null),
          secure: this.secure,
          zIndex: this.zIndex,
          scrollHeight: this.scrollHeight,
        })
    );
  }

  ngOnChanges(): void {
    this.update(this.options);
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  update(options: WatermarkOptions) {
    this._watermark?.update(options);
  }

  show() {
    this._watermark?.show();
  }

  hide() {
    this._watermark?.hide();
  }

  destroy() {
    this._watermark?.destroy();
  }
}
