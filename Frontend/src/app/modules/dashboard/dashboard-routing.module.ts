import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardIndexComponent } from './dashboard-index.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardIndexComponent,
    children: [{ path: '', component: DashboardViewComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashhboardRoutingModule {}
