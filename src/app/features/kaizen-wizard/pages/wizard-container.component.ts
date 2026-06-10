import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

// Importação do Step 5W1H
import { Step5w1hComponent } from '../../kaizen-wizard/components/step-5w1h/step-5w1h.component';

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
    Step5w1hComponent
  ],
  templateUrl: './wizard-container.component.html',
  styleUrl: './wizard-container.component.scss'
})
export class WizardContainerComponent implements OnInit {
  isLinear = true; // Força o operador a seguir a ordem dos passos
  dadosGeraisForm!: FormGroup;
  fenomeno5w1hForm!: FormGroup;
  planoAcaoForm!: FormGroup;
  isSalving = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Passo 1: Dados de Identificação Expandidos e Fluxo de Coparticipantes
    this.dadosGeraisForm = this.fb.group({
      // Autoria Principal
      nomeColaborador: ['', Validators.required],
      matricula: ['', Validators.required],
      turno: ['', Validators.required],
      liderEquipe: ['', Validators.required],

      // Controle do fluxo de participantes adicionais
      temOutrosParticipantes: ['nao', Validators.required],

      // Dados do Participante Extra (Validados via Código sob demanda)
      participanteNome: [''],
      participanteRegistro: [''],
      participanteNumeroSug: [''],
      participanteObservacoes: [''],

      // Processo / Localização Industrial
      ute: ['', Validators.required],
      linha: ['', Validators.required],
      maquina: ['', Validators.required],
      op: ['', Validators.required],
      area: ['', Validators.required],
      numeroIdeia: ['', Validators.required],

      // O Kaizen mestre
      titulo: ['', [Validators.required, Validators.minLength(5)]]
    });

    // Escuta em tempo real o gatilho do Radio-button para injetar ou expurgar os validadores
    this.dadosGeraisForm.get('temOutrosParticipantes')?.valueChanges.subscribe((resposta) => {
      this.atualizarValidadoresParticipantes(resposta === 'sim');
    });

    // Passo 2: O formulário do Fenômeno (5W1H)
    this.fenomeno5w1hForm = this.fb.group({
      descricaoProblema: ['', Validators.required],
      what: ['', Validators.required],
      when: ['', Validators.required],
      where: ['', Validators.required],
      who: ['', Validators.required],
      which: ['', Validators.required],
      how: ['', Validators.required]
    });

    // Passo 3: Plano de Ação Imediata
    this.planoAcaoForm = this.fb.group({
      contramedida: ['', [Validators.required, Validators.minLength(10)]],
      prazo: ['', Validators.required]
    });
  }

  // Adiciona regras estritas de preenchimento apenas se houver coautores selecionados
  private atualizarValidadoresParticipantes(exigirValidacao: boolean): void {
    const camposExtras = ['participanteNome', 'participanteRegistro', 'participanteNumeroSug'];

    camposExtras.forEach(nomeDoControle => {
      const controle = this.dadosGeraisForm.get(nomeDoControle);
      if (controle) {
        if (exigirValidacao) {
          controle.setValidators([Validators.required]);
        } else {
          controle.clearValidators();
          controle.setValue(''); // Reseta o cache digitado para não poluir o payload
        }
        controle.updateValueAndValidity();
      }
    });
  }

  salvarKaizen(): void {
    if (this.dadosGeraisForm.valid && this.fenomeno5w1hForm.valid && this.planoAcaoForm.valid) {
      this.isSalving = true;

      const novoKaizenPayload = {
        ...this.dadosGeraisForm.value,
        analiseFenomeno: this.fenomeno5w1hForm.value,
        ...this.planoAcaoForm.value,
        dataCriacao: new Date().toISOString()
      };

      // Simulação física de envio à API Rest do Spring Boot
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
