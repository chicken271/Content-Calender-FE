import { trigger, style, animate, transition, state} from '@angular/animations';

export const fadeAnimation = 
trigger('fadeAnimation', [

  state('in', style({opacity: 1})),

  transition(':enter', [
    style({opacity: 0}),
    animate('400ms')
  ]),

  transition(':leave',
    animate('300ms', style({opacity: 0}))),

])
