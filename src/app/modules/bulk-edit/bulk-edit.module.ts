import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BulkEditDialogComponent} from './components/bulk-edit-dialog/bulk-edit-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {EditEmployeeComponent} from './components/edit-employee/edit-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {EditTimingsComponent} from './components/edit-timings/edit-timings.component';
import {MatTableModule} from '@angular/material/table';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
    declarations: [BulkEditDialogComponent, EditEmployeeComponent, EditTimingsComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTableModule,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        NgxMatDatetimePickerModule,
    ],
})
export class BulkEditModule {}
