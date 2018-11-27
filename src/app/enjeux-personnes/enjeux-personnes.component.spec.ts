import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnjeuxPersonnesComponent } from './enjeux-personnes.component';

describe('EnjeuxPersonnesComponent', () => {
  let component: EnjeuxPersonnesComponent;
  let fixture: ComponentFixture<EnjeuxPersonnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnjeuxPersonnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnjeuxPersonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
