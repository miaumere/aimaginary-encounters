import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashhboardRoutingModule } from './dashboard-routing.module';
import { DashboardIndexComponent } from './dashboard-index.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { CharactersListComponent } from './components/dashboard-view/subcomponents/characters-list/characters-list.component';

@NgModule({
  declarations: [
    DashboardIndexComponent,
    DashboardViewComponent,
    CharactersListComponent,
  ],
  imports: [CommonModule, SharedModule, DashhboardRoutingModule],
})
export class DashboardModule {}
