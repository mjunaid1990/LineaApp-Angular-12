import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickynotesComponent } from './stickynotes.component';

describe('StickynotesComponent', () => {
  let component: StickynotesComponent;
  let fixture: ComponentFixture<StickynotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickynotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickynotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
