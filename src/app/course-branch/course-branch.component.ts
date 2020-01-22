import { Component, OnInit, Inject, ɵConsole } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getServerPath } from '../../app/shared/app.config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OrganizationService } from '../../app/core/services/superadmin/organization.service';
import { CountrystatecityService } from '../../app/core/services/country-state-city/countrystatecity.service';
import sweetAlert from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner";

export interface CountryDialogData { }
export interface StateDialogData { }
export interface CityDialogData { }

@Component({
  selector: 'app-course-branch',
  templateUrl: './course-branch.component.html',
  styleUrls: ['./course-branch.component.scss']
})

export class CourseBranchComponent implements OnInit {
  LeadDetails: Object;
  public tempval: any;

  CourseForm: FormGroup;

  addCourseForm: FormGroup;
  addBranchForm: FormGroup;
  addexamForm: FormGroup;

  BranchForm: FormGroup;

  apiUrl = getServerPath();

  collegeDetails: boolean = true;
  CourseshowList: boolean = false;
  CourseDetaildata: boolean = false;
  BranchshowList: boolean = false;
  BranchDetaildata: boolean = false;

  constructor(private spinner: NgxSpinnerService, private organizationService: OrganizationService, private countrystatecityService: CountrystatecityService, public dialog: MatDialog, private http: HttpClient, private fb: FormBuilder) {
    this.CourseForm = fb.group({
      'title': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])]
    });

    this.addCourseForm = fb.group({
      'title': ['', Validators.compose([Validators.required])],
    });

    this.BranchForm = fb.group({
      'branch': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])]
    });

    this.addBranchForm = fb.group({
      'title': ['', Validators.compose([Validators.required])],
    });
  }

  public CourseType: any = [];
  public dataList: any = [];
  public StateList: any = [];
  public CityList: any = [];

  public GlobalCountrySelected: number;
  public GlobalStateSelected: number;
  public GlobalCitySelected: number;
  public GlobalCountrySelectedId: string;
  public GlobalStateSelectedId: string;
  public GlobalCitySelectedId: string;

  ngOnInit() {
    this.getCourseType();
    this.getallbranches();
  
  }

  CancelCollege() {
    this.collegeDetails = true;
    this.CourseshowList = false;
    this.BranchshowList = false;
    this.BranchDetaildata = false;
    this.CourseDetaildata = false;
  }

  getCourseType() {
    this.http.get(`${this.apiUrl}/userapi/allcourselist`).subscribe((res: any) => {
      console.log(res, "res")
      if (res.Status == 200) {
        this.spinner.hide();
        this.CourseType = res.result;
      } else {
        this.CourseType = [];
      }
    });
  }

  getallbranches() {
    this.http.get(`${this.apiUrl}/branchapi/getbranchtypes`).subscribe((res: any) => {
      console.log(res, "res")
      if (res.Status == 200) {
        this.spinner.hide();
        this.dataList = res.result;
      } else {
        this.dataList = [];
      }
    });
  }

  /*************************Course****************************************/

  SelectCourse(id, index) {
    this.spinner.show();
    this.GlobalCountrySelected = index;
    this.GlobalCountrySelectedId = id;

    this.http.get(`${this.apiUrl}/branchapi/branchList/` + id).subscribe((res: any) => {
      if (res.Status == 200) {
        this.spinner.hide();
        this.CityList = [];
        this.StateList = res.Data;
        console.log(res.Data, "this.StateList ")
      }
    }, error => {
      console.log(error);
    })
  }

  editCourseType(Course) {
    this.collegeDetails = false;
    this.CourseshowList = true;
    this.CourseDetaildata = false;
    this.BranchshowList = false;
    this.http.get(`${this.apiUrl}/userapi/getcourseId/` + Course._id).subscribe(result => {
      if (result) {
        this.tempval = Course._id
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.result
          this.CourseForm = this.fb.group({
            'title': [datas.title, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })

        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  UpdateCourse() {
    let Id = this.CourseForm.get('_id').value
    this.CourseForm.get('title').value;
    let value = {}
    value = this.CourseForm.value;
    this.http.put(`${this.apiUrl}/userapi/updatecourses/` + Id, value).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.CancelCollege();
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

  addCourse() {
    this.collegeDetails = false;
    this.CourseshowList = false;
    this.BranchshowList = false;
    this.CourseDetaildata = true
  }

  submitcourse() {
    let datas = this.addCourseForm.get('title').value;
    this.http.post(`${this.apiUrl}/userapi/createcourses`, datas).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.CancelCollege();
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

  DeleteCourse(Course) {
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
        this.http.delete(`${this.apiUrl}/userapi/deletecourse/` + Course._id).subscribe(res => {
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

  /*****************************************************************/

  addBranch() {
    var data = this.GlobalCountrySelectedId
    this.addBranchForm.reset();
    this.collegeDetails = false;
    this.CourseshowList = false;
    this.CourseDetaildata = false;
    this.BranchshowList = false;
    this.BranchDetaildata = true;
    localStorage.setItem("_id", data)
  }

  submitbranch() {
    let titles = this.addBranchForm.get('title').value;
    var id = localStorage.getItem("_id")
    let params = {
      "branch": titles,
      "course": id
    }

    this.http.post(`${this.apiUrl}/branchapi/createbranch`, params).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.CancelCollege();
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

  editBranch(Branch) {
    this.collegeDetails = false;
    this.CourseDetaildata = false;
    this.CourseshowList = false;
    this.BranchDetaildata = false;
    this.BranchshowList = true;

    this.http.get(`${this.apiUrl}/branchapi/getbranchbyid/` + Branch._id).subscribe(Data => {
      if (Data) {
        this.tempval = Branch._id
        this.LeadDetails = Data;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.Data
          this.BranchForm = this.fb.group({
            'branch': [datas.branch, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })

          console.log(this.BranchForm, "this.BranchForm this.BranchForm ")

        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  updateBranch() {
    let Id = this.BranchForm.get('_id').value
    this.BranchForm.get('branch').value;
    let value = {}
    value = this.BranchForm.value;

    this.http.put(`${this.apiUrl}/branchapi/updateBranch/` + Id, value).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.CancelCollege();
        this.ngOnInit();
        // window.location.reload()
      } else {
        sweetAlert.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  DeleteBranch(Branch) {
    var data = Branch._id
    console.log(data, "data Register")
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
        this.http.delete(`${this.apiUrl}/branchapi/deletebranch/` + Branch._id).subscribe(res => {
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
