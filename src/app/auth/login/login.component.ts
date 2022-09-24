import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../shared/services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public show: boolean = false;
  public loginForm: FormGroup;
  public errorMessage: any;
  public showLoader: boolean = false;

  constructor(private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService) {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      });
  }

  ngOnInit() {
  }

  showPassword() {
    this.show = !this.show;
  }

  // Login request 
  login() {
    this.showLoader = true;
    this.authService.login(this.loginForm.value).subscribe((response:any)=>{
      this.showLoader = false;
      this.toastr.success("", response?.message);
      this.authService.setToken(response?.result?.token);
      this.router.navigate(['/dashboard/default']);
    }, (error:any)=>{
      this.showLoader = false;
      const errorMessage =  this.translate.instant('auth.login.errorMessage');
      this.toastr.error(errorMessage?.message, errorMessage?.title);
    });
  }

}
