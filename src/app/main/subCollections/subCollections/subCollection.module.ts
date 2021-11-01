import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { SubCollectionRoutingModule } from './subCollection-routing.module';
import { SubCollectionsComponent } from './subCollections.component';
import { CreateOrEditSubCollectionModalComponent } from './create-or-edit-subCollection-modal.component';
import { ViewSubCollectionModalComponent } from './view-subCollection-modal.component';
import { SubCollectionCollectionLookupTableModalComponent } from './subCollection-collection-lookup-table-modal.component';

@NgModule({
    declarations: [
        SubCollectionsComponent,
        CreateOrEditSubCollectionModalComponent,
        ViewSubCollectionModalComponent,

        SubCollectionCollectionLookupTableModalComponent,
    ],
    imports: [AppSharedModule, SubCollectionRoutingModule, AdminSharedModule],
})
export class SubCollectionModule {}
