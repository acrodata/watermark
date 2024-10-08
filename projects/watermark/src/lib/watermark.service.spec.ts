import { TestBed } from '@angular/core/testing';

import { WatermarkService } from './watermark.service';

describe('WatermarkService', () => {
  let service: WatermarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatermarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
