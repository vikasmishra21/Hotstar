import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelListsComponent } from './panel-lists.component';

describe('PanelListsComponent', () => {
  let component: PanelListsComponent;
  let fixture: ComponentFixture<PanelListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
