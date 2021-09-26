import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkviewComponent } from './linkview.component';

describe('LinkviewComponent', () => {
  let component: LinkviewComponent;
  let fixture: ComponentFixture<LinkviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
