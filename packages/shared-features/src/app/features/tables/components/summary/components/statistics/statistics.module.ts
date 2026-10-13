import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StatisticsPage } from './statistics.page';
import { EsNumberPipe } from './es-number.pipe';
import { SessionPulseComponent } from './session-pulse/session-pulse.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: StatisticsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [StatisticsPage, EsNumberPipe, SessionPulseComponent]
})
export class StatisticsPageModule { }
