import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriterManagerComponent } from './writer-manager.component';

describe('WriterManagerComponent', () => {
  let component: WriterManagerComponent;
  let fixture: ComponentFixture<WriterManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriterManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriterManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
