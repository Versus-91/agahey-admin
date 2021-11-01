import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';

import { MasterDetailChild_Post_TagsComponent } from './masterDetailChild_Post_tags.component';
import { MasterDetailChild_Post_CreateOrEditTagModalComponent } from './masterDetailChild_Post_create-or-edit-tag-modal.component';
import { MasterDetailChild_Post_ViewTagModalComponent } from './masterDetailChild_Post_view-tag-modal.component';

@NgModule({
    declarations: [
        MasterDetailChild_Post_TagsComponent,
        MasterDetailChild_Post_CreateOrEditTagModalComponent,
        MasterDetailChild_Post_ViewTagModalComponent,
    ],
    imports: [AppSharedModule, AdminSharedModule],

    exports: [
        MasterDetailChild_Post_TagsComponent,
        MasterDetailChild_Post_CreateOrEditTagModalComponent,
        MasterDetailChild_Post_ViewTagModalComponent,
    ],
})
export class MasterDetailChild_Post_TagModule {}
