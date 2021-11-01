import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetSubCollectionForViewDto, SubCollectionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewSubCollectionModal',
    templateUrl: './view-subCollection-modal.component.html',
})
export class ViewSubCollectionModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetSubCollectionForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetSubCollectionForViewDto();
        this.item.subCollection = new SubCollectionDto();
    }

    show(item: GetSubCollectionForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
