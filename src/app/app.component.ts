import {Component} from '@angular/core';
import {EmployeesApi} from './api/employees.api';
import {TimingsApi} from './api/timings.api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ng-material-test';
    constructor(
        private readonly employeesApi: EmployeesApi,
        private readonly timingsApi: TimingsApi,
    ) {
        this.employeesApi.get().subscribe(res => console.log('employees', res));
        this.timingsApi.get().subscribe(res => console.log('timings', res));
    }
}
