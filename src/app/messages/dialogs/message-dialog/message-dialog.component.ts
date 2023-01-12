import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit {
  messageForm!: FormGroup;
  constructor(public messageDialogRef: MatDialogRef<MessageDialogComponent>) {}
  public ngOnInit() {
    this.messageForm = new FormGroup({
      name: new FormControl(''),
      message: new FormControl(''),
    });
  }
  public onClose(): void {
    this.messageDialogRef.close();
  }
  public onSubmit(): void {
    if (this.messageForm.valid) {
      this.messageDialogRef.close({
        ...this.messageForm.value,
      });
    }
  }
}
