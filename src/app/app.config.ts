import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // Importação limpa do arquivo de rotas TS
import { kaizenInterceptor } from './core/http/kaizen.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),

    // Configuração global do cliente HTTP com o interceptor funcional
    provideHttpClient(
      withInterceptors([kaizenInterceptor])
    )
  ]
};
