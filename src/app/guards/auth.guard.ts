import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private userService: UserService,
    private router: Router
  ){

  }
  
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.validateToken()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('/login');
          }
        })
      )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.userService.validateToken()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigateByUrl('/login');
          }
        })
      )
  }
  
}
