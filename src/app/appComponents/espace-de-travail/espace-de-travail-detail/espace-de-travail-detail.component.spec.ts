import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceDeTravailDetailComponent } from './espace-de-travail-detail.component';

describe('EspaceDeTravailDetailComponent', () => {
  let component: EspaceDeTravailDetailComponent;
  let fixture: ComponentFixture<EspaceDeTravailDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceDeTravailDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceDeTravailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
