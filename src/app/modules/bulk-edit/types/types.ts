import {IEmployeeDto, ITimingDto} from '../../../types/dto';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

export interface IBulkEditData {
    employee: IEmployeeDto;
    timings: ITimingDto[];
}

export type TypedGroup<T extends object> = {
    [K in keyof T]: T[K] extends any[] ? FormArray : AbstractControl<T[K] | null>;
};
