import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCollectionsComponent } from './subCollections.component';

const routes: Routes = [
    {
        path: '',
        component: SubCollectionsComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubCollectionRoutingModule {}
