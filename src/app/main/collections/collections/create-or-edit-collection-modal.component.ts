import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CollectionsServiceProxy, CreateOrEditCollectionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditCollectionModal',
    templateUrl: './create-or-edit-collection-modal.component.html',
})
export class CreateOrEditCollectionModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    collection: CreateOrEditCollectionDto = new CreateOrEditCollectionDto();

    constructor(
        injector: Injector,
        private _collectionsServiceProxy: CollectionsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(collectionId?: number): void {
        if (!collectionId) {
            this.collection = new CreateOrEditCollectionDto();
            this.collection.id = collectionId;

            this.active = true;
            this.modal.show();
        } else {
            this._collectionsServiceProxy.getCollectionForEdit(collectionId).subscribe((result) => {
                this.collection = result.collection;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._collectionsServiceProxy
            .createOrEdit(this.collection)
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

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}
