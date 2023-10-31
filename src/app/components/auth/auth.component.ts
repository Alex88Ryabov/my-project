import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable} from 'rxjs';
import {AuthResponseData} from '../../shared/models/auth-response.model';
import {Router} from '@angular/router';
import {AlertComponent} from '../../shared/alert/alert.component';
import {PlaceholderDirective} from '../../shared/placeholder/placeholder.directive';

@UntilDestroy()
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public isLoginMode: boolean = true; //TODO change to subjects
  public isLoading: boolean = false;
  public error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private readonly router: Router,
  ) {}

  public onSwitchModel(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let auth$: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      auth$ = this.authService.singIn(email, password);
    } else {
      auth$ = this.authService.singUp(email, password);
    }

    auth$.pipe(untilDestroyed(this)).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['./recipes']).finally();
      },
      error: (error) => {
        this.showErrorAlert(error);
        this.isLoading = false;
      },
    });
    form.reset();
  }

  public onHandleError(): void {
    this.error = null;
  }

  private showErrorAlert(message: string): void {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentFactory = hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);
    componentFactory.instance.message = message;
    componentFactory.instance.close.pipe(untilDestroyed(this)).subscribe(() => {
      hostViewContainerRef.clear();
    });
  }
}
