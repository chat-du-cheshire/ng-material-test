import {IEmployeeDto, ITimingDto} from '../types/dto';
import {getSecondsFromDate} from '../utils/helpers';
import {DAILY_SHIFT} from '../utils/constants';

export class EmployeeMeta {
    readonly employeeId;
    readonly name;
    readonly email;
    readonly inTime: number;
    readonly totalTime: number;
    readonly paidInTime: number;
    readonly paidOverTime: number;
    private readonly dailyHours = new Map<string, number>();

    constructor(employee: IEmployeeDto, timings: ITimingDto[]) {
        this.employeeId = employee.id;
        this.name = employee.name;
        this.email = employee.email;

        this.fillDailyHours(timings[0]);
        timings.forEach(timing => this.fillDailyHours(timing));
        this.inTime = this.getInTime();
        this.totalTime = this.getTotalTime();
        this.paidInTime = this.inTime * employee.hourlyRate;
        this.paidOverTime = (this.totalTime - this.inTime) * employee.hourlyRateOvertime;
    }

    private getInTime(): number {
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
