import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// Angular Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-step-5w1h',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './step-5w1h.component.html',
  styleUrls: ['./step-5w1h.component.scss']
})
export class Step5w1hComponent {
  // CORREÇÃO: Remova o "input()" ou "input.required()" e use o @Input() tradicional
  @Input() formGroup!: FormGroup;
}
