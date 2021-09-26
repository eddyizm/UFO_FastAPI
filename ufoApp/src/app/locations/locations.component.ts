import { Component, OnInit } from '@angular/core';
import { ufo_locations } from '../models/locations';
import { States } from '../models/states';
import { UfoapiService } from '../services/ufoapi.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  public locations: ufo_locations[];
  states = new States()
  loading = false;

  constructor(private ufoService: UfoapiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.ufoService.getLocations()
      .subscribe(result => {
        this.locations = result;
        for (var index in this.locations){
          this.locations[index].fullstate = this.states.stateHash[this.locations[index].state];
      }
      this.loading = false;
      });
      
  }

}
