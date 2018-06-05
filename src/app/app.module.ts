import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormationService} from './services/formation.service';
import {SessionFormationService} from './services/session-formation.service';
import {ConfirmationService} from 'primeng/api';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FormationListComponent} from './formation-list/formation-list.component';
import {FooterComponent} from './footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {GrowlModule} from 'primeng/growl';
import {SpinnerModule} from 'primeng/spinner';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {SessionFormationListComponent} from './session-formation-list/session-formation-list.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';



const appRoutes: Routes = [
  {path: 'formations', component: FormationListComponent},
  {path: 'formations/view/:id', component: SessionFormationListComponent},
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    FormationListComponent,
    FourOhFourComponent,
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    SessionFormationListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    TableModule,
    ButtonModule,
    InputTextModule,
    GrowlModule,
    SpinnerModule,
    BrowserAnimationsModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule
  ],
  providers: [
    FormationService,
    SessionFormationService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
