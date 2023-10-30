import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentResultComponent } from './content-result.component';

describe('ContentResultComponent', () => {
  let component: ContentResultComponent;
  let fixture: ComponentFixture<ContentResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContentResultComponent]
    });
    fixture = TestBed.createComponent(ContentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
