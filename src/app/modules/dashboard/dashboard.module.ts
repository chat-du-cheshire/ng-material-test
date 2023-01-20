import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {SecToTimePipe} from './pipes/sec-to-time.pipe';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [DashboardComponent, SecToTimePipe],
    exports: [DashboardComponent],
    imports: [CommonModule, MatDatepickerModule, MatCardModule, MatTableModule],
})
export class DashboardModule {}
