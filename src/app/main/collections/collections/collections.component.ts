import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionsServiceProxy, CollectionDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCollectionModalComponent } from './create-or-edit-collection-modal.component';

import { ViewCollectionModalComponent } from './view-collection-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { filter as _filter } from 'lodash-es';
import { DateTime } from 'luxon';

import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    templateUrl: './collections.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})
export class CollectionsComponent extends AppComponentBase {
    @ViewChild('createOrEditCollectionModal', { static: true })
    createOrEditCollectionModal: CreateOrEditCollectionModalComponent;
    @ViewChild('viewCollectionModalComponent', { static: true }) viewCollectionModal: ViewCollectionModalComponent;

    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameFilter = '';
    descriptionFilter = '';
    isActiveFilter = -1;
    maxCountOfItemsFilter: number;
    maxCountOfItemsFilterEmpty: number;
    minCountOfItemsFilter: number;
    minCountOfItemsFilterEmpty: number;

    constructor(
        injector: Injector,
        private _collectionsServiceProxy: CollectionsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getCollections(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            return;
        }

        this.primengTableHelper.showLoadingIndicator();

        this._collectionsServiceProxy
            .getAll(
                this.filterText,
                this.nameFilter,
                this.descriptionFilter,
                this.isActiveFilter,
                this.maxCountOfItemsFilter == null ? this.maxCountOfItemsFilterEmpty : this.maxCountOfItemsFilter,
                this.minCountOfItemsFilter == null ? this.minCountOfItemsFilterEmpty : this.minCountOfItemsFilter,
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

    createCollection(): void {
        this.createOrEditCollectionModal.show();
    }

    deleteCollection(collection: CollectionDto): void {
        this.message.confirm('', this.l('AreYouSure'), (isConfirmed) => {
            if (isConfirmed) {
                this._collectionsServiceProxy.delete(collection.id).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }

    exportToExcel(): void {
        this._collectionsServiceProxy
            .getCollectionsToExcel(
                this.filterText,
                this.nameFilter,
                this.descriptionFilter,
                this.isActiveFilter,
                this.maxCountOfItemsFilter == null ? this.maxCountOfItemsFilterEmpty : this.maxCountOfItemsFilter,
                this.minCountOfItemsFilter == null ? this.minCountOfItemsFilterEmpty : this.minCountOfItemsFilter
            )
            .subscribe((result) => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
