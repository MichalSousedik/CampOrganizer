import {Component, OnInit} from '@angular/core';
import {CampService} from '../../service/camp.service';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../structure/confirm-dialog/confirm-dialog.component';
import {CampOverview} from '../../model/camp-overview';

@Component({
    selector: 'app-camp-list',
    templateUrl: './camp-list.component.html',
    styleUrls: ['./camp-list.component.css']
})
export class CampListComponent implements OnInit {

    camps: CampOverview[];

    constructor(private campService: CampService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.campService.getCamps().subscribe(camps => this.camps = camps);
    }

    removeCamp(id: number, event) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Opravdu chcete smazat tento tábor?'});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.campService.removeCamp(id).subscribe(
                    _ => this.camps = this.camps.filter(camp => camp.id !== id)
                );
            }
        });
        event.stopPropagation();
    }
}
