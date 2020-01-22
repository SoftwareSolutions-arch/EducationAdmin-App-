import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getServerPath } from '../../../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  apiUrl = getServerPath();
  constructor(private http: HttpClient) { }
  CreateOrg(val, logo) {
    const headers = new HttpHeaders({ 'Accept': 'multipart/form-data' });
    let jsonInput:any = JSON.stringify({
      "organizationname": val.organizationname,
      "pincode": val.pincode,
      "state": val.state,
      "country": val.country,
      "city": val.city,
      "contactno": val.contactno,
      "address1": val.address1,
      "address2": val.address2,
      "lat": val.lat,
      "lng": val.long,
      "updatedlogo":val.updatedlogo,
    });

    const params = new FormData();
    params.append("jsonInput", jsonInput);
    params.append('logo', logo);
    return this.http.post(`${this.apiUrl}/orgazizationapi/createOrganization`, params,{
      headers: headers,
    });
  }

  UpdateOrg(val, logo1,id) {
    const headers = new HttpHeaders({ 'Accept': 'multipart/form-data' });
    let jsonInput:any = JSON.stringify({
      "organizationname": val.organizationname,
      "pincode": val.pincode,
      "state": val.state,
      "country": val.country,
      "city": val.city,
      "contactno": val.contactno,
      "address1": val.address1,
      "address2": val.address2,
      "lat": val.lat,
      "lng": val.long,
      "updatedlogo":val.updatedlogo,
    });
    const params = new FormData();
    params.append("jsonInput", jsonInput);
    params.append('logo', logo1);

    return this.http.put(`${this.apiUrl}/orgazizationapi/updateOrganization/${id}`, params,{
      headers: headers,
    });
  }

  GetOrg(status) {
    var jsonInput = {
      status : status
    }
    return this.http.post(`${this.apiUrl}/orgazizationapi/organizationList`,jsonInput);
  }

  GetbasicOrganizationFilter() {
    var jsonInput = {}
    return this.http.post(`${this.apiUrl}/orgazizationapi/basicOrganizationFilter`,jsonInput);
  }

  GetSingleOrg(id) {
    return this.http.get(`${this.apiUrl}/orgazizationapi/getOrganization/${id}`);
  }

  GetCountry() {
    return this.http.get(`${this.apiUrl}/authApi/countrylist`);
  }

  GetState(id) {
    return this.http.get(`${this.apiUrl}/authApi/statelist/${id}`);
  }

  GetCity(id) {
    return this.http.get(`${this.apiUrl}/authApi/citylist/${id}`);
  }

  GetBranch(id) {
    return this.http.get(`${this.apiUrl}/branchapi/branchListdata/${id}`);
  }

}
