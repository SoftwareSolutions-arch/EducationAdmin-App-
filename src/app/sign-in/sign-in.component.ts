import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { getServerPath } from '../shared/app.config';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  apiUrl = getServerPath();

  constructor( private router: Router, private fb: FormBuilder, private http: HttpClient, ) { }

  model = {
    email: '',
    password: ''
  };
  
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  
  ngOnInit() {
    
  }

  // onSubmit(){
  //   console.log("hhh")
  //   this.router.navigateByUrl('/dashboard');
  // }

  onSubmit(form: NgForm) {
    console.log("hello user",form.value)
    this.http.post(`${this.apiUrl}/authApi/login`, form.value).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
      } else {
        Swal.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
}
}
