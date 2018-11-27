import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionCreateComponent } from './opinion-create.component';

describe('OpinionCreateComponent', () => {
  let component: OpinionCreateComponent;
  let fixture: ComponentFixture<OpinionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
