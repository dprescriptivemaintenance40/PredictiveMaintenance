import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPipelineComponent } from './model-pipeline.component';

describe('ModelPipelineComponent', () => {
  let component: ModelPipelineComponent;
  let fixture: ComponentFixture<ModelPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelPipelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
