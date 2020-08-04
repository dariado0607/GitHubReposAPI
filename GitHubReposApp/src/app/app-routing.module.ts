import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SavedItemsComponent } from './components/saved.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: AppComponent },
  { path: 'saved', component: SavedItemsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
