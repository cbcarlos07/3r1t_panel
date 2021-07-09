import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  	{ 
    	path: 'status', 
    	children: [
      		{path: '', loadChildren: './pages/status/status.router#StatusRoutes'}
    	]
  	},
	{ 
    	path: 'produto', 
    	children: [
      		{path: '', loadChildren: './pages/produto/produto.router#ProdutoRoutes'}
    	]
  	},
	{ 
    	path: 'fornecedor', 
    	children: [
      		{path: '', loadChildren: './pages/fornecedor/fornecedor.router#FornecedorRoutes'}
    	]
  	},
	{ 
    	path: 'cargo', 
    	children: [
      		{path: '', loadChildren: './pages/cargo/cargo.router#CargoRoutes'}
    	]
  	},
	{ 
    	path: 'usuario', 
    	children: [
      		{path: '', loadChildren: './pages/usuario/usuario.router#UsuarioRoutes'}
    	]
  	},
	{ 
    	path: 'pedido', 
    	children: [
      		{path: '', loadChildren: './pages/pedido/pedido.router#PedidoRoutes'}
    	]
  	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
