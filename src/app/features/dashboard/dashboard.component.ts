import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { KaizenService } from '../../core/services/kaizen.service';
import { QuickKaizen } from '../../core/models/kaizen.model';
import { PilarTranslatePipe } from '../../shared/pipes/pilar-translate.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, PilarTranslatePipe],
  template: `
    <div class="dashboard-wrapper">
      <div class="dashboard-header">
        <h1>Gestão de Projetos - Kaizen</h1>
        <button mat-raised-button color="primary" routerLink="/kaizen/novo">
          <mat-icon>add</mat-icon> Novo Kaizen
        </button>
      </div>

      <div class="kpi-container">
        <div class="kpi-card">
          <span class="title">Projetos Ativos</span>
          <span class="value">{{ listKaizens.length }}</span>
        </div>
        <div class="kpi-card green-kpi">
          <span class="title">Saving Global Gerado</span>
          <span class="value">{{ totalSaving | currency:'BRL' }}</span>
        </div>
      </div>

      <div class="mat-elevation-z2 table-container">
        <table mat-table [dataSource]="listKaizens">
          <ng-container matColumnDef="codigo">
            <th mat-header-cell *matHeaderCellDef> Nº Kaizen </th>
            <td mat-cell *matCellDef="let element"> {{ element.numeroKaizen || 'N/A' }} </td>
          </ng-container>

          <ng-container matColumnDef="titulo">
            <th mat-header-cell *matHeaderCellDef> Projeto </th>
            <td mat-cell *matCellDef="let element"> {{ element.dadosGerais.tituloProjeto }} </td>
          </ng-container>

          <ng-container matColumnDef="pilar">
            <th mat-header-cell *matHeaderCellDef> Pilar </th>
            <td mat-cell *matCellDef="let element"> {{ element.dadosGerais.pilar | pilarTranslate }} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef> Status </th>
            <td mat-cell *matCellDef="let element">
              <span class="badge" [ngClass]="element.status">{{ element.status }}</span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { padding: 24px; }
    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .kpi-container { display: flex; gap: 24px; margin-bottom: 24px; }
    .kpi-card { background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; min-width: 200px; display: flex; flex-direction: column; }
    .kpi-card .title { font-size: 12px; color: #666; font-weight: 500; text-transform: uppercase; }
    .kpi-card .value { font-size: 28px; font-weight: bold; margin-top: 4px; color: #222; }
    .green-kpi { border-left: 5px solid #4caf50; }
    .green-kpi .value { color: #2e7d32; }
    .table-container { background: #fff; border-radius: 8px; overflow: hidden; }
    table { width: 100%; }
    .badge { padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    .badge.APROVADO { background: #e8f5e9; color: #2e7d32; }
    .badge.EM_ANALISE { background: #fff3e0; color: #ef6c00; }
    .badge.RASCUNHO { background: #eceff1; color: #37474f; }
  `]
})
export class DashboardComponent implements OnInit {
  private kaizenService = inject(KaizenService);

  listKaizens: QuickKaizen[] = [];
  totalSaving: number = 0;
  displayedColumns: string[] = ['codigo', 'titulo', 'pilar', 'status'];

  ngOnInit(): void {
    this.kaizenService.getAll().subscribe(data => {
      this.listKaizens = data;
      this.calculateMetrics();
    });
  }

  private calculateMetrics(): void {
    this.totalSaving = this.listKaizens
      .filter(k => k.status === 'APROVADO')
      .reduce((acc, current) => acc + (current.beneficioCusto?.saving || 0), 0);
  }
}
