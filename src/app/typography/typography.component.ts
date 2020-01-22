import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getServerPath } from '../shared/app.config';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  MultipledataForm: FormGroup;
  AddCourses: FormGroup;

  apiUrl = getServerPath();
  public courseList: any = [];
  datagramshow: boolean = false;
  addcoursesList: boolean = false;
  collegeListshow: boolean = true;
  p: number = 1;
  LeadDetails: Object;
  public tempval: any;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {
    this.MultipledataForm = fb.group({
      'title': ['', Validators.compose([Validators.required])],
      'attribute': ['', Validators.compose([Validators.required])],
      'reviewDetail': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])],
    });
    this.AddCourses = fb.group({
      'title': ['', Validators.compose([Validators.required])],
      'attribute': ['', Validators.compose([Validators.required])],
      'reviewDetail': ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getallcourse();

  }

  getallcourse() {
    this.http.get(`${this.apiUrl}/userapi/allcourselist`).subscribe((res: any) => {
      if (res.Status == 200) {
        this.spinner.hide();
        this.courseList = res.result;
        this.courseList.forEach(element => {
          console.log("element===========", element.reviewDetail[0])
        });
      } else {
        this.courseList = [];
      }
    });
  }

  DeleteCourses(college) {
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
        this.http.delete(`${this.apiUrl}/userapi/deletecourse/` + college._id).subscribe(res => {
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

  // EditCourses(college) {
  //   this.http.get(`${this.apiUrl}/userapi/getcourseId/` + college._id).subscribe(data => {
  //     if (data) {
  //       this.tempval = college._id
  //       this.datagramshow = true;
  //       this.collegeListshow = false;
  //       let params = []
  //       params.push(data)
  //       params.forEach(element => {
  //         let datas = element.result
  //         let newparams = []
  //         newparams.push(element.result)
  //         newparams.forEach(element => {
  //           let abc = []
  //           abc.push(element.reviewDetail)
  //           abc.forEach(element => {
  //             this.MultipledataForm = this.fb.group({
  //               'title': [datas.title, Validators.compose([Validators.required])],
  //               'attribute': [datas.attribute, Validators.compose([Validators.required])],
  //               'reviewDetail': [element[0].label, Validators.compose([Validators.required])],
  //               'value': [element[0].value, Validators.compose([Validators.required])],
  //               '_id': [datas._id, Validators.compose([Validators.required])],
  //             })
  //           });
  //         });
  //       });
  //     } else {
  //       this.LeadDetails = [];
  //     }
  //   });
  // }

  canceldetails() {
    this.datagramshow = false;
    this.collegeListshow = true;
    this.addcoursesList = false;
  }

  EditCourses(college) {
    this.http.get(`${this.apiUrl}/userapi/getcourseId/` + college._id).subscribe(data => {
      if (data) {
        this.tempval = college._id
        this.datagramshow = true;
        this.collegeListshow = false;
        let params = []
        params.push(data)
        params.forEach(element => {
          let datas = element.result
          let newparams = []
          newparams.push(element.result)
          newparams.forEach(element => {
            let abc = []
            abc.push(element.reviewDetail)
            abc.forEach(element => {
              this.MultipledataForm = this.fb.group({
                'title': [datas.title, Validators.compose([Validators.required])],
                'attribute': [datas.attribute, Validators.compose([Validators.required])],
                'reviewDetail': [element[0], Validators.compose([Validators.required])],
                // 'value': [element[0].value, Validators.compose([Validators.required])],
                '_id': [datas._id, Validators.compose([Validators.required])],
              })
            });
          });
        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  UpdateCollege() {
    let id = this.MultipledataForm.value._id;
    this.MultipledataForm.get('title').value;
    this.MultipledataForm.get('attribute').value;
    let abc = this.MultipledataForm.get('reviewDetail').value;
    // let data = this.MultipledataForm.get('value').value;
    console.log(abc, "details router availble")
    let value = {}
    value = this.MultipledataForm.value;
    this.http.put(`${this.apiUrl}/userapi/updatecourses/` + id, value).subscribe((res: any) => {
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
        this.getallcourse();

      } else {
        Swal.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  saveCourses() {
    this.AddCourses.reset()
    this.datagramshow = false;
    this.collegeListshow = false;
    this.addcoursesList = true;
  }

  AddCourse() {
    this.AddCourses.get('title').value;
    this.AddCourses.get('attribute').value;
    this.AddCourses.get('reviewDetail').value;
    let value = {}
    value = this.AddCourses.value;
    this.http.post(`${this.apiUrl}/userapi/createcourses`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.ngOnInit();
        this.canceldetails();
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
