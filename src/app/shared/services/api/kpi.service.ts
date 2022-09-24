import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class KpiService {
    baseURL = environment.baseURL;

    constructor(private http: HttpClient) {
    }

    getAllProject() {
        return this.http.get(`${this.baseURL}/kpi/projects`);
    }

    getUssueTypeByProject(issueType: string, projectKey: string) {
        return this.http.get(`${this.baseURL}/kpi/issueType/${issueType}/project/${projectKey}`);
    }

    getUssueTypeFieldsByCreatedDate(search: any) {
        return this.http.post(`${this.baseURL}/kpi/fields/project`, search);

    }

    getUssueTypeStatusByCreatedDate(search: any) {
        return this.http.post(`${this.baseURL}/kpi/status/project`, search);

    }

    getListUssuesType(key: any) {
        return this.http.get(`${this.baseURL}/kpi/all/project/${key}`);
    }

    getListUssuesTypeByStatus(key: any, issueType: any) {
        return this.http.get(`${this.baseURL}/kpi/project/${key}/issueType/${issueType}/`);
    }

    reportingData(reporting: any) {
        return this.http.post(`${this.baseURL}/kpi/reproting/all`, reporting);
    }

    excelData(reporting: any) {
        return this.http.post(`${this.baseURL}/kpi/generated_excel_reporting`, reporting, {responseType: 'blob'});

    }

    collectData() {
        return this.http.get(`${this.baseURL}/data/collected`);

    }

    getAllProjects() {
        return this.http.get(`${this.baseURL}/data/projects`);

    }
}
