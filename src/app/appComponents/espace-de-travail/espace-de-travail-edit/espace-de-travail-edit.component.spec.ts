import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceDeTravailEditComponent } from './espace-de-travail-edit.component';

describe('EspaceDeTravailEditComponent', () => {
  let component: EspaceDeTravailEditComponent;
  let fixture: ComponentFixture<EspaceDeTravailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceDeTravailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceDeTravailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
