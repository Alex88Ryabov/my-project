import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {AuthResponseData} from '../../shared/models/auth-response.model';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public singUp(email: string, password: string): Observable<AuthResponseData> {
    const returnSecureToken = true;

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=` + environment.firebaseApiKey;
    return this.http
      .post<AuthResponseData>(url, {email, password, returnSecureToken})
      .pipe(catchError(this.handleError))
      .pipe(tap((resData) => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  public singIn(email: string, password: string): Observable<AuthResponseData> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=` + environment.firebaseApiKey;
    const returnSecureToken = true;

    return this.http
      .post<AuthResponseData>(url, {
        email,
        password,
        returnSecureToken,
      })
      .pipe(catchError(this.handleError))
      .pipe(tap((resData) => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)));
  }

  public logout(): void {
    this.user$.next(null);
    this.router.navigate(['/auth']).finally();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  public autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin(): void {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiration: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiration));

    if (loadedUser.token) {
      this.user$.next(loadedUser);

      const expirationDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number): void {
    const expirationDate: Date = new Date(new Date().getTime() + expiresIn * 1000);
    const user: User = new User(email, userId, token, expirationDate);

    this.user$.next(user);
    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage;

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid credentials';
        break;
      default:
        errorMessage = 'An unknown error occurred!';
    }
    return throwError(() => errorMessage);
  }
}
