import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getServerPath } from '../shared/app.config';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.scss']
})
export class FeesComponent implements OnInit {

  FeesDataForm: FormGroup;
  AddFeesDataForm: FormGroup;
  apiUrl = getServerPath();
  public courseList: any = [];
  datagramshow: boolean = false;
  AddFeesList: boolean = false;
  collegeListshow: boolean = true;
  p: number = 1;
  LeadDetails: Object;
  public tempval: any;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {
    this.FeesDataForm = fb.group({
      'fees': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])]
    });
    this.AddFeesDataForm = fb.group({
      'fees': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.GetFees()
    this.canceldetails();
  }

  GetFees() {
    this.http.get(`${this.apiUrl}/branchapi/getfees`).subscribe((res: any) => {
      if (res.Status == 200) {
        console.log(res,"res aaya")
        this.spinner.hide();
        this.courseList = res.result;
      } else {
        this.courseList = [];
      }
    });
  }

  DeleteFees(course) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
      if (result.value) {
        this.http.delete(`${this.apiUrl}/branchapi/deletefees/` + course._id).subscribe(res => {
          this.ngOnInit();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }

  EditFees(course) {
    this.http.get(`${this.apiUrl}/branchapi/getfeesbyid/` + course._id).subscribe(result => {
      if (result) {
        this.tempval = course._id
        this.collegeListshow = false;
        this.datagramshow = true;
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.result
          this.FeesDataForm = this.fb.group({
            'fees': [datas.fees, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })
        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  updateFees() {
    let id = this.FeesDataForm.value._id;
    this.FeesDataForm.get('fees').value;
    let value = {}
    value = this.FeesDataForm.value;
    this.http.put(`${this.apiUrl}/branchapi/updatefees/` + id, value).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.collegeListshow = true;
        this.datagramshow = false;
        this.GetFees();

      } else {
        Swal.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  canceldetails() {
    this.AddFeesList = false;
    this.datagramshow = false;
    this.collegeListshow = true; 
  }

  SaveCollege() {
    // this.MultipledataForm.reset()
    this.datagramshow = false;
    this.collegeListshow = false;
    this.AddFeesList = true;
                      
  }

  // submitfees(){

  // }

  submitfees() {
    console.log("Hello sir")
    this.AddFeesDataForm.get('fees').value;
    let value = {}
    value = this.AddFeesDataForm.value;
    this.http.post(`${this.apiUrl}/branchapi/createfees`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.ngOnInit();
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