import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatDetailsComponent } from './edit-chat-details.component';

describe('EditChatDetailsComponent', () => {
  let component: EditChatDetailsComponent;
  let fixture: ComponentFixture<EditChatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditChatDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditChatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
