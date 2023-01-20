import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {EmployeeMeta} from '../../../../classes/employee-meta';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    @Input() items: EmployeeMeta[] = [];

    readonly displayedColumns = [
        'name',
        'email',
        'totalTime',
        'paidRegular',
        'paidOverTime',
    ];
    get totalEmployees() {
        return this.items.length;
    }

    get totalClockedInTime() {
        return this.items.reduce((res, item) => res + item.totalTime, 0);
    }

    get totalPaidRegular() {
        return this.items.reduce((res, item) => res + item.paidRegular, 0);
    }

    get totalPaidOvertime() {
        return this.items.reduce((res, item) => res + item.paidOverTime, 0);
    }
}
