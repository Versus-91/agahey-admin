import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetTagForViewDto, TagDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'masterDetailChild_Post_viewTagModal',
    templateUrl: './masterDetailChild_Post_view-tag-modal.component.html',
})
export class MasterDetailChild_Post_ViewTagModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetTagForViewDto;

    constructor(injector: Injector) {
        super(injector);
        this.item = new GetTagForViewDto();
        this.item.tag = new TagDto();
    }

    show(item: GetTagForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
