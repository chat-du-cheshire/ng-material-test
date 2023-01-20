import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import { SecToTimePipe } from './pipes/sec-to-time.pipe';

@NgModule({
    declarations: [DashboardComponent, SecToTimePipe],
    exports: [DashboardComponent],
    imports: [CommonModule, MatDatepickerModule, MatCardModule],
})
export class DashboardModule {}
