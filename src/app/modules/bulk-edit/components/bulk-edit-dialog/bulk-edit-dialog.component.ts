import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-bulk-edit-dialog',
    templateUrl: './bulk-edit-dialog.component.html',
    styleUrls: ['./bulk-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BulkEditDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: string[]) {}
}
