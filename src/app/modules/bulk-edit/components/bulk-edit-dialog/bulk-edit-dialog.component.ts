import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IBulkEditData} from '../../types/types';
import {BulkEditForm} from '../../classes/bulk-edit-form';

@Component({
    selector: 'app-bulk-edit-dialog',
    templateUrl: './bulk-edit-dialog.component.html',
    styleUrls: ['./bulk-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkEditDialogComponent {
    form = new BulkEditForm(this.data);
    constructor(@Inject(MAT_DIALOG_DATA) public data: IBulkEditData[]) {}
}
