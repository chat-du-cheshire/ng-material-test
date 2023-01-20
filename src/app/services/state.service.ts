import {Injectable} from '@angular/core';
import {IStorageInit, Storage} from '../classes/storage';
import {BehaviorSubject, distinctUntilChanged, map, shareReplay} from 'rxjs';
import {IEmployeeDto, ITimingDto} from '../types/dto';

interface IState {
    status: 'idle' | 'loading' | 'loaded';
    storage: Storage;
}
@Injectable({providedIn: 'root'})
export class StateService {
    private readonly store = new BehaviorSubject<IState>({
        status: 'idle',
        storage: Storage.create(),
    });

    private get state() {
        return this.store.getValue();
    }

    load() {
        this.store.next({...this.state, status: 'loading'});
    }

    init(config: IStorageInit) {
        this.updateState({storage: new Storage(config)});
    }

    select<R>(mapFn: (state: IState) => R) {
        return this.store.pipe(map(mapFn), distinctUntilChanged(), shareReplay(1));
    }

    update(data: {employees: IEmployeeDto[]; timings: ITimingDto[]}) {
        const newStorage = Storage.fromExisting(this.state.storage);

        data.employees.forEach(e => newStorage.updateEmployee(e));
        data.timings.forEach(t => newStorage.updateTiming(t));

        this.updateState({storage: newStorage});
    }
    private updateState(value: Partial<IState>) {
        this.store.next({...this.state, ...value});
    }
}
