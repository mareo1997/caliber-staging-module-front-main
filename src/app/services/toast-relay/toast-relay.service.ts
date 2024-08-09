import { Injectable } from '@angular/core';
import { ToastBox } from 'src/app/components/toast-message/toast-message.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastRelayService {
  toasts: ToastBox[] = [];
  constructor() {}

  /**
   * Constrcuts a new toast message adding it to the toasts array, making adjustments to the
    size of the array if the length is exceeded.
   * @param toast
   */
  addToast(toast: ToastBox) {
    if (this.toasts.length > 3) {
      this.toasts.shift();
    }
    this.toasts.push(toast);
  }

  /**
   * removes a toast message
   * @param toast
   */
  remove(toast: ToastBox) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }
}
