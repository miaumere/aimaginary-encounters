import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from '../../../../core/base.component';
import { IChatDto } from '../../../../core/services/models/chat-dto.model';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat-card [chat]',
  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.scss',
})
export class ChatCardComponent extends BaseComponent {
  @Input() chat!: IChatDto;
  @Output() changed = new EventEmitter<null>();

  constructor(private _chatService: ChatService) {
    super();
  }

  deleteChat() {
    const decision = confirm(
      'Are you sure you want to delete this chat? All messages will be deleted.'
    );

    if (decision) {
      this.subscriptions$.add(
        this._chatService.deleteChat(this.chat.id).subscribe(() => {
          this.changed.emit();
        })
      );
    }
  }
}
