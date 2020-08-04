import { Component, OnInit } from '@angular/core';
import { DalService } from '../shared/services/dal.service';
import RepositoryModel from '../shared/models/RepositoryModel';


@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedItemsComponent implements OnInit {
  savedData: RepositoryModel[] = [];

  constructor(private dal: DalService) {
    this.dal.getSavedItems().subscribe((data) => { this.savedData = data as RepositoryModel[]; });
  }

  ngOnInit() {
    this.dal.getSavedItems().subscribe((data) => { this.savedData = data as RepositoryModel[]; });
  }
}
