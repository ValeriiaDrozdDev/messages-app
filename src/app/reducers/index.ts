import {
  messageFeatureKey,
  MessagesState,
} from '../messages/store/reducer/message.reducer';

export interface State {
  [messageFeatureKey]: MessagesState;
}
