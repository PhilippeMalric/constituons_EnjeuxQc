import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceDeTravailComponent } from './espace-de-travail.component';

describe('EspaceDeTravailComponent', () => {
  let component: EspaceDeTravailComponent;
  let fixture: ComponentFixture<EspaceDeTravailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceDeTravailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceDeTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
