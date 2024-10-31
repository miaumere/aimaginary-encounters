import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../../base.component';
import { UserDto } from '../../services/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent extends BaseComponent implements OnInit {
  user: UserDto | null = null;

  constructor(public _authService: AuthService, private _router: Router) {
    super();
  }
  ngOnInit(): void {
    this.subscriptions$.add(
      this._authService.user$.subscribe((user) => {
        this.user = user;
      })
    );
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/auth']);
  }
}
