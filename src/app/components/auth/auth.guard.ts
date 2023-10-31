import {ActivatedRouteSnapshot, CanActivateFn, createUrlTreeFromSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {map, take} from 'rxjs';
import {User} from '../../shared/models/user.model';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService: AuthService = inject(AuthService);
  return authService.user$.pipe(take(1)).pipe(
    map((user: User): boolean | UrlTree => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return createUrlTreeFromSnapshot(route, ['/auth']);
    }),
  );
};
