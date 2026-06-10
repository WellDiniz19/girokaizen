import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-step-plano-acao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
  templateUrl: './step-plano-acao.component.html',
  styleUrl: './step-plano-acao.component.scss'
})
export class StepPlanoAcaoComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

    if (!this.formGroup.contains('acoes')) {
      this.formGroup.addControl('acoes', this.fb.array([]));
      this.adicionarNovaAcao();
    }
  }


  get listaDeAcoes(): FormArray {
    return this.formGroup.get('acoes') as FormArray;
  }


  getAsFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }


  adicionarNovaAcao(): void {
    const novaLinhaAcao = this.fb.group({
      oQue: ['', Validators.required],
      porQue: ['', Validators.required],
      como: ['', Validators.required],
      onde: ['', Validators.required],
      quem: ['', Validators.required],
      quando: ['', Validators.required],
      situacao: [{ value: 'Pendente', disabled: false }, Validators.required] // Inicia como Pendente
    });

    this.listaDeAcoes.push(novaLinhaAcao);
  }


  removerAcao(index: number): void {
    if (this.listaDeAcoes.length > 1) {
      this.listaDeAcoes.removeAt(index);
    } else {
      this.listaDeAcoes.at(0).reset({ situacao: 'Pendente' });
    }
  }
}
