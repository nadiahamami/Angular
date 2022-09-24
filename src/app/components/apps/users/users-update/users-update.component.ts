import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from 'src/app/shared/services/api/user.service';
import {KpiService} from "../../../../shared/services/api/kpi.service";

@Component({
    selector: 'app-users-update',
    templateUrl: './users-update.component.html',
    styleUrls: ['./users-update.component.scss']
})
export class UsersUpdateComponent implements OnInit {

    public userForm: FormGroup;
    submitted = false;
    currentFile: any;
    userId: any;
    role = [];
    products = []
    users = []

    constructor(private userService: UserService,
                private toasterService: ToastrService,
                private kpiService: KpiService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.userId = this.activatedRoute.snapshot.params['id'];
        this.userForm = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            post: new FormControl(null),
            password: new FormControl(null, []),
            role: new FormControl(null, []),
            projects: new FormControl([]),
            responsable : new FormControl(null , [Validators.required])

        });
        this.userService.getAllUsers().subscribe((response:any)=>{
            this.users = response?.result;
        }, (error:any)=>{
            this.toasterService.error('', error?.error?.message);
        });
        this.kpiService.getAllProjects().subscribe((response: any) => {
            this.products = response;
        }, (error: any) => {
        });

        this.userService.getRoles().subscribe((response: any) => {
            this.role = response;
        })
        this.loadUserData();
    }

    loadUserData() {
        this.userService.getUser(this.userId).subscribe((response: any) => {
            // delete the password
            delete response?.result?.password;
            // show data in the form
            this.userForm.patchValue(response?.result)
            this.userForm.patchValue({
                role: response?.result?.role?.id,
                responsable : response?.result.responsable?.id
            })
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

    saveUpdate() {
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }
        let formData: any = new FormData()
        
        this.userForm.patchValue({
            role: {"id": this.userForm.value.role},
            responsable: {"id": this.userForm.value.responsable}

        })
        if (this.currentFile) {
            formData.append("file", this.currentFile, this.currentFile.name);
            this.userService.uploadAvatar(formData).subscribe((res: any) => {
                const userForm = this.userForm.value;
                userForm['avatar'] = res?.result;
                this.saveUserUpdate(userForm);
            }, (error: any) => {
                this.toasterService.error('', error?.error?.message);
            });
        } else {
            const userForm = this.userForm.value;
            userForm['avatar'] = 'defualt';
            this.saveUserUpdate(userForm);
        }
    }

    saveUserUpdate(userForm: any) {
        this.userService.updateUser(this.userId, userForm).subscribe((response: any) => {
            this.toasterService.success('', response?.message);
            this.router.navigateByUrl('/user/index');
        }, (error: any) => {
            this.toasterService.error('', error?.error?.message);
        });
    }
    compareFunction(item, selected) {
        return item.id === selected.id;
    }
}
