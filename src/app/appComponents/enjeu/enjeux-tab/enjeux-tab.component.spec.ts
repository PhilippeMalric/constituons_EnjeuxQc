import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjeuxTabComponent } from './enjeux-tab.component';

describe('EnjeuxTabComponent', () => {
  let component: EnjeuxTabComponent;
  let fixture: ComponentFixture<EnjeuxTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnjeuxTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjeuxTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
