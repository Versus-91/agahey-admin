import { NgModule } from '@angular/core';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { CreateOrEditPostModalComponent } from './create-or-edit-post-modal.component';
import { PostItemLookupTableModalComponent } from './post-item-lookup-table-modal.component';
import { PostRoutingModule } from './post-routing.module';
import { PostsComponent } from './posts.component';
import { ViewPostModalComponent } from './view-post-modal.component';

@NgModule({
    declarations: [
        PostsComponent,
        CreateOrEditPostModalComponent,
        ViewPostModalComponent,

        PostItemLookupTableModalComponent,
    ],
    imports: [AppSharedModule, PostRoutingModule, AdminSharedModule],
})
export class PostModule {}
