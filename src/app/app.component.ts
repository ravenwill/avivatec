import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, } from '@angular/forms';
import { EmprestimoService } from './services/emprestimo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'avivatec';

  valorSelecionado: number;
  valorPersonalizado: boolean;
  loading: boolean = false
  exibirFormSolicitacao: boolean = false
  itensComboValorPersonalizado: any[] = []
  modalResposta: boolean = false
  dialogo: boolean = true
  
  formSolicitacao: FormGroup 


  constructor (
    private emprestimoService: EmprestimoService
  ) {}

  ngOnInit() {

    this.formSolicitacao = new FormGroup ({
      'valor': new FormControl (),
      'nome': new FormControl ('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl ('', [Validators.required, Validators.email]),
      'comentario': new FormControl ('', [Validators.required, Validators.minLength(10)])
    });
  }

  formularioEnvio(valor) {
    this.loading = true
    console.log(valor)
    if(valor != null) {
      this.itensComboValorPersonalizado.push({'cor' : '#FFD700' , 'valor' : valor})
      this.formSolicitacao.patchValue({
        valor: valor
      })
      this.exibirFormSolicitacao = true
      this.loading = false
    }
    if(valor == null) {
      this.emprestimoService.carregarValores()
      .subscribe(
        (itens) => {
          this.itensComboValorPersonalizado = itens.sort(function(a, b) {
            if (a.valor > b.valor) {
              return 1;
            }
            if (a.valor < b.valor) {
              return -1;
            }
            return 0;
          })
          this.formSolicitacao.patchValue({
            valor: this.itensComboValorPersonalizado[0].valor
          })
          this.valorPersonalizado = true
          this.exibirFormSolicitacao = true
          this.loading = false
        },
        (erro) => { 
          console.log(erro)
          this.loading = false
        }
      )
    }

  }

  enviarValores() {
    this.emprestimoService.enviarValores(
      this.formSolicitacao.value.nome, 
      this.formSolicitacao.value.email, 
      this.formSolicitacao.value.comentario, 
      this.formSolicitacao.value.valor)

    this.modalResposta = true

    this.formSolicitacao.reset

    this.exibirFormSolicitacao = false
  }

}
