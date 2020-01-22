import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { getServerPath } from '../shared/app.config';
import { NgxSpinnerService } from "ngx-spinner";
import sweetAlert from 'sweetalert2';

@Component({
  selector: 'app-branch-infra-collegetype',
  templateUrl: './branch-infra-collegetype.component.html',
  styleUrls: ['./branch-infra-collegetype.component.scss']
})
export class BranchInfraCollegetypeComponent implements OnInit {
  apiUrl = getServerPath();
  public courseList: any = [];
  public dataList: any = [];
  public infraList: any = [];
  public examType: any = [];
  public CourseType: any = [];
  LeadDetails: Object;
  public tempval: any;

  collegeDetails: boolean = true;

  collegeDetailsshow: boolean = false;
  addbranchDeatilshow: boolean = false;

  infraDetailsshow: boolean = false;
  addinfraDeatilshow: boolean = false;

  collegeshowList: boolean = false;
  addcollegeDeatilshow: boolean = false;

  examshowList: boolean = false;
  examDeatilshow: boolean = false;

  CourseshowList: boolean = false;
  CourseDetaildata: boolean = false;
  xuv: boolean = false;
  xyz: boolean = false;


  BranchForm: FormGroup;
  AddBranchForm: FormGroup;

  InfraForm: FormGroup;
  AddinfraForm: FormGroup;

  collegeForm: FormGroup;
  AddCollegeForm: FormGroup;

  examForm: FormGroup;
  addexamForm: FormGroup;

  CourseForm: FormGroup;
  addCourseForm: FormGroup;
  data: any;
  title: string;
  temp: boolean;
  CountryData: any;
  CountryFormData: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {

    this.BranchForm = fb.group({
      'branch_types': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])],

    });

    this.AddBranchForm = fb.group({
      'branch_types': ['', Validators.compose([Validators.required])]
    });

    this.InfraForm = fb.group({
      'infrastructure': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])],
    });

    this.AddinfraForm = fb.group({
      'infrastructure': ['', Validators.compose([Validators.required])]
    });

    this.collegeForm = fb.group({
      'college_types': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])],
    });

    this.AddCollegeForm = fb.group({
      'college_types': ['', Validators.compose([Validators.required])]
    });

    this.examForm = fb.group({
      'examtype': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])],
    });

    this.addexamForm = fb.group({
      'examtype': ['', Validators.compose([Validators.required])]
    });

    this.CourseForm = fb.group({
      'title': ['', Validators.compose([Validators.required])],
      '_id': ['', Validators.compose([Validators.required])]
    });

    this.addCourseForm = fb.group({
      'branch': ['', Validators.compose([Validators.required])],
      'course': ['', Validators.compose([Validators.required])]
    });
  }
  public StateList: any = [];
  public CityList: any = [];


  public GlobalCountrySelected: number;
  public GlobalStateSelected: number;
  public GlobalCitySelected: number;
  public GlobalCountrySelectedId: string;
  public GlobalStateSelectedId: string;
  public GlobalCitySelectedId: string;
  
  ngOnInit() {
    this.getallbranches()
    this.getallcollegetypes()
    this.getallinfra();
    this.getExamType();
    this.getCourseType();
  }

  CancelCollege() {
    this.collegeDetails = true;
    this.collegeDetailsshow = false;
    this.addbranchDeatilshow = false
    this.infraDetailsshow = false;
    this.addinfraDeatilshow = false;
    this.collegeshowList = false;
    this.addcollegeDeatilshow = false;
    this.examshowList = false;
    this.examDeatilshow = false;
    this.CourseshowList = false;
    this.CourseDetaildata = false;
    this.xyz = false;
    this.xuv = false;
  }

  /*****************branches integration****************************/
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

  editbranchTypes(country) {
    this.collegeDetailsshow = true;
    this.collegeDetails = false;
    console.log(country._id, "country list")
    this.http.get(`${this.apiUrl}/branchapi/getsinglebranchtype/` + country._id).subscribe(result => {
      if (result) {
        console.log(result, "data result")
        this.tempval = country._id
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.Data
          console.log(datas, "=====================")
          this.BranchForm = this.fb.group({
            'branch_types': [datas.branch_types, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })

        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  Updatebranch() {
    let Id = this.BranchForm.get('_id').value
    this.BranchForm.get('branch_types').value;

    let value = {}
    value = this.BranchForm.value;
    this.http.put(`${this.apiUrl}/branchapi/updatebranchtypes/` + Id, value).subscribe((res: any) => {
      if (res.Status == 200) {
        sweetAlert.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.collegeDetailsshow = false
        this.collegeDetails = true;
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

  addbranch() {
    this.AddBranchForm.reset()
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.addbranchDeatilshow = true
  }

  submitbranch() {
    this.AddBranchForm.get('branch_types').value;
    let value = {}
    value = this.AddBranchForm.value;
    this.http.post(`${this.apiUrl}/branchapi/postbranchtypes`, value).subscribe((res: any) => {
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

  DeletebranchTypes(country) {
    var data = country._id
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
        this.http.delete(`${this.apiUrl}/branchapi/deletebranchtype/` + country._id).subscribe(res => {
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

  /*****************Infra Integration****************************/


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

  editinfrastructure(state) {
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.infraDetailsshow = true;
    console.log(state._id, "country list")
    this.http.get(`${this.apiUrl}/branchapi/getinfrastructurebyid/` + state._id).subscribe(result => {
      if (result) {
        console.log(result, "data result")
        this.tempval = state._id
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.Data
          console.log(datas, "=====================")
          this.InfraForm = this.fb.group({
            'infrastructure': [datas.infrastructure, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })

        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  Updateinfrastructure() {
    let Id = this.InfraForm.get('_id').value
    this.InfraForm.get('infrastructure').value;

    let value = {}
    value = this.InfraForm.value;
    this.http.put(`${this.apiUrl}/branchapi/updateinfrastructure/` + Id, value).subscribe((res: any) => {
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

  addinfrastructure() {
    this.AddinfraForm.reset()
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.addbranchDeatilshow = false;
    this.addinfraDeatilshow = true;
  }

  submitinfrastructure() {
    this.AddinfraForm.get('infrastructure').value;
    let value = {}
    value = this.AddinfraForm.value;
    this.http.post(`${this.apiUrl}/branchapi/postinfrastructure`, value).subscribe((res: any) => {
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

  Deleteinfrastructure(state) {
    var data = state._id
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
        this.http.delete(`${this.apiUrl}/branchapi/deleteinfrastructure/` + state._id).subscribe(res => {
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

  /*****************college Intregation****************************/

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

  editcollegeDetails(city) {
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.infraDetailsshow = false;
    this.collegeshowList = true;
    console.log(city._id, "country list")
    this.http.get(`${this.apiUrl}/branchapi/getsinglecollegetype/` + city._id).subscribe(result => {
      if (result) {
        console.log(result, "data result")
        this.tempval = city._id
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.Data
          console.log(datas, "=====================")
          this.collegeForm = this.fb.group({
            'college_types': [datas.college_types, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })

        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  Updatecollege() {
    let Id = this.collegeForm.get('_id').value
    this.collegeForm.get('college_types').value;

    let value = {}
    value = this.collegeForm.value;
    this.http.put(`${this.apiUrl}/branchapi/updatecollegetypes/` + Id, value).subscribe((res: any) => {
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

  addcollegeTypes() {
    this.AddCollegeForm.reset();
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.addbranchDeatilshow = false;
    this.addinfraDeatilshow = false;
    this.addcollegeDeatilshow = true;
  }

  submitcollege() {
    this.AddCollegeForm.get('college_types').value;
    let value = {}
    value = this.AddCollegeForm.value;
    this.http.post(`${this.apiUrl}/branchapi/postcollegetypes`, value).subscribe((res: any) => {
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

  DeleteCollege(city) {
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
        this.http.delete(`${this.apiUrl}/branchapi/deletecollegetype/` + city._id).subscribe(res => {
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

  /*****************Exam Types Integration****************************/
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

  editExamType(city) {
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.infraDetailsshow = false;
    this.collegeshowList = false;
    this.examshowList = true;
    console.log(city._id, "country list")
    this.http.get(`${this.apiUrl}/branchapi/getexamtypesbyid/` + city._id).subscribe(result => {
      if (result) {
        console.log(result, "data result")
        this.tempval = city._id
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.Data
          console.log(datas, "=====================")
          this.examForm = this.fb.group({
            'examtype': [datas.examtype, Validators.compose([Validators.required])],
            '_id': [datas._id, Validators.compose([Validators.required])],
          })

        });
      } else {
        this.LeadDetails = [];
      }
    });
  }

  Updateexam() {
    let Id = this.examForm.get('_id').value
    this.examForm.get('examtype').value;

    let value = {}
    value = this.examForm.value;
    this.http.put(`${this.apiUrl}/branchapi/updateexamtypes/` + Id, value).subscribe((res: any) => {
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

  addexamTypes() {
    this.addexamForm.reset();
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.addbranchDeatilshow = false;
    this.addinfraDeatilshow = false;
    this.addcollegeDeatilshow = false;
    this.examDeatilshow = true;
  }

  submitexam() {
    this.addexamForm.get('examtype').value;
    let value = {}
    value = this.addexamForm.value;
    this.http.post(`${this.apiUrl}/branchapi/postexamtypes`, value).subscribe((res: any) => {
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

  DeleteExam(city) {
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
        this.http.delete(`${this.apiUrl}/branchapi/deleteexamtypes/` + city._id).subscribe(res => {
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

  /*****************Courses Types Integration****************************/

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

  editCourseType(city) {
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.infraDetailsshow = false;
    this.collegeshowList = false;
    this.examshowList = false;
    this.CourseshowList = true;
    console.log(city._id, "country list")
    this.http.get(`${this.apiUrl}/userapi/getcourseId/` + city._id).subscribe(result => {
      if (result) {
        console.log(result, "data result")
        this.tempval = city._id
        this.LeadDetails = result;
        let umang = []
        umang.push(this.LeadDetails)
        umang.forEach(element => {
          let datas = element.result
          console.log(element.result, "=====================")
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


  DeleteCourse(city) {
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
        this.http.delete(`${this.apiUrl}/userapi/deletecourse/` + city._id).subscribe(res => {
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

  SelectCourse(id, index) {
    this.spinner.show();
    this.GlobalCountrySelected = index;
    this.GlobalCountrySelectedId = id;

    this.http.get(`${this.apiUrl}/branchapi/branchList/` + id).subscribe((res: any) => {
      if (res.Status == 200) {
        this.spinner.hide();
        this.CityList = [];
        this.StateList = res.result;  
      }
    }, error => {
      console.log(error);
    })
  }

  addBranch(city) {
    console.log(city._id,"idddfasfadsfdsafsadfdsafdsafdsfdsaf")
    this.addCourseForm.reset();
    this.collegeDetailsshow = false;
    this.collegeDetails = false;
    this.addbranchDeatilshow = false;
    this.addinfraDeatilshow = false;
    this.addcollegeDeatilshow = false;
    this.examDeatilshow = false;
    this.CourseDetaildata = true;

    localStorage.setItem("_id",city._id)

    
    // this.addCourseForm.get('title').value;
    // this.addCourseForm.get('_id').value;
    // // let value = city._id
    // let value={}
    // value = this.addCourseForm.value;
    // console.log(value,"value id data gram")
    // this.http.post(`${this.apiUrl}/branchapi/createbranch`, value).subscribe((res: any) => {
    //   if (res.Status == 200) {
    //     sweetAlert.fire({
    //       title: 'Success!',
    //       text: res.Message,
    //       icon: 'success',
    //       showCancelButton: true,
    //       confirmButtonText: 'Ok!',
    //     })
    //     this.CancelCollege();
    //     this.ngOnInit();
    //   } else {
    //     sweetAlert.fire({
    //       title: 'Error?',
    //       text: 'Something went wrong!',
    //       icon: 'warning'
    //     })
    //   }
    // })

    // this.spinner.show();
    // this.GlobalCountrySelected = index;
    // this.GlobalCountrySelectedId = id
  }

  submitcourse() {
    let datas =this.addCourseForm.get('branch').value;
    var data =localStorage.getItem("_id")
    let params = {
      "branch":datas,
      "course":data
    }

    this.http.post(`${this.apiUrl}/branchapi/createbranch`,params).subscribe((res: any) => {
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
}