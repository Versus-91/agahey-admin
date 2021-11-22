import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { PostTypesRoutingModule } from './postTypes-routing.module';
import { PostTypesesComponent } from './postTypeses.component';
import { CreateOrEditPostTypesModalComponent } from './create-or-edit-postTypes-modal.component';
import { ViewPostTypesModalComponent } from './view-postTypes-modal.component';

@NgModule({
    declarations: [PostTypesesComponent, CreateOrEditPostTypesModalComponent, ViewPostTypesModalComponent],
    imports: [AppSharedModule, PostTypesRoutingModule, AdminSharedModule],
})
export class PostTypesModule {}
