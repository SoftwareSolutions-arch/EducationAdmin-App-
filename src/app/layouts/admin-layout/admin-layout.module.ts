import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FeesComponent } from '../../fees/fees.component';
import { LeadsComponent } from '../../leads/leads.component';
import { CountryStateCityComponent,CreateCountry, CreateState, CreateCity } from '../../country-state-city/country-state-city.component';
import { SignInComponent  } from '../../sign-in/sign-in.component';
import { BranchInfraCollegetypeComponent  } from '../../branch-infra-collegetype/branch-infra-collegetype.component';
import { CompanyComponent  } from '../../company/company.component';
import { CourseBranchComponent  } from '../../course-branch/course-branch.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatStepperModule,
  MatDividerModule,
  MatDialogModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxPaginationModule,
    AngularEditorModule,
    MatStepperModule,
    MatDividerModule,
    MatDialogModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    FeesComponent,
    LeadsComponent,
    CountryStateCityComponent,
    CreateCountry, 
    CreateState, 
    CreateCity, 
    SignInComponent,
    BranchInfraCollegetypeComponent,
    CompanyComponent,
    CourseBranchComponent
  ],
  providers:[
    CountryStateCityComponent,
    BranchInfraCollegetypeComponent,
    SignInComponent
  ],
  entryComponents: [CreateCountry, CreateState, CreateCity],
})

export class AdminLayoutModule {}
