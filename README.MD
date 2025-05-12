# Relatório de Configuração do Husky

Este documento descreve passo a passo a configuração de hooks Git usando o Husky, garantindo build, lint e testes automáticos antes de commits e pushes.

---

## 1. Criação do repositório

* Criação do repositório no GitHub sem README, `.gitignore` ou `license`.
* Clone local:

```bash
git clone <URL-do-repo>
cd husky_ponderada
```

* **Screenshot:** `screenshots/01-criar-repo.png`

---

## 2. Inicialização do npm

* Executado:

```bash
npm init -y
```

* Gerado `package.json` inicial.
* **Screenshot:** `screenshots/02-npm-init.png`

---

## 3. Instalação e configuração do Husky

* Instalado como dependência de desenvolvimento:

```bash
npm install husky --save-dev
```

* Ajuste no `package.json`:

```json
"scripts": {
  "prepare": "husky install .husky",
  // demais scripts...
}
```

* Executado:

```bash
npm run prepare
```

* **Screenshot:** `screenshots/03-husky-install.png`

---

## 4. Configuração do hook pré-commit

* Criado arquivo `.husky/pre-commit` com o conteúdo:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint
```

* Tornado executável:

```bash
chmod +x .husky/pre-commit
```

* **Screenshot:** `screenshots/04-pre-commit-hook.png`

---

## 5. Teste do pré-commit

* Ajuste no `package.json` para lint real:

```json
"lint": "eslint . --ext .js --ignore-pattern 'package-lock.json' --ignore-pattern 'node_modules/' --fix"
```

* Commit de teste:

```bash
touch teste.txt
 git add teste.txt
 git commit -m "Teste pré-commit"
```

* Confirmação das mensagens de build e lint.
* **Screenshot:** `screenshots/05-test-pre-commit.png`

---

## 6. Configuração do hook pré-push

* Criado arquivo `.husky/pre-push` com o conteúdo:

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm test
```

* Tornado executável:

```bash
chmod +x .husky/pre-push
```

* Link manual em `.git/hooks/`:

```bash
ln -s ../../.husky/pre-push .git/hooks/pre-push
```

* **Screenshot:** `screenshots/06-pre-push-hook.png`

---

## 7. Teste do pré-push

* Criada pasta de testes e arquivo `__tests__/sum.test.js`:

```js
// __tests__/sum.test.js
function sum(a, b) { return a + b; }
test('1 + 2 = 3', () => {
  expect(sum(1,2)).toBe(3);
});
```

* Verificado `npm test`:

```bash
npm test
```

* Push de teste:

```bash
touch verifica-push.txt
 git add verifica-push.txt
 git push origin main
```

* Confirmação do Jest rodando antes do push.
* **Screenshot:** `screenshots/07-test-pre-push.png`

---

## 8. Considerações finais

* Os commits são validados automaticamente pelo ESLint.
* Os pushes só são realizados se todos os testes passarem.
* Os hooks do Husky garantem qualidade contínua do código.

---

*Relatório gerado em 11 de maio de 2025*
