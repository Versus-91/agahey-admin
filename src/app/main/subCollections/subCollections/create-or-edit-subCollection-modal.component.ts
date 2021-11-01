import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { SubCollectionsServiceProxy, CreateOrEditSubCollectionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { SubCollectionCollectionLookupTableModalComponent } from './subCollection-collection-lookup-table-modal.component';

@Component({
    selector: 'createOrEditSubCollectionModal',
    templateUrl: './create-or-edit-subCollection-modal.component.html',
})
export class CreateOrEditSubCollectionModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('subCollectionCollectionLookupTableModal', { static: true })
    subCollectionCollectionLookupTableModal: SubCollectionCollectionLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    subCollection: CreateOrEditSubCollectionDto = new CreateOrEditSubCollectionDto();

    collectionName = '';

    constructor(
        injector: Injector,
        private _subCollectionsServiceProxy: SubCollectionsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(subCollectionId?: number): void {
        if (!subCollectionId) {
            this.subCollection = new CreateOrEditSubCollectionDto();
            this.subCollection.id = subCollectionId;
            this.collectionName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._subCollectionsServiceProxy.getSubCollectionForEdit(subCollectionId).subscribe((result) => {
                this.subCollection = result.subCollection;

                this.collectionName = result.collectionName;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._subCollectionsServiceProxy
            .createOrEdit(this.subCollection)
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
        this.subCollectionCollectionLookupTableModal.id = this.subCollection.collectionId;
        this.subCollectionCollectionLookupTableModal.displayName = this.collectionName;
        this.subCollectionCollectionLookupTableModal.show();
    }

    setCollectionIdNull() {
        this.subCollection.collectionId = null;
        this.collectionName = '';
    }

    getNewCollectionId() {
        this.subCollection.collectionId = this.subCollectionCollectionLookupTableModal.id;
        this.collectionName = this.subCollectionCollectionLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}
