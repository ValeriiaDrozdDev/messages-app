import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMessages from '../reducer/message.reducer';

export const selectMessagesState =
  createFeatureSelector<fromMessages.MessagesState>(
    fromMessages.messageFeatureKey
  );

export const selectMessages = createSelector(
  selectMessagesState,
  (state: fromMessages.MessagesState) => state.messages
);
