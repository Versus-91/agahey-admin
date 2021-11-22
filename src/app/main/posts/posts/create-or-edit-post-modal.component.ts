import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { PostsServiceProxy, CreateOrEditPostDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { PostItemLookupTableModalComponent } from './post-item-lookup-table-modal.component';
import { PostPostTypesLookupTableModalComponent } from './post-postTypes-lookup-table-modal.component';

@Component({
    selector: 'createOrEditPostModal',
    templateUrl: './create-or-edit-post-modal.component.html',
})
export class CreateOrEditPostModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('postItemLookupTableModal', { static: true })
    postItemLookupTableModal: PostItemLookupTableModalComponent;
    @ViewChild('postPostTypesLookupTableModal', { static: true })
    postPostTypesLookupTableModal: PostPostTypesLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    post: CreateOrEditPostDto = new CreateOrEditPostDto();

    itemTitle = '';
    postTypesName = '';

    constructor(
        injector: Injector,
        private _postsServiceProxy: PostsServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(postId?: number): void {
        if (!postId) {
            this.post = new CreateOrEditPostDto();
            this.post.id = postId;
            this.itemTitle = '';
            this.postTypesName = '';

            this.active = true;
            this.modal.show();
        } else {
            this._postsServiceProxy.getPostForEdit(postId).subscribe((result) => {
                this.post = result.post;

                this.itemTitle = result.itemTitle;
                this.postTypesName = result.postTypesName;

                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;

        this._postsServiceProxy
            .createOrEdit(this.post)
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
        this.postItemLookupTableModal.id = this.post.itemId;
        this.postItemLookupTableModal.displayName = this.itemTitle;
        this.postItemLookupTableModal.show();
    }
    openSelectPostTypesModal() {
        this.postPostTypesLookupTableModal.id = this.post.postTypesId;
        this.postPostTypesLookupTableModal.displayName = this.postTypesName;
        this.postPostTypesLookupTableModal.show();
    }

    setItemIdNull() {
        this.post.itemId = null;
        this.itemTitle = '';
    }
    setPostTypesIdNull() {
        this.post.postTypesId = null;
        this.postTypesName = '';
    }

    getNewItemId() {
        this.post.itemId = this.postItemLookupTableModal.id;
        this.itemTitle = this.postItemLookupTableModal.displayName;
    }
    getNewPostTypesId() {
        this.post.postTypesId = this.postPostTypesLookupTableModal.id;
        this.postTypesName = this.postPostTypesLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {}
}
