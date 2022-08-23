import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ng2-cookies";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public _router: Router, public cookies:CookieService) {
  }
  canActivate(): boolean {
    if (!this.cookies.get('access_token')) {
      this._router.navigate(['Login']);
      return false;
    }
    return true;
  }
}