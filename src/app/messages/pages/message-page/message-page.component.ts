import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';
import { State } from 'src/app/reducers';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { addMessage, fetchMessages } from '../../store/action/message.actions';

@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss'],
})
export class MessagePageComponent implements OnInit {
  loading$!: Observable<boolean>;
  constructor(
    public store: Store<State>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.loading$ = this.store.select((store) => store.message.loading);
    this.store.dispatch(fetchMessages());
  }

  public onClick() {
    const dialogRef = this.dialog.open(MessageDialogComponent);
    dialogRef.afterClosed().subscribe((message) => {
      if (message) {
        this.store.dispatch(addMessage({ message }));
        this.store
          .pipe(
            filter((store) => !store.message.loading),
            take(1)
          )
          .subscribe(() => {
            this.snackBar.open('Message is added', undefined, {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          });
      }
    });
  }
}
