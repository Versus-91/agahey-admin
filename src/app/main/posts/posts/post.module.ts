import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { PostRoutingModule } from './post-routing.module';
import { PostsComponent } from './posts.component';
import { CreateOrEditPostModalComponent } from './create-or-edit-post-modal.component';
import { ViewPostModalComponent } from './view-post-modal.component';
import { PostItemLookupTableModalComponent } from './post-item-lookup-table-modal.component';
import { PostPostTypesLookupTableModalComponent } from './post-postTypes-lookup-table-modal.component';

@NgModule({
    declarations: [
        PostsComponent,
        CreateOrEditPostModalComponent,
        ViewPostModalComponent,

        PostItemLookupTableModalComponent,
        PostPostTypesLookupTableModalComponent,
    ],
    imports: [AppSharedModule, PostRoutingModule, AdminSharedModule],
})
export class PostModule {}
