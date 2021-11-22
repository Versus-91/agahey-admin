import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject, Injector, OnInit, Optional, Output, ViewChild } from '@angular/core';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { AppComponentBase } from '@shared/common/app-component-base';
import { API_BASE_URL, CreateOrEditItemDto, ItemsServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ItemSubCollectionLookupTableModalComponent } from './item-subCollection-lookup-table-modal.component';

@Component({
    selector: 'createOrEditItemModal',
    templateUrl: './create-or-edit-item-modal.component.html',
})
export class CreateOrEditItemModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('itemSubCollectionLookupTableModal', { static: true })
    itemSubCollectionLookupTableModal: ItemSubCollectionLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: CreateOrEditItemDto = new CreateOrEditItemDto();

    subCollectionTitle = '';
    public progress: number;
    public uploadMessage: string;
    baseUrl: string;
    @Output() public onUploadFinished = new EventEmitter();
    constructor(
        injector: Injector,
        private http: HttpClient,
        private _itemsServiceProxy: ItemsServiceProxy,
        private _dateTimeService: DateTimeService,
        @Optional() @Inject(API_BASE_URL) baseUrl?: string
    ) {
        super(injector);
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : 'https://localhost:44301';
    }

    show(itemId?: number): void {
        if (!itemId) {
            this.item = new CreateOrEditItemDto();
            this.item.id = itemId;
            this.subCollectionTitle = '';

            this.active = true;
            this.modal.show();
        } else {
            this._itemsServiceProxy.getItemForEdit(itemId).subscribe((result) => {
                this.item = result.item;

                this.subCollectionTitle = result.subCollectionTitle;

                this.active = true;
                this.modal.show();
            });
        }
    }
    public uploadFile = (files) => {
        if (files.length === 0) {
            return;
        }
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        this.http
            .post(this.baseUrl + '/upload?itemid=' + this.item.id, formData, {
                reportProgress: true,
                observe: 'events',
            })
            .subscribe((event) => {
                if (event.type === HttpEventType.UploadProgress)
                    this.progress = Math.round((100 * event.loaded) / event.total);
                else if (event.type === HttpEventType.Response) {
                    this.uploadMessage = 'Upload success.';
                    this.onUploadFinished.emit(event.body);
                }
            });
    };
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

    openSelectSubCollectionModal() {
        this.itemSubCollectionLookupTableModal.id = this.item.subCollectionId;
        this.itemSubCollectionLookupTableModal.displayName = this.subCollectionTitle;
        this.itemSubCollectionLookupTableModal.show();
    }

    setSubCollectionIdNull() {
        this.item.subCollectionId = null;
        this.subCollectionTitle = '';
    }

    getNewSubCollectionId() {
        this.item.subCollectionId = this.itemSubCollectionLookupTableModal.id;
        this.subCollectionTitle = this.itemSubCollectionLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}
