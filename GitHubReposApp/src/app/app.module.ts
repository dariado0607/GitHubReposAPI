import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DalService } from './shared/services/dal.service';
import { SavedItemsComponent } from './components/saved.component';




@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent, SavedItemsComponent],
  bootstrap: [AppComponent],
  entryComponents: [SavedItemsComponent],
  providers: [DalService]
})
export class AppModule { }
