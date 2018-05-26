import { TestBed, inject } from '@angular/core/testing';

import { RecordQueryService } from './record-query.service';

describe('RecordQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordQueryService]
    });
  });

  it('should be created', inject([RecordQueryService], (service: RecordQueryService) => {
    expect(service).toBeTruthy();
  }));
});
