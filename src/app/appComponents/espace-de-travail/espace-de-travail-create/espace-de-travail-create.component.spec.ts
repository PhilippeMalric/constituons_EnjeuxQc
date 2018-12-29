import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceDeTravailCreateComponent } from './espace-de-travail-create.component';

describe('EspaceDeTravailCreateComponent', () => {
  let component: EspaceDeTravailCreateComponent;
  let fixture: ComponentFixture<EspaceDeTravailCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceDeTravailCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceDeTravailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
