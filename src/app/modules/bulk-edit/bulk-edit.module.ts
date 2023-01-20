import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BulkEditDialogComponent} from './components/bulk-edit-dialog/bulk-edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditEmployeeComponent} from './components/edit-employee/edit-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [BulkEditDialogComponent, EditEmployeeComponent],
    imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatInputModule],
})
export class BulkEditModule {}
