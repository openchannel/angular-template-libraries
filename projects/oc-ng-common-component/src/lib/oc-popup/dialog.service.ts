import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Injectable, OnInit, Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

export type ViewMode = 'deployee' | 'subscribe';
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  ngbModalRef: NgbModalRef;

  constructor(public modalService: NgbModal, config: NgbModalConfig, public router: Router) {
    config.backdrop = 'static';
    config.keyboard = true;
  }
  showAppConfirmPopup(component: Component, title: string, type: string,
    cancelButtonText: string, confirmButtonText: string, text: string, textVariable: string,
    informationalText: string, confirmCallback?, cancelCallback?) {
    const modalRef = this.modalService.open(component, { size: 'lg submit-app', backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.text = text;
    modalRef.componentInstance.textVariable = textVariable;
    modalRef.componentInstance.informationalText = informationalText;
    modalRef.componentInstance.cancelButtonText = cancelButtonText;
    modalRef.componentInstance.confirmButtonText = confirmButtonText;
    modalRef.componentInstance.confirmCallback = confirmCallback;
    modalRef.componentInstance.closeIconUrl = "assets/img/close-icon.svg";
    modalRef.componentInstance.type = type;
    if (cancelCallback) {
      modalRef.componentInstance.cancelCallback = cancelCallback;
    } else {
      modalRef.componentInstance.cancelCallback = function () {
        modalRef.close(false);
      }
    }
    modalRef.componentInstance.closeCallBack = function () {
      modalRef.close(false);
    }
    return modalRef;
  }


  showConfirmDialog(component: Component, size, title: string, type: string,
    cancelButtonText: string, confirmButtonText: string, text: string, textVariable: string,
    informationalText: string, confirmCallback?, cancelCallback?) {
    const modalRef = this.modalService.open(component, { size: size + ' submit-app', backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.text = text;
    modalRef.componentInstance.textVariable = textVariable;
    modalRef.componentInstance.informationalText = informationalText;
    modalRef.componentInstance.cancelButtonText = cancelButtonText;
    modalRef.componentInstance.confirmButtonText = confirmButtonText;
    modalRef.componentInstance.confirmCallback = confirmCallback;
    modalRef.componentInstance.closeIconUrl = "assets/img/close-icon.svg";
    modalRef.componentInstance.type = type;

    if (cancelCallback) {
      modalRef.componentInstance.cancelCallback = cancelCallback;
    } else {
      modalRef.componentInstance.cancelCallback = function () {
        modalRef.close(false);
      }
    }
    modalRef.componentInstance.closeCallBack = function () {
      modalRef.close(false);
    }
    return modalRef;
  }
}
