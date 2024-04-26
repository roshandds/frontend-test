import { Routes, CanActivateFn } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'signup'},
 {path:'signup',component: SignupComponent},
 {path:'login',component:LoginComponent},
 {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
];
