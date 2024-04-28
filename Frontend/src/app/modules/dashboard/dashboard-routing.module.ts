import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { EditCharacterDetailsComponent } from './components/dashboard-view/subcomponents/edit-character-details/edit-character-details.component';

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
        path: ':id',
        component: EditCharacterDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashhboardRoutingModule {}
