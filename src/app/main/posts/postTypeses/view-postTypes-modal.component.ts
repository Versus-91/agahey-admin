import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetPostTypesForViewDto, PostTypesDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewPostTypesModal',
    templateUrl: './view-postTypes-modal.component.html',
})
export class ViewPostTypesModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetPostTypesForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetPostTypesForViewDto();
        this.item.postTypes = new PostTypesDto();
    }

    show(item: GetPostTypesForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
