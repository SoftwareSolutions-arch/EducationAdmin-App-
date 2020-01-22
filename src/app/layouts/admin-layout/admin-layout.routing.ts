import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { FeesComponent } from '../../fees/fees.component';
import { LeadsComponent } from '../../leads/leads.component';
import { CountryStateCityComponent } from '../../country-state-city/country-state-city.component';
import { SignInComponent } from '../../sign-in/sign-in.component';
import { BranchInfraCollegetypeComponent } from '../../branch-infra-collegetype/branch-infra-collegetype.component';
import { CompanyComponent } from '../../company/company.component';
import { CourseBranchComponent } from '../../course-branch/course-branch.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'signin', component: SignInComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'colleges', component: TableListComponent },
    { path: 'courses', component: TypographyComponent },
    { path: 'articles', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'fees', component: FeesComponent },
    { path: 'leads', component: LeadsComponent },
    { path: 'location', component: CountryStateCityComponent },
    { path: 'branchinfracollege', component: BranchInfraCollegetypeComponent },
    { path: 'company', component: CompanyComponent },
    { path: 'course-branch', component: CourseBranchComponent },

];
