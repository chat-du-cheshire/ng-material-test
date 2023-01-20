import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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
    private readonly employeeControl = this.controls.employee;
    private readonly timingsControl = this.controls.timings;

    constructor(data: IBulkEditData) {
        super({
            employee: new EmployeeEditForm(data.employee),
            timings: new FormArray(
                data.timings.map(timing => new TimingEditForm(timing)),
            ),
        });
    }

    getChangedValues(): Partial<IBulkEditData> | null {
        const employeeDirty = this.employeeControl.dirty;
        const timingDirty = this.timingsControl.dirty;

        if (!employeeDirty && !timingDirty) {
            return null;
        }

        const employeeValue = employeeDirty ? {employee: this.employeeControl.value} : {};
        const timingsValue = timingDirty
            ? {
                  timings: this.timingsControl.controls
                      .filter(control => control.dirty)
                      .map(control => {
                          const {id, clockIn, clockOut} = control.value;

                          return {
                              id,
                              clockIn: clockIn?.toISOString(),
                              clockOut: clockOut?.toISOString(),
                          };
                      }),
              }
            : {};

        return Object.assign(employeeValue, timingsValue) as Partial<IBulkEditData>;
    }
}

export class EmployeeEditForm extends FormGroup<TypedGroup<Omit<IEmployeeDto, 'email'>>> {
    constructor(employee: IEmployeeDto) {
        super({
            id: new FormControl(employee.id),
            name: new FormControl(employee.name, {validators: [Validators.required]}),
            hourlyRate: new FormControl(employee.hourlyRate, {
                validators: Validators.min(1),
            }),
            hourlyRateOvertime: new FormControl(employee.hourlyRateOvertime, {
                validators: Validators.min(1),
            }),
        });
    }
}

type TTimingFormValue = Omit<ITimingDto, 'employeeId' | 'clockIn' | 'clockOut'> & {
    clockIn: Date;
    clockOut: Date;
};

export class TimingEditForm extends FormGroup<TypedGroup<TTimingFormValue>> {
    constructor(timing: ITimingDto) {
        super({
            id: new FormControl(timing.id),
            clockIn: new FormControl(new Date(timing.clockIn)),
            clockOut: new FormControl(new Date(timing.clockOut)),
        });
    }
}
