import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WorkersChangedService {

    workersChanged: boolean;

  workersChange: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.workersChange.subscribe((value) => {
            this.workersChanged = value;
        });
    }

    toggleWorkersChanged() {
        this.workersChange.next(!this.workersChanged);
    }

}


