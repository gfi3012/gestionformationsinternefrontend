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
import {SingleFormationComponent} from './single-formation/single-formation.component';
import { AboutComponent } from './about/about.component';


const appRoutes: Routes = [
  {path: 'formations', component: FormationListComponent},
  {path: 'formations/:id', component: SingleFormationComponent},
  {path: 'new-formation', component: NewFormationComponent},
  {path: '', component: FormationListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    FormationListComponent,
    NewFormationComponent,
    FourOhFourComponent,
    SingleFormationComponent,
    AboutComponent
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
