import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './structure/header/header.component';
import {SideMenuComponent} from './structure/side-menu/side-menu.component';
import {AppRoutingModule} from './app-routing.module';
import {DetailComponent} from './camp-related/detail/detail.component';
import {WorkersComponent} from './worker-related/workers/workers.component';
import {ChildrenComponent} from './child-related/children/children.component';
import {FoodComponent} from './food-related/food/food.component';
import {CampListComponent} from './camp-related/camp-list/camp-list.component';
import {NotificationsComponent} from './not-relevant/notifications/notifications.component';
import {CampComponent} from './camp-related/camp/camp.component';
import {CreateCampComponent} from './camp-related/create-camp/create-camp.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ScheduleComponent} from './not-relevant/schedule/schedule.component';
import {PendingWorkersComponent} from './worker-related/pending-workers/pending-workers.component';
import {AcceptedWorkersComponent} from './worker-related/accepted-workers/accepted-workers.component';
import {AddWorkerComponent} from './worker-related/add-worker/add-worker.component';
import {CopyWorkersComponent} from './worker-related/copy-workers/copy-workers.component';
import {MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EditWorkerComponent} from './worker-related/edit-worker/edit-worker.component';
import {SearchCampComponent} from './not-relevant/search-camp/search-camp.component';
import {EditChildComponent} from './child-related/edit-child/edit-child.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmDialogComponent } from './structure/confirm-dialog/confirm-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoaderComponent } from './structure/loader/loader.component';
import {HTTPListener} from './service/http-listener';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SideMenuComponent,
        DetailComponent,
        WorkersComponent,
        ChildrenComponent,
        FoodComponent,
        CampListComponent,
        NotificationsComponent,
        CampComponent,
        CreateCampComponent,
        ScheduleComponent,
        PendingWorkersComponent,
        AcceptedWorkersComponent,
        AddWorkerComponent,
        CopyWorkersComponent,
        EditWorkerComponent,
        SearchCampComponent,
        EditChildComponent,
        ConfirmDialogComponent,
        LoaderComponent
    ],
    entryComponents: [EditWorkerComponent, EditChildComponent, ConfirmDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HTTPListener,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
