import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { PostRoutingModule } from './post-routing.module';
import { PostsComponent } from './posts.component';
import { CreateOrEditPostModalComponent } from './create-or-edit-post-modal.component';
import { ViewPostModalComponent } from './view-post-modal.component';
import { PostItemLookupTableModalComponent } from './post-item-lookup-table-modal.component';

import { MasterDetailChild_Post_TagModule } from '@app/main/pages/tags/masterDetailChild_Post_tag.module';

@NgModule({
    declarations: [
        PostsComponent,
        CreateOrEditPostModalComponent,
        ViewPostModalComponent,

        PostItemLookupTableModalComponent,
    ],
    imports: [AppSharedModule, PostRoutingModule, AdminSharedModule, MasterDetailChild_Post_TagModule],
})
export class PostModule {}
