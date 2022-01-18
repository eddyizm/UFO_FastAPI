import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NewUFO } from '../models/new_ufo';
import { States } from '../models/states';
import { UfoapiService } from '../services/ufoapi.service';

@Component({
  selector: 'app-new-sighting',
  templateUrl: './new-sighting.component.html',
  styleUrls: ['./new-sighting.component.scss']
})
export class NewSightingComponent implements OnInit {

  newSightingForm = new FormGroup(
    {
      City: new FormControl(""),
      ZipCode: new FormControl(""),
      Report: new FormControl(""),
      ForeignCountry: new FormControl(""),
      State: new FormControl(""),
      TimeStamp: new FormControl("")
    });

  selectedItem = '2';
  statesList = [];

  constructor(private ufoService: UfoapiService) { }

  ngOnInit(): void { 
    this.loadStates();
  }

  private loadStates(){
    let stList = new States();
    for (const st in stList.stateHash) {
      this.statesList.push(st);
    }
  }

  onSubmit() {
    console.log('submit');
    this.getQueryData(this.newSightingForm.get("City").value,
      this.newSightingForm.get("ZipCode").value,
      this.newSightingForm.get("Report").value,
      this.newSightingForm.get("ForeignCountry").value,
      this.newSightingForm.get("State").value,
      this.newSightingForm.get("TimeStamp").value
    );
  }

  private async getQueryData(
    City: string,
    ZipCode: string,
    Report: string,
    ForeignCountry: string,
    State: string,
    TimeStamp: string) 
    {
      let _formUFO: NewUFO = 
      { city: City, state: State, zip: ZipCode, country: ForeignCountry,
        report: Report, date: TimeStamp} 
      this.ufoService.reportNewUfo(_formUFO).subscribe(
        result => {
          console.log(result);
        }
      )
  }

}
