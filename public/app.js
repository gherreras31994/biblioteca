const claveAlmacenamiento = 'biblioteca.libros';
let libros = [];
try {
  const guardados = JSON.parse(localStorage.getItem(claveAlmacenamiento) || '[]');
  if (Array.isArray(guardados)) libros = guardados;
} catch { libros = []; }

const elemento = (id) => document.getElementById(id);
const guardar = () => localStorage.setItem(claveAlmacenamiento, JSON.stringify(libros));

function render() {
  const tabla = elemento('libros');
  tabla.replaceChildren();
  libros.forEach((libro) => {
    const fila = document.createElement('tr');
    fila.className = 'fila';
    [libro.titulo, libro.autor, libro.copias].forEach((valor, indice) => {
      const celda = document.createElement('td');
      if (indice === 0) celda.className = 'col-titulo';
      celda.textContent = valor;
      fila.append(celda);
    });
    const acciones = document.createElement('td');
    const eliminar = document.createElement('button');
    eliminar.className = 'btn-eliminar';
    eliminar.textContent = 'Eliminar';
    eliminar.setAttribute('aria-label', `Eliminar ${libro.titulo}`);
    eliminar.addEventListener('click', () => {
      libros = libros.filter((actual) => actual.id !== libro.id);
      guardar();
      render();
    });
    acciones.append(eliminar);
    fila.append(acciones);
    tabla.append(fila);
  });
  elemento('contador').textContent = `${libros.length} ${libros.length === 1 ? 'libro' : 'libros'}`;
  elemento('vacio').classList.toggle('oculto', libros.length > 0);
}

elemento('form-login').addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (elemento('usuario').value.trim() === 'admin' && elemento('clave').value === 'admin123') {
    elemento('login-msg').textContent = '';
    elemento('login').classList.add('oculto');
    elemento('panel').classList.remove('oculto');
    elemento('titulo').focus();
  } else {
    elemento('login-msg').textContent = 'Usuario o contraseña incorrectos.';
  }
});

elemento('btn-salir').addEventListener('click', () => {
  elemento('panel').classList.add('oculto');
  elemento('login').classList.remove('oculto');
  elemento('form-login').reset();
  elemento('usuario').focus();
});

elemento('form-libro').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const titulo = elemento('titulo').value.trim();
  const autor = elemento('autor').value.trim();
  const copias = Number(elemento('copias').value);
  const mensaje = elemento('form-msg');
  mensaje.textContent = '';
  if (!titulo || !autor) {
    mensaje.textContent = 'Completa el título y el autor.';
    return;
  }
  // VALIDACION DE COPIAS: bloque de trabajo para los roles falla y arreglo.
  libros.push({ id: crypto.randomUUID(), titulo, autor, copias });
  guardar();
  render();
  elemento('form-libro').reset();
  elemento('titulo').focus();
});

render();
