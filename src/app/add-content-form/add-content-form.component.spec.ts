import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContentFormComponent } from './add-content-form.component';

describe('AddContentFormComponent', () => {
  let component: AddContentFormComponent;
  let fixture: ComponentFixture<AddContentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContentFormComponent]
    });
    fixture = TestBed.createComponent(AddContentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
