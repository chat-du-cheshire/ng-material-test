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

    static fromExisting(storage: Storage) {
        return new Storage({
            employees: storage.getAllEmployees(),
            timings: storage.getAllTimings(),
        });
    }

    getAllEmployees() {
        return Array.from(this.employees.values());
    }

    getEmployee(id: IEmployeeDto['id']) {
        return this.employees.get(id) ?? null;
    }

    updateEmployee(employee: Partial<IEmployeeDto>) {
        const current = this.employees.get(employee.id!)!;

        this.employees.set(employee.id!, {...current, ...employee});
    }

    updateTiming(timing: Partial<ITimingDto>) {
        const current = this.timings.get(timing.id!)!;

        this.timings.set(timing.id!, {...current, ...timing});
    }

    getAllTimings() {
        return Array.from(this.timings.values());
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
