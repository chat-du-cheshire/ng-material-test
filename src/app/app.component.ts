import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AppService} from './services/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    readonly employees$ = this.app.employees$;
    constructor(private readonly app: AppService) {
        this.app.loadData();
    }

    bulkEdit(employeeIds: string[]) {
        this.app.bulkEdit(employeeIds);
    }
}
