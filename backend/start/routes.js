"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// CRUDS
// USER AUTHENTIFICATION //
Route.post("/auth", "UserController.auth")
Route.post("/user", "UserController.create");
Route.post("/userlist", "UserController.list");
Route.post("/login", "UserController.token");
Route.get("/auth/:id", "UserController.login").middleware("auth");
Route.post("/permission", "UserController.userPermission");
// PERMISSIONS
Route.post("/role", "RoleController.create");
// CLIENTES //
Route.post("/clientelist", "ClienteController.list");
Route.post("/cliente", "ClienteController.create");
Route.post("/clientedelete", "ClienteController.delete");
Route.get("/clientelistfuncao", "ClienteController.listFuncao");
// PRODUTOS //
Route.post("/produtolist", "ProdutoController.list");
Route.post("/produto", "ProdutoController.create");
Route.post("/produtodelete", "ProdutoController.delete");
// GRUPO DE PRODUTOS //
Route.post("/grupoprodutolist", "GrupoProdutoController.list");
Route.post("/grupoproduto", "GrupoProdutoController.create");
Route.post("/grupoprodutodelete", "GrupoProdutoController.delete");
// TIPO DE PAGAMENTO //
Route.post("/tipopgto", "TipoPagamentoController.create");
Route.get("/tipopgto", "TipoPagamentoController.list");
Route.post("/tipopgtoupdate", "TipoPagamentoController.update");
Route.post("/tipopgtodelete", "TipoPagamentoController.delete");

// MESA //
// CRUD - MESA //
Route.get("/mesalist", "MesaController.list");
Route.post("/mesaadd", "MesaController.create");
// CONSUMO - MESA //
Route.post("/pedidoadd", "MesaController.add_Pedido");
Route.post("/consumolist", "MesaController.list_Consumo");
Route.post("/pedidodelete", "MesaController.delete_pedido");
// FINALIZAÇÃO DE MESA //
Route.post("/finalizamesa", "MesaController.finalizaMesa");
// DELIVERY
// MESA / DELIVERY
Route.post("/opendelivery", "DeliveryController.openDelivery");
Route.get("/listematendimento", "DeliveryController.listEmAtendimento");
Route.post("/finalizadelivery", "DeliveryController.finazilaDelivery");
Route.post("/listdelivery", "DeliveryController.listDelivery");
Route.post("/listconsumodelivery", "DeliveryController.listConsumoDelivery");
Route.post("/insertcarteiradelivery", "DeliveryController.insertCarteiraDelivery");
Route.post("/canceladelivery", "DeliveryController.cancelaDelivery");
Route.get("/listentregador", "DeliveryController.listEntregador");
Route.get("/liststatus", "DeliveryController.listStatus");
Route.post("/updatestatusdelivery", "DeliveryController.updateStatusDelivery");
Route.post("/finalizageraldelivery", "DeliveryController.finalizaGeralDelivery");
// FINANCEIRO //
// PAGAMENTO PARCIAL //
Route.post("/pgtparcadd", "FinanceiroController.addPgtParc");
Route.post("/pgtparclist", "FinanceiroController.listPgtParc");
Route.post("/pgtparcdelete", "FinanceiroController.deletePgtParc");
// CARTEIRA //
Route.post("/carteirainsert", "FinanceiroController.insertCarteira");
Route.post("/carteiralist", "FinanceiroController.listCarteira");
Route.post("/carteiradelete", "FinanceiroController.deleteCarteira");
Route.post("/carteiraaddfinanceiro", "FinanceiroController.addFinanceiro");
// RELATORIOS //
Route.post("/relatorioentrada", "RelatorioController.relatorioEntrada");
Route.post("/relatoriosaida", "RelatorioController.relatorioSaida");
Route.post("/relatoriolucro", "RelatorioController.relatorioLucro");
// CONFIG //
Route.get("/configlist", "ConfigController.list");
Route.post("/configupdate", "ConfigController.update");

