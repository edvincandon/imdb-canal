import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class ModalService {
  public opened: boolean = false

  toggle() {
    this.opened = !this.opened
  }
}
