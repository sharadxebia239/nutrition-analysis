import { TestBed } from '@angular/core/testing';

import { NutritionApiService } from './nutrition-api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NutritionApiService', () => {
  let service: NutritionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(NutritionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should exist "getNutritionDetails"', function () {
    expect(service.getNutritionDetails).toBeDefined();
  });

  it('should exist "getNutritionData"', function () {
    expect(service.getNutritionDetails).toBeDefined();
  });
});
