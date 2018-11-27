import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjeuEditComponent } from './enjeu-edit.component';

describe('EnjeuEditComponent', () => {
  let component: EnjeuEditComponent;
  let fixture: ComponentFixture<EnjeuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnjeuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjeuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
