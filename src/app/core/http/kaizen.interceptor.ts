import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

// CORREÇÃO 1: Usando importação absoluta para evitar quebra ao mover o arquivo de pasta
import { environment } from '../../../environments/environment';

export const kaizenInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  // CORREÇÃO 2: Cast para 'any' para forçar o compilador a aceitar a propriedade caso o cache do TS trave em '{}'
  const apiBaseUrl = (environment as any).apiUrl || 'http://localhost:8080/api';

  // Clona a requisição injetando o endereço do servidor caso seja uma chamada interna da API
  let modifiedReq = req;
  if (!req.url.startsWith('http://') && !req.url.startsWith('https://')) {
    modifiedReq = req.clone({
      url: `${apiBaseUrl}${req.url.startsWith('/') ? '' : '/'}${req.url}`,
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  // Encaminha a requisição modificada e captura possíveis falhas de rede ou de banco
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      let mensagemErro = 'Ocorreu um erro inesperado no sistema Quick Kaizen.';

      // Tratamento de falha de comunicação física (Servidor Java ou Postgres offline)
      if (error.status === 0) {
        mensagemErro = 'Não foi possível estabelecer ligação com o servidor. Certifique-se de que o serviço Back-end está ativo.';
      }
      // Erro de Validação de Negócio (Bad Request lançado pelo Spring Boot)
      else if (error.status === 400) {
        mensagemErro = error.error?.message || 'Dados inválidos. Revise o preenchimento dos blocos do Kaizen.';
      }
      // Erro Interno do Servidor
      else if (error.status === 500) {
        mensagemErro = 'Falha crítica no servidor Java. Entre em contacto com a equipa de Engenharia de Sistemas.';
      }

      // Exibe uma barra de alerta na parte inferior direita do ecrã do chão de fábrica
      snackBar.open(mensagemErro, 'Fechar', {
        duration: 6000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['kaizen-error-snackbar'] // Classe para estilização CSS (ex: fundo vermelho)
      });

      return throwError(() => error);
    })
  );
};
