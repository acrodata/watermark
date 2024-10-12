/* eslint-disable @angular-eslint/component-class-suffix */
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { WatermarkOptions } from './types';
import { Watermark } from './watermark';

@Component({
  selector: 'watermark-wrapper',
  standalone: true,
  template: `<ng-content />`,
  styles: `
    .watermark-wrapper {
      position: relative;
    }
  `,
  host: {
    class: 'watermark-wrapper',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatermarkWrapper implements OnInit, OnChanges, OnDestroy {
  @Input() options?: WatermarkOptions;

  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private _ngZone = inject(NgZone);

  watermark?: Watermark;

  ngOnInit(): void {
    const el = this._elementRef.nativeElement;

    this.watermark = this._ngZone.runOutsideAngular(
      () =>
        new Watermark({
          ...this.options,
          container: this.options?.container || (el.childNodes.length > 0 ? el : null),
        })
    );
  }

  ngOnChanges(): void {
    this.watermark?.update(this.options);
  }

  ngOnDestroy(): void {
    this.watermark?.destroy();
  }
}
