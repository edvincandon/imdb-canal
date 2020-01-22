import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  public opened = false;

  toggle() {
    this.opened = !this.opened;
  }
}
