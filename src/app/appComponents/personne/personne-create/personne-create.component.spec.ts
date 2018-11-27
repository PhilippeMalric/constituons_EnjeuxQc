import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneCreateComponent } from './personne-create.component';

describe('PersonneCreateComponent', () => {
  let component: PersonneCreateComponent;
  let fixture: ComponentFixture<PersonneCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
