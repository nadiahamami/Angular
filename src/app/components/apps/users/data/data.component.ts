import {Component, OnInit} from '@angular/core';
import {KpiService} from "../../../../shared/services/api/kpi.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

    constructor(
        private kipService: KpiService,
        private toasterService: ToastrService) {
    }

    ngOnInit(): void {
    }

    collectData() {

        this.kipService.collectData().subscribe(() => {
            this.toasterService.info('collec data in Jira-api  successfully',);
        })
    }
}
