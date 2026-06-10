/**
 * Interface principal que representa o ecossistema completo de um Quick Kaizen.
 * Mapeia a consolidação de todas as abas da planilha original.
 */
export interface QuickKaizen {
  id?: number;
  numeroKaizen?: string;
  dataAbertura?: Date | string;
  dataFechamento?: Date | string;
  status: 'RASCUNHO' | 'EM_ANALISE' | 'APROVADO' | 'REJEITADO';
  dadosGerais: DadosGerais;
  analise5w1h: Analise5W1H;
  causaRaiz: CausaRaiz;
  planoAcao: ItemPlanoAcao[];
  beneficioCusto: BeneficioCusto;
}

/**
 * Mapeia os dados de cabeçalho e identificação das abas [QK] e [MP INFO].
 */
export interface DadosGerais {
  tituloProjeto: string;
  pilar: PilarWCM;
  nomeColaborador: string;
  matricula: string;
  numeroIdeia?: string;
  ute: string;
  linha: string;
  operacao?: string;
  maquina: string;
  turno: '1º Turno' | '2º Turno' | '3º Turno';
  outrosParticipantes?: string;
}

/**
 * Tipagem estrita para os Pilares de Melhoria Contínua baseados no WCM/TPM presentes na planilha.
 */
export type PilarWCM =
  | 'SEGURANCA'
  | 'QUALIDADE'
  | 'LOGISTICA'
  | 'MANUTENCAO_AUTONOMA'
  | 'MANUTENCAO_PLANEJADA'
  | 'MELHORIA_FOCADA'
  | 'DESENVOLVIMENTO_PESSOAS'
  | 'MEIO_AMBIENTE';

/**
 * Mapeia os blocos de descrição do fenómeno inicial contidos na aba [5W1H].
 */
export interface Analise5W1H {
  descricaoProblema: string; // Descrição do Fenómeno Inicial (5G)
  what: string;              // What (O que?) - Sobre qual objeto/produto ocorre o problema?
  when: string;              // When (Quando?) - Quando o problema é verificado? Na sequência operacional?
  where: string;             // Where (Onde?) - Onde se manifestou o fenómeno no equipamento/produto?
  who: string;               // Who (Quem?) - Ligado a uma equipa, indivíduo ou nível de experiência?
  which: string;             // Which (Qual?) - Qual a tendência, andamento ou evolução do problema?
  how: string;               // How (Como?) - Como o problema se desenvolve? Qual o modo de falha?
}

/**
 * Mapeia as linhas de validação de hipóteses da aba [4M].
 * Substitui o preenchimento manual de "V" ou "X" por um booleano nativo.
 */
export interface Hipotese4M {
  id?: number;
  tipo: 'MAO_DE_OBRA' | 'MATERIAL' | 'METODO' | 'MAQUINA';
  hipotese: string;
  confirmada: boolean; // true = Hipótese Confirmada (V), false = Descartada (X)
}

/**
 * Consolida a análise de causa raiz unindo o diagrama [4M] e a árvore de falhas dos [5 Porquês].
 */
export interface CausaRaiz {
  hipoteses4M: Hipotese4M[];
  porque1: string;
  porque2?: string;
  porque3?: string;
  porque4?: string;
  porque5?: string;
  causaRaizFinal: string; // Fator gerador definitivo que receberá a ação de bloqueio
}

/**
 * Mapeia a tabela dinâmica da aba [Plano Ação].
 */
export interface ItemPlanoAcao {
  id?: number;
  item: number;              // Índice sequencial da ação (#1, #2, #3...)
  oQue: string;              // O que será feito (Ação de bloqueio)
  porQue: string;            // Por que será feito (Objetivo)
  como: string;              // Como será feito (Método/Padrão)
  onde: string;              // Onde será aplicado (Local/Máquina)
  quem: string;              // Responsável pela execução da tarefa
  quando: Date | string;     // Prazo limite acordado (Deadline)
  situacao: 'PENDENTE' | 'CONCLUIDO' | 'ATRASADO';
}

/**
 * Mapeia os campos financeiros de controle e payback contidos na aba [BC].
 */
export interface BeneficioCusto {
  custoTotal: number;        // Total de custos/investimento (C) -> Campo Amarelo na planilha
  beneficioTotal: number;    // Total de benefícios/retorno ganho (B) -> Campo Amarelo na planilha
  saving: number;            // Calculado automaticamente de forma reativa: (B - C)
  proporcaoBC: number;       // Relação matemática de viabilidade: (B / C)
}
