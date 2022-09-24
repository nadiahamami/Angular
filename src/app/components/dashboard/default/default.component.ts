import { Component, OnInit } from '@angular/core';
import * as chartData from '../../../shared/data/dashboard/default' ;
import {KpiService} from "../../../shared/services/api/kpi.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {

  projectList : any[]

  // Charts


  constructor(
      private router: Router,
      private kpiService : KpiService) {
  }

  ngOnInit() {

    this.kpiService.getAllProject().subscribe((response: any) => {
      this.projectList = response?.result;
    }, (error: any) => {
    });
  }

  navigateTo(key){
    this.router.navigate(['dashboard/search/'+key ])
  }
}
