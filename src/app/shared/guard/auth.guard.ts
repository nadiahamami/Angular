import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Guard for user is login or not
    const token = this.authService.getToken();
    if (token) {
      const isexpired = this.authService.isExpiredToken(token)
      if (!isexpired) {
        return true
      } else {
        const errorMessage =  this.translate.instant('auth.expriredSession');
        this.toastr.error(errorMessage?.message, errorMessage?.title);
        localStorage.clear();
        this.router.navigate(['/auth/login'])
        return false;
      }
    } else {
      this.router.navigate(['/auth/login'])
      return false;
    }
  }
}
