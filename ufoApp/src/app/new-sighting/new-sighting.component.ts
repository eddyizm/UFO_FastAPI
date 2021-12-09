import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms";

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
    });

  selectedItem = '2';
  
  constructor() { }

  ngOnInit(): void {}

  onSubmit() { 
    console.log('submit');
    // this.getQueryData(this.newSightingForm.get("City").value,
    // this.newSightingForm.get("ZipCode").value,
    // this.newSightingForm.get("Report").value,
    // this.newSightingForm.get("ForeignCountry").value
    // );
    console.log(this.newSightingForm)
  }

  // private getQueryData(
  //   City: string,
  //   ZipCode: string,
  //   Report: string,
  //   ForeignCountry: string);

}
