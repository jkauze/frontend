import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'requestStatus'
})
export class RequestStatusPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    switch (value) {
      case 'P':
        return 'Pendiente';
      case 'E':
        return 'En espera';
      case 'A':
        return 'Aprobada';
      case 'R':
        return 'Rechazada';
      default:
        return value;
    }
  }

}
