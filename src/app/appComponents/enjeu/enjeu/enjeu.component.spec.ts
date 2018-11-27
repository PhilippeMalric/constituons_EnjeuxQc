import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjeuComponent } from './enjeu.component';

describe('EnjeuComponent', () => {
  let component: EnjeuComponent;
  let fixture: ComponentFixture<EnjeuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnjeuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjeuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
