import {Component, OnInit} from '@angular/core';
import {KpiService} from "../../../shared/services/api/kpi.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.scss'],
    providers: [DatePipe]

})
export class ReportingComponent implements OnInit {
    public listIssues = [];
    public projectList = [];
    ngSelect = "All";
    now: any;
    startOn : any;
    reportingFields: FormGroup;
    firstDayFields: any
    lastDayFields: any

    constructor(
        public datepipe: DatePipe,
        private kpiService: KpiService,
        private fb: FormBuilder,
    ) {
        var date = new Date();
        this.firstDayFields = new Date(date.getFullYear() - 1, 12, 1)
        this.lastDayFields = new Date(date.getFullYear(), 11, 31)
        this.now = this.datepipe.transform(this.firstDayFields, 'yyyy-MM-dd')

    }

    ngOnInit(): void {
        this.reportingFields = this.fb.group({
            projectkey: new FormControl(),
            status: new FormControl(),
            startDate: new FormControl(this.datepipe.transform(this.firstDayFields, 'yyyy-MM-dd')),
            endDate: new FormControl(this.datepipe.transform(this.lastDayFields, 'yyyy-MM-dd')),

        });
        this.kpiService.getAllProject().subscribe((response: any) => {
            this.projectList = response?.result;
        }, (error: any) => {
        });

        this.listDetailsIssuesType(this.reportingFields)

    }


    listDetailsIssuesType(reporitng) {
        this.kpiService.reportingData(reporitng.value).subscribe((response: any) => {
            this.listIssues = response?.result
        }, (error: any) => {
        });
    }

    listDetailsIssuesTypeSearch() {
        this.kpiService.reportingData(this.reportingFields.value).subscribe((response: any) => {
            this.listIssues = response?.result
        }, (error: any) => {
        });
    }


    reportingDataExcel() {
        this.kpiService.excelData(this.reportingFields.value).subscribe((response: any) => {
            this.downloadFile(response)
        })
    }

    downloadFile(data: any) {
        const blob = new Blob([data], {type: 'application/vnd.ms-excel'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    setEndDate(){
        this.startOn = this.datepipe.transform(this.now, 'yyyy-MM-dd');
    }
}
