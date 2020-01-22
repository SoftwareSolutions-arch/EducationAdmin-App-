import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, NgForm, Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { getServerPath } from '../shared/app.config';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  ArticleForm: FormGroup;
  AddArticle:FormGroup;
  
  apiUrl = getServerPath();
  public articleList: any = [];
  public articleDetails: any = [];

  public tempurl: any;
  p: number = 1;
  Title: string;
  showarticlelist: boolean = true;
  showarticledetails: boolean = false;
  addarticleList: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private spinner: NgxSpinnerService) {
    this.ArticleForm = fb.group({
      'article': ['', Validators.compose([Validators.required])],
      'articledetails': ['', Validators.compose([Validators.required])],
    });
    this.AddArticle = fb.group({
      'title': ['', Validators.compose([Validators.required])],
      'detailText': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.getArticles();
  }

  saveArticles(){
    this.showarticlelist = false;
    this.showarticledetails = false;
    this.addarticleList = true;
  }

  getArticles(){
    this.http.get(`${this.apiUrl}/userapi/getallarticle`).subscribe((res: any) => {
      if (res.Status == 200) {
        this.Title = "List"
        this.spinner.hide();
        this.articleList = res.result;
      } else {
        this.articleList = [];
      }
    });
  }

  EditArticles(article) {
    this.tempurl = article.articleDetailUrl;
    let params = {
      "Id": article.articleDetailUrl
    }
    this.http.post(`${this.apiUrl}/userapi/getarticlebyid`, params).subscribe((res: any) => {
      if (res.Status == 200) {
        this.Title = "Details"
        this.showarticlelist = false;
        this.showarticledetails = true;
        this.spinner.hide();
        this.articleDetails = res.result;
        this.ArticleForm = this.fb.group({
          'article': [this.articleDetails.title, Validators.compose([Validators.required, Validators.email])],
          'articledetails': [this.articleDetails.detailText, Validators.compose([Validators.required])],
        });
      } else {
        this.articleDetails = [];
      }
    });
  }

  DeleteArticles(article) {
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
        this.http.delete(`${this.apiUrl}/userapi/deletearticle/` + article._id).subscribe(res => {
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

  CancelArticle() {
    this.showarticlelist = true;
    this.showarticledetails = false;
    this.addarticleList = false;
  }

  UpdateArticle() {
    let params = {
      "title": this.ArticleForm.value.article,
      "detailText": this.ArticleForm.value.articledetails,
      "articleDetailUrl": this.tempurl
    }
    this.http.put(`${this.apiUrl}/userapi/updatearticle`, params).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
          this.showarticlelist = true;
          this.showarticledetails = false;
          this.getArticles();
          
        
      } else {
        Swal.fire({
          title: 'Error?',
          text: 'Something went wrong!',
          icon: 'warning'
        })
      }
    })
  }

  submitArticle() {
    this.AddArticle.get('title').value;
    this.AddArticle.get('detailText').value;
    let value = {}
    value = this.AddArticle.value;
    this.http.post(`${this.apiUrl}/userapi/createarticle`, value).subscribe((res: any) => {
      if (res.Status == 200) {
        Swal.fire({
          title: 'Success!',
          text: res.Message,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
        })
        this.ngOnInit();
        this.CancelArticle();
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