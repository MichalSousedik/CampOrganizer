import {Component, OnInit} from '@angular/core';
import {CampService} from '../../service/camp.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Worker} from '../../model/worker';
import {MatDialog} from '@angular/material';
import {EditWorkerComponent} from '../edit-worker/edit-worker.component';
import {CampOverview} from '../../model/camp-overview';
import {WorkerService} from '../../service/worker.service';

@Component({
    selector: 'app-copy-workers',
    templateUrl: './copy-workers.component.html',
    styleUrls: ['./copy-workers.component.css']
})
export class CopyWorkersComponent implements OnInit {

    camps: CampOverview[];
    workers: Worker[] = [];
    campId: number;

    constructor(private campService: CampService,
                private workerService: WorkerService,
                private route: ActivatedRoute,
                private router: Router,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.campService.getCamps().subscribe(camps => {
            this.camps = camps.filter(camp => camp.id !== this.getCampId());
        });
    }

    getCampId(): number {
        return +this.route.parent.snapshot.paramMap.get('id');
    }

    edit(worker: Worker) {
        const dialogRef = this.dialog.open(EditWorkerComponent, {data: worker});
        dialogRef.afterClosed().subscribe(result => {
            worker.position = result;
        });
    }

    remove(id: number) {
        const index = this.workers.findIndex(worker => worker.id === id);
        this.workers.splice(index, 1);
    }

    campChanged() {
        this.workerService.getWorkers(+this.campId).subscribe(
            workers => this.workers = Object.assign([],
                workers.map(accepted => {
                    const worker = accepted.worker;
                    worker.position = accepted.position;
                    return worker;
                }))
        );
    }

    copy() {
        this.workers.forEach(worker => {
            this.workerService.addWorker(worker, this.getCampId()).subscribe(
                _ => this.router.navigate(['../workers'], {relativeTo: this.route})
            );
        });

    }
}
