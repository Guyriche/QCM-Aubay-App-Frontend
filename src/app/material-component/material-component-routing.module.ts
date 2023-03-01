import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { ManagePropositionComponent } from './manage-proposition/manage-proposition.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { ManageThemeComponent } from './manage-theme/manage-theme.component';

export const MaterialComponentRoutingModule: Routes = [

    {
        path: 'theme',
        component: ManageThemeComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: 'question',
        component: ManageQuestionComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: 'proposition',
        component: ManagePropositionComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    }
    
];
