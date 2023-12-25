import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerviewComponent } from './partnerview.component';

describe('PartnerviewComponent', () => {
  let component: PartnerviewComponent;
  let fixture: ComponentFixture<PartnerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
