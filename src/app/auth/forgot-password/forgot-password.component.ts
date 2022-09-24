import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/api/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPasswordForm: FormGroup;
  public showLoader: boolean = false;

  constructor(private toastr: ToastrService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

   // Forgot password request 
   forgotPassword() {
    this.showLoader = true;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((response:any)=>{
      this.showLoader = false;
      this.toastr.success("", response?.message);
    }, (error:any)=>{
      this.showLoader = false;
      this.toastr.error("", error?.error?.message);
    });
  }
}
