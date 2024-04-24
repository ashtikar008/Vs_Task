import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppRoutes, Success_Message } from 'src/app/shared/enums/common.enum';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public createNewUserForm: FormGroup;
  public selectedFileName: string | undefined;

  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private toast: ToastrService,
    public sharedService: SharedService,
    private router: Router) {
    this.createNewUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      avatar: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
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
      this.createNewUserForm.controls['avatar'].setValue(fileObject);
      this.selectedFileName = file.name;
    };
  }

  onSubmit(): void {
    if (this.createNewUserForm.valid) {
      const formData = this.createNewUserForm.value;
      this.apiService.addUser(formData).subscribe(() => {
        this.createNewUserForm.reset();
        this.selectedFileName = undefined;
        this.toast.success(Success_Message.USER_CREATED);
        this.router.navigate([`${AppRoutes.Slash}${AppRoutes.UserList}`]);
      });
    }
  }
}
