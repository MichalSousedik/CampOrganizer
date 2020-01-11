import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DetailComponent} from './camp-related/detail/detail.component';
import {WorkersComponent} from './worker-related/workers/workers.component';
import {ChildrenComponent} from './child-related/children/children.component';
import {FoodComponent} from './food-related/food/food.component';
import {CampListComponent} from './camp-related/camp-list/camp-list.component';
import {NotificationsComponent} from './not-relevant/notifications/notifications.component';
import {CampComponent} from './camp-related/camp/camp.component';
import {CreateCampComponent} from './camp-related/create-camp/create-camp.component';
import {ScheduleComponent} from './not-relevant/schedule/schedule.component';
import {AddWorkerComponent} from './worker-related/add-worker/add-worker.component';
import {CopyWorkersComponent} from './worker-related/copy-workers/copy-workers.component';
import {SearchCampComponent} from './not-relevant/search-camp/search-camp.component';


const routes: Routes = [
    {path: '', redirectTo: 'camp-list', pathMatch: 'full'},
    {path: 'camp-list', component: CampListComponent},
    {path: 'create-camp', component: CreateCampComponent},
    {path: 'search-camp', component: SearchCampComponent},
    {path: 'notifications', component: NotificationsComponent},
    {
        path: 'camp/:id', component: CampComponent, children: [
            {path: '', redirectTo: 'detail', pathMatch: 'full'},
            {path: 'detail', component: DetailComponent},
            {path: 'workers', component: WorkersComponent},
            {path: 'children', component: ChildrenComponent},
            {path: 'food', component: FoodComponent},
            {path: 'schedule', component: ScheduleComponent},
            {path: 'add-worker', component: AddWorkerComponent},
            {path: 'copy-workers', component: CopyWorkersComponent}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

