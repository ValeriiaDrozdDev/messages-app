import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, take } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import {
  addMessage,
  addMessageFailure,
  addMessageSuccess,
  fetchMessages,
  fetchMessagesFailure,
  fetchMessagesSuccess,
} from '../action/message.actions';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private messageService: MessagesService
  ) {}

  public fetchMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchMessages),
      mergeMap(() => {
        return this.messageService.getAllMessages().pipe(
          take(1),
          map((messages) => {
            return fetchMessagesSuccess({ messages });
          }),
          catchError(async (error) => {
            return fetchMessagesFailure({ error });
          })
        );
      })
    )
  );

  public addMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMessage),
      mergeMap(({ message }) => {
        return this.messageService.addMessage(message).pipe(
          take(1),
          map((newMessage) => addMessageSuccess({ message: newMessage })),
          catchError(async (error) => {
            return addMessageFailure({ error });
          })
        );
      })
    )
  );
}
