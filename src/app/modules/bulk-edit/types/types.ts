import {IEmployeeDto, ITimingDto} from '../../../types/dto';
import {AbstractControl, FormArray} from '@angular/forms';

export interface IBulkEditData {
    employee: IEmployeeDto;
    timings: ITimingDto[];
}

export type TypedGroup<T extends object> = {
    [K in keyof T]: T[K] extends unknown[] ? FormArray : AbstractControl<T[K] | null>;
};
