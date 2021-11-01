import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CommentsServiceProxy, CreateOrEditCommentDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { CommentItemLookupTableModalComponent } from './comment-item-lookup-table-modal.component';

@Component({
    selector: 'createOrEditCommentModal',
    templateUrl: './create-or-edit-comment-modal.component.html',
})
export class CreateOrEditCommentModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('commentItemLookupTableModal', { static: true })
    commentItemLookupTableModal: CommentItemLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    comment: CreateOrEditCommentDto = new CreateOrEditCommentDto();

    itemTitle = '';

    constructor(
        injector: Injector,
        private _commentsServiceProxy: CommentsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(commentId?: number): void {
        if (!commentId) {
            this.comment = new CreateOrEditCommentDto();
            this.comment.id = commentId;
            this.itemTitle = '';

            this.active = true;
            this.modal.show();
        } else {
            this._commentsServiceProxy.getCommentForEdit(commentId).subscribe((result) => {
                this.comment = result.comment;

                this.itemTitle = result.itemTitle;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._commentsServiceProxy
            .createOrEdit(this.comment)
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

    openSelectItemModal() {
        this.commentItemLookupTableModal.id = this.comment.itemId;
        this.commentItemLookupTableModal.displayName = this.itemTitle;
        this.commentItemLookupTableModal.show();
    }

    setItemIdNull() {
        this.comment.itemId = null;
        this.itemTitle = '';
    }

    getNewItemId() {
        this.comment.itemId = this.commentItemLookupTableModal.id;
        this.itemTitle = this.commentItemLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}
