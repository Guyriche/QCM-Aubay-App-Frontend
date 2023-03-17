import { Injectable } from "@angular/core";

export interface Menu{

    state:string;
    name:string;
    type:string;
    icon:string;
    role:string;
}

const MENUITEMS = [
    {state:'dashboard', name:'Dashboard QCM Management',type:'link', icon:'dashboard', role:''},
    {state:'theme', name:'Manage Theme',type:'link', icon:'subtitles', role:'admin'},
    {state:'question', name:'Manage Question',type:'link', icon:'question_answer', role:'admin'},
    {state:'proposition', name:'Manage Q.Response',type:'link', icon:'featured_play_list', role:'admin'},
    {state:'qcm', name:'Manage QCM',type:'link', icon:'assignment', role:'admin'}
]

@Injectable()
export class MenuItems{
    getMenuitem():Menu[]{
        return MENUITEMS;
    }
}