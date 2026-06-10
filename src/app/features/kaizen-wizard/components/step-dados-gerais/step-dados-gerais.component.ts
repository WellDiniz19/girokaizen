import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-step-dados-gerais',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <div [formGroup]="formGroup" class="grid-layout">
      <mat-form-field appearance="outline">
        <mat-label>Título do Projeto Kaizen</mat-label>
        <input matInput formControlName="tituloProjeto" placeholder="Ex: Fixação da proteção central">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Pilar Relacionado</mat-label>
        <mat-select formControlName="pilar">
          <mat-option value="SEGURANCA">Segurança</mat-option>
          <mat-option value="QUALIDADE">Qualidade</mat-option>
          <mat-option value="LOGISTICA">Logística</mat-option>
          <mat-option value="MANUTENCAO_AUTONOMA">Manutenção Autônoma</mat-option>
          <mat-option value="MANUTENCAO_PLANEJADA">Manutenção Planejada</mat-option>
          <mat-option value="MELHORIA_FOCADA">Melhoria Focada</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Nome do Colaborador</mat-label>
        <input matInput formControlName="nomeColaborador">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Matrícula / Registro</mat-label>
        <input matInput formControlName="matricula">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>U.T.E.</mat-label>
        <input matInput formControlName="ute" placeholder="Ex: 3112">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Linha</mat-label>
        <input matInput formControlName="linha">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Máquina / CAF</mat-label>
        <input matInput formControlName="maquina">
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Turno</mat-label>
        <mat-select formControlName="turno">
          <mat-option value="1º Turno">1º Turno</mat-option>
          <mat-option value="2º Turno">2º Turno</mat-option>
          <mat-option value="3º Turno">3º Turno</mat-option>
        </mat-select>
      </mat-form-field>
    </div>
  `,
  styles: [`
    .grid-layout {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      padding: 16px 0;
    }
    @media(max-width: 600px) { .grid-layout { grid-template-columns: 1fr; } }
  `]
})
export class StepDadosGeraisComponent {
  @Input() formGroup!: FormGroup;
}
