import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DalService } from './shared/services/dal.service';
//import RepositoryModel from './shared/models/RepositoryModel';
//import RepositoryModel from '../app/shared/models/RepositoryModel';

@Component({
  selector: '<app-root>',
  templateUrl : './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit 
{
  repositories: RepositoryModel[] = [];
  title: string;
  searchvalue: string = '';
  showSaved: boolean = false;
  subscription: Subscription;
  constructor(private dal: DalService) {

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleError(error: any): any {
       console.log(error);
  }


  searchRepositories() {
    console.log(this.searchvalue);
    this.repositories = [];
    this.subscription = this.dal.getSearchResults(this.searchvalue).subscribe((data) => { this.repositories = data as RepositoryModel[]; console.log(data) }, (error) => this.handleError(error));
  
  }

  bookmark(id: any) {
    console.log(id);
    let item: RepositoryModel;
    item = this.repositories.filter(item => item.id == id)[0];
    console.log(item);
    this.dal.saveiteminsession(item).subscribe((data) => { console.log(data) });
  }



}

 interface RepositoryModel {
  id: number;
  name: string;
  owner: Owner
}

 interface Owner {
  id: number;
  login: string;
  avatar_url: string
}


