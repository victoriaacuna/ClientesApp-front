import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: Boolean = false;
  private _notifyUpload: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  openModal(){
    this.modal=true;
  }

  get notifyUpload(): EventEmitter<any>{
    return this._notifyUpload;
  }

  closeModal(){
    this.modal=false;
  }
}
