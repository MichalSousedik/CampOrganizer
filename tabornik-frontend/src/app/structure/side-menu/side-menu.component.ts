import {Component, Input, OnInit} from '@angular/core';
import {CampService} from '../../service/camp.service';
import {ActivatedRoute} from '@angular/router';
import {CampDetail} from '../../model/camp-detail';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  camp: CampDetail;
  loaded = false;

  constructor(private campService: CampService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCamp();
  }

  private getCamp() {
    const id = this.route.snapshot.paramMap.get('id');
    this.campService.getCamp(+id).subscribe(camp => {
      this.loaded = true;
      this.camp = camp;
    });
  }


}
