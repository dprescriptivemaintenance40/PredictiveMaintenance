import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstraintValidationComponent } from './constraint-validation.component';

describe('ConstraintValidationComponent', () => {
  let component: ConstraintValidationComponent;
  let fixture: ComponentFixture<ConstraintValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstraintValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstraintValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
