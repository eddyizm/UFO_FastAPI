import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbCardModule, 
  NbButtonModule, NbIconModule, NbMenuModule, NbSearchModule, NbSpinnerModule,
  NbListModule, NbTreeGridModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BaseComponent } from './base/base.component';
import { LocationsComponent } from './locations/locations.component';
import { DatesComponent } from './dates/dates.component';
import { ShapesComponent } from './shapes/shapes.component';
import { SiteComponent } from './site/site.component';
import { NewSightingComponent } from './new-sighting/new-sighting.component';
import { LocationListComponent } from './location-list/location-list.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LocationsComponent,
    DatesComponent,
    ShapesComponent,
    SiteComponent,
    NewSightingComponent,
    LocationListComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule, 
    NbSearchModule,
    NbSpinnerModule,
    NbListModule,
    NbTreeGridModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    RouterModule.forRoot([
      { path: 'home', component: BaseComponent, pathMatch: 'full' },
      { path: 'locations', component: LocationsComponent },
      { path: 'locations/:state', component: LocationListComponent },
      { path: 'summary', component: SummaryComponent },
      { path: 'dates', component: DatesComponent },
      { path: 'shape', component: ShapesComponent },
      { path: 'report', component: NewSightingComponent },
      { path: 'site', component: SiteComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

