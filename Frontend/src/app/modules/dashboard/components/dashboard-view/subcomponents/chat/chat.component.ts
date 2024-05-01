import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IChatDetailsDto,
  IMessageDto,
} from '../../../../../../core/services/models/chat-dto.model';
import { ChatService } from '../../../../../../core/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent extends BaseComponent implements OnInit {
  @ViewChild('chatBox') chatBox!: ElementRef;
  readonly audioSrc =
    '../../../../../../../assets/audio/mixkit-cool-interface-click-tone-2568.wav';

  messages: IMessageDto[] = [];
  chatDetails: IChatDetailsDto | null = null;
  chatId = '';

  isActionInProgress = false;

  constructor(
    private _chatService: ChatService,
    private _route: ActivatedRoute
  ) {
    super();
    this.chatId = this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscriptions$.add(
      this._chatService.getChatDetails(this.chatId).subscribe((chatDetails) => {
        this.chatDetails = chatDetails;
      })
    );
    this._getChatMessages();
  }

  private _getChatMessages() {
    this.subscriptions$.add(
      this._chatService.getChatMessages(this.chatId).subscribe((messages) => {
        this.messages = messages;
        this.isActionInProgress = false;
        this._scrollToDivBottom();
      })
    );
  }

  private _scrollToDivBottom() {
    const element = this.chatBox.nativeElement;

    setTimeout(() => {
      element!.scrollTop = element!.scrollHeight;
    }, 0);
  }

  private _playSound() {
    new Audio(this.audioSrc).play();
  }

  generateMore() {
    this.isActionInProgress = true;
    this.subscriptions$.add(
      this._chatService.generateMessages(this.chatId).subscribe(() => {
        this._getChatMessages();
        this._playSound();
      })
    );
  }
}
