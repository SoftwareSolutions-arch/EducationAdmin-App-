import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { getServerPath } from '../shared/app.config';
import { NgxSpinnerService } from "ngx-spinner";
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { EMFILE } from 'constants';
import { OrganizationService } from '../../app/core/services/superadmin/organization.service';
import { CountrystatecityService } from '../../app/core/services/country-state-city/countrystatecity.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  public CountryList: any = [];
  public GlobalCountrySelected: number;
  public GlobalCountrySelectedId: string;
  public CityList: any = [];
  public StateList: any = [];
  public BranchList: any = [];
  public GlobalStateSelected: number;
  public GlobalStateSelectedId: string;
  public GlobalCitySelected: number;
  public GlobalCitySelectedId: string;


  CollegeForm: FormGroup;
  MultipledataForm: FormGroup;
  CollegedataForm: FormGroup;
  countryForm: FormGroup;
  StateForm: FormGroup;
  courseForm: FormGroup;
  cityForm: FormGroup;
  branchesForm: FormGroup;
  apiUrl = getServerPath();

  public collegeList: any = [];
  public collegeLists: any = [];
  public coursesLists: any = [];
  public citiesLists: any = [];
  public branchLists: any = [];
  public addbranchLists: any = [];
  public infraList: any = [];
  public courseList: any = [];
  public examType: any = [];
  public feesList: any = [];
  public companyType: any = [];

  public tempval: any;
  public imgURL: any;
  public FileTypeImage: any;

  public updatedlogo: boolean = false;
  collegeListshow: boolean = true;
  collegeprofile: boolean = true;
  collegeDetailsshow: boolean = false;
  datagramshow: boolean = false;
  Emp: Object;
  p: number = 1;
  LeadDetails: Object;
  country: any;

  constructor(private organizationService: OrganizationService, private router: Router, private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {
    this.CollegeForm = fb.group({
      'company': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'course': ['', Validators.compose([Validators.required])],
      'branches': ['', Validators.compose([Validators.required])],
      'infrastructure': ['', Validators.compose([Validators.required])],
      'fees': ['', Validators.compose([Validators.required])],
      'title': ['', Validators.compose([Validators.required])],
      'highlight': ['', Validators.compose([Validators.required])],
      'facilitie': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])],
      'url': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'exam': ['', Validators.compose([Validators.required])],
      'collegetype': ['', Validators.compose([Validators.required])],
      'placement': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])],
    });
    this.countryForm = fb.group({
      'name': ['', Validators.compose([Validators.required])]
    });
    this.courseForm = fb.group({
      'title': ['', Validators.compose([Validators.required])]
    });
    this.cityForm = fb.group({
      'city': ['', Validators.compose([Validators.required])]
    });
    this.branchesForm = fb.group({
      'branch': ['', Validators.compose([Validators.required])]
    });
    this.MultipledataForm = fb.group({
      'facilitie': ['', Validators.compose([Validators.required])],
      'highlight': ['', Validators.compose([Validators.required])],
      'title': ['', Validators.compose([Validators.required])],
      'url': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
      'branches': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'infrastructure': ['', Validators.compose([Validators.required])],
      'exam': ['', Validators.compose([Validators.required])],
      'collegetype': ['', Validators.compose([Validators.required])],
      'course': ['', Validators.compose([Validators.required])],
      'fees': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      // 'review': ['', Validators.compose([Validators.required])],
      'placement': ['', Validators.compose([Validators.required])],
      'company': ['', Validators.compose([Validators.required])],

    });
  }

  ngOnInit() {
    this.spinner.show();
    this.GetCountry();
    this.getcountries();
    this.getcourses();
    this.getallcity()
    this.getallbranch();
    this.getallColleges();
    this.getallbranches();
    this.getallinfra();
    this.getallcollegetypes();
    this.getExamType();
    this.GetFees();
    this.getcompany();
  }

  cancel() {
    this.collegeListshow = true;
    this.collegeDetailsshow = false;
    this.datagramshow = false
  }
  
  getallColleges() {
    this.spinner.show();
    this.http.get(`${this.apiUrl}/authApi/getallcollege`).subscribe((res: any) => {
      if (res.Status == "200") {
        this.spinner.hide();
        this.collegeList = res.result;
      } else {
        this.collegeList = [];
      }
    });
  }

  EditCollege(college) {
    this.http.get(`${this.apiUrl}/authApi/getcollegeById/` + college._id).subscribe(data => {
      if (data) {
        this.tempval = college._id
        this.collegeListshow = false;
        this.collegeDetailsshow = true;
        this.LeadDetails = data;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.result
          this.CollegeForm = this.fb.group({
            'title': [datas.title, Validators.compose([Validators.required])],
            'highlight': [datas.highlight, Validators.compose([Validators.required])],
            'facilitie': [datas.facilitie, Validators.compose([Validators.required])],
            'description': [datas.description, Validators.compose([Validators.required])],
            'url': [datas.url, Validators.compose([Validators.required])],
            'country': [datas.country, Validators.compose([Validators.required])],
            'branches': [datas.branches, Validators.compose([Validators.required])],
            'address': [datas.address, Validators.compose([Validators.required])],
            'infrastructure': [datas.infrastructure, Validators.compose([Validators.required])],
            'exam': [datas.exam, Validators.compose([Validators.required])],
            'collegetype': [datas.collegetype, Validators.compose([Validators.required])],
            'course': [datas.course, Validators.compose([Validators.required])],
            'fees': [datas.fees, Validators.compose([Validators.required])],
            'city': [datas.city, Validators.compose([Validators.required])],
            'company': [datas.company, Validators.compose([Validators.required])],
            'placement': [datas.placement, Validators.compose([Validators.required])],
            'state': [datas.state, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })
          console.log(this.CollegeForm, " this.CollegeForm  data value form umagn ")
        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  DeleteCollege(college) {
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
        this.http.delete(`${this.apiUrl}/authApi/deletecollege/` + college._id).subscribe(res => {
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

  CancelCollege() {
    this.collegeListshow = true;
    this.collegeDetailsshow = false;
  }

  onSelectFile(evt) {
    this.updatedlogo = false;
    var files = evt.target.files;
    if (files.length === 0)
      return;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    this.FileTypeImage = files[0];
    reader.onload = (_event: any) => {
      this.updatedlogo = true;
      this.imgURL = reader.result;
    }
  }

  UpdateCollege() {
    if (this.FileTypeImage == undefined) { this.FileTypeImage = "" }
    let jsonInput: any = JSON.stringify({
      "url": this.CollegeForm.value.url,
      "facilitie": this.CollegeForm.value.facilitie,
      "highlight": this.CollegeForm.value.highlight,
      "title": this.CollegeForm.value.title,
      "description": this.CollegeForm.value.description,
      "collegeprofile": this.collegeprofile,
      'country': this.CollegeForm.value.country,
      'branches': this.CollegeForm.value.branches,
      'address': this.CollegeForm.value.address,
      'infrastructure': this.CollegeForm.value.infrastructure,
      'exam': this.CollegeForm.value.exam,
      'collegetype': this.CollegeForm.value.collegetype,
      'course': this.CollegeForm.value.course,
      'fees': this.CollegeForm.value.fees,
      'city': this.CollegeForm.value.city,
      'company': this.CollegeForm.value.company,
      '_id': this.CollegeForm.value._id,
    });
    const params = new FormData();
    params.append("jsonInput", jsonInput);
    params.append('collegeImg', this.FileTypeImage);
    console.log("params ++++++++", params)
    this.http.put(`${this.apiUrl}/authApi/updatecollege`, params).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.collegeListshow = true;
        this.collegeDetailsshow = false;
        // this.getallColleges();
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

  SaveCollege() {
    this.MultipledataForm.reset()
    this.collegeDetailsshow = false;
    this.collegeListshow = false;
    this.datagramshow = true;

  }

  submitCountry() {
    console.log("Hello sir")
    this.countryForm.get('name').value;
    let value = {}
    value = this.countryForm.value;
    console.log("value data from saveCollege", value)
    this.http.post(`${this.apiUrl}/userapi/addCountry`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        this.getcountries()
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        }).then(function () {
          // this.collegeListshow = true;
          // this.datagramshow = false;
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

  submitCourse() {
    console.log("Hello sir")
    // this.courseForm.get('title').value;
    let value = {}
    value = this.courseForm.value;
    console.log("value data from saveCollege", value)
    this.http.post(`${this.apiUrl}/userapi/createcourses`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        this.getcourses()
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        }).then
          this.getcourses()  
      } else {
        Swal.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  submitCity() {
    console.log("Hello sir")
    this.cityForm.get('city').value;
    let value = {}
    value = this.cityForm.value;
    console.log("value data from saveCollege", value)
    this.http.post(`${this.apiUrl}/userapi/addCity`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        this.getallcity();

        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        }).then(function () {
          // this.collegeListshow = true;
          // this.datagramshow = false;
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

  submitBranch() {
    console.log("Hello sir")
    this.branchesForm.get('branch').value;
    let value = {}
    value = this.branchesForm.value;
    console.log("value data from saveCollege", value)
    this.http.post(`${this.apiUrl}/branchapi/createbranch`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        this.getallbranch();
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        }).then(function () {
          // this.collegeListshow = true;
          // this.datagramshow = false;
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

  submitalldetail() {
    console.log("Hello Umang")
    if (this.FileTypeImage == undefined) { this.FileTypeImage = "" }
    let jsonInput: any = JSON.stringify({
      "facilitie": this.MultipledataForm.value.facilitie,
      "highlight": this.MultipledataForm.value.highlight,
      "title": this.MultipledataForm.value.title,
      "url": this.MultipledataForm.value.url,
      "description": this.MultipledataForm.value.description,
      "country": this.MultipledataForm.value.country,
      "branches": this.MultipledataForm.value.branches,
      "address": this.MultipledataForm.value.address,
      "infrastructure": this.MultipledataForm.value.infrastructure,
      "exam": this.MultipledataForm.value.exam,
      "collegetype": this.MultipledataForm.value.collegetype,
      "course": this.MultipledataForm.value.course,
      "city": this.MultipledataForm.value.city,
      "fees": this.MultipledataForm.value.fees,
      // "review": this.MultipledataForm.value.review,
      "placement": this.MultipledataForm.value.placement,
      "company": this.MultipledataForm.value.company,
      "state": this.MultipledataForm.value.state,
    });
    const dats = new FormData();
    dats.append("jsonInput", jsonInput);
    dats.append('collegeImg', this.FileTypeImage);
    console.log("jsonInput umang", jsonInput)
    this.http.post(`${this.apiUrl}/authApi/createcollege`, dats).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.ngOnInit()
        this.cancel();

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

    this.collegeListshow = true;
    this.datagramshow = false;
    this.collegeDetailsshow = false;
  }

  getcountries() {
    this.spinner.show();
    this.http.get(`${this.apiUrl}/userapi/getCountry`).subscribe((res: any) => {
      if (res.Status == "200") {
        this.collegeLists = res.result;

        console.log("this.collegeList", this.collegeLists)
      } else {
        this.collegeLists = [];
      }
    });
  }

  getcourses() {
    this.http.get(`${this.apiUrl}/userapi/allcourselist`).subscribe((res: any) => {
      if (res.Status == "200") {
        this.coursesLists = res.result;
        console.log("this.courses", this.coursesLists)
      } else {
        this.coursesLists = [];
      }
    });
  }

  getallcity() {
    this.http.get(`${this.apiUrl}/userapi/getCity`).subscribe((res: any) => {
      if (res.Status == "200") {
        this.citiesLists = res.result;
        console.log("this.courses", this.citiesLists)
      } else {
        this.citiesLists = [];
      }
    });
  }

  getallbranch() {
    this.http.get(`${this.apiUrl}/branchapi/getbranch`).subscribe((res: any) => {
      if (res.Status == "200") {
        this.branchLists = res.result;
        console.log("this.courses", this.branchLists)
      } else {
        this.branchLists = [];
      }
    });
  }

  /*--------------------------------------------------- */

  GetCountry() {
    console.log("Hello get Country")
    this.spinner.show();
    this.organizationService.GetCountry().subscribe((res: any) => {
      console.log("Hello get Country", res)
      if (res.Status == 200) {
        this.spinner.hide();
        this.CountryList = res.Data;
      }
    }, error => {
      console.log(error);
    })
  }

  SelectCountry(id, index) {
    console.log("calue of id", id)
    this.spinner.show();
    this.GlobalCountrySelected = index;
    this.GlobalCountrySelectedId = id;

    this.organizationService.GetState(id).subscribe((res: any) => {
      if (res.Status == 200) {
        this.spinner.hide();
        this.CityList = [];
        this.StateList = res.Data;
      }
    }, error => {
      console.log(error);
    })
  }

  SelectState(id, index) {
    this.spinner.show();
    this.GlobalStateSelected = index;
    this.GlobalStateSelectedId = id;
    this.organizationService.GetCity(id).subscribe((res: any) => {
      if (res.Status == 200) {
        let arr = []
        res.Data.forEach(element => {
          this.CityList.push({ "name": element.name })
          let data = element.name

        });

        console.log(this.CityList, "CityList")

        this.spinner.hide();
        // this.CityList = [];
        // this.CityList = res.Data;
      }
    }, error => {
      console.log(error);
    })
  }

  SelectCity(index) {
    this.GlobalCitySelected = index;
  }

  getallbranches() {
    this.http.get(`${this.apiUrl}/branchapi/getbranchtypes`).subscribe((res: any) => {
      console.log(res, "res")
      if (res.Status == 200) {
        this.spinner.hide();
        this.addbranchLists = res.result;
      } else {
        this.addbranchLists = [];
      }
    });
  }

  getallinfra() {
    this.http.get(`${this.apiUrl}/branchapi/getinfrastructure`).subscribe((res: any) => {
      console.log(res, "res")
      if (res.Status == 200) {
        this.spinner.hide();
        this.infraList = res.result;
      } else {
        this.infraList = [];
      }
    });
  }

  getallcollegetypes() {
    this.http.get(`${this.apiUrl}/branchapi/getcollegetypes`).subscribe((res: any) => {
      console.log(res, "res")
      if (res.Status == 200) {
        this.spinner.hide();
        this.courseList = res.result;
      } else {
        this.courseList = [];
      }
    });
  }

  getExamType() {
    this.http.get(`${this.apiUrl}/branchapi/getexamtypes`).subscribe((res: any) => {
      console.log(res, "res")
      if (res.Status == 200) {
        this.spinner.hide();
        this.examType = res.result;
      } else {
        this.examType = [];
      }
    });
  }

  GetFees() {
    this.http.get(`${this.apiUrl}/branchapi/getfees`).subscribe((res: any) => {
      if (res.Status == 200) {
        console.log(res, "res aaya")
        this.spinner.hide();
        this.feesList = res.result;
      } else {
        this.feesList = [];
      }
    });
  }

  SelectBranch(id, index) {
    // this.spinner.show();
    this.GlobalCountrySelected = index;
    this.GlobalCountrySelectedId = id;

    this.organizationService.GetBranch(id).subscribe((res: any) => {
      if (res.Status == 200) {
        console.log("Select Branch", res)
        this.spinner.hide();
        this.BranchList = [];
        this.BranchList = res.Data;
      }
    }, error => {
      console.log(error);
    })
  }

  getcompany() {
    this.http.get(`${this.apiUrl}/branchapi/getcomapnytypes`).subscribe((res: any) => {
      if (res.Status == 200) {
        this.spinner.hide();
        this.companyType = res.result;
      } else {
        this.companyType = [];
      }
    });
  }
}