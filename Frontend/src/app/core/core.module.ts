import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from '../modules/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [FooterComponent, NavbarComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [FooterComponent, NavbarComponent],
})
export class CoreModule {}
