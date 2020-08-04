
import { Injectable, Inject } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import RepositoryModel from '../models/RepositoryModel';

@Injectable()
export class DalService {

  baseUrl: string = 'http://localhost:65222';

  //

  constructor(private _http: HttpClient) {

  }

  getSearchResults(value:any): Observable<RepositoryModel[]> {
    return this._http.get<RepositoryModel[]>("http://localhost:65222/api/github/getsearchresult?value=" + value);
  }

  saveiteminsession(item: RepositoryModel): Observable<any> {
    return this._http.post<RepositoryModel>("http://localhost:65222/api/github/SaveItemInSession", item, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  getSavedItems(): Observable<RepositoryModel[]> {
    return this._http.get<RepositoryModel[]>("http://localhost:65222/api/github/GetSavedItems");
  }
}


//  getSetOfLists(controller: string, action: string, parameters: Object, ...types: any[]): Observable<Object[]> {

 

//    let apiURL = `${this.baseUrl}/${controller}/${action}`;

//    let params = new HttpParams()

//    for (var prop in parameters) {

//      if (parameters[prop] instanceof Array) {

//        parameters[prop].forEach(function (value: any) {

//          params = params.append(prop, value)

//        });

//      }

//      else

//        params = params.set(prop, parameters[prop]);

//    }

//    return this.http

//      .get(apiURL, { params })

//      .pipe(

//        map((response) => {

//          if (types.length == 0) {

//            //debugger;

//            return <Object[]>response;

//          }

//          else {

//            //debugger;

//            let returnedArray: Object[] = <Object[]>response;

//            let mappedArray: Object[] = [];

//            for (let i: number = 0; i < types.length; i++) {

//              if (types[i]) {

//                mappedArray.push(this.deserialize(returnedArray[i], types[i]));

//              }

//              else {

//                mappedArray.push(returnedArray[i]);

//              }

//            }

//            //debugger;

//            return mappedArray;

//          }

//        })

//      );   

//  }

 

//  public deserialize(json: any, clazz: any): any {

//    var res: Array<Object>;

//    if (json instanceof Array) {

//      res = new Array();

//      for (let item of json) {

//        res.push(this.jsonToObj(item, clazz));

//      }

//      return res;

//    }

//    else {

//      return this.jsonToObj(json, clazz);

//    }

//  }

//  public jsonToObj(json: any, clazz: any): Object {

//    //debugger;

//    var instance = new clazz();

//    for (var prop in json) {

//      if (json.hasOwnProperty(prop)) {

//       if (typeof instance[prop] === 'object' && this.getType(instance[prop]) != 'array' && json[prop] != null) {

//          instance[prop] = new Date(json[prop]);

//        }

//        else {

//          instance[prop] = json[prop];

//        }

//        if (instance.hasOwnProperty(prop + "_origin")) {

//          instance[prop + "_origin"] = instance[prop];

//        }

//      }

//    }

//    return instance;

//  }

//  private getType(obj: any): any {

//    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

//  }

 

//  public resetOrigin(obj: any): void {

//    if (obj instanceof Array) {

//      for (let item of obj) {

//        this.resetOriginObj(item);

//      }

//    }

//    else {

//      this.resetOriginObj(obj);

//    }

//  }

//  private resetOriginObj(obj: any): void {

//    //debugger;

//    for (var prop in obj) {

//      if (obj.hasOwnProperty(prop + '_origin')) {

//        obj[prop + "_origin"] = obj[prop];

//      }

//    }

//  }

//}

