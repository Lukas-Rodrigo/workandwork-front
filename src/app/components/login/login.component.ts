import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private toast: ToastrService, private service: AuthService, private router: Router) {}

  creds = {
    email: '',
    senha: ''
  };

  jwtToken: string | null = null; // Variável para armazenar o token

  validaCampos(): boolean {
    return this.creds.email !== '' && this.creds.senha.length >= 3;
  }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      const responseBody = resposta.body; // Captura o corpo da resposta, que é uma string JSON
      const parsedBody = JSON.parse(responseBody); // Converte a string JSON em um objetoto
      this.service.sucessfulLogin(parsedBody.token);
      this.router.navigate([''])
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos')
    })
  }

}
