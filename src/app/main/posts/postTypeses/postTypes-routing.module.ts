import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostTypesesComponent } from './postTypeses.component';

const routes: Routes = [
    {
        path: '',
        component: PostTypesesComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PostTypesRoutingModule {}
