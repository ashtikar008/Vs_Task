import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: "create-user",
    component: CreateUserComponent
  },
  {
    path: "edit-user",
    component: EditUserComponent,
  },
  {
    path: "user-list",
    component: UserListComponent
  },
  {
    path: "",
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
