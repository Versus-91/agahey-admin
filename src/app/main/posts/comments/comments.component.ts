import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsServiceProxy, CommentDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCommentModalComponent } from './create-or-edit-comment-modal.component';

import { ViewCommentModalComponent } from './view-comment-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './comments.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class CommentsComponent extends AppComponentBase {
    @ViewChild('createOrEditCommentModal', { static: true })
    createOrEditCommentModal: CreateOrEditCommentModalComponent;
    @ViewChild('viewCommentModalComponent', { static: true }) viewCommentModal: ViewCommentModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    descriptionFilter = '';
    maxLikesFilter: number;
    maxLikesFilterEmpty: number;
    minLikesFilter: number;
    minLikesFilterEmpty: number;
    itemTitleFilter = '';

    constructor(
        injector: Injector,
        private _commentsServiceProxy: CommentsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getComments(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._commentsServiceProxy
            .getAll(
                this.filterText,
                this.descriptionFilter,
                this.maxLikesFilter == null ? this.maxLikesFilterEmpty : this.maxLikesFilter,
                this.minLikesFilter == null ? this.minLikesFilterEmpty : this.minLikesFilter,
                this.itemTitleFilter,
                this.primengTableHelper.getSorting(this.dataTable),
                this.primengTableHelper.getSkipCount(this.paginator, event),
                this.primengTableHelper.getMaxResultCount(this.paginator, event)
            )
            .subscribe((result) => {
                this.primengTableHelper.totalRecordsCount = result.totalCount;
                this.primengTableHelper.records = result.items;
                this.primengTableHelper.hideLoadingIndicator();
            });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createComment(): void {
        this.createOrEditCommentModal.show();
    }

    deleteComment(comment: CommentDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._commentsServiceProxy.delete(comment.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._commentsServiceProxy
            .getCommentsToExcel(
                this.filterText,
                this.descriptionFilter,
                this.maxLikesFilter == null ? this.maxLikesFilterEmpty : this.maxLikesFilter,
                this.minLikesFilter == null ? this.minLikesFilterEmpty : this.minLikesFilter,
                this.itemTitleFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
