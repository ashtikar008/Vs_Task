import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AppRoutes, Error_Message, Success_Message } from 'src/app/shared/enums/common.enum';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {

  public editUserForm: FormGroup;
  public selectedFileName: string | undefined;
  public userId: number = 0;
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder,
    private toast: ToastrService,
    public sharedService: SharedService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      avatar: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.userId = params['userId'];
      });

    this.getUserById(this.userId);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getUserById(index: number): void {
    const users = this.apiService.getLocalStorageUsers();
    if (index >= 0 && index < users.length) {
      const user = users[index];
      this.editUserForm.patchValue(user);
      this.selectedFileName = user.avatar.fileName;
    } else {
      this.toast.error(Error_Message.USER_NOT_FOUND);
    }
  }
  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.readFile(file);
    }
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String: string = reader.result as string;
      const fileObject = {
        base64String: base64String,
        fileName: file.name
      };
      this.editUserForm.controls['avatar'].setValue(fileObject);
      this.selectedFileName = file.name;
    };
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      const formData = this.editUserForm.value;
      this.apiService.updateUser(formData, Number(this.userId)).subscribe(() => {
        this.editUserForm.reset();
        this.toast.success(Success_Message.USER_UPDATED);
        this.router.navigate([`${AppRoutes.Slash}${AppRoutes.UserList}`]);
      });
    }
  }
}