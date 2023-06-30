import { TestBed } from '@angular/core/testing';

import { NodeServerService } from './node-server.service';

describe('NodeServerService', () => {
  let service: NodeServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
