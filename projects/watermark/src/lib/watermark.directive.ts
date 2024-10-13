import {
  Directive,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { WatermarkOptions } from './types';
import { Watermark } from './watermark';

@Directive({
  selector: '[watermark]',
  exportAs: 'watermark',
  standalone: true,
  host: {
    '[style.position]': '"relative"',
  },
})
export class WatermarkDirective implements OnInit, OnChanges, OnDestroy {
  @Input({ alias: 'watermarkOptions' }) options: WatermarkOptions = {};

  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _ngZone = inject(NgZone);

  private _watermark?: Watermark;

  ngOnInit(): void {
    const el = this._elementRef.nativeElement;

    this._watermark = this._ngZone.runOutsideAngular(
      () =>
        new Watermark({
          ...this.options,
          container: this.options.container || (el.childNodes.length > 0 ? el : null),
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
