import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { Routes, RouterModule, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Material design

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatToolbarModule,
          MatButtonModule,
          MatSidenavModule,
          MatListModule,
          MatInputModule,
          MatPaginatorModule,
          MatProgressSpinnerModule,
          MatSortModule,
          MatTableModule,
          MatIconModule,
          } from '@angular/material';

import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';

// ----------------------prime ng

import { DataScrollerModule } from 'primeng/primeng';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';

import { LayoutModule } from '@angular/cdk/layout';


import { NiceParagraphDirective } from './nice-paragraph.directive';

import { MajsrvService } from './service/majsrv.service'
import { DataService } from './sharedServices'

import { FlexLayoutModule } from "@angular/flex-layout";

import { PersonneComponent } from './appComponents/personne/personne/personne.component';
import { PersonneDetailComponent } from './appComponents/personne/personne-detail/personne-detail.component';
import { PersonneCreateComponent } from './appComponents/personne/personne-create/personne-create.component';
import { PersonneEditComponent } from './appComponents/personne/personne-edit/personne-edit.component';

import { EnjeuComponent } from './appComponents/enjeu/enjeu/enjeu.component';
import { EnjeuDetailComponent } from './appComponents/enjeu/enjeu-detail/enjeu-detail.component';
import { EnjeuCreateComponent } from './appComponents/enjeu/enjeu-create/enjeu-create.component';
import { EnjeuEditComponent } from './appComponents/enjeu/enjeu-edit/enjeu-edit.component';

import { OpinionComponent } from './appComponents/opinion/opinion/opinion.component';
import { OpinionDetailComponent } from './appComponents/opinion/opinion-detail/opinion-detail.component';
import { OpinionCreateComponent } from './appComponents/opinion/opinion-create/opinion-create.component';
import { OpinionEditComponent } from './appComponents/opinion/opinion-edit/opinion-edit.component';

import { EnjeuxPersonnesComponent } from './enjeux-personnes/enjeux-personnes.component';
import { BadgeComponent } from './badge/badge.component';
import { ChooseCategorieComponent } from './appComponents/enjeu/choose-categorie/choose-categorie.component';
import { OpinionModalComponent } from './appComponents/opinion/opinion-modal/opinion-modal.component';
import { EnjeuxTabComponent } from './appComponents/enjeu/enjeux-tab/enjeux-tab.component';
import { OpinionsTabComponent } from './appComponents/opinion/opinions-tab/opinions-tab.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { DialogAddOpinion } from './appComponents/opinion/opinion-modal/opinion-modal.component';
import { AntonioCardsComponent } from './test/antonio-cards/antonio-cards.component';



const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'AntonioCards', component: AntonioCardsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'testOutil', component: EnjeuxPersonnesComponent },
  { path: 'test', component: ChooseCategorieComponent },
  {
    path: 'enjeuxTab',
    component: EnjeuxTabComponent,
    data: { title: "Tableau d'enjeu" }
  },
  {
    path: 'personnes',
    component: PersonneComponent,
    data: { title: 'Personne List' }
  },
  {
    path: 'personne-details/:id',
    component: PersonneDetailComponent,
    data: { title: 'Personne Details' }
  },
  {
    path: 'personne-create',
    component: PersonneCreateComponent,
    data: { title: 'Create Personne' }
  },
  {
    path: 'personne-edit/:id',
    component: PersonneEditComponent,
    data: { title: 'Edit Personne' }
  },
  {
    path: 'enjeux',
    component: EnjeuComponent,
    data: { title: 'Enjeux List' }
  },
  {
    path: 'enjeu-details/:id',
    component: EnjeuDetailComponent,
    data: { title: 'Enjeux Details' }
  },
  {
    path: 'enjeu-create',
    component: EnjeuCreateComponent,
    data: { title: 'Create Enjeux' }
  },
  {
    path: 'enjeu-edit/:id',
    component: EnjeuEditComponent,
    data: { title: 'Edit Enjeu' }
  },
  {
    path: 'opinions',
    component: OpinionComponent,
    data: { enjeuId: "",
            opinions:[] }
  },
  {
    path: 'opinion-details/:id/:enjeuId',
    component: OpinionDetailComponent,
    data: { title: 'Opinions Details',
            enjeuxId: [],
            id: [] }
  },
  {
    path: 'opinion-create',
    component: OpinionCreateComponent,
    data: { title: 'Create Opinions', enjeu: 'test' }
  },
  {
    path: 'opinion-edit/:id/:enjeuId',
    component: OpinionEditComponent,
    data: { title: 'Edit Opinions' }
  },
  {
    path: '',
    redirectTo:'home',
    pathMatch:'prefix'
  }
];

@NgModule({
  declarations: [
    DialogAddOpinion,
    AppComponent,
    PersonneComponent,
    PersonneDetailComponent,
    PersonneCreateComponent,
    PersonneEditComponent,
    EnjeuComponent,
    EnjeuDetailComponent,
    EnjeuCreateComponent,
    EnjeuEditComponent,
    OpinionComponent,
    OpinionDetailComponent,
    OpinionCreateComponent,
    OpinionEditComponent,
    NavBarComponent,
    NiceParagraphDirective,
    
    EnjeuxPersonnesComponent,
    
    BadgeComponent,
    
    ChooseCategorieComponent,
    
    OpinionModalComponent,
    
    EnjeuxTabComponent,
    
    OpinionsTabComponent,
    
    AboutComponent,
    
    HomeComponent,
    
    AntonioCardsComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    CardModule,
    TableModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    DialogModule,
    DataViewModule,
    DataScrollerModule,
    LayoutModule,
    SidebarModule,
    AccordionModule
  ],
  providers: [MajsrvService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
