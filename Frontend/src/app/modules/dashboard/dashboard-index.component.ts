import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-index-page',
  template: `<div [style]="{ margin: '16px' }">
    <router-outlet></router-outlet>
  </div>`,
})
export class DashboardIndexComponent {}
