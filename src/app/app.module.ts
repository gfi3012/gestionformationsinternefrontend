import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormationService} from './services/formation.service';
import {FourOhFourComponent} from './four-oh-four/four-oh-four.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FormationListComponent} from './formation-list/formation-list.component';
import {SingleFormationComponent} from './formation-list/single-formation/single-formation.component';
import {FormationFormComponent} from './formation-list/formation-form/formation-form.component';
import {FooterComponent} from './footer/footer.component';


const appRoutes: Routes = [
  {path: 'formations', component: FormationListComponent},
  {path: 'formations/view/:id', component: SingleFormationComponent},
  {path: 'formations/new', component: FormationFormComponent},
  {path: 'formations/edit/:id', component: FormationFormComponent},
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
    FormationFormComponent,
    FourOhFourComponent,
    SingleFormationComponent,
    AboutComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [FormationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
