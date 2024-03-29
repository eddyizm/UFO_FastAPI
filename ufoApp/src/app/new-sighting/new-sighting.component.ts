import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from "@angular/forms";
import { NewUFO } from '../models/new_ufo';
import { States } from '../models/states';
import { UfoapiService } from '../services/ufoapi.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-new-sighting',
  templateUrl: './new-sighting.component.html',
  styleUrls: ['./new-sighting.component.scss']
})
export class NewSightingComponent implements OnInit {

  newSightingForm = new FormGroup(
    {
      City: new FormControl("", Validators.required),
      ZipCode: new FormControl("", [Validators.required, Validators.minLength(5)]),
      Report: new FormControl("", Validators.required),
      Country: new FormControl("", Validators.required),
      State: new FormControl("", Validators.required),
      Date: new FormControl("", Validators.required)
    });

  selectedItem = '2';
  statesList = [];
  loading: boolean = false;

  constructor(private ufoService: UfoapiService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.loadStates();
  }

  private loadStates() {
    let stList = new States();
    for (const st in stList.stateHash) {
      this.statesList.push(st);
    }
  }

  getFormValidationErrors() {
    Object.keys(this.newSightingForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.newSightingForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          this.showToast('warning', `${key} ${keyError}`)
        });
      }
    });
  }

  onSubmit() {
    this.loading = true;
     if (this.newSightingForm.invalid)
    {
      this.getFormValidationErrors();
      this.loading = false;
      return
    }
    let _formUFO: NewUFO =
    {
      city: this.newSightingForm.get("City").value,
      state: this.newSightingForm.get("State").value,
      zip: this.newSightingForm.get("ZipCode").value,
      country: this.newSightingForm.get("Country").value,
      report: this.newSightingForm.get("Report").value,
      date: this.newSightingForm.get("Date").value
    }
    this.ufoService.reportNewUfo(_formUFO).subscribe(
      result => {
        this.resetForm();
        if (result.status == 200) {
          this.showToast('success', result.body['msg']);
           }
        else {
          {
            this.showToast('danger', "There was an issue. Please try again later. :-(");
             }
        }
        this.loading = false;
      }
      )
  }

  public resetForm() {
    this.newSightingForm.reset();
    this.newSightingForm.markAsPristine();
    this.selectedItem = '2';
  }

  showToast(status: NbComponentStatus, msg: String) {
    this.toastrService.show(status, `${msg}`, { status });
  }
}
