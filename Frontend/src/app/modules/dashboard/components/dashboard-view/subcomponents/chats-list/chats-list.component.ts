import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../../../core/base.component';
import { IChatDto } from '../../../../../../core/services/models/chat-dto.model';
import { ChatService } from '../../../../../../core/services/chat.service';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: [
    '../../dashboard-view.component.scss',
    './chats-list.component.scss',
  ],
})
export class ChatsListComponent extends BaseComponent implements OnInit {
  chats: IChatDto[] = [];

  constructor(private _chatService: ChatService) {
    super();
  }

  ngOnInit(): void {
    this._getChats();
  }

  private _getChats() {
    this._chatService.getChats().subscribe((chats) => {
      this.chats = chats;
    });
  }

  chatListChanged() {
    this._getChats();
  }
}
