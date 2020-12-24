import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DesafiosFormPage } from './desafios-form';

@NgModule({
  declarations: [
    DesafiosFormPage,
  ],
  imports: [
    IonicPageModule.forChild(DesafiosFormPage),
  ],
})
export class DesafiosFormPageModule {}
