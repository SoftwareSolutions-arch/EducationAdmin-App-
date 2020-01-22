import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getServerPath } from '../shared/app.config';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import sweetAlert from 'sweetalert2';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})

export class LeadsComponent implements OnInit {

  LeadForm: FormGroup;
  addLeadForm: FormGroup;

  apiUrl = getServerPath();
  public LeadList: any = [];
  public LeadDetails: any = [];
  p: number = 1;
  Title: string;

  showleadlist: boolean = true;
  showleaddetails: boolean = false;
  addleaddetails: boolean = false;
  _id: any;
  Emp: any;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {
    this.LeadForm = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'phone': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
    });
    this.addLeadForm = fb.group({
      'email': ['', Validators.compose([Validators.required])],
      'phone': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getallleads();
    this.UpdateArticless();
    this.dataservice();
  }

  getallleads() {
    this.http.get(`${this.apiUrl}/branchapi/getleads`).subscribe(result => {
      if (result) {
        this.Title = "List"
        this.spinner.hide();
        this.LeadList = result;
      }
      else {
        this.LeadList = [];
      }
    });
  }

  EditArticles(article) {
    this.http.get(`${this.apiUrl}/branchapi/getList/` + article._id).subscribe(data => {
      if (data) {
        this.Title = "Details"
        this.showleadlist = false;
        this.showleaddetails = true;
        this.spinner.hide();
        this.LeadDetails = data;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.Data
          this.LeadForm = this.fb.group({
            'email': [datas.email, Validators.compose([Validators.required])],
            'phone': [datas.phone, Validators.compose([Validators.required])],
            'address': [datas.address, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])]
          })
        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  CancelArticle() {
    this.showleadlist = true;
    this.showleaddetails = false;
    this.addleaddetails = false;
  }

  UpdateArticle() {
    let Id = this.LeadForm.get('_id').value
    this.LeadForm.get('email').value;
    this.LeadForm.get('phone').value;
    this.LeadForm.get('address').value;
    let value = {}
    value = this.LeadForm.value;
    this.http.put(`${this.apiUrl}/branchapi/updateleads/` + Id, value).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.showleadlist = true;
        this.showleaddetails = false;
        this.getallleads();
      } else {
        sweetAlert.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  delete(article) {
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
        this.http.delete(`${this.apiUrl}/branchapi/deletelead/` + article._id).subscribe(res => {
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

  SaveLeads() {
    this.showleadlist = false;
    this.showleaddetails = false;
    this.addleaddetails = true;
  }

  addleads() {
    // console.log("Hello sir")
    this.addLeadForm.get('email').value;
    this.addLeadForm.get('phone').value;
    this.addLeadForm.get('address').value;
    let value = {}
    value = this.addLeadForm.value;
    console.log("value data from saveCollege", value)
    this.http.post(`${this.apiUrl}/branchapi/postleads/`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        }).then
        this.getallleads();
        this.CancelArticle();
      } else {
        sweetAlert.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  dataservice(){
    this.http.get(`http://alphawizz.org:3000/api/getfill`).subscribe(result => {
      console.log(result,"result")
  })
    
  }

  UpdateArticless() {
    let value = {
      "first_name": "Umang",
      "last_name": "Chopra",
      "gender": "male",
      "date_of_birth": "08/12/1996",
      "currret_location": "Indore",
      "sexual_orientation": "male",
      "connection_looking_for": "Rock",
      "smoke": "No",
      "drink": "No",
      "drugs": "No",
      "smoke_weed": "No",
      "latitude": "I dont know",
      "longitude": "I dont know",
      "polities": "I dont know",
      "height": '6',
      "current_dob": '23',
      "mobile_number": "9090923458"

    }
    this.http.post(`http://alphawizz.org:3000/api/postfill`, value).subscribe((res: any) => {
     console.log(res,"res")
    })
  }
}
