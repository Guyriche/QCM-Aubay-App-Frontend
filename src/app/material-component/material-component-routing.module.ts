import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { QuestionQcmComponent } from './dialog/question-qcm/question-qcm.component';
import { ManagePropositionComponent } from './manage-proposition/manage-proposition.component';
import { ManageQcmComponent } from './manage-qcm/manage-qcm.component';
import { ManageQuestionComponent } from './manage-question/manage-question.component';
import { ManageThemeComponent } from './manage-theme/manage-theme.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

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
    },
    {
        path: 'qcm',
        component: ManageQcmComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: 'questionToQcm',
        component: QuestionQcmComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: 'user',
        component: ManageUserComponent,
        canActivate:[RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    }
    
];
