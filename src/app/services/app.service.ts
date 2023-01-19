import {Injectable} from '@angular/core';
import {StateService} from './state.service';
import {EmployeesApi} from '../api/employees.api';
import {TimingsApi} from '../api/timings.api';
import {forkJoin} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppService {
    constructor(
        private readonly state: StateService,
        private readonly employeesApi: EmployeesApi,
        private readonly timingsApi: TimingsApi,
    ) {}

    loadData() {
        this.state.load();
        forkJoin([this.employeesApi.get(), this.timingsApi.get()]).subscribe(
            ([employees, timings]) => this.state.init({employees, timings}),
        );
    }
}
