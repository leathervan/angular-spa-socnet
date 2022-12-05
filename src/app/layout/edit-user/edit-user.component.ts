import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  profileForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  ngOnInit(): void {
    this.profileForm = this.createEditForm();
  }

  createEditForm(): FormGroup {
    return this.formBuilder.group({
      username: [this.data.user.username, Validators.compose([Validators.required])],
      bio: [this.data.user.bio, Validators.compose([Validators.required])]
    })
  }

  submit(): void {
    this.userService.updateUser(this.updateUser())
      .subscribe(() => {
        this.notificationService.showSnackBar('User updated');
        this.closeDialog();
      })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  private updateUser(): User {
    this.data.user.username = this.profileForm.value.username;
    this.data.user.bio = this.profileForm.value.bio;
    return this.data.user;
  }

}
