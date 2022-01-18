import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbCardModule, 
  NbButtonModule, NbIconModule, NbMenuModule, NbSearchModule, NbSpinnerModule,
  NbListModule, NbSpinnerComponent, NbAccordionModule, NbInputModule,
  NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BaseComponent } from './base/base.component';
import { LocationsComponent } from './locations/locations.component';
import { DatesComponent } from './dates/dates.component';
import { ShapesComponent } from './shapes/shapes.component';
import { SiteComponent } from './site/site.component';
import { NewSightingComponent } from './new-sighting/new-sighting.component';
import { SummaryComponent } from './summary/summary.component';
import { LinkviewComponent } from './linkview/linkview.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LocationsComponent,
    DatesComponent,
    ShapesComponent,
    SiteComponent,
    NewSightingComponent,
    SummaryComponent,
    LinkviewComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule, 
    NbSearchModule,
    NbSpinnerModule,
    NbListModule,
    Ng2SmartTableModule,
    NbAccordionModule,
    NbInputModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: BaseComponent, pathMatch: 'full' },
      { path: 'home', component: BaseComponent, pathMatch: 'full' },
      { path: 'locations', component: LocationsComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'dates', component: DatesComponent },
      { path: 'shape', component: ShapesComponent },
      { path: 'report', component: NewSightingComponent },
      { path: 'site', component: SiteComponent },
    ])
  ],
  providers: [ NbSpinnerComponent ],
  bootstrap: [AppComponent]
})

export class AppModule { }