import { GuiFields, GuiModule } from '@acrodata/gui';
import { blindDecryption, WatermarkDirective, WatermarkOptions } from '@acrodata/watermark';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WatermarkDirective, GuiModule, MatButtonModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  options: WatermarkOptions = {
    text: 'abc123',
    blindText: 'Blind Text',
  };

  config: GuiFields = {
    secure: {
      type: 'switch',
      name: 'secure',
      default: true,
    },
    image: {
      type: 'text',
      name: 'image',
      description: 'If both image and text are set, render the image first',
    },
    text: {
      type: 'textarea',
      name: 'text',
      default: 'abc123',
    },
    repeat: {
      type: 'buttonToggle',
      name: 'repeat',
      options: [
        { label: 'multiply', value: 'multiply' },
        { label: 'normal', value: 'normal' },
        { label: 'none', value: 'none' },
      ],
      default: 'multiply',
    },
    position: {
      type: 'text',
      name: 'position',
      placeholder: 'background-position',
    },
    width: {
      type: 'number',
      name: 'width',
      min: 0,
      default: 120,
      suffix: 'px',
    },
    height: {
      type: 'number',
      name: 'height',
      min: 0,
      default: 60,
      suffix: 'px',
    },
    gapX: {
      type: 'number',
      name: 'gapX',
      min: 0,
      default: 100,
      suffix: 'px',
    },
    gapY: {
      type: 'number',
      name: 'gapY',
      min: 0,
      default: 100,
      suffix: 'px',
    },
    offsetX: {
      type: 'number',
      name: 'offsetX',
      default: 0,
      suffix: 'px',
    },
    offsetY: {
      type: 'number',
      name: 'offsetY',
      default: 0,
      suffix: 'px',
    },
    opacity: {
      type: 'slider',
      name: 'opacity',
      min: 0,
      max: 1,
      step: 0.05,
      default: 0.15,
    },
    rotate: {
      type: 'slider',
      name: 'rotate',
      min: -360,
      max: 360,
      default: -24,
    },
    fontSize: {
      type: 'number',
      name: 'fontSize',
      suffix: 'px',
      default: 16,
    },
    fontWeight: {
      type: 'select',
      name: 'fontWeight',
      options: [
        { label: '100', value: 100 },
        { label: '200', value: 200 },
        { label: '300', value: 300 },
        { label: '400', value: 400 },
        { label: '500', value: 500 },
        { label: '600', value: 600 },
        { label: '700', value: 700 },
        { label: '800', value: 800 },
        { label: '900', value: 900 },
      ],
      default: 400,
    },
    fontStyle: {
      type: 'buttonToggle',
      name: 'fontStyle',
      options: [
        { label: 'normal', value: 'normal' },
        { label: 'italic', value: 'italic' },
      ],
      default: 'normal',
    },
    fontVariant: {
      type: 'buttonToggle',
      name: 'fontVariant',
      options: [
        { label: 'normal', value: 'normal' },
        { label: 'small-caps', value: 'small-caps' },
      ],
      default: 'normal',
    },
    fontColor: {
      type: 'fill',
      name: 'fontColor',
      default: '#000',
    },
    fontFamily: {
      type: 'select',
      name: 'fontFamily',
      options: [
        { label: 'sans-serif', value: 'sans-serif' },
        { label: 'serif', value: 'serif' },
        { label: 'monospace', value: 'monospace' },
        { label: 'Arial', value: 'Arial' },
        { label: 'Courier New', value: 'Courier New' },
        { label: 'Microsoft YaHei', value: 'Microsoft YaHei' },
      ],
      useFont: true,
      default: 'sans-serif',
    },
    blindText: {
      type: 'text',
      name: 'blindText',
      default: 'Blind Text',
    },
    blindFontSize: {
      type: 'number',
      name: 'blindFontSize',
      suffix: 'px',
      default: 16,
    },
    blindOpacity: {
      type: 'slider',
      name: 'blindOpacity',
      min: 0,
      max: 1,
      step: 0.01,
      default: 0.005,
    },
  };

  image = '';

  ngOnInit(): void {
    html2canvas(document.querySelector('main')!, { useCORS: true });
  }

  onModelChange(v: any) {
    this.options = v;
  }

  async decryption() {
    const canvas = await html2canvas(document.querySelector('main')!, { useCORS: true });

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // 处理像素解密盲水印
      blindDecryption(ctx);
      this.image = canvas.toDataURL();
    }
  }

  restore() {
    this.image = '';
  }
}
