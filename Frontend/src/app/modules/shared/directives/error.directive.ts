import {
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Directive({
  selector: '[appErrorDisplay]',
})
export class ErrorDisplayDirective implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private control: NgControl
  ) {}

  ngOnInit() {
    if (!this.control) {
      return;
    }
    this.subscriptions.add(
      this.control.statusChanges
        ?.pipe(distinctUntilChanged(), debounceTime(500))
        .subscribe(() => {
          this.handleErrors();
        })
    );
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

  private handleErrors() {
    const control = this.control.control;

    if (!control) return;

    if (control?.invalid && (control?.dirty || control?.touched)) {
      if (control.errors === null) return;
      const errors = Object.keys(control.errors);

      let errorMessage = errors.length ? control.errors[errors[0]] : null;

      if (errors.includes('minlength')) {
        const minLength = control.errors?.['minlength'];
        errorMessage = `This field must be at least ${minLength.requiredLength} characters long`;
      } else if (errors.includes('maxlength')) {
        const maxLength = control.errors?.['maxlength'];
        errorMessage = `This field must be less than ${maxLength.requiredLength} characters long`;
      } else if (errors.includes('required')) {
        errorMessage = 'This field is required';
      } else if (errors.includes('pattern')) {
        errorMessage = 'This field must contain only letters and numbers';
      }

      const errorElement = this.renderer.createElement('div');
      this.renderer.addClass(this.el.nativeElement, 'error');
      this.renderer.addClass(errorElement, 'error-message');
      const text = this.renderer.createText(errorMessage);
      this.renderer.appendChild(errorElement, text);
      const parent = this.renderer.parentNode(this.el.nativeElement);
      this.renderer.insertBefore(parent, errorElement, this.el.nativeElement);
      this.renderer.addClass(this.el.nativeElement, 'error');
    } else {
      const parent = this.renderer.parentNode(this.el.nativeElement);
      const errorElement = parent.querySelector('.error-message');
      if (errorElement) {
        this.renderer.removeChild(parent, errorElement);
      }
      this.renderer.removeClass(this.el.nativeElement, 'error');
    }
  }
}
