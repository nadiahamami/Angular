import {Component, OnInit, ViewChild} from '@angular/core';
import * as chartData from '../../../shared/data/dashboard/ecommerce';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

import {KpiService} from "../../../shared/services/api/kpi.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {BaseChartDirective} from "ng2-charts";

@Component({
    selector: 'app-projectkpi',
    templateUrl: './projectkpi.component.html',
    styleUrls: ['./projectkpi.component.scss'],
    providers: [DatePipe]
})
export class ProjectkpiComponent implements OnInit {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    public todayTotalSale = chartData.todayTotalSale;
    public totalVisit = chartData.totalVisit;
    public profit = chartData.profit;
    public riskFactor = chartData.riskFactor;

    public lat_m1: number = 20.593683;
    public lng_m1: number = 78.962883;
    public zoom_m1: number = 4;
    public listIssues = [];

    searchFields: FormGroup;
    searchStatus: FormGroup;
    firstDayFields: any
    lastDayFields: any
    kpi: string
    public barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels = [];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartDatas = [];
    public data: any;
    public pieChartLabels = ['Sales', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
    public pieChartData = [1, 8, 2, 9];
    public pieChartType = 'pie';

    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(
        public datepipe: DatePipe,
        private fb: FormBuilder,
        private kpiService: KpiService,
        private route: ActivatedRoute) {
        var date = new Date();
        var month: number = date.getMonth()
        var day = date.getMonth() % 2 === 0 ? 31 : 30
        this.firstDayFields = new Date(date)
        this.lastDayFields = new Date(date.getFullYear(), date.getMonth(), day)

    }

    ngOnInit(): void {

        this.route.params.subscribe(
            (params) => {
                this.kpi = params.key
                this.searchFields = this.fb.group({
                    key: this.kpi,
                    startDate: new FormControl(this.datepipe.transform(this.firstDayFields, 'yyyy-MM-dd')),
                    endDate: new FormControl(this.datepipe.transform(this.lastDayFields, 'yyyy-MM-dd')),

                });
                this.searchStatus = this.fb.group({
                    key: this.kpi,
                    startDate: new FormControl(this.datepipe.transform(this.firstDayFields, 'yyyy-MM-dd')),
                    endDate: new FormControl(this.datepipe.transform(this.lastDayFields, 'yyyy-MM-dd')),

                });
                this.listDetailsIssuesType(this.kpi)
                this.kpiStatusType();
                this.kpiIssueType()
            }
        );
    }

    listDetailsIssuesType(key) {
        this.kpiService.getListUssuesType(key).subscribe((response: any) => {
            this.listIssues = response?.result
        }, (error: any) => {
        });
    }

    search() {
        this.kpiIssueType()
    }

    searchStatu() {
        this.kpiStatusType();
    }


    kpiStatusType() {
        // this.pieChartLabels = [];
        // this.pieChartData = []
        this.kpiService.getUssueTypeStatusByCreatedDate(this.searchStatus.value).subscribe((response: any) => {

            let data = response?.result;
            let pieLabel = []
            let pieData = []
            for (let res of Object.keys(data)) {
                pieLabel.push(res);
                pieData.push(data[res].length)
            }

            this.pieChartData = pieData
            this.pieChartLabels = pieLabel

        }, (error: any) => {
        });
    }

    kpiIssueType() {
        let abarChartLabels: any = []
        let dataCharet: any = []
        this.kpiService.getUssueTypeFieldsByCreatedDate(this.searchFields.value).subscribe((response: any) => {
            for (let res of response?.result) {
                abarChartLabels.push(this.month[res?.month - 1])
                for (let field of Object.keys(res?.fields)) {
                    let index = dataCharet.findIndex(f => f?.label === field);
                    if (index === -1) {
                        let datas = []
                        datas.push(res?.fields[field].length)
                        dataCharet.push({
                            data: datas, label: field
                        });
                    } else {
                        dataCharet[index].data.push(res?.fields[field].length)
                    }


                }

            }
            this.barChartDatas = dataCharet
            this.barChartLabels = abarChartLabels;
        }, (error: any) => {
        });
    }

    onChartClick = (event: any) => {
     this.kpiService.getListUssuesTypeByStatus(this.kpi, event.active[0]._model.label).subscribe((reponse : any )=>{
         this.listIssues = reponse?.result
     }, (error: any) => {
     });
    }

}
