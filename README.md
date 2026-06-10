# README - Sistema GiroKaizen

📑 Estrutura do Documento Criado
Visão Geral do Projeto

Contextualização do GiroKaizen como uma ferramenta corporativa focada na metodologia de melhoria contínua (WCM/Lean).

Objetivo: Sistematizar e simplificar a identificação de desvios operacionais, oferecendo uma interface em formato de assistente dinâmico (Wizard) para o apontamento de contramedidas e planos de ação.

Arquitetura da Solução & Componentes Reativos

Detalhamento da árvore de formulários reativos (FormGroup e FormArray) utilizada para capturar os dados do chão de fábrica sem perder o estado das etapas anteriores.

Mapeamento do Fluxo de Dados (Estrutura 5W2H do Passo 3):
Uma análise detalhada de como a matriz de contramedidas está estruturada para garantir a consistência das validações:


Destaques de Engenharia de Interface (UX/UI)

Componentização Avançada: Isolamento do módulo de plano de ação em um subcomponente autônomo (StepPlanoAcaoComponent) injetado no Wizard principal via @Input() formGroup.

CSS Grid Responsivo: Distribuição inteligente dos 7 campos de entrada em 3 linhas lógicas no desktop para otimizar o espaço da tela, mantendo o empilhamento fluido em dispositivos móveis.

Sinalização de Alerta em Tempo Real: Sincronização visual onde a barra lateral esquerda do card (border-left) e o indicador numérico do item (badge-number) assumem a cor institucional de advertência (#F26A1B) sempre que o status computado for igual a Pendente.

Internacionalização de Componentes: Injeção local do provedor MAT_DATE_LOCALE configurado para pt-BR, alterando a máscara de entrada e o calendário nativo para o formato brasileiro (DD/MM/AAAA).

Guia de Instalação, Execução e Scripts Utilitários

Comandos para clonagem do repositório, instalação de dependências via npm install e inicialização do servidor de desenvolvimento (ng serve).

Estrutura de pastas sugerida seguindo as melhores práticas do Angular moderno (arquitetura baseada em Features e Standalones).
```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# girokaizen
