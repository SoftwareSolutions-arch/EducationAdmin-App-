import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { getServerPath } from '../shared/app.config';
import { NgxSpinnerService } from "ngx-spinner";
import sweetAlert from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  apiUrl = getServerPath();
  public infraList: any = [];
  public examType: any = [];
  public CourseType: any = [];

  editcompanyForm: FormGroup;
  addcompanyForm: FormGroup;


  editcompanydetails: boolean = false;
  addcompanydetails: boolean = false;
  companyDetails:boolean =true;


  
  LeadDetails: Object;
  public tempval: any;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {
    this.editcompanyForm = fb.group({
      'company_name': ['', Validators.compose([Validators.required])],
      'package': ['', Validators.compose([Validators.required])],
      'details': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])],
    });

    this.addcompanyForm = fb.group({
      'company_name': ['', Validators.compose([Validators.required])],
      'package': ['', Validators.compose([Validators.required])],
      'details': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.getcompany();
  }


  cancel() {
    this.editcompanydetails = false;
    this.addcompanydetails = false;
    this.companyDetails=true
  }


   /*****************Exam Types Integration****************************/
  getcompany() {
    this.http.get(`${this.apiUrl}/branchapi/getcomapnytypes`).subscribe((res: any) => {
      console.log(res, "res")
      if (res.Status == 200) {
        this.spinner.hide();
        this.examType = res.result;
      } else {
        this.examType = [];
      }
    });
  }

  editcompany(city) {
    this.companyDetails = false;
    this.addcompanydetails=false
    this.editcompanydetails = true;

    this.http.get(`${this.apiUrl}/branchapi/getcomapnytypesbyid/` + city._id).subscribe(result => {
      if (result) {
        console.log(result, "data result")
        this.tempval = city._id
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.Data
          this.editcompanyForm = this.fb.group({
            'company_name': [datas.company_name, Validators.compose([Validators.required])],
            'package': [datas.package, Validators.compose([Validators.required])],
            'details': [datas.details, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })

        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  Update() {
    let Id = this.editcompanyForm.get('_id').value
    this.editcompanyForm.get('company_name').value;

    let value = {}
    value = this.editcompanyForm.value;
    this.http.put(`${this.apiUrl}/branchapi/updatecomapnytypes/` + Id, value).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.cancel();
        this.ngOnInit();
      } else {
        sweetAlert.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  addcompany() {
    this.addcompanyForm.reset();
    this.companyDetails=false
    this.editcompanydetails = false;
    this.addcompanydetails =true

  }

  submitcompany() {
    this.addcompanyForm.get('company_name').value;
    this.addcompanyForm.get('package').value;
    this.addcompanyForm.get('details').value;
    let value = {}
    value = this.addcompanyForm.value;
    this.http.post(`${this.apiUrl}/branchapi/postcomapnytypes`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.cancel();
        this.ngOnInit();
      } else {
        sweetAlert.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  deletecompany(city) {
    sweetAlert.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.http.delete(`${this.apiUrl}/branchapi/deletecomapnytypes/` + city._id).subscribe(res => {
          this.ngOnInit();
          sweetAlert.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }
}
