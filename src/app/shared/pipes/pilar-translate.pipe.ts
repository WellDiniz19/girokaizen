import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pilarTranslate',
  standalone: true
})
export class PilarTranslatePipe implements PipeTransform {
  transform(value: string): string {
    const mapa: { [key: string]: string } = {
      'SEGURANCA': 'Segurança (S)',
      'QUALIDADE': 'Qualidade (Q)',
      'LOGISTICA': 'Logística (L)',
      'MANUTENCAO_AUTONOMA': 'Manutenção Autônoma (AM)',
      'MANUTENCAO_PLANEJADA': 'Manutenção Planejada (PM)',
      'MELHORIA_FOCADA': 'Melhoria Focada (FI)',
      'DESENVOLVIMENTO_PESSOAS': 'Desenvolvimento de Pessoas (PD)',
      'MEIO_AMBIENTE': 'Meio Ambiente (A)'
    };
    return mapa[value] || value;
  }
}
