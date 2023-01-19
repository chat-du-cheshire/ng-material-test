import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StateService} from './services/state.service';
import {AppService} from './services/app.service';
import {map} from 'rxjs';
import {EmployeeMeta} from './classes/employee-meta';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
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
        );
    constructor(private readonly store: StateService, private readonly app: AppService) {
        this.app.loadData();
    }
}
