import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

// Imports do Angular Material separados corretamente por submódulos para evitar erros de compilação
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-step-plano-acao',
  standalone: true, // Garante que o componente seja Standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule, // Necessário para o funcionamento do Datepicker padrão
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './step-plano-acao.component.html',
  styleUrls: ['./step-plano-acao.component.scss']
})
export class StepPlanoAcaoComponent {
  /**
   * FormArray que armazena a lista dinâmica de planos de ação.
   * Ele é recebido diretamente do FormGroup pai (WizardContainerComponent).
   */
  @Input() planosAcao!: FormArray;

  /**
   * Eventos emitidos para que o componente pai manipule a adição
   * ou remoção de linhas no FormArray centralizado.
   */
  @Output() onAddLinha = new EventEmitter<void>();
  @Output() onRemoveLinha = new EventEmitter<number>();

  /**
   * Método auxiliar para realizar o cast seguro de AbstractControl para FormGroup dentro do template HTML.
   * Evita erros do compilador estrito do Angular Ivy ao iterar com *ngFor.
   */
  getAsFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  adicionarAcao(): void {
    this.onAddLinha.emit();
  }

  removerAcao(index: number): void {
    this.onRemoveLinha.emit(index);
  }
}
