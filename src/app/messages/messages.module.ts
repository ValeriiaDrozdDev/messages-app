import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePageComponent } from './pages/message-page/message-page.component';
import { MessageDialogComponent } from './dialogs/message-dialog/message-dialog.component';
import { MessageTableComponent } from './components/message-table/message-table.component';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from './store/effect/message.effects';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import {
  messageFeatureKey,
  messagesReducer,
} from './store/reducer/message.reducer';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  declarations: [
    MessagePageComponent,
    MessageDialogComponent,
    MessageTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature(messageFeatureKey, messagesReducer),
    EffectsModule.forFeature([MessageEffects]),
    CoreModule,
    SharedModule,
    MessagesRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
})
export class MessagesModule {}
