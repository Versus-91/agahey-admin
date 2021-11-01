import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { ItemRoutingModule } from './item-routing.module';
import { ItemsComponent } from './items.component';
import { CreateOrEditItemModalComponent } from './create-or-edit-item-modal.component';
import { ViewItemModalComponent } from './view-item-modal.component';
import { ItemCollectionLookupTableModalComponent } from './item-collection-lookup-table-modal.component';

@NgModule({
    declarations: [
        ItemsComponent,
        CreateOrEditItemModalComponent,
        ViewItemModalComponent,

        ItemCollectionLookupTableModalComponent,
    ],
    imports: [AppSharedModule, ItemRoutingModule, AdminSharedModule],
})
export class ItemModule {}
