import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { EditCharacterDetailsComponent } from './components/dashboard-view/subcomponents/edit-character-details/edit-character-details.component';
import { EditChatDetailsComponent } from './components/dashboard-view/subcomponents/edit-chat-details/edit-chat-details.component';
import { ChatComponent } from './components/dashboard-view/subcomponents/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardIndexComponent,
    children: [
      { path: '', component: DashboardViewComponent },
      {
        path: 'create-character',
        component: EditCharacterDetailsComponent,
      },
      {
        path: 'edit-character/:id',
        component: EditCharacterDetailsComponent,
      },
      {
        path: 'create-chat',
        component: EditChatDetailsComponent,
      },
      {
        path: 'edit-chat/:id',
        component: EditChatDetailsComponent,
      },
      {
        path: 'chat/:id',
        component: ChatComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashhboardRoutingModule {}
