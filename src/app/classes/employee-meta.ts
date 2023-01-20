import {IEmployeeDto, ITimingDto} from '../types/dto';
import {getSecondsFromDate} from '../utils/helpers';
import {DAILY_SHIFT, HOUR_IN_SEC} from '../utils/constants';

export class EmployeeMeta {
    readonly employeeId;
    readonly name;
    readonly email;
    readonly regularTime: number;
    readonly totalTime: number;
    readonly paidRegular: number;
    readonly paidOverTime: number;
    private readonly dailyHours = new Map<string, number>();

    constructor(employee: IEmployeeDto, timings: ITimingDto[]) {
        this.employeeId = employee.id;
        this.name = employee.name;
        this.email = employee.email;

        timings.forEach(timing => this.fillDailyHours(timing));
        this.regularTime = this.getRegularTime();
        this.totalTime = this.getTotalTime();
        this.paidRegular = (this.regularTime / HOUR_IN_SEC) * employee.hourlyRate;
        this.paidOverTime =
            ((this.totalTime - this.regularTime) / HOUR_IN_SEC) *
            employee.hourlyRateOvertime;
    }

    private getRegularTime(): number {
        return Array.from(this.dailyHours.values()).reduce(
            (res, t) => res + Math.min(t, DAILY_SHIFT),
            0,
        );
    }

    private getTotalTime(): number {
        return Array.from(this.dailyHours.values()).reduce((res, t) => res + t, 0);
    }

    private fillDailyHours(timing: ITimingDto) {
        const {clockIn, clockOut} = timing;
        const [dayIn] = clockIn.split('T');
        const [dayOut] = clockOut.split('T');
        const isSameDay = dayIn === dayOut;

        if (isSameDay) {
            this.fillDay(dayIn, clockIn, clockOut);
        } else {
            this.fillDay(dayIn, clockIn, dayIn + 'T23:59:59.000');
            this.fillDay(dayOut, dayOut + 'T00:00:00.000Z', clockOut);
        }
    }

    private fillDay(day: string, clockIn: string, clockOut: string) {
        const dateInSec = getSecondsFromDate(new Date(clockIn));
        const dateOutSec = getSecondsFromDate(new Date(clockOut));
        const existingSec = this.dailyHours.get(day) ?? 0;

        this.dailyHours.set(day, existingSec + dateOutSec - dateInSec);
    }
}
