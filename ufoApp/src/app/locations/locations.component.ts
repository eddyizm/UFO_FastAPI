import { Component, OnInit } from '@angular/core';
import { ufo_locations } from '../models/locations';
import { UfoapiService } from '../services/ufoapi.service';
import { NbUserComponent } from '@nebular/theme';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  public locations: ufo_locations[];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(private ufoService: UfoapiService) { }

  ngOnInit(): void {
    this.loadNext();
  }

  loadNext() {
    if (this.loading) { return }

    //this.loading = true;
    this.placeholders = new Array(this.pageSize);
    //this.ufoService.getLocations(this.pageToLoadNext, this.pageSize)
    this.ufoService.getLocations()
      .subscribe(result => {
        //this.placeholders = [];
        //this.locations.push(...result);
        this.locations = result;
        //this.loading = false;
        console.log(this.locations)
        //this.pageToLoadNext++;
      });
  }

}
