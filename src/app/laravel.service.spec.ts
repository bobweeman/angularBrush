import { TestBed } from '@angular/core/testing';

import { LaravelService } from './laravel.service';

describe('LaravelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LaravelService = TestBed.get(LaravelService);
    expect(service).toBeTruthy();
  });
});
