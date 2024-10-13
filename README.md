# Watermark

[![npm](https://img.shields.io/npm/v/@acrodata/watermark.svg)](https://www.npmjs.com/package/@acrodata/watermark)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/acrodata/watermark/blob/main/LICENSE)

Add watermark for your page.

#### Quick links

[Playground](https://acrodata.github.io/watermark/)

## Installation

```bash
npm install @acrodata/watermark --save
```

## Usage

### Vanilla JS

```ts
import { Watermark } from '@acrodata/watermark';

const watermark = new Watermark(options);
```

### Angular directive

```ts
import { Component } from '@angular/core';
import { WatermarkDirective, WatermarkOptions } from '@acrodata/watermark';

@Component({
  selector: 'your-app',
  template: `
    <div watermark [watermarkOptions]="options">
      <p>...</p>
    </div>
  `,
  standalone: true,
  imports: [WatermarkDirective],
})
export class YourAppComponent {
  options: WatermarkOptions = {
    text: '...',
  };
}
```

## Options

| Name          | Type                             | Default      | Description                                                           |
| ------------- | -------------------------------- | ------------ | --------------------------------------------------------------------- |
| secure        | boolean                          | `true`       | Whether prevent the watermark being removed                           |
| image         | string                           | `''`         | Image source of the watermark, it's recommended to use 2x or 3x image |
| text          | string \| string[]               | `''`         | Text of the watermark and dispaly multiple lines with using array     |
| blindText     | string                           | `''`         | Text of the blind-watermark                                           |
| blindFontSize | string \| number                 | `16`         | Font size of the blind-watermark                                      |
| blindOpacity  | boolean                          | `0.005`      | Opacity of the blind-watermark                                        |
| container     | HTMLElement \| string \| null    | `body`       | Container of the watermark                                            |
| repeat        | 'none' \| 'normal' \| 'multiply' | `multiply`   | Specify how watermarks are repeated                                   |
| scrollHeight  | number \| string                 | `true`       | Specify the height of watermark in a scroll container                 |
| position      | string                           | `''`         | Specify `background-position` of the watermark                        |
| zIndex        | number                           | `9999`       | Specify `z-index` of the watermark                                    |
| gapX          | number                           | `100`        | Horizontal gap of watermark contents                                  |
| gapY          | number                           | `100`        | Vertical gap of watermark contents                                    |
| offsetX       | number                           | `0`          | Horizontal offset of the watermark content                            |
| offsetY       | number                           | `0`          | Vertical offset of the watermark content                              |
| width         | number                           | `120`        | Width of the watermark content                                        |
| height        | number                           | `60`         | Height of the watermark content                                       |
| opacity       | number                           | `0.15`       | Opacity of the watermark                                              |
| rotate        | number                           | `-24`        | Rotation degree of the watermark content                              |
| fontSize      | number                           | `16`         | Font size of the text-watermark                                       |
| fontWeight    | string \| number                 | `400`        | Font weight of the text-watermark                                     |
| fontStyle     | 'normal' \| 'italic'             | `normal`     | Font style of the text-watermark                                      |
| fontVariant   | 'normal' \| 'small-caps          | `normal`     | Font variant of the text-watermark                                    |
| fontColor     | string                           | `#000`       | Font color of the text-watermark                                      |
| fontFamily    | string                           | `sans-serif` | Font family of the text-watermark                                     |
| textAlign     | CanvasTextAlign                  | `center`     | Text alignment of the text-watermark                                  |
| textBaseline  | CanvasTextBaseline               | `alphabetic` | Text alignment of the text-watermark                                  |

## License

MIT
