import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AgePipe } from './shared/pipe/age.pipe';
import { CustomCardViewComponent } from './components/user-list/custom-card-view/custom-card-view.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NameFilterPipe } from './shared/pipe/name-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    CreateUserComponent,
    EditUserComponent,
    CustomCardViewComponent,
    AgePipe,
    NameFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    ToastrModule.forRoot({ progressBar: true, timeOut: 2000 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
