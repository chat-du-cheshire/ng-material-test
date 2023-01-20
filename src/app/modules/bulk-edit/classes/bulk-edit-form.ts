import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {IBulkEditData, TypedGroup} from '../types/types';
import {IEmployeeDto, ITimingDto} from '../../../types/dto';

export class BulkEditForm extends FormGroup<{items: FormArray<EditForm>}> {
    constructor(data: IBulkEditData[]) {
        super({
            items: new FormArray(data.map(item => new EditForm(item))),
        });
    }
}

export class EditForm extends FormGroup<{
    employee: EmployeeEditForm;
    timings: FormArray<TimingEditForm>;
}> {
    constructor(data: IBulkEditData) {
        super({
            employee: new EmployeeEditForm(data.employee),
            timings: new FormArray(
                data.timings.map(timing => new TimingEditForm(timing)),
            ),
        });
    }
}

export class EmployeeEditForm extends FormGroup<TypedGroup<Omit<IEmployeeDto, 'email'>>> {
    constructor(employee: IEmployeeDto) {
        super({
            id: new FormControl(employee.id),
            name: new FormControl(employee.name),
            hourlyRate: new FormControl(employee.hourlyRate),
            hourlyRateOvertime: new FormControl(employee.hourlyRateOvertime),
        });
    }
}

export class TimingEditForm extends FormGroup<
    TypedGroup<
        Omit<ITimingDto, 'employeeId' | 'clockIn' | 'clockOut'> & {
            clockIn: Date;
            clockOut: Date;
        }
    >
> {
    constructor(timing: ITimingDto) {
        super({
            id: new FormControl(timing.id),
            clockIn: new FormControl(new Date(timing.clockIn)),
            clockOut: new FormControl(new Date(timing.clockOut)),
        });
    }
}
