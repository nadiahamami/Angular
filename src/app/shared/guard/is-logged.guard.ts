import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(public router: Router,
    private authService: AuthService) { }
  // Guard to redirect the user to dashboard if is connected
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const token = this.authService.getToken();
    if (token) {
      const isExpired = this.authService.isExpiredToken(token)
      if (!isExpired) {
        this.router.navigate(['/dashboard/default'])
      }
    }
    return true;
  }

  
}
