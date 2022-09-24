import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from './default/default.component';
import {ProjectkpiComponent} from './kpi-project/projectkpi.component';
import {ReportingComponent} from "./reporting/reporting.component";


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'default',
                component: DefaultComponent
            },
            {
                path: 'search/:key',
                component: ProjectkpiComponent
            },
            {
                path: 'reporting',
                component: ReportingComponent
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
