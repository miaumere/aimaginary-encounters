import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../core/base.component';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.scss',
})
export class DashboardViewComponent extends BaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit(): void {}
}
