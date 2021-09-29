import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-linkview',
  templateUrl: './linkview.component.html',
  styleUrls: ['./linkview.component.scss']
})
export class LinkviewComponent implements  ViewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  
  @Output() save: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
    }

}
