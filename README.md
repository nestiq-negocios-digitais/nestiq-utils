# Bibliotecas de utilidade básicas - NèstiQ

<br>

## Sobre esse script

Esse projeto tem por finalidade abrigar bibliotecas de uso comum nos projetos da NèstiQ

Lista de bibliotecas:

1. logger: Camada intermediária para `console.log` com possibilidade de registro no GCP Logging
2. createAxiosRetry: Cria uma instância do axios com retentativa automática
3. fetchWithTimeout: Cria uma instância do fetch com timeout
4. sevicoCheckpoint: Registra na API que uma aplicação está funcionando corretamente
5. temporizadorSync ou sleep: Cria um timer síncrono simples
6. enviaGoogleLogging: Envia um registro de log para o painel do GCP. Necessita que o serviço `https://github.com/nestiq-negocios-digitais/gestao-infra-logging` em funcionamento

<br>

## Variáveis de ambiente

Na pasta `src` há um arquivo `.env.example` com as variáveis de ambientes necessárias para cada módulo

## Typescript

Para a construção desse modelo foi utilizado o typescript v4.9.5

<br>

## Testes automatizados

Todos os testes automatizados estão na pasta `tests`. Utilize o comando `npm test` para executá-los.

<br>  
  
## Sobre o Desenvolvimento e Debug

Para testes locais e desenvolvimento, use o comando `npm run dev`.

<br>
  
## Changelog

**v1.4.2 (17-08-2024)**

- Melhorada a documentação
- Correção de pequenos bugs e importação
- Alteração de nome da biblioteca temporizadorSync para sleep

**v1.4.1 (17-08-2024)**

- Add arquivo .env.example

**v1.4.0 (14-08-2024)**

- Add enviaGoogleLogging p/ enviar os logs p/ api do gooogle logging
- Ajuste no logger p/ utilizar o novo método enviaGoogleLogging

**v1.3.0 (26-04-2024)**

- Add servicoCheckpoint

**v1.1.0 (24-04-2024)**

- Add axiosRetry

**v1.0.0 (24-04-2024)**

- Versão inicial com o logger
