import {Component, Input} from '@angular/core';
import {EditForm} from '../../classes/bulk-edit-form';

@Component({
    selector: 'app-edit-timings',
    templateUrl: './edit-timings.component.html',
    styleUrls: ['./edit-timings.component.scss'],
})
export class EditTimingsComponent {
    @Input() form!: EditForm;
    readonly displayedColumns = ['clockIn', 'clockOut'];
}
