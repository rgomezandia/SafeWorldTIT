import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestStorage {

  id:number;
  user:string;
  nombre:string;
  status=false;

  constructor(public httpClient: HttpClient) {}

  setUser(user:string)
  {
    this.user=user;
    this.status=true;
  }

  setId(id:number)
  {
    this.id=id;
  }

  getId()
  {
    return this.id;
  }

  getStatus()
  {
    return this.status;
  }

  setNombre(nombre:string)
  {
    this.nombre=nombre;
  }

  getNombre()
  {
    return this.nombre;
  }

  getUser()
  {
    return this.user;
  }

  deleteUser()
  {
    this.user="";
    this.nombre ="";
    this.status=false;
  }
}
