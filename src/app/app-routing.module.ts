import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'send-receipt',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'send-receipt',
    loadChildren: () => import('./send-receipt/send-receipt.module').then( m => m.SendReceiptPageModule)
  },
  {
    path: 'view-today-receipts',
    loadChildren: () => import('./today-receipts/view-today-receipts/view-today-receipts.module').then( m => m.ViewTodayReceiptsPageModule)
  },
  {
    path: 'search-receipt',
    loadChildren: () => import('./search-receipt/search-receipt/search-receipt.module').then( m => m.SearchReceiptPageModule)
  },
  {
    path: 'receipt-more-view',
    loadChildren: () => import('./model-pages/receipt-view-page/receipt-more-view/receipt-more-view.module').then( m => m.ReceiptMoreViewPageModule)
  },
  {
    path: 'search-receipt/receipt-search-result',
    loadChildren: () => import('./search-receipt/search-results/receipt-search-result/receipt-search-result.module').then( m => m.ReceiptSearchResultPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
