import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
declare var http: any;

export class AppConfig implements OnInit {
    constructor(private router: Router, private http: HttpClient) { }
    ngOnInit() {

    }
}

export function getServerPath() {
    let returnValue;
    returnValue = 'https://alphawizz.org/Education';
    // returnValue = 'http://localhost:8888';
    return returnValue;
}