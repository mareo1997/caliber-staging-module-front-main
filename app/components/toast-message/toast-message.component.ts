import { Component, OnInit } from '@angular/core';
import { ToastRelayService } from 'src/app/services/toast-relay/toast-relay.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.css'],
})
export class ToastMessageComponent {
  /**
   * This component creates a toast notification using it's template.
   * The data is provided through the servie classes and toast-message
   * interface to render the data to the user interface.
   * @param toastService
   */
  constructor(public toastService: ToastRelayService) {}
}
