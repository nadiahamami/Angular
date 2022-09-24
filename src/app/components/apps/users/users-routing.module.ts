import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsersIndexComponent } from './users-index/users-index.component';
import { UsersCreateComponent } from './users-create/users-create.component';
import { UsersUpdateComponent } from './users-update/users-update.component';
import {DataComponent} from "./data/data.component";


const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:"team-details",
        component:TeamDetailsComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"edit-profile",
        component:EditProfileComponent
      },
      {
        path:"index",
        component:UsersIndexComponent
      },
      {
        path:"create",
        component:UsersCreateComponent
      },
      {
        path:"update/:id",
        component:UsersUpdateComponent
      },
      {
        path:"database",
        component:DataComponent
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
