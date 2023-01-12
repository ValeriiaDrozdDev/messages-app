import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { State } from 'src/app/reducers';
import Message from '../../interfaces/message.interface';
import { selectMessages } from '../../store/selector/message.selectors';

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MessageTableComponent {
  messages$!: Observable<Message[]>;
  messagesPaginated: Message[] = [];
  columnsToDisplay: Array<keyof Message> = ['id', 'name', 'message', 'date'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: Message | null;

  mapTableLabels: Record<keyof Message, string> = {
    id: 'ID',
    name: 'Name',
    message: 'Message',
    date: 'Date',
  };

  pageIndex = 0;
  pageSize = 5;

  constructor(private store: Store<State>) {
    this.messages$ = this.store.pipe(select(selectMessages));
    this.store
      .pipe(
        filter((store) => !store.message.loading),
        take(1)
      )
      .subscribe((store) => {
        this.setPaginatedMessages(store.message.messages);
      });

    this.messages$.subscribe((messages) => this.setPaginatedMessages(messages));
  }

  private setPaginatedMessages(messages: Message[]) {
    this.messagesPaginated = messages.filter(
      (_, index) =>
        index >= this.pageIndex * this.pageSize &&
        index < (this.pageIndex + 1) * this.pageSize
    );
  }

  public onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.messages$
      .pipe(take(1))
      .subscribe((messages) => this.setPaginatedMessages(messages));
  }
}
