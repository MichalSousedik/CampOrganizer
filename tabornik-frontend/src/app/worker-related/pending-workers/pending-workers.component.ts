import { Component, OnInit } from '@angular/core';
import {Worker} from '../../model/worker';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../structure/confirm-dialog/confirm-dialog.component';
import {WorkerService} from '../../service/worker.service';
import {WorkersChangedService} from '../../service/workers-changed.service';

@Component({
  selector: 'app-pending-workers',
  templateUrl: './pending-workers.component.html',
  styleUrls: ['./pending-workers.component.css']
})
export class PendingWorkersComponent implements OnInit {

  pendings: Worker[] = [];

  constructor(private workerService: WorkerService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private workersChangedService: WorkersChangedService) { }

  ngOnInit() {
    this.workerService.getPendings(+this.getCampId()).subscribe(
        workers => {
          this.pendings =
              workers.map(pending => {
                const worker = pending.worker;
                worker.position = pending.position;
                return worker;
              });
        }
    );
  }

  addPending(worker: Worker) {
    this.workerService.addPendingToWorkers(worker, +this.getCampId()).subscribe(
        _ => {
          this.pendings = this.pendings.filter(camp => camp.id !== worker.id);
          this.workersChangedService.toggleWorkersChanged();
        }
    );
  }

  removePending(worker: Worker, event) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Opravdu chcete zamítnout tohoto žadatele?'});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workerService.removeWorker(worker, +this.getCampId()).subscribe(
            _ => this.pendings = this.pendings.filter(camp => camp.id !== worker.id)
        );
      }
    });
    event.stopPropagation();
  }

  getCampId() {
    return this.route.parent.snapshot.paramMap.get('id');
  }
}
