import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionDetailComponent } from './opinion-detail.component';

describe('OpinionDetailComponent', () => {
  let component: OpinionDetailComponent;
  let fixture: ComponentFixture<OpinionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
