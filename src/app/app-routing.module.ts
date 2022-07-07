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
    path: 'test-printing',
    loadChildren: () => import('./test-printing/test-printing/test-printing.module').then( m => m.TestPrintingPageModule)
  },
  {
    path: 'invoice-view',
    loadChildren: () => import('./invoice-view/invoice-view/invoice-view.module').then( m => m.InvoiceViewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
