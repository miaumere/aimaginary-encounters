import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { Interceptor } from './core/interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      timeOut: 1500,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class AppModule {}
