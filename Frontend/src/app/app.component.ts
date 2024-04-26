import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import { BaseComponent } from './core/base.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent extends BaseComponent implements OnInit {
  globalLoaderIsVisible = false;

  constructor(
    private _loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions$.add(
      this._loaderService.isLoaderVisible.subscribe((isVisible) => {
        this.globalLoaderIsVisible = isVisible;
        this.cdr.detectChanges();
      })
    );
  }
}
