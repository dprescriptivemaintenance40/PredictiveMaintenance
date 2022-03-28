import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictiveChartComponent } from './predictive-chart.component';

describe('PredictiveChartComponent', () => {
  let component: PredictiveChartComponent;
  let fixture: ComponentFixture<PredictiveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredictiveChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictiveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
