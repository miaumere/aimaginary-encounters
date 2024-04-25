import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../modules/shared/shared.module';

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  exports: [FooterComponent, NavbarComponent],
  imports: [CommonModule, SharedModule],
})
export class CoreModule {}
