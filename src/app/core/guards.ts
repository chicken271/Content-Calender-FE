import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './storage.service';
import { ContentDetailsComponent } from '../content/content-details/content-details.component';
import { AddContentFormComponent } from '../content/add-content-form/add-content-form.component';

export const isLoginGuard = () => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);
  if (tokenStorageService.getToken()) {
    return true;
  } else return router.parseUrl('/user/login?isLogin=false');
};

export const exitEditContentGuard = (component: ContentDetailsComponent) => {
  if(component.updateContentForm.dirty){
    return confirm('You are editing a content. Are you sure you want to leave ?');
  }else return true;
}

export const exitAddContentGuard = (component: AddContentFormComponent) => {
  if(component.addContentForm.dirty){
    return confirm('You are in the middle of adding new content. Are you sure you want to leave ?');
  }else return true;
}