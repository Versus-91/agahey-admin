import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    
                    {
                        path: 'posts/postTypeses',
                        loadChildren: () => import('./posts/postTypeses/postTypes.module').then(m => m.PostTypesModule),
                        data: { permission: 'Pages.PostTypeses' }
                    },
                
                    
                    {
                        path: 'posts/comments',
                        loadChildren: () => import('./posts/comments/comment.module').then(m => m.CommentModule),
                        data: { permission: 'Pages.Comments' }
                    },
                
                    
                    {
                        path: 'posts/posts',
                        loadChildren: () => import('./posts/posts/post.module').then(m => m.PostModule),
                        data: { permission: 'Pages.Posts' }
                    },
                
                    
                    {
                        path: 'pages/tags',
                        loadChildren: () => import('./pages/tags/tag.module').then(m => m.TagModule),
                        data: { permission: 'Pages.Tags' }
                    },
                
                    
                    {
                        path: 'subCollections/subCollections',
                        loadChildren: () => import('./subCollections/subCollections/subCollection.module').then(m => m.SubCollectionModule),
                        data: { permission: 'Pages.SubCollections' }
                    },
                
                    
                    {
                        path: 'collections/collections',
                        loadChildren: () => import('./collections/collections/collection.module').then(m => m.CollectionModule),
                        data: { permission: 'Pages.Collections' }
                    },
                
                    
                    {
                        path: 'pages/items',
                        loadChildren: () => import('./pages/items/item.module').then(m => m.ItemModule),
                        data: { permission: 'Pages.Items' }
                    },
                
                    
                    {
                        path: 'pages/categories',
                        loadChildren: () => import('./pages/categories/category.module').then(m => m.CategoryModule),
                        data: { permission: 'Pages.Categories' }
                    },
                
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' }
                    },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' }
                ]
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule { }
