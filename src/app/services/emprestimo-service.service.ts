import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {

  constructor(
    private http: Http
  ) { }


  public carregarValores(): Observable<any[]> {

    return this.http.get(`https://apifront.azurewebsites.net/api/front`)
        .pipe(map((resposta: any) => resposta.json()));
  }

  public enviarValores(nome,email,comentario,valor): void{
    localStorage.removeItem('nome')
    localStorage.removeItem('email')
    localStorage.removeItem('comentario')
    localStorage.removeItem('valor')

    localStorage.setItem('nome', nome)
    localStorage.setItem('email', email)
    localStorage.setItem('comentario', comentario)
    localStorage.setItem('valor', valor)
  }


}
