import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuickKaizen } from '../models/kaizen.model';

@Injectable({
  providedIn: 'root'
})
export class KaizenService {
  private http = inject(HttpClient);

  // Endpoint configurado; a URL base será adicionada automaticamente pelo Interceptor
  getAll(): Observable<QuickKaizen[]> {
    return this.http.get<QuickKaizen[]>('/api/kaizens');
  }

  getById(id: number): Observable<QuickKaizen> {
    return this.http.get<QuickKaizen>(`/api/kaizens/${id}`);
  }

  create(kaizen: QuickKaizen): Observable<QuickKaizen> {
    return this.http.post<QuickKaizen>('/api/kaizens', kaizen);
  }

  getDashboardMetrics(): Observable<any> {
    return this.http.get<any>('/api/kaizens/dashboard-metrics');
  }
}
