import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {routing} from './app.routing';
// import {AuthGuard} from "./Security/auth.guard";
import {AppComponent} from './app.component';
import {HomeComponent} from './user/components/home.component';
import {LoginComponent} from './user/components/login.component';
import {DashboardSuperComponent} from './user/components/dashboards/dashboard_super.component';
import {DashboardManagerComponent} from './user/components/dashboards/dashboard_manager.component';
import {DashboardEmployeeComponent} from './user/components/dashboards/dashboard_employee.component';
import {SuperAllBranchesComponent} from "./user/components/branches/super_all_branches.component";
import {BranchCompaniesComponent} from "./user/components/branches/branch_companies.component";
import {BranchProductsComponent} from "./user/components/branches/branch_products.component";
import {AddBranchProductsComponent} from "./user/components/branches/add_branch_products.component";
import {SuperAddBranchesComponent} from "./user/components/branches/super_add_branches.component";
import {SuperEditBranchComponent} from "./user/components/branches/super_edit_branch.component";
import {AddBranchCompaniesComponent} from "./user/components/branches/add_branch_companies.component";
import {SuperAddCompanyComponent} from "./user/components/companies/super_add_company.component";
import {SuperAllCompaniesComponent} from "./user/components/companies/super_all_companies.component";
import {SuperCompanyDetailComponent} from "./user/components/companies/super_company_detail.component";
import {SuperEditCompanyComponent} from "./user/components/companies/super_edit_company.component";
import {SuperAddProductComponent} from "./user/components/products/super_add_product.component";
import {SuperAllProductsComponent} from "./user/components/products/super_all_products.component";
import {SuperEditProductsComponent} from "./user/components/products/super_edit_products.component";
import {SuperProductDetailComponent} from "./user/components/products/super_product_detail.component";
import {SuperAllUsersComponent} from "./user/components/users/super/super_all_users.component";
import {SuperEditDetailComponent} from "./user/components/users/super/super_edit_detail.component";
import {SuperSignupComponent} from "./user/components/users/super/super_signup.component";
import {SuperUserDetailComponent} from "./user/components/users/super/super_user_detail.component";
import {ManagerAllUsersComponent} from "./user/components/users/manager/manager_all_user.component";
import {ManagerEditDetailComponent} from "./user/components/users/manager/manager_edit_detail.component";
import {ManagerSignupComponent} from "./user/components/users/manager/manager_signup.component";
import {ManagerUserDetailComponent} from "./user/components/users/manager/manager_user_detail.component";
import {SuperAddOrderComponent} from "./user/components/stock_order/super/super_add_order.component";
import {SuperOrderDetailComponent} from "./user/components/stock_order/super/super_order_detail.component";
import {SuperViewOrderComponent} from "./user/components/stock_order/super/super_view_order.component";
import {ManagerAddOrderComponent} from "./user/components/stock_order/manager/manager_add_order.component";
import {ManagerOrderDetailComponent} from "./user/components/stock_order/manager/manager_order_detail.component";
import {ManagerViewOrderComponent} from "./user/components/stock_order/manager/manager_view_order.component";
import {EmployeeInvoiceCreateComponent} from "./user/components/invoices/employee/employee_invoice_create.component";
import {EmployeeInvoiceEditComponent} from "./user/components/invoices/employee/employee_invoice_edit.component";
import {ManagerInvoiceDetailComponent} from "./user/components/invoices/manager/manager_invoice_detail.component";
import {ManagerViewInvoiceComponent} from "./user/components/invoices/manager/manager_view_invoice.component";
import {SuperInvoiceDetailComponent} from "./user/components/invoices/super/super_invoice_detail.component";
import {SuperViewInvoiceComponent} from "./user/components/invoices/super/super_view_invoice.component";
import {EmployeeUserProfileComponent} from "./user/components/users/employee/employee_user_profile.component";
import {SuperAccountDetailComponent} from "./user/components/accounts/super/super_account_detail.component";
import {SuperCreateAccountComponent} from "./user/components/accounts/super/super_create_account.component";
import {SuperViewAccountsComponent} from "./user/components/accounts/super/super_view_accounts.component";
import {ManagerAccountDetailComponent} from "./user/components/accounts/manager/manager_account_detail.component";
import {DataService} from "./services/dataService.service";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardSuperComponent,
    DashboardManagerComponent,
    DashboardEmployeeComponent,
    SuperAllBranchesComponent,
    BranchCompaniesComponent,
    BranchProductsComponent,
    AddBranchProductsComponent,
    SuperAddBranchesComponent,
    SuperEditBranchComponent,
    AddBranchCompaniesComponent,
    SuperAddCompanyComponent,
    SuperAllCompaniesComponent,
    SuperCompanyDetailComponent,
    SuperEditCompanyComponent,
    SuperAddProductComponent,
    SuperAllProductsComponent,
    SuperEditProductsComponent,
    SuperProductDetailComponent,
    SuperAllUsersComponent,
    SuperEditDetailComponent,
    SuperSignupComponent,
    SuperUserDetailComponent,
    ManagerAllUsersComponent,
    ManagerEditDetailComponent,
    ManagerSignupComponent,
    ManagerUserDetailComponent,
    SuperAddOrderComponent,
    SuperOrderDetailComponent,
    SuperViewOrderComponent,
    ManagerAddOrderComponent,
    ManagerOrderDetailComponent,
    ManagerViewOrderComponent,
    EmployeeInvoiceCreateComponent,
    EmployeeInvoiceEditComponent,
    ManagerInvoiceDetailComponent,
    ManagerViewInvoiceComponent,
    SuperInvoiceDetailComponent,
    SuperViewInvoiceComponent,
    EmployeeUserProfileComponent,
    SuperAccountDetailComponent,
    SuperCreateAccountComponent,
    SuperViewAccountsComponent,
    ManagerAccountDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
