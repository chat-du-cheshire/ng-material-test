import {Injectable} from '@angular/core';
import {StateService} from './state.service';
import {EmployeesApi} from '../api/employees.api';
import {TimingsApi} from '../api/timings.api';
import {forkJoin, map, startWith, switchMap, take} from 'rxjs';
import {EmployeeMeta} from '../modules/dashboard/models/employee-meta';
import {MatDialog} from '@angular/material/dialog';
import {BulkEditDialogComponent} from '../modules/bulk-edit/components/bulk-edit-dialog/bulk-edit-dialog.component';
import {Storage} from '../classes/storage';
import {IBulkEditData} from '../modules/bulk-edit/types/types';

@Injectable({providedIn: 'root'})
export class AppService {
    private readonly storage$ = this.store.select(store => store.storage);
    readonly employees$ = this.storage$.pipe(
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
        this.storage$
            .pipe(
                take(1),
                map(storage => this.prepareData(storage, employeeIds)),
            )
            .subscribe(data => {
                this.matDialog.open(BulkEditDialogComponent, {data});
            });
    }

    private prepareData(storage: Storage, employeeIds: string[]): IBulkEditData[] {
        return employeeIds.map(id => ({
            employee: storage.getEmployee(id)!,
            timings: storage.getEmployeeTiming(id),
        }));
    }
}
