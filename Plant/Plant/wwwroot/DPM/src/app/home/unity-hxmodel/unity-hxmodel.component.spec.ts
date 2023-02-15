import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityHXModelComponent } from './unity-hxmodel.component';

describe('UnityHXModelComponent', () => {
  let component: UnityHXModelComponent;
  let fixture: ComponentFixture<UnityHXModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnityHXModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnityHXModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
