import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseCategorieComponent } from './choose-categorie.component';

describe('ChooseCategorieComponent', () => {
  let component: ChooseCategorieComponent;
  let fixture: ComponentFixture<ChooseCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
