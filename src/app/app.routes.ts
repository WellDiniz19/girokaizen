import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirecionamento inicial: Agora joga o operador direto para a tela de Login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // Nova rota pública para a tela de Login
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.component')
      .then(m => m.LoginComponent)
  },

  // Rota do Dashboard / Painel de Indicadores (Acessada após o login)
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },

  // Rota do Formulário do Quick Kaizen (Caminho corrigido incluindo a pasta interna do componente)
  {
    path: 'kaizen/novo',
    loadComponent: () => import('./features/kaizen-wizard/pages/wizard-container.component')
      .then(m => m.WizardContainerComponent)
  },

  // Rota de herança/fallback: Qualquer endereço inválido ou tentativa de invasão joga para o login
  {
    path: '**',
    redirectTo: 'login'
  }
];
