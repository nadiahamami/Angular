import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private toasterService: ToastrService,
    private translate: TranslateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
     catchError((error: HttpErrorResponse) => {
        // Unauthenticated User error
        if (error.status === 401 && !request.url.endsWith('/auth/login')) {
          // reomve localStorage data
          localStorage.clear();
          const errorMessage =  this.translate.instant('auth.expriredSession');
          this.toasterService.error(errorMessage?.message, errorMessage?.title);
          // redirect to the login route
          this.router.navigate(['/auth/login']);
        }
        // Not Found error
        if (error.status === 404) {
          this.router.navigate(['/error-page/error-400']);
        }
        // Server error
        if (error.status === 500) {
          this.router.navigate(['/error-page/error-500']);
        }
        return throwError(error);
      })
    );
  }
}
