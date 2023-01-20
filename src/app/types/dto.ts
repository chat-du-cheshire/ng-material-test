export interface IEmployeeDto {
    id: string;
    name: string;
    email: string;
    hourlyRate: number;
    hourlyRateOvertime: number;
}
export interface ITimingDto {
    employeeId: IEmployeeDto['id'];
    id: string;
    clockIn: string;
    clockOut: string;
}
