import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFormGroup!: FormGroup;
  errMessage! : string;

  constructor( private fb: FormBuilder,
    private authservice: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.userFormGroup = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control(''),

    })
  }

  handleSubmit(){
    let username = this.userFormGroup.value.username;
    let password = this.userFormGroup.value.password;
    this.authservice.login(username, password).subscribe({
      next:(appUser)=>{
        this.authservice.authenticateUser(appUser).subscribe({
          next:()=>{
            this.router.navigateByUrl("/admin");
          }
        });
      },
      error:(err)=>{
        this.errMessage = err;

      }
    })

  }

}
