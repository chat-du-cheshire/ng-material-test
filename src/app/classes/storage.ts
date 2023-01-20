import {IEmployeeDto, ITimingDto} from '../types/dto';

export class Storage {
    private readonly employees = new Map<IEmployeeDto['id'], IEmployeeDto>();
    private readonly timings = new Map<ITimingDto['id'], ITimingDto>();
    private readonly employeeTimings = new Map<
        IEmployeeDto['id'],
        Set<ITimingDto['id']>
    >();
    constructor(config: IStorageInit) {
        config.employees.forEach(employee => this.employees.set(employee.id, employee));
        config.timings.forEach(timing => {
            this.timings.set(timing.id, timing);

            if (!this.employeeTimings.has(timing.employeeId)) {
                this.employeeTimings.set(timing.employeeId, new Set());
            }
            this.employeeTimings.get(timing.employeeId)!.add(timing.id);
        });
    }

    static create() {
        return new Storage({employees: [], timings: []});
    }

    getAllEmployees() {
        return Array.from(this.employees.values());
    }

    getEmployee(id: IEmployeeDto['id']) {
        return this.employees.get(id) ?? null;
    }

    getTiming(id: ITimingDto['id']) {
        return this.timings.get(id) ?? null;
    }

    getEmployeeTiming(id: IEmployeeDto['id']) {
        return Array.from(this.employeeTimings.get(id)?.values() ?? []).map(
            id => this.getTiming(id)!,
        );
    }
}

export interface IStorageInit {
    employees: IEmployeeDto[];
    timings: ITimingDto[];
}
