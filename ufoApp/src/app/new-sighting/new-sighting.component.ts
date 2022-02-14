import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from "@angular/forms";
import { NewUFO } from '../models/new_ufo';
import { States } from '../models/states';
import { UfoapiService } from '../services/ufoapi.service';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'app-new-sighting',
  //changeDetection: ChangeDetectionStrategy.OnPush,
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

  onSubmit() {
    this.loading = true;
    let _formUFO: NewUFO =
    {
      city: this.newSightingForm.get("City").value,
      state: this.newSightingForm.get("State").value,
      zip: this.newSightingForm.get("ZipCode").value,
      country: this.newSightingForm.get("ForeignCountry").value,
      report: this.newSightingForm.get("Report").value,
      date: this.newSightingForm.get("TimeStamp").value
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
  }

  showToast(status: NbComponentStatus, msg: String) {
    this.toastrService.show(status, `${msg}`, { status });
    
  }
}
