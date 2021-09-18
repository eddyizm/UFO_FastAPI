import { Component, OnInit } from '@angular/core';
import { ufo_locations } from '../models/locations';
import { UfoapiService } from '../services/ufoapi.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  public locations: ufo_locations[];
  public stateHash : Record<string, string> = { 'AL':  'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DC': 'District Of Columbia',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming', 
  'AB': 'Alberta, Canada',
  'BC': 'British Columbia, Canada',
  'MB': 'Manitoba, Canada',
   'NB': 'NEW BRUNSWICK,CAN',
   'NF': 'NEWFOUNDLAND,CAN', 'NS': 'NOVA SCOTIA,CAN','NT': 'NORTHWEST TERRITORY','ON': 'ONTARIO,CAN',
   'PE': 'PRINCE EDW ISLAND', 'PQ': 'PROV OF QUE,CAN', 'PR': 'Puerto Rico', 'QC': 'QC',
   'SA': 'SASKATCHEWAN,CAN', 'SK': 'Saskatoon (Canada)', 'VI': 'VIRGIN ISLANDS',
   'YK': 'Yukon (Canada)'
  }

  constructor(private ufoService: UfoapiService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.ufoService.getLocations()
      .subscribe(result => {
        this.locations = result;
        for (var index in this.locations){
          this.locations[index].fullstate = this.stateHash[this.locations[index].state];
      }
      });
  }

}
