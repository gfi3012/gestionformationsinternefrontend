import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FormationListComponent} from './formation-list/formation-list.component';
import {NewFormationComponent} from './new-formation/new-formation.component';
import {FormationService} from './services/formation.service';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';


const appRoutes: Routes = [
  {path: 'formations', component: FormationListComponent},
  {path: 'new-formation', component: NewFormationComponent},
  {path: '', component: FormationListComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    FormationListComponent,
    NewFormationComponent,
    FourOhFourComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FormationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
