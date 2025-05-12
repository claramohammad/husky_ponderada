# Relatório de Atividade: Configuração de Husky no Repositório GitHub

Este relatório documenta, de forma objetiva, o processo de configuração do Husky em um repositório GitHub vazio, implementando hooks de **pré-commit** e **pré-push** para automação de linting e testes. Os resultados e comandos utilizados estão descritos abaixo.

## 1. Criação do Repositório

* No GitHub, criado o repositório **husky\_ponderada** sem arquivos iniciais (README, .gitignore ou license).
* Clonado localmente:

  ```bash
  git clone https://github.com/claramohammad/husky_ponderada
  cd husky_ponderada
  ```

## 2. Inicialização do NPM

* Executado:

  ```bash
  npm init -y
  ```
* Scripts adicionados ao `package.json`:

  ```json
  "scripts": {
    "lint": "eslint . --ext .js --ignore-pattern 'node_modules/' --ignore-pattern '*.json' --ignore-pattern '__tests__/**' --fix",
    "test": "jest",
    "prepare": "husky install .husky"
  }
  ```

## 3. Instalação do Husky

* Instalado como dependência de desenvolvimento:

  ```bash
  npm install husky --save-dev
  ```
* Hooks inicializados:

  ```bash
  npm run prepare
  ```
* Confirmada criação da pasta `.husky/` com arquivos de configuração.

## 4. Configuração do Hook de Pré-Commit

* Criação de `.husky/pre-commit` com o seguinte conteúdo:

  ```sh
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  npm run lint
  ```
* Permissão de execução ajustada:

  ```bash
  chmod +x .husky/pre-commit
  ```

## 5. Configuração do Hook de Pré-Push

* Criação de `.husky/pre-push` com:

  ```sh
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  npm test
  ```
* Link manual ao diretório de hooks do Git e permissão de execução:

  ```bash
  ln -s ../../.husky/pre-push .git/hooks/pre-push
  chmod +x .git/hooks/pre-push
  ```

## 6. Testes e Resultados

### 6.1 Pré-Commit

* Comando de teste:

  ```bash
  touch teste.txt
  git add teste.txt
  git commit -m "Teste pré-commit"
  ```
* Resultado observado no terminal:

  ```
  > husky_ponderada@1.0.0 lint
  > eslint . --ext .js --ignore-pattern 'node_modules/' --ignore-pattern '*.json' --ignore-pattern '__tests__/**' --fix

  // Nenhum erro de lint
  [main abc123] Teste pré-commit
   1 file changed, 0 insertions(+), 0 deletions(-)
  ```

### 6.2 Pré-Push

* Arquivo de teste em `__tests__/sum.test.js`:

  ```js
  function sum(a, b) { return a + b; }
  test('sum 1 + 2 é 3', () => {
    expect(sum(1,2)).toBe(3);
  });
  ```
* Comandos executados:

  ```bash
  touch verifica-push.txt
  git add verifica-push.txt
  git push origin main
  ```
* Saída no terminal:

  ```
  > husky_ponderada@1.0.0 test
  > jest

   PASS  __tests__/sum.test.js
    ✓ sum 1 + 2 é 3 (X ms)

  Everything up-to-date
  ```
* O push só foi concluído após todos os testes passarem.

## 7. Considerações Finais

* Os hooks de **pré-commit** e **pré-push** automatizam a verificação de qualidade, impedindo commits sem lint e pushes com testes falhos.
* Garante-se que apenas código validado e testado seja integrado ao repositório central.
* O uso de commits semânticos e desta documentação objetiva facilita a revisão por parte do professor.