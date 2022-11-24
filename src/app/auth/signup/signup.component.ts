import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(private authservice: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    this.authservice.signup({
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword
    }).subscribe(data => {
      this.notificationService.showSnackBar(data.message);
      this.router.navigate(['/login']);
    });
  }

}
