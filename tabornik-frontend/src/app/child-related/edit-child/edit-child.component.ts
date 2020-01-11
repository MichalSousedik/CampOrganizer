import {Component, Inject, OnInit} from '@angular/core';
import {Child} from '../../model/child';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.css']
})
export class EditChildComponent implements OnInit {

  child: Child;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Child) { }

  ngOnInit() {
    this.child = Object.assign({}, this.data);
  }

}
