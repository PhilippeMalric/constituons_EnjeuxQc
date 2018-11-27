import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjeuDetailComponent } from './enjeu-detail.component';

describe('EnjeuDetailComponent', () => {
  let component: EnjeuDetailComponent;
  let fixture: ComponentFixture<EnjeuDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnjeuDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjeuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
