import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { TagsServiceProxy, CreateOrEditTagDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditTagModal',
    templateUrl: './create-or-edit-tag-modal.component.html',
})
export class CreateOrEditTagModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    tag: CreateOrEditTagDto = new CreateOrEditTagDto();

    constructor(
        injector: Injector,
        private _tagsServiceProxy: TagsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(tagId?: number): void {
        if (!tagId) {
            this.tag = new CreateOrEditTagDto();
            this.tag.id = tagId;

            this.active = true;
            this.modal.show();
        } else {
            this._tagsServiceProxy.getTagForEdit(tagId).subscribe((result) => {
                this.tag = result.tag;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._tagsServiceProxy
            .createOrEdit(this.tag)
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
