import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {EmployeeMeta} from '../../../../classes/employee-meta';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
    @Input() items: EmployeeMeta[] = [];
    @Output() bulkEdit = new EventEmitter<string[]>();
    readonly displayedColumns = [
        'select',
        'name',
        'email',
        'totalTime',
        'paidRegular',
        'paidOverTime',
    ];
    readonly selection = new SelectionModel<string>(true, []);
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.items.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.items.map(({employeeId}) => employeeId));
    }
}
