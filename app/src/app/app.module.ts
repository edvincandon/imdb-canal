import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component'
import { APIService } from './services/api/api.service'
import { ModalComponent } from './components/modal/modal.component'
import { ModalService } from './services/modal/modal.service'
import { FormComponent } from './components/forms/form.component'

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [APIService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
