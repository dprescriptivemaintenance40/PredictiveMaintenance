import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInsightComponent } from './data-insight.component';

describe('DataInsightComponent', () => {
  let component: DataInsightComponent;
  let fixture: ComponentFixture<DataInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataInsightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
