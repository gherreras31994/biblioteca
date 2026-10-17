# Gestor de Biblioteca

Práctica de Cypress y Pull Requests en equipo. Integrante 1: **gherreras31994**.

Aplicación publicada: https://gherreras31994.github.io/biblioteca/
GitHub Pages publica el contenido de `public` al actualizar `main`.
Los libros se guardan por navegador y dispositivo; no se comparten entre usuarios.

- [Repositorio](https://github.com/gherreras31994/biblioteca)
- [GitHub Actions](https://github.com/gherreras31994/biblioteca/actions)
- [Pull Requests](https://github.com/gherreras31994/biblioteca/pulls)
- [Invitar colaboradores](https://github.com/gherreras31994/biblioteca/settings/access)

## Abrir la aplicación

Requisitos: Node.js, npm y Git. En PowerShell:

```powershell
git clone https://github.com/gherreras31994/biblioteca.git
cd biblioteca
npm.cmd ci
npm.cmd start
```

Abrir http://localhost:3000. Acceso: **admin / admin123**.
La tabla comienza vacía; los libros se conservan en localStorage del navegador.
Al recargar se vuelve a pedir el login y se mantienen los libros.
Es una demostración educativa, sin autenticación de servidor.

## Pruebas

Las cuatro pruebas del enunciado se conservan sin modificaciones en
`cypress/e2e/biblioteca.cy.js`. GitHub Actions arranca el servidor y ejecuta Cypress
en cada push y Pull Request. El artefacto **evidencia-cypress** contiene los videos
y, cuando hay fallos, las capturas.

Para revisar localmente la base, con el servidor abierto, usar otra terminal:

```powershell
npm.cmd test
# Interfaz interactiva:
npm.cmd run cypress:open
```

Si Cypress informa `bad option: --smoke-test`, quitar la variable de Electron
únicamente de esa terminal y repetir:

```powershell
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
```

## Integrante 1: base y coordinación

La base se publica en main y debe mostrar **4 passing** en Actions. Invitar a los
otros dos integrantes desde Settings → Collaborators y esperar que acepten.
Cada persona debe usar su cuenta y su identidad de Git, y capturar su propia
terminal con los comandos branch, commit y push. No agregar protección que
exija checks verdes: esta práctica necesita fusionar una falla deliberada.

Comandos de publicación inicial (ya ejecutados al preparar el proyecto):

```powershell
git init
git add .
git commit -m "Primera version: pagina y pruebas"
git branch -M main
git remote add origin https://github.com/gherreras31994/biblioteca.git
git push -u origin main
```

## Integrante 2: falla intencional

Desde tu computadora y tu cuenta, después de aceptar la invitación:

```powershell
git clone https://github.com/gherreras31994/biblioteca.git
cd biblioteca
git checkout -b falla
```

En `public/app.js`, eliminar **solo** este bloque, debajo del comentario
`VALIDACION DE COPIAS`. No modificar las pruebas ni la configuración de CI:

```javascript
  if (!Number.isInteger(copias) || copias <= 0) {
    mensaje.textContent = 'Las copias deben ser un entero mayor que cero.';
    return;
  }
```

```powershell
git add public/app.js
git commit -m "Introduce falla en validacion"
git push -u origin falla
```

Abrir https://github.com/gherreras31994/biblioteca/compare/main...falla y crear el PR.
No ejecutar pruebas locales para este rol: usar la ejecución real de GitHub Actions.
Confirmar **3 passing, 1 failing**, con el fallo en `No permite copias en 0`.
En Actions → ejecución roja → Artifacts, descargar **evidencia-cypress** y
conservar el ZIP, el video, la captura y el enlace de la ejecución.
Conservar capturas de tu terminal antes de cerrar la ventana.
El propietario o un colaborador con permisos fusionará este PR aun en rojo,
documentando que la falla es intencional para la práctica.

## Integrante 3: arreglo

Esperar a que el PR de falla esté **Merged**. Desde tu computadora:

```powershell
git clone https://github.com/gherreras31994/biblioteca.git
cd biblioteca
git checkout main
git pull --ff-only
git checkout -b arreglo
```

Restaurar el bloque de validación anterior en `public/app.js`, antes de
`libros.push(...)`. Mantener las cuatro pruebas intactas.

```powershell
git add public/app.js
git commit -m "Corrige la validacion"
git push -u origin arreglo
```

Abrir https://github.com/gherreras31994/biblioteca/compare/main...arreglo y crear el PR.
Esperar **4 passing** en Actions antes de fusionarlo. Guardar el enlace y las
capturas de la terminal, el PR y los checks verdes.

Después de fusionar, cada integrante puede actualizar su copia:

```powershell
git checkout main
git pull --ff-only
git log --oneline --graph --all -10
```

## Entregables del equipo

- [ ] Video y captura reales de la falla, descargados de Actions.
- [ ] Capturas de las terminales de los tres integrantes con sus comandos.
- [ ] Enlaces a los PR `falla` y `arreglo`, ambos en estado Merged.
- [ ] Captura de VS Code mostrando las ramas y los checks finales verdes.
- [ ] Enlace a este repositorio.
- [ ] Si no se presenta en clase: video explicando los cinco puntos con voz y cámara.

La base no sustituye las contribuciones de los integrantes 2 y 3. No crear ambos
PR con la cuenta del integrante 1 para simular el trabajo en equipo.
