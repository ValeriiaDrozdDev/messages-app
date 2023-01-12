import { Injectable } from '@angular/core';

import { CollectionReference, collection, addDoc } from '@firebase/firestore';
import {
  collectionData,
  Firestore,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';

import Message from '../interfaces/message.interface';

interface ApiMessage {
  id: string;
  name: string;
  message: string;
  date?: {
    seconds: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messagesCollection!: CollectionReference<ApiMessage>;
  private readonly MESSAGES_COLLECTION = 'messages';

  constructor(private readonly firestore: Firestore) {
    this.messagesCollection = <CollectionReference<ApiMessage>>(
      collection(this.firestore, this.MESSAGES_COLLECTION)
    );
  }

  private mapDate(date?: { seconds: number }) {
    return new Date((date?.seconds ?? 0) * 1000);
  }

  public getAllMessages() {
    const orderQuery = query(this.messagesCollection, orderBy('date', 'desc'));
    return collectionData(orderQuery, {
      idField: 'id',
    }).pipe(
      map((messages) =>
        messages.map((m: ApiMessage) => ({
          ...m,
          date: this.mapDate(m.date),
        }))
      )
    ) as Observable<Message[]>;
  }
  public addMessage(message: Message): Observable<Message> {
    const currentMessage = {
      ...message,
      date: new Date(),
    } as ApiMessage & { date: Date };
    return from(addDoc(this.messagesCollection, currentMessage)).pipe(
      map((m) => ({ ...currentMessage, id: m.id }))
    );
  }
}
