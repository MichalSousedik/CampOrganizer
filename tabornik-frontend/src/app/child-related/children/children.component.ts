import {Component, OnInit} from '@angular/core';
import {Child} from '../../model/child';
import {ChildService} from '../../service/child.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';
import {EditChildComponent} from '../edit-child/edit-child.component';
import {ConfirmDialogComponent} from '../../structure/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-children',
    templateUrl: './children.component.html',
    styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit {

    children: Child[];

    constructor(private childService: ChildService,
                private route: ActivatedRoute,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.getChildren();
    }

    getChildren() {
        this.childService.getChildren(this.getCampId()).subscribe(
            children => this.children = children
        );
    }

    getCampId(): number {
        return +this.route.parent.snapshot.paramMap.get('id');
    }

    edit(child: Child) {
        const dialogRef = this.dialog.open(EditChildComponent, {data: child});
        dialogRef.afterClosed().subscribe(result => {
            child.name = result.name;
            child.age = +result.age;
            child.parent = result.parent;
            child.contact = result.contact;
            this.childService.edit(child).subscribe();
        });
    }

    remove(id: number, event) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Opravdu chcete odebrat toto dítě?'});
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.childService.remove(id).subscribe(
                    _ => this.getChildren()
                );
            }
        });
        event.stopPropagation();
    }
}
