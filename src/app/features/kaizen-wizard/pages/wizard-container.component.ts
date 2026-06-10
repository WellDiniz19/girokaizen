import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material Imports
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// Importações dos Subcomponentes Modulares (Passos 2 e 3)
import { Step5w1hComponent } from '../../kaizen-wizard/components/step-5w1h/step-5w1h.component';
import { StepPlanoAcaoComponent } from '../../kaizen-wizard/components/step-plano-acao/step-plano-acao.component'; // <-- CORREÇÃO: Novo import adicionado

@Component({
  selector: 'app-wizard-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    Step5w1hComponent,
    StepPlanoAcaoComponent // <-- CORREÇÃO: Injetado nos imports do componente Standalone
  ],
  providers: [DatePipe],
  templateUrl: './wizard-container.component.html',
  styleUrl: './wizard-container.component.scss'
})
export class WizardContainerComponent implements OnInit {
  isLinear = true;
  isSalving = false;

  // Escopo global dos formulários reativos gerenciados pelo Stepper
  dadosGeraisForm: FormGroup;
  fenomeno5w1hForm: FormGroup;
  planoAcaoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
    // Inicialização preventiva de instâncias vazias para sanar de vez problemas de concorrência assíncrona no HTML
    this.dadosGeraisForm = this.fb.group({});
    this.fenomeno5w1hForm = this.fb.group({});
    this.planoAcaoForm = this.fb.group({});
  }

  ngOnInit(): void {
    // Parâmetros de infraestrutura industrial vindos do servidor (Spring Boot / Oracle)
    const proximoIdKaizen = '1024';
    const sequencialIdeia = '01';
    const proximoSequencialOP = '882341';
    const dataSistema = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm') || '';

    // PASSO 1: Estrutura reativa de Identificação Geral
    this.dadosGeraisForm = this.fb.group({
      numeroKaizen: [{ value: proximoIdKaizen, disabled: true }],
      dataAbertura: [{ value: dataSistema, disabled: true }],
      numeroIdeia: [{ value: `KZ-${proximoIdKaizen}-${sequencialIdeia}`, disabled: true }],
      op: [`OP-${proximoSequencialOP}`, Validators.required],
      nomeColaborador: ['', Validators.required],
      matricula: ['', Validators.required],
      turno: ['', Validators.required],
      liderEquipe: ['', Validators.required],
      temOutrosParticipantes: ['nao', Validators.required],
      participanteNome: [''],
      participanteRegistro: [''],
      participanteNumeroSug: [''],
      participanteObservacoes: [''],
      ute: ['', Validators.required],
      linha: ['', Validators.required],
      maquina: ['', Validators.required],
      area: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(5)]]
    });

    // Escuta ativa para alternar obrigatoriedade de campos se houver coautores
    this.dadosGeraisForm.get('temOutrosParticipantes')?.valueChanges.subscribe((resposta) => {
      this.atualizarValidadoresParticipantes(resposta === 'sim');
    });

    // PASSO 2: Estrutura reativa de Matriz WCM e Análise 5W1H
    this.fenomeno5w1hForm = this.fb.group({
      pilarWcm: ['Q', Validators.required],
      uo: ['', Validators.required],
      uteMetodologia: ['', Validators.required],
      produto: ['', Validators.required],
      opMetodologia: ['', Validators.required],
      maquinaCaf: ['', Validators.required],
      responsavelMetodologia: ['', Validators.required],
      numeroKaizenRelacionado: [{ value: proximoIdKaizen, disabled: true }],
      descricaoProblema: ['', Validators.required],
      what: ['', Validators.required],
      when: ['', Validators.required],
      where: ['', Validators.required],
      who: ['', Validators.required],
      which: ['', Validators.required],
      how: ['', Validators.required]
    });

    // PASSO 3: Estrutura reativa do Plano de Ação enviada ao subcomponente
    this.planoAcaoForm = this.fb.group({
      contramedida: ['', [Validators.required, Validators.minLength(10)]],
      prazo: ['', Validators.required]
    });
  }

  /**
   * Modifica em tempo de execução a obrigatoriedade dos campos de coautoria
   */
  private atualizarValidadoresParticipantes(exigirValidacao: boolean): void {
    const camposExtras = ['participanteNome', 'participanteRegistro', 'participanteNumeroSug'];

    camposExtras.forEach(nomeDoControle => {
      const controle = this.dadosGeraisForm.get(nomeDoControle);
      if (controle) {
        if (exigirValidacao) {
          controle.setValidators([Validators.required]);
        } else {
          controle.clearValidators();
          controle.setValue('');
        }
        controle.updateValueAndValidity();
      }
    });
  }

  /**
   * Agrupa os payloads reativos e faz a publicação do Quick Kaizen finalizado
   */
  salvarKaizen(): void {
    if (this.dadosGeraisForm.valid && this.fenomeno5w1hForm.valid && this.planoAcaoForm.valid) {
      this.isSalving = true;

      const novoKaizenPayload = {
        ...this.dadosGeraisForm.getRawValue(),
        analiseFenomeno: this.fenomeno5w1hForm.getRawValue(),
        ...this.planoAcaoForm.value,
        dataCriacao: new Date().toISOString()
      };

      setTimeout(() => {
        this.isSalving = false;
        this.snackBar.open('Quick Kaizen registrado com sucesso!', 'Sucesso', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
        this.router.navigate(['/dashboard']);
      }, 1500);
    } else {
      this.snackBar.open('Por favor, revise os blocos pendentes do formulário.', 'Aviso', {
        duration: 4000
      });
    }
  }
}
