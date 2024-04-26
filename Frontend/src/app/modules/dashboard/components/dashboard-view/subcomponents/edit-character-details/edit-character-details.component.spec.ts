import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharacterDetailsComponent } from './edit-character-details.component';

describe('EditCharacterDetailsComponent', () => {
  let component: EditCharacterDetailsComponent;
  let fixture: ComponentFixture<EditCharacterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCharacterDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCharacterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
