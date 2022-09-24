import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from 'src/app/shared/services/api/user.service';
import {KpiService} from "../../../../shared/services/api/kpi.service";

@Component({
    selector: 'app-users-create',
    templateUrl: './users-create.component.html',
    styleUrls: ['./users-create.component.scss']
})
export class UsersCreateComponent implements OnInit {
    public userForm: FormGroup;
    submitted = false;
    currentFile: any;
    products = []
    role = [];
    users = []
    public selectgroupby: string;
    public defaultBindingsList = [
        {value: "1", label: "Alabama", job: "Developer"},
        {value: "2", label: "Wyoming", job: "Developer"},
        {value: "3", label: "Coming", job: "Designer", disabled: true},
        {value: "4", label: "Hanry Die", job: "Designer"},
        {value: "5", label: "John Doe", job: "Designer"},
    ];

    constructor(private userService: UserService,
                private toasterService: ToastrService,
                private kpiService: KpiService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.userForm = new FormGroup({
            firstName: new FormControl(null, [Validators.required]),
            lastName: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            post: new FormControl(null),
            password: new FormControl(null, [Validators.required]),
            role: new FormControl(null, [Validators.required]),
            projects: new FormControl([]),
        })
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
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.currentFile = file
        }
    }

    addNewUser() {
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }
        let formData: any = new FormData()
        this.userForm.patchValue({
            role: {"id": this.userForm.value.role},
        })
        if (this.currentFile) {
            formData.append("file", this.currentFile, this.currentFile.name);
            this.userService.uploadAvatar(formData).subscribe((res: any) => {
                const userForm = this.userForm.value;
                userForm['avatar'] = res?.result;
                this.addUser(userForm);
            }, (error: any) => {
                this.toasterService.error('', error?.error?.message);
            });
        } else {
            const userForm = this.userForm.value;
            userForm['avatar'] = 'defualt';
            this.addUser(userForm);
        }

    }

    addUser(userForm: any) {
        console.log(userForm)
        this.userService.addUser(userForm).subscribe((response: any) => {
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
