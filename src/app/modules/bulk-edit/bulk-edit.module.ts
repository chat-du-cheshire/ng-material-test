import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BulkEditDialogComponent} from './components/bulk-edit-dialog/bulk-edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [BulkEditDialogComponent],
    imports: [CommonModule, MatDialogModule],
})
export class BulkEditModule {}
