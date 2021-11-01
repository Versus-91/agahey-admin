import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionsComponent } from './collections.component';
import { CreateOrEditCollectionModalComponent } from './create-or-edit-collection-modal.component';
import { ViewCollectionModalComponent } from './view-collection-modal.component';

@NgModule({
    declarations: [CollectionsComponent, CreateOrEditCollectionModalComponent, ViewCollectionModalComponent],
    imports: [AppSharedModule, CollectionRoutingModule, AdminSharedModule],
})
export class CollectionModule {}
