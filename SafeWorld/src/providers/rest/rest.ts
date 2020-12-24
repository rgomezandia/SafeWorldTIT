import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class RestProvider {

  constructor(public httpClient: HttpClient) {}

  post(serviceName: string, data: any)
  {
    return this.httpClient.post(environment.apiUrl+serviceName, data);
  }

}


