import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { ErrorDisplayDirective } from './directives/error.directive';

const shared = [
  LoaderComponent,
  ProfilePicComponent,
  CharacterCardComponent,
  ErrorDisplayDirective,
];
@NgModule({
  declarations: [...shared],
  imports: [CommonModule],
  exports: [...shared],
})
export class SharedModule {}
