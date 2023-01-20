import {Injectable} from '@angular/core';
import {StateService} from './state.service';
import {EmployeesApi} from '../api/employees.api';
import {TimingsApi} from '../api/timings.api';
import {forkJoin, map, startWith} from 'rxjs';
import {EmployeeMeta} from '../modules/dashboard/models/employee-meta';
import {MatDialog} from '@angular/material/dialog';
import {BulkEditDialogComponent} from '../modules/bulk-edit/components/bulk-edit-dialog/bulk-edit-dialog.component';

@Injectable({providedIn: 'root'})
export class AppService {
    readonly employees$ = this.store
        .select(store => store.storage)
        .pipe(
            map(storage => {
                return storage
                    .getAllEmployees()
                    .map(
                        employee =>
                            new EmployeeMeta(
                                employee,
                                storage.getEmployeeTiming(employee.id),
                            ),
                    );
            }),
            startWith([]),
        );

    constructor(
        private readonly employeesApi: EmployeesApi,
        private readonly timingsApi: TimingsApi,
        private readonly store: StateService,
        private readonly matDialog: MatDialog,
    ) {}

    loadData() {
        this.store.load();
        forkJoin([this.employeesApi.get(), this.timingsApi.get()]).subscribe(
            ([employees, timings]) => this.store.init({employees, timings}),
        );
    }

    bulkEdit(employeeIds: string[]) {
        this.matDialog.open(BulkEditDialogComponent, {data: employeeIds});
    }
}
