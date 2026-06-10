import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-step-causa-raiz',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule, MatIconModule],
  template: `
    <div [formGroup]="formGroup" class="causa-raiz-container">

      <div class="section-box">
        <div class="header-box">
          <h3>1. Análise de Hipóteses (4M)</h3>
          <div class="btn-group">
            <button mat-stroked-button type="button" (click)="add4M('Mão de Obra')">+ Mão de Obra</button>
            <button mat-stroked-button type="button" (click)="add4M('Material')">+ Material</button>
            <button mat-stroked-button type="button" (click)="add4M('Método')">+ Método</button>
            <button mat-stroked-button type="button" (click)="add4M('Máquina')">+ Máquina</button>
          </div>
        </div>

        <div *ngFor="let item of hipoteses.controls; let i = index" [formGroup]="getAsFormGroup(item)" class="m4-row">
          <span class="badge-tipo">{{ item.get('tipo')?.value }}</span>
          <mat-form-field appearance="outline" class="flex-grow">
            <mat-label>Descreva a Hipótese</mat-label>
            <input matInput formControlName="hipotese">
          </mat-form-field>

          <div class="status-radio">
            <label>Confirmada?</label>
            <mat-radio-group formControlName="confirmada">
              <mat-radio-button [value]="true">V (Sim)</mat-radio-button>
              <mat-radio-button [value]="false">X (Não)</mat-radio-button>
            </mat-radio-group>
          </div>
        </div>
      </div>

      <div class="section-box whys-box">
        <h3>2. Investigação dos 5 Porquês</h3>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>1º Porquê (O desvio imediato)</mat-label>
          <input matInput formControlName="porque1">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100" *ngIf="formGroup.get('porque1')?.value">
          <mat-label>2º Porquê</mat-label>
          <input matInput formControlName="porque2">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100" *ngIf="formGroup.get('porque2')?.value">
          <mat-label>3º Porquê</mat-label>
          <input matInput formControlName="porque3">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100" *ngIf="formGroup.get('porque3')?.value">
          <mat-label>4º Porquê</mat-label>
          <input matInput formControlName="porque4">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100" *ngIf="formGroup.get('porque4')?.value">
          <mat-label>5º Porquê</mat-label>
          <input matInput formControlName="porque5">
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100 total-raiz">
          <mat-label>Causa Raiz Final Concluída</mat-label>
          <textarea matInput formControlName="causaRaizFinal" rows="2" placeholder="Qual foi o fator gerador definitivo?"></textarea>
        </mat-form-field>
      </div>

    </div>
  `,
  styles: [`
    .causa-raiz-container { padding: 16px 0; display: flex; flex-direction: column; gap: 24px; }
    .section-box { border: 1px solid #e0e0e0; padding: 16px; border-radius: 8px; background: #fafafa; }
    .header-box { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; wrap: wrap; }
    .btn-group button { margin-left: 8px; font-size: 12px; }
    .m4-row { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; background: #fff; padding: 8px; border-radius: 4px; border: 1px solid #eaeaea; }
    .badge-tipo { background: #3f51b5; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; min-width: 80px; text-align: center; }
    .flex-grow { flex-grow: 1; }
    .status-radio { display: flex; flex-direction: column; font-size: 12px; color: #666; }
    .w-100 { width: 100%; margin-bottom: 8px; }
    .whys-box { background: #fff; border-left: 4px solid #ff9800; }
    .total-raiz { margin-top: 16px; font-weight: bold; }
  `]
})
export class StepCausaRaizComponent {
  @Input() formGroup!: FormGroup;
  @Input() hipoteses!: FormArray;
  @Output() onAddHipotese = new EventEmitter<'Mão de Obra' | 'Material' | 'Método' | 'Máquina'>();

  getAsFormGroup(control: any): FormGroup { return control as FormGroup; }
  add4M(tipo: 'Mão de Obra' | 'Material' | 'Método' | 'Máquina') { this.onAddHipotese.emit(tipo); }
}
