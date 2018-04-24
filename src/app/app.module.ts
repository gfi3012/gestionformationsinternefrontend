import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {FormationService} from './services/formation.service';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import {FormationListComponent} from './formation-list/formation-list.component';
import {SingleFormationComponent} from './formation-list/single-formation/single-formation.component';
import {FormationFormComponent} from './formation-list/formation-form/formation-form.component';

const appRoutes: Routes = [
  {path: 'formations', component: FormationListComponent},
  {path: 'formations/view/:id', component: SingleFormationComponent},
  {path: 'formations/new', component: FormationFormComponent},
  {path: '', component: FormationListComponent},
  {path: 'about', component: AboutComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    FormationListComponent,
    FormationFormComponent,
    FourOhFourComponent,
    SingleFormationComponent,
    AboutComponent,
    HeaderComponent
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
