import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashhboardRoutingModule } from './dashboard-routing.module';
import { DashboardIndexComponent } from './dashboard-index.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { CharactersListComponent } from './components/dashboard-view/subcomponents/characters-list/characters-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCharacterDetailsComponent } from './components/dashboard-view/subcomponents/edit-character-details/edit-character-details.component';

@NgModule({
  declarations: [
    DashboardIndexComponent,
    DashboardViewComponent,
    CharactersListComponent,
    EditCharacterDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashhboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
