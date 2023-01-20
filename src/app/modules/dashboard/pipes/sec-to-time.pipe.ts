import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'secToTime',
})
export class SecToTimePipe implements PipeTransform {
    transform(timeInSeconds: number): unknown {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(
            seconds,
        )}`;
    }
}

function addLeadingZero(n: number): string {
    return n >= 10 ? `${n}` : `0${n}`;
}
