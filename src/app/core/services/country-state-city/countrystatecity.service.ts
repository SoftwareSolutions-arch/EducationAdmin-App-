import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { getServerPath } from '../../../shared/app.config';

@Injectable({
  providedIn: 'root'
})
export class CountrystatecityService {

  apiUrl = getServerPath();
  constructor(private http: HttpClient) { }

  CreateCountry(val) {
    let jsonInput = {
      "name": val.name,
      "shortname": val.shortname,
    }
    return this.http.post(`${this.apiUrl}/userapi/addCountry`, jsonInput);
  }

  CreateState(val) {
    let jsonInput = {
      "name": val.name,
      "shortname": val.shortname,
      "country": val.country,
    }
    return this.http.post(`${this.apiUrl}/userapi/addState`, jsonInput);
  }

  CreateCity(val) {
    let jsonInput = {
      "name": val.name,
      "shortname": val.shortname,
      "state":val.state,
      "country":val.country,
    }
    return this.http.post(`${this.apiUrl}/userapi/addCity`, jsonInput);
  }

  EditCountry(val,id) {
    let jsonInput = {
      "name": val.name,
      "shortname": val.shortname,
    }
    return this.http.put(`${this.apiUrl}/userapi/updateCountry/${id}`, jsonInput);
  }

  EditState(val,id) {
    let jsonInput = {
      "name": val.name,
      "shortname": val.shortname,
      "country": val.country,
    }
    return this.http.put(`${this.apiUrl}/userapi/updateState/${id}`, jsonInput);
  }

  EditCity(val,id) {
    let jsonInput = {
      "name": val.name,
      "shortname": val.shortname,
      "state":val.state,
      "country":val.country,
    }
    return this.http.put(`${this.apiUrl}/userapi/updateCity/${id}`, jsonInput);
  }

  DeleteCountry(id) {
    return this.http.delete(`${this.apiUrl}/userapi/deleteCountry/${id}`,{});
  }

  DeleteState(id) {
    return this.http.delete(`${this.apiUrl}/userapi/deleteState/${id}`,{});
  }

  DeleteCity(id) {
    return this.http.delete(`${this.apiUrl}/userapi/deleteCity/${id}`,{});
  }


}
