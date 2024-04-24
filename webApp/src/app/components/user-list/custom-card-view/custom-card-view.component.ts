import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoutes, Error_Message, Success_Message } from 'src/app/shared/enums/common.enum';
import { User } from 'src/app/shared/model/user';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-custom-card-view',
  templateUrl: './custom-card-view.component.html',
  styleUrls: ['./custom-card-view.component.scss']
})
export class CustomCardViewComponent {
  @Input() jsonData: User[] = [];
  searchText: string = '';

  constructor(private router: Router,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  redirectPage(id: any) {
    this.router.navigate([`${AppRoutes.Slash}${AppRoutes.EditUser}`], { queryParams: { userId: id } });
  }

  deleteUser(index: number) {
    this.apiService.deleteUser(index).subscribe(
      () => {
        this.jsonData.splice(index, 1);
        this.toast.success(Success_Message.USER_DELETED);
      },
      error => {
        this.toast.error(Error_Message.FAILED_TO_DELETE_USER);
      }
    );
  }
}