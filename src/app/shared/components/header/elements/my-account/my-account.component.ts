import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from "../../../../services/api/user.service";

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

    name : any
    role : any
    constructor(public userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
      this.userService.getProfile().subscribe((response : any)=>{
          this.name = response?.result.firstName +" "+ response?.result.lastName
          this.role = response?.result.post
      })
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('/auth/login');
    }

}
