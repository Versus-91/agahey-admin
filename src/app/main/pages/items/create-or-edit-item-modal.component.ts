import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ItemsServiceProxy, CreateOrEditItemDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { ItemCollectionLookupTableModalComponent } from './item-collection-lookup-table-modal.component';

@Component({
    selector: 'createOrEditItemModal',
    templateUrl: './create-or-edit-item-modal.component.html',
})
export class CreateOrEditItemModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('itemCollectionLookupTableModal', { static: true })
    itemCollectionLookupTableModal: ItemCollectionLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: CreateOrEditItemDto = new CreateOrEditItemDto();

    collectionName = '';

    constructor(
        injector: Injector,
        private _itemsServiceProxy: ItemsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(itemId?: number): void {
        if (!itemId) {
            this.item = new CreateOrEditItemDto();
            this.item.id = itemId;
            this.collectionName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._itemsServiceProxy.getItemForEdit(itemId).subscribe((result) => {
                this.item = result.item;

                this.collectionName = result.collectionName;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._itemsServiceProxy
            .createOrEdit(this.item)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    openSelectCollectionModal() {
        this.itemCollectionLookupTableModal.id = this.item.collectionId;
        this.itemCollectionLookupTableModal.displayName = this.collectionName;
        this.itemCollectionLookupTableModal.show();
    }

    setCollectionIdNull() {
        this.item.collectionId = null;
        this.collectionName = '';
    }

    getNewCollectionId() {
        this.item.collectionId = this.itemCollectionLookupTableModal.id;
        this.collectionName = this.itemCollectionLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}
