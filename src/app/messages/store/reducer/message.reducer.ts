import { createReducer, on } from '@ngrx/store';
import Message from '../../interfaces/message.interface';
import {
  addMessage,
  addMessageFailure,
  addMessageSuccess,
  fetchMessages,
  fetchMessagesFailure,
  fetchMessagesSuccess,
} from '../action/message.actions';

export const messageFeatureKey = 'message';

export interface MessagesState {
  messages: Message[];
  error: string | null;
  loading: boolean;
}

export const initialMessagesState: MessagesState = {
  messages: [],
  error: null,
  loading: true,
};

export const messagesReducer = createReducer(
  initialMessagesState,
  on(fetchMessages, (state) => ({ ...state, loading: true })),
  on(fetchMessagesSuccess, (state, { messages }) => {
    return { ...state, messages, loading: false };
  }),
  on(fetchMessagesFailure, (state) => {
    return { ...state, error: 'Can not fetch messages!', loading: false };
  }),

  on(addMessage, (state) => {
    return { ...state, loading: true };
  }),
  on(addMessageSuccess, (state, { message }) => {
    return { ...state, messages: [message, ...state.messages], loading: false };
  }),
  on(addMessageFailure, (state) => {
    return { ...state, error: 'Can not add message!', loading: false };
  })
);
