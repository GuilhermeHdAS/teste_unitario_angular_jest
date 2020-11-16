import { TestBed } from "@angular/core/testing";
import { TokenService } from "../token/token.service";
import { UserService } from "./user.service"

describe("O serviço user.service", () => {
    let service : UserService;
    
    // var tokenService;
    // var service;

    beforeEach(() => {
        // Pode observar que com o TestBed eu não preciso instanciar o token service, o TestBed cria o meu serviço já colocando aqui tudo que ele irá precisar, olha as diferenças. Porém o TestBed é um pouco lento, então depende muito do objeto que eu quero testar, quando é algo mais simples, podemos testar como o código comentado, que dá certo, agora em um teste mais complexo, com muitas dependências, utilizamos o TestBed.
        TestBed.configureTestingModule({
            providers:[UserService]
        });
        service = TestBed.get(UserService);

        /* É a mesma coisa que fazer o que está abaixo, porém de forma mais adequada */
        // tokenService = new TokenService();
        // service = new UserService(tokenService);
    });

    it('deve ser instanciado', () => {
        expect(service).toBeTruthy();
    });

    it('deve através de um token, recuperar as informações do usuário', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYwNTEwMjE0OCwiZXhwIjoxNjA1MTg4NTQ4fQ.-UjRLscsqzBMT-WGyL6kMBVd1syiwVsm295Z7seRSuQ';

        service.setToken(token);
        expect(service.isLogged()).toBeTruthy();
        expect(service.getUserName()).toBe('flavio');
        service.getUser().subscribe(user => {
            expect(user.name).toBe('flavio');
        });

    });

    it('deve limpar as informações no logout', () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImZsYXZpbyIsImVtYWlsIjoiZmxhdmlvQGFsdXJhcGljLmNvbS5iciIsImlhdCI6MTYwNTEwMjE0OCwiZXhwIjoxNjA1MTg4NTQ4fQ.-UjRLscsqzBMT-WGyL6kMBVd1syiwVsm295Z7seRSuQ';
        service.setToken(token);
        service.logout();
        expect(service.isLogged()).toBeFalsy();
        expect(service.getUserName()).toBe('');
    })

});