import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Input() public message: string;
  @Output() public close: EventEmitter<void> = new EventEmitter<void>();

  public onClose (): void {
    this.close.emit();
  }
}
