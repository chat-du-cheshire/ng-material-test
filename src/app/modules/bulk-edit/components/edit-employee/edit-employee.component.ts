import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {EditForm} from '../../classes/bulk-edit-form';

@Component({
    selector: 'app-edit-employee',
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEmployeeComponent {
    @Input() form!: EditForm;
}
