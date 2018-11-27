import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionsTabComponent } from './opinions-tab.component';

describe('OpinionsTabComponent', () => {
  let component: OpinionsTabComponent;
  let fixture: ComponentFixture<OpinionsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpinionsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
