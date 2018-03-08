import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCasesComponent } from './title-cases.component';

describe('TitleCasesComponent', () => {
  let component: TitleCasesComponent;
  let fixture: ComponentFixture<TitleCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
