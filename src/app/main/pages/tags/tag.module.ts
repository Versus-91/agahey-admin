import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { TagRoutingModule } from './tag-routing.module';
import { TagsComponent } from './tags.component';
import { CreateOrEditTagModalComponent } from './create-or-edit-tag-modal.component';
import { ViewTagModalComponent } from './view-tag-modal.component';

@NgModule({
    declarations: [TagsComponent, CreateOrEditTagModalComponent, ViewTagModalComponent],
    imports: [AppSharedModule, TagRoutingModule, AdminSharedModule],
})
export class TagModule {}
