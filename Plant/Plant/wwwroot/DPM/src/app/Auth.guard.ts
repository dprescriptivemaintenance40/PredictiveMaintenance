import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

export interface CanComponentDeactivate {
  CanDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private cookies:CookieService) {
  }
  canDeactivate(component: CanComponentDeactivate, 
    currentRoute: ActivatedRouteSnapshot, 
    currentState: RouterStateSnapshot, 
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return component.CanDeactivate();
  }

  canActivate(): boolean {
    if (!this.cookies.get('access_token')) {
      this.router.navigate(['Login']);
      return false;
    }
    return true;
  }
}