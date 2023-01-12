import { createAction, props } from '@ngrx/store';
import Message from '../../interfaces/message.interface';

export const fetchMessages = createAction('[Message] Fetch Messages');

export const addMessage = createAction(
  '[Message]  Add Message',
  props<{ message: Message }>()
);

export const fetchMessagesSuccess = createAction(
  '[Message] Fetch Messages Success',
  props<{ messages: Message[] }>()
);

export const fetchMessagesFailure = createAction(
  '[Message] Fetch Messages Failure',
  props<{ error: string }>()
);

export const addMessageSuccess = createAction(
  '[Message]  Add Message Success',
  props<{ message: Message }>()
);

export const addMessageFailure = createAction(
  '[Message] Add Message Failure',
  props<{ error: string }>()
);
