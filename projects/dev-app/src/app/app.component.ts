import { Watermark, WatermarkOptions, WatermarkWrapper } from '@acrodata/watermark';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WatermarkWrapper],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  options: WatermarkOptions = {
    text: 'abc123',
    secure: false,
  };

  ngOnInit(): void {
    new Watermark({
      // image: 'https://placehold.co/400x400.png?text=Hello\\nWorld',
      text: 'abcdefg',
      container: '.container',
      secure: false,
      repeat: 'normal',
      rotate: 0,
      width: 100,
      height: 100,
      gapX: 0,
      gapY: 0,
      position: 'bottom right',
    });
  }
}
