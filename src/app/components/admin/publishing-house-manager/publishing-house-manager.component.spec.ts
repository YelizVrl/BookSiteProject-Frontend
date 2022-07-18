import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingHouseManagerComponent } from './publishing-house-manager.component';

describe('PublishingHouseManagerComponent', () => {
  let component: PublishingHouseManagerComponent;
  let fixture: ComponentFixture<PublishingHouseManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishingHouseManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingHouseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
