import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerformComponent } from './partnerform.component';

describe('PartnerformComponent', () => {
  let component: PartnerformComponent;
  let fixture: ComponentFixture<PartnerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
