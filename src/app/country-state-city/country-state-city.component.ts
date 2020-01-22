import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getServerPath } from '../../app/shared/app.config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormArray, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { OrganizationService } from '../../app/core/services/superadmin/organization.service';
import { CountrystatecityService } from '../../app/core/services/country-state-city/countrystatecity.service';
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";


export interface CountryDialogData { }
export interface StateDialogData { }
export interface CityDialogData { }

@Component({
  selector: 'app-country-state-city',
  templateUrl: './country-state-city.component.html',
  styleUrls: ['./country-state-city.component.scss']
})
export class CountryStateCityComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private organizationService: OrganizationService, private countrystatecityService: CountrystatecityService, public dialog: MatDialog, private http: HttpClient, private fb: FormBuilder) { }
  public CountryList: any = [];
  public StateList: any = [];
  public CityList: any = [];

  public GlobalCountrySelected: number;
  public GlobalStateSelected: number;
  public GlobalCitySelected: number;
  public GlobalCountrySelectedId: string;
  public GlobalStateSelectedId: string;
  public GlobalCitySelectedId: string;



  ngOnInit() {
    this.GetCountry();
  }
  //umang
  GetCountry() {
    console.log("Hello get Country")
    this.spinner.show();
    this.organizationService.GetCountry().subscribe((res: any) => {
      console.log("Hello get Country",res)
      if (res.Status == 200) {
        this.spinner.hide();
        this.CountryList = res.Data;
      }
    }, error => {
      console.log(error);
    })
  }

  SelectCountry(id, index) {
    this.spinner.show();
    this.GlobalCountrySelected = index;
    this.GlobalCountrySelectedId = id;

    this.organizationService.GetState(id).subscribe((res: any) => {
      if (res.Status == 200) {
        this.spinner.hide();
        this.CityList = [];
        this.StateList = res.Data;
        console.log(this.StateList,"this.StateList data ")
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
        this.spinner.hide();
        this.CityList = [];
        this.CityList = res.Data;
      }
    }, error => {
      console.log(error);
    })
  }

  SelectCity(index) {
    this.GlobalCitySelected = index;
  }

  SelectCountryGetState(id) {
    this.StateList = [
      { _id: 1, country_id: "1", name: "Rajasthan" },
      { _id: 2, country_id: "1", name: "Madhya Pradesh" },
      { _id: 3, country_id: "1", name: "Uttar Pradesh" },
      { _id: 4, country_id: "1", name: "Bihar" },
    ];
  }

  openCountryPopup(value): void {
    // alert("Asdasdasd");
    if (value == '') {
      value = undefined;
    }
    const dialogRef = this.dialog.open(CreateCountry, {
      data: {
        CountryData: value
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != "") {
        this.CountryList.push(result);
      }
    });
  }

  openStatePopup(value): void {
    if (value == '') {
      value = undefined;
    }
    const dialogRef = this.dialog.open(CreateState, {
      data: {
        Country: this.CountryList,
        SelectedCountryId: this.GlobalCountrySelectedId,
        StateData: value
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != "") {
        this.StateList.push(result);
      }
    });
  }

  openCityPopup(value): void {
    if (value == '') {
      value = undefined;
    }
    const dialogRef = this.dialog.open(CreateCity, {
      data: {
        Country: this.CountryList,
        State: this.StateList,
        SelectedCountryId: this.GlobalCountrySelectedId,
        SelectedStateId: this.GlobalStateSelectedId,
        CityData: value
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != "") {
        this.CityList.push(result);
      }
    });
  }

  DeleteCountry(id, index) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Delete.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.countrystatecityService.DeleteCountry(id).subscribe((res: any) => {
          if (res.Status == 200) {
            this.spinner.hide();
            this.CountryList.splice(index, 1);
            Swal.fire({
              title: 'Success',
              text: res.Message,
              icon: 'success',showCancelButton: false,
              confirmButtonText: 'Ok',
              cancelButtonText: 'Cancel'
            }).then((result) => {
              if (result.value) {

              }
            })
          }
        }, error => {
          console.log(error);
        })
      }
    })
  }

  DeleteState(id, index) {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Delete.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.countrystatecityService.DeleteState(id).subscribe((res: any) => {
          if (res.Status == 200) {
            this.spinner.hide();
            this.StateList.splice(index, 1);
            Swal.fire({
              title: 'Success',
              text: res.Message,
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'Ok',
              cancelButtonText: 'Cancel'
            }).then((result) => {
              if (result.value) {

              }
            })
          }
        }, error => {
          console.log(error);
        })
      }
    })
  }

  DeleteCity(id, index) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You want to Delete.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.countrystatecityService.DeleteCity(id).subscribe((res: any) => {
          if (res.Status == 200) {
            this.spinner.hide();
            this.CityList.splice(index, 1);

          }
        }, error => {
          console.log(error);
        })
      }
    })
  }
}

/*---------------------------------------------------------------------------------------*/
// Dialog box for country
@Component({
  selector: 'CreateCountry',
  templateUrl: 'CreateCountry.html',
})
export class CreateCountry {
  title: string;
  constructor(
    public dialogRef: MatDialogRef<CreateCountry>,
    @Inject(MAT_DIALOG_DATA) public data: CountryDialogData,
    private http: HttpClient, private fb: FormBuilder,
    private countrystatecityService: CountrystatecityService,
    private spinner: NgxSpinnerService,
    private countryStateCityComponent: CountryStateCityComponent) { }

  public CountryFormData: FormGroup;
  apiUrl = getServerPath();
  CallBackData: any = "";
  CountryData: any;
  temp: boolean = false;
  public isDisabled: boolean = false;
  
  onNoClick(): void {
    this.dialogRef.close(this.CallBackData);
  }

  ngOnInit() {
    this.countryStateCityComponent.GetCountry()
    if ((<any>this.data).CountryData != undefined) {
      console.log((<any>this.data).CountryData);
      this.title = 'Update Country';
      this.temp = true;
      this.CountryData = (<any>this.data).CountryData;
      this.CountryFormData = this.fb.group({
        'name': [this.CountryData.name, Validators.required],
        'shortname': [this.CountryData.shortname, Validators.required],
      });
    } else {
      this.title = 'Create Country';
      this.temp = false;
      this.CountryFormData = this.fb.group({
        'name': ['', Validators.required],
        'shortname': ['', Validators.required],
      });
    }

  }

  CreateCountry() {
    if (this.CountryFormData.valid) {
      this.spinner.show();
      this.isDisabled = true
      this.countrystatecityService.CreateCountry(this.CountryFormData.value).subscribe((res: any) => {
        if (res.Status == 200) {
          this.spinner.hide();
          this.isDisabled = false
          this.CallBackData = res.result;
          this.onNoClick();

        }
      }, error => {
        console.log(error);
      })
    }
  }

  // umang
  EditCountry() {
    console.log("Hello server")
    if (this.CountryFormData.valid) {
      this.spinner.show();
      this.isDisabled = true
      this.countrystatecityService.EditCountry(this.CountryFormData.value, this.CountryData._id).subscribe((res: any) => {

        if (res.Status == 200) {
          this.countryStateCityComponent.GetCountry();
          this.isDisabled = false;
          this.spinner.hide();
          this.CallBackData = "";
          this.onNoClick();
          // this.xyz()
          // location.reload();  
          
        }
      }, error => {
        console.log(error);
      })
    }
  }

}
/*---------------------------------------------------------------------------------------*/
// Dialog box for state
@Component({
  selector: 'CreateState',
  templateUrl: 'CreateState.html',
})
export class CreateState {
  title: string;
  constructor(
    public dialogRef: MatDialogRef<CreateCountry>,
    @Inject(MAT_DIALOG_DATA) public data: StateDialogData, private http: HttpClient, private fb: FormBuilder, private countrystatecityService: CountrystatecityService, private spinner: NgxSpinnerService) { }
  public StateFormData: FormGroup;
  public CountryList: any = [];
  apiUrl = getServerPath();
  CallBackData: any = "";
  StateData: any;
  temp: boolean = false;
  onNoClick(): void {
    this.dialogRef.close(this.CallBackData);
  }
  ngOnInit() {
    this.CountryList = (<any>this.data).Country;
    if ((<any>this.data).StateData != undefined) {
      this.title = 'Update State';
      this.temp = true;
      this.StateData = (<any>this.data).StateData;
      this.StateFormData = this.fb.group({
        'name': [this.StateData.name, Validators.required],
        'shortname': [this.StateData.shortname, Validators.required],
        'country': [this.StateData.country, Validators.required],
      });

    } else {
      this.title = 'Create State';
      this.temp = false;
      var country = "";
      if ((<any>this.data).SelectedCountryId != undefined) {
        country = (<any>this.data).SelectedCountryId;
      }
      this.StateFormData = this.fb.group({
        'name': ['', Validators.required],
        'shortname': ['', Validators.required],
        'country': [country, Validators.required]
      });
    }
  }
  public isDisabled: boolean = false;

  CreateState() {
    if (this.StateFormData.valid) {
      this.isDisabled = true;
      this.spinner.show();
      this.countrystatecityService.CreateState(this.StateFormData.value).subscribe((res: any) => {
        if (res.Status == 200) {

          this.spinner.hide();
          this.isDisabled = false;
          this.CallBackData = res.result;
          this.onNoClick();

        }
      }, error => {
        console.log(error);
      })
    }
  }

  EditState() {
    if (this.StateFormData.valid) {
      this.spinner.show();
      this.isDisabled = true
      this.countrystatecityService.EditState(this.StateFormData.value, this.StateData._id).subscribe((res: any) => {
        if (res.Status == 200) {
          this.spinner.hide();
          this.isDisabled = false
          this.CallBackData = "";
          this.onNoClick();

        }
      }, error => {
        console.log(error);
      })
    }
  }

}

/*---------------------------------------------------------------------------------------*/

// Dialog box for city
@Component({
  selector: 'CreateCity',
  templateUrl: 'CreateCity.html',
})
export class CreateCity {
  title: string;
  constructor(
    public dialogRef: MatDialogRef<CreateCountry>,
    @Inject(MAT_DIALOG_DATA) public data: CityDialogData, private http: HttpClient, private fb: FormBuilder, private organizationService: OrganizationService, private countrystatecityService: CountrystatecityService, private spinner: NgxSpinnerService) { }
  public CityFormData: FormGroup;
  public StateList: any = [];
  public CountryList: any = [];
  apiUrl = getServerPath();
  CallBackData: any = "";
  CityData: any;
  temp: boolean = false;
  onNoClick(): void {
    this.dialogRef.close(this.CallBackData);
  }
  ngOnInit() {
    this.CountryList = (<any>this.data).Country;
    this.StateList = (<any>this.data).State;
    if ((<any>this.data).CityData != undefined) {
      this.title = 'Update City';
      this.temp = true;
      this.CityData = (<any>this.data).CityData;
      this.CityFormData = this.fb.group({
        'name': [this.CityData.name, Validators.required],
        'shortname': [this.CityData.shortname, Validators.required],
        'country': [this.CityData.country, Validators.required],
        'state': [this.CityData.state, Validators.required]
      });
    } else {
      this.title = 'Create City';
      this.temp = false;
      var state = "";
      var country = "";
      if ((<any>this.data).SelectedCountryId != undefined) {
        country = (<any>this.data).SelectedCountryId;
      }
      if ((<any>this.data).SelectedStateId != undefined) {
        state = (<any>this.data).SelectedStateId;
      }
      this.CityFormData = this.fb.group({
        'name': ['', Validators.required],
        'shortname': ['', Validators.required],
        'country': [country, Validators.required],
        'state': [state, Validators.required]
      });
    }
  }

  SelectCountry(e) {
    this.spinner.show();
    this.organizationService.GetState(e.value).subscribe((res: any) => {
      if (res.Status == 200) {
        this.spinner.hide();
        this.StateList = res.Data;
      }
    }, error => {
      console.log(error);
    })
  }

  public isDisabled: boolean = false;

  CreateCity() {
    if (this.CityFormData.valid) {
      this.isDisabled = true
      this.spinner.show();
      this.countrystatecityService.CreateCity(this.CityFormData.value).subscribe((res: any) => {
        if (res.Status == 200) {
          this.spinner.hide();
          this.isDisabled = false
          this.CallBackData = res.result;
          this.onNoClick();

        }
      }, error => {
        console.log(error);
      })
    }
  }

  EditCity() {
    if (this.CityFormData.valid) {
      this.isDisabled = true
      this.spinner.show();
      this.countrystatecityService.EditCity(this.CityFormData.value, this.CityData._id).subscribe((res: any) => {
        if (res.Status == 200) {
          this.spinner.hide();
          this.isDisabled = false
          this.CallBackData = "";
          this.onNoClick();

        }
      }, error => {
        console.log(error);
      })
    }
  }
}

/*---------------------------------------------------------------------------------------*/