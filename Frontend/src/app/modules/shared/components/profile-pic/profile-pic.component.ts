import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-pic [name]',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent {
  @Input() size?: string = '32px';
  @Input() image: string | null = null;
  @Input() name: string | null = null;
}
