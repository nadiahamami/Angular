import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../shared/services/api/user.service';
import { SweetAlertService } from '../../../../shared/services/providers/sweet-alert.service';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss']
})
export class UsersIndexComponent implements OnInit {
  users: any[];
  constructor(private userService: UserService,
    private toasterService: ToastrService,
    private sweetAlertService: SweetAlertService
) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((response:any)=>{
      this.users = response?.result;
    }, (error:any)=>{
      this.toasterService.error('', error?.error?.message);
    });
  }

  deleteUser(id:any){
    this.sweetAlertService.deleteConfirmation().then((result) => {
      if (result.value) {
        this.userService.deletUser(id).subscribe((response:any)=>{
          this.toasterService.success('', response?.message);
          this.loadUsers();
        }, (error:any)=>{
          this.toasterService.error('', error?.error?.message);
        });
      }
    });
  }

}
