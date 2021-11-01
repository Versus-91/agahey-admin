import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AdminSharedModule } from '@app/admin/shared/admin-shared.module';
import { CommentRoutingModule } from './comment-routing.module';
import { CommentsComponent } from './comments.component';
import { CreateOrEditCommentModalComponent } from './create-or-edit-comment-modal.component';
import { ViewCommentModalComponent } from './view-comment-modal.component';
import { CommentItemLookupTableModalComponent } from './comment-item-lookup-table-modal.component';

@NgModule({
    declarations: [
        CommentsComponent,
        CreateOrEditCommentModalComponent,
        ViewCommentModalComponent,

        CommentItemLookupTableModalComponent,
    ],
    imports: [AppSharedModule, CommentRoutingModule, AdminSharedModule],
})
export class CommentModule {}
