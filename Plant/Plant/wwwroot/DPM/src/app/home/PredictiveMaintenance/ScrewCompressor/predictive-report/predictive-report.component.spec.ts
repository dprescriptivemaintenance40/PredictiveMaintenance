import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveReportComponent } from './predictive-report.component';

describe('PredictiveReportComponent', () => {
  let component: PredictiveReportComponent;
  let fixture: ComponentFixture<PredictiveReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictiveReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictiveReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
