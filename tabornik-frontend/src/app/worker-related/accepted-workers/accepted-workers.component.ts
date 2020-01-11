import {Component, OnInit} from '@angular/core';
import {Worker} from '../../model/worker';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../structure/confirm-dialog/confirm-dialog.component';
import {WorkerService} from '../../service/worker.service';
import {WorkersChangedService} from '../../service/workers-changed.service';
import {EditWorkerComponent} from '../edit-worker/edit-worker.component';

@Component({
    selector: 'app-accepted-workers',
    templateUrl: './accepted-workers.component.html',
    styleUrls: ['./accepted-workers.component.css']
})
export class AcceptedWorkersComponent implements OnInit {

    accepteds: Worker[];

    constructor(private workerService: WorkerService,
                private route: ActivatedRoute,
                public dialog: MatDialog,
                private workersChangedService: WorkersChangedService) {
    }

    ngOnInit() {
        this.workersChangedService.workersChange.subscribe(change => {
            if (change) {
                this.workersChangedService.toggleWorkersChanged();
                this.getWorkers();
            }
        });
        this.getWorkers();
    }

    getWorkers() {
        this.workerService.getWorkers(+this.getCampId()).subscribe(
            accepteds => {
                this.accepteds =
                    accepteds.map(accepted => {
                        const worker = accepted.worker;
                        worker.position = accepted.position;
                        return worker;
                    });
            }
        );
    }

    getCampId() {
        return this.route.parent.snapshot.paramMap.get('id');
    }

    remove(worker: Worker, event) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Opravdu chcete odebrat tohoto pracovníka?'});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.workerService.removeWorker(worker, +this.getCampId()).subscribe(
                    _ => this.accepteds = this.accepteds.filter(camp => camp.id !== worker.id)
                );
            }
        });
        event.stopPropagation();
    }

    edit(worker: Worker) {
        const dialogRef = this.dialog.open(EditWorkerComponent, {data: worker});
        dialogRef.afterClosed().subscribe(result => {
            worker.position = result;
            this.workerService.editWorker(worker, +this.getCampId()).subscribe();
        });
    }
}
