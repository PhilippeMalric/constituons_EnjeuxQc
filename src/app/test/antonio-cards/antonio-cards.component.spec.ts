import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntonioCardsComponent } from './antonio-cards.component';

describe('AntonioCardsComponent', () => {
  let component: AntonioCardsComponent;
  let fixture: ComponentFixture<AntonioCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntonioCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntonioCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
