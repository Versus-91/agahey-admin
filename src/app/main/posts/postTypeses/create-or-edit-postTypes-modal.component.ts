import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { PostTypesesServiceProxy, CreateOrEditPostTypesDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditPostTypesModal',
    templateUrl: './create-or-edit-postTypes-modal.component.html',
})
export class CreateOrEditPostTypesModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    postTypes: CreateOrEditPostTypesDto = new CreateOrEditPostTypesDto();

    constructor(
        injector: Injector,
        private _postTypesesServiceProxy: PostTypesesServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(postTypesId?: number): void {
        if (!postTypesId) {
            this.postTypes = new CreateOrEditPostTypesDto();
            this.postTypes.id = postTypesId;

            this.active = true;
            this.modal.show();
        } else {
            this._postTypesesServiceProxy.getPostTypesForEdit(postTypesId).subscribe((result) => {
                this.postTypes = result.postTypes;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._postTypesesServiceProxy
            .createOrEdit(this.postTypes)
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
