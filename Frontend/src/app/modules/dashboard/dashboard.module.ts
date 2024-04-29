import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashhboardRoutingModule } from './dashboard-routing.module';
import { DashboardIndexComponent } from './dashboard-index.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { CharactersListComponent } from './components/dashboard-view/subcomponents/characters-list/characters-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCharacterDetailsComponent } from './components/dashboard-view/subcomponents/edit-character-details/edit-character-details.component';
import { ChatsListComponent } from './components/dashboard-view/subcomponents/chats-list/chats-list.component';
import { EditChatDetailsComponent } from './components/dashboard-view/subcomponents/edit-chat-details/edit-chat-details.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    DashboardIndexComponent,
    DashboardViewComponent,
    CharactersListComponent,
    EditCharacterDetailsComponent,
    ChatsListComponent,
    EditChatDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashhboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ],
})
export class DashboardModule {}
