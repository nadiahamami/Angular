import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/services/api/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public editProfile: FormGroup;
  submitted = false;
  currentFile: any;

  constructor(private userService: UserService,
    private toasterService: ToastrService,
    private router: Router,) { }

  ngOnInit(): void {
    this.editProfile = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', []),
    });
    this.loadProfileData();
  }

  loadProfileData(){
    this.userService.getProfile().subscribe((response: any) => {
      // delete the password 
      delete response?.result?.password;
      // show data in the form
      this.editProfile.patchValue(response?.result)
    }, (error: any) => {
      this.toasterService.error('', error?.error?.message);
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.currentFile = file
    }
  }

  saveUpdate(){
    this.submitted = true;
    if (this.editProfile.invalid) {
      return;
    }
    
    let formData: any = new FormData()
    if (this.currentFile) {
      formData.append("file", this.currentFile, this.currentFile.name);
      this.userService.uploadAvatar(formData).subscribe((res: any) => {
        const userForm = this.editProfile.value;
        userForm['avatar'] = res?.result;
        this.updateMyProfile(userForm);
      }, (error: any) => {
        this.toasterService.error('', error?.error?.message);
      });
    } else {
      const userForm = this.editProfile.value;
      userForm['avatar'] = 'defualt';
      this.updateMyProfile(userForm);
    }
  }

  updateMyProfile(userForm: any) {    
    this.userService.updateProfile(userForm).subscribe((response: any) => {
      this.toasterService.success('', response?.message);
      this.router.navigateByUrl('/dashboard/default');
    }, (error: any) => {
      this.toasterService.error('', error?.error?.message);
    });
  }

}
