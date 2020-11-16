import { isLowerCase } from "./lower-case.validator";
// Nesse arquivo estou testando um CASO DE TESTE (1 Componente)
// Dentro desse arquivo eu posso ter n testes dentro do meu caso de teste

// O que vou testar?
describe('A função isLowerCase', ()=>{
    // Caso de teste (quando recebe letras minúsculas)
    it('Deve confirmar quando recebe um texto em caixa baixa', ()=>{
        const valor = 'teste';
        const resultado = isLowerCase(valor);
        // Se receber letras minúsculas o resultado da função precisa ser true
        expect(resultado).toBeTruthy();
    });

    // Caso de teste (quando recebe letras maiúsculas)
    it('Deve validar quando o valor enviado não for caixa baixa', ()=>{
        // Se receber 1 ou mais letras maiúsculas o resultado da função precisa ser false. Se eu colocar toBeTruthy irá apresentar erro no meu teste, pois a função retorna false
        expect(isLowerCase('TESTE')).toBeFalsy();
    });
});