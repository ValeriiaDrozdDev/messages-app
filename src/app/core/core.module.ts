import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, SpinnerComponent],
})
export class CoreModule {}
