import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

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

const appRoutes: Routes = [
  // {
  //   path: '/**',
  //   component: ['login']
  // },
  {
    path: '',
    component: HomeComponent

  },
  {
    path: 'manager_invoice_detail',
    component :ManagerInvoiceDetailComponent
  },
  {
    path: 'manager_signup',
    component: ManagerSignupComponent
  },
  {
    path: 'manager_edit_detail',
    component: ManagerEditDetailComponent
  },
  {
    path: 'manager_all_user',
    component: ManagerAllUsersComponent
  },
  {
    path: 'manager_order_detail',
    component: ManagerOrderDetailComponent
  },
  {
    path: 'super_add_order',
    component: SuperAddOrderComponent
  },
  {
    path: 'add_branch_companies',
    component: AddBranchCompaniesComponent
  },
  {
    path: 'manager_view_order',
    component: ManagerViewOrderComponent
  },
  {
    path: 'super_view_order',
    component: SuperViewOrderComponent
  },
  {
    path: 'super_edit_detail',
    component: SuperEditDetailComponent
  },
  {
    path: 'branch_companies',
    component: BranchCompaniesComponent
  },
  {
    path: 'super_create_account',
    component: SuperCreateAccountComponent
  },
  {
    path: 'manager_add_order',
    component: ManagerAddOrderComponent
  },
  {
    path: 'super_invoice_detail',
    component: SuperInvoiceDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'manager_view_invoice',
    component: ManagerViewInvoiceComponent
  },
  {
    path: 'super_add_product',
    component: SuperAddProductComponent
  },
  {
    path: 'add_branch_products',
    component: AddBranchProductsComponent
  },
  {
    path: 'branch_products',
    component: BranchProductsComponent
  },
  {
    path: 'superDashboard',
    component: DashboardSuperComponent

  },
  {
    path: 'super_edit_company',
    component: SuperEditCompanyComponent
  },
  {
    path: 'super_edit_products',
    component: SuperEditProductsComponent
  },
  {
    path: 'managerDashboard',
    component: DashboardManagerComponent

  },
  {
    path: 'super_order_detail',
    component: SuperOrderDetailComponent
  },
  {
    path: 'super_view_invoice',
    component: SuperViewInvoiceComponent
  },
  {
    path: 'employeeDashboard',
    component: DashboardEmployeeComponent

  },
  {
    path: 'super_signup',
    component: SuperSignupComponent
  },
  {
    path: 'super_view_accounts',
    component: SuperViewAccountsComponent
  },
  {
    path: 'super_edit_branch',
    component: SuperEditBranchComponent
  },
  {
    path: 'super_account_detail',
    component: SuperAccountDetailComponent
  },
  {
    path: 'all_branches',
    component: SuperAllBranchesComponent
  },

  {
    path: 'branchcompanies',
    component: BranchCompaniesComponent
  },

  {
    path: 'branchproduct',
    component: BranchProductsComponent
  },

  {
    path: 'addbranchproduct',
    component: AddBranchProductsComponent
  },

  {
    path: 'addbranch',
    component: SuperAddBranchesComponent
  },

  {
    path: 'editbranch',
    component: SuperEditBranchComponent
  },

  {
    path: 'addbranchcompanies',
    component: AddBranchCompaniesComponent
  },

  {
    path: 'addcompany',
    component: SuperAddCompanyComponent
  },

  {
    path: 'allcompanies',
    component: SuperAllCompaniesComponent
  },

  {
    path: 'companydetails',
    component: SuperCompanyDetailComponent
  },

  {
    path: 'editcompany',
    component: SuperEditCompanyComponent
  },

  {
    path: 'addproducts',
    component: SuperAddProductComponent
  },

  {
    path: 'allproducts',
    component: SuperAllProductsComponent
  },

  {
    path: 'editproducts',
    component: SuperEditProductsComponent
  },

  {
    path: 'productdetails',
    component: SuperProductDetailComponent
  },

  {
    path: 'alluser',
    component: SuperAllUsersComponent
  },

  {
    path: 'supereditdetails',
    component: SuperEditDetailComponent
  },

  {
    path: 'supersignup',
    component: SuperSignupComponent
  },

  {
    path: 'userdetails',
    component: SuperUserDetailComponent
  },

  {
    path: 'all',
    component: ManagerAllUsersComponent
  },

  {
    path: 'managereditdetails',
    component: ManagerEditDetailComponent
  },

  {
    path: 'managersignup',
    component: ManagerSignupComponent
  },

  {
    path: 'manageralluser',
    component: ManagerUserDetailComponent
  },

  {
    path: 'superaddorder',
    component: SuperAddOrderComponent
  },

  {
    path: 'superorderdetails',
    component: SuperOrderDetailComponent
  },

  {
    path: 'supervieworder',
    component: SuperViewOrderComponent
  },

  {
    path: 'manageraddorder',
    component: ManagerAddOrderComponent
  },

  {
    path: 'managerorderdetails',
    component: ManagerOrderDetailComponent
  },

  {
    path: 'managervieworder',
    component: ManagerViewOrderComponent
  },

  {
    path: 'employeeinvoice',
    component: EmployeeInvoiceCreateComponent
  },

  {
    path: 'employeeinvoiceedit',
    component: EmployeeInvoiceEditComponent
  },

  {
    path: 'managerinvoicedetail',
    component: ManagerInvoiceDetailComponent
  },

  {
    path: 'managerviewinvoice',
    component: ManagerViewInvoiceComponent
  },

  {
    path: 'superinvoicedetail',
    component: SuperInvoiceDetailComponent
  },

  {
    path: 'superviewinvoice',
    component: SuperViewInvoiceComponent
  },

  {
    path: 'employeeuserprofile',
    component: EmployeeUserProfileComponent
  },

  {
    path: 'superaccountdetail',
    component: SuperAccountDetailComponent
  },

  {
    path: 'supercreateaccount',
    component: SuperCreateAccountComponent
  },

  {
    path: 'superviewaccounts',
    component: SuperViewAccountsComponent
  },

  {
    path: 'manageraccountdetail',
    component: ManagerAccountDetailComponent
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
