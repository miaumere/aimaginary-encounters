import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  IChatDetailsDto,
  ICreateMessageRequestDto,
  IEditMessageRequestDto,
  IMessageDto,
} from '../../../../../../core/services/models/chat-dto.model';
import { ChatService } from '../../../../../../core/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../core/base.component';
import { ICharacterDto } from '../../../../../../core/services/models/character-dto.model';
import { FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

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

  selectedCharacter: ICharacterDto | null = null;

  messageFormControl = new FormControl('', [
    Validators.minLength(1),
    Validators.maxLength(250),
  ]);

  messageInEditMode: IMessageDto | null = null;

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
    this.messageFormControl.disable();
  }

  private _getChatMessages() {
    this.subscriptions$.add(
      this._chatService.getChatMessages(this.chatId).subscribe((messages) => {
        this.messages = messages;
        this._scrollToDivBottom();
      })
    );
  }

  private _scrollToDivBottom() {
    const element = this.chatBox?.nativeElement;

    setTimeout(() => {
      element!.scrollTop = element!.scrollHeight;
    }, 0);
  }

  private _playSound() {
    new Audio(this.audioSrc).play();
  }

  generateMore() {
    if (this.selectedCharacter == null) return;

    this.isActionInProgress = true;
    this.subscriptions$.add(
      this._chatService
        .generateMessages(this.chatId, this.selectedCharacter.id)
        .pipe(finalize(() => (this.isActionInProgress = false)))
        .subscribe(() => {
          this._getChatMessages();
          this._playSound();
        })
    );
  }

  clearConversation() {
    if (!confirm('Are you sure you want to clear the conversation?')) return;

    this.isActionInProgress = true;
    this.subscriptions$.add(
      this._chatService
        .clearChatMessages(this.chatId)
        .pipe(finalize(() => (this.isActionInProgress = false)))
        .subscribe(() => {
          this.messages = [];
        })
    );
  }

  sendMessage() {
    this.isActionInProgress = true;
    if (
      this.messageFormControl.invalid ||
      !this.messageFormControl.value ||
      !this.selectedCharacter
    ) {
      return;
    }

    const request: ICreateMessageRequestDto = {
      chatId: this.chatId,
      senderId: this.selectedCharacter.id,
      content: this.messageFormControl.value,
    };

    this.subscriptions$.add(
      this._chatService
        .sendMessage(request)
        .pipe(finalize(() => (this.isActionInProgress = false)))
        .subscribe(() => {
          this._getChatMessages();
          this._playSound();
          this.messageFormControl.reset();
        })
    );
  }

  deleteMessage(messageId: string) {
    if (!confirm('Are you sure you want to delete the message?')) return;

    this.isActionInProgress = true;

    this.subscriptions$.add(
      this._chatService
        .deleteChatMessage(this.chatId, messageId)
        .pipe(finalize(() => (this.isActionInProgress = false)))
        .subscribe(() => {
          this._getChatMessages();
        })
    );
  }
  toggleEditModeForMessage(message: IMessageDto | null) {
    this.messageInEditMode = message;
  }

  updateMessage() {
    if (!this.messageInEditMode) return;

    this.isActionInProgress = true;

    const request: IEditMessageRequestDto = {
      chatId: this.chatId,
      messageId: this.messageInEditMode.id,
      content: this.messageInEditMode.content,
    };

    this.subscriptions$.add(
      this._chatService
        .editChatMessage(request)
        .pipe(finalize(() => (this.isActionInProgress = false)))
        .subscribe(() => {
          this._getChatMessages();
          this.messageInEditMode = null;
        })
    );
  }

  selectCharacter(character: ICharacterDto) {
    this.selectedCharacter = character;
    this.messageFormControl.enable();
  }
}
