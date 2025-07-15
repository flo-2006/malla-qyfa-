const malla = document.getElementById("malla");

const estado = {}; // id: aprobado/bloqueado

function crearRamo(ramo, contenedor, desbloqueadoInicial = false) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;
  div.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo);
  if (!desbloqueadoInicial) {
    div.classList.add("bloqueado");
    estado[ramo.id] = "bloqueado";
  } else {
    estado[ramo.id] = "activo";
  }
  contenedor.appendChild(div);
}

function aprobarRamo(ramo) {
  const div = document.getElementById(ramo.id);
  div.classList.add("aprobado");
  div.onclick = null;
  estado[ramo.id] = "aprobado";
  desbloquear(ramo.id);
}

function desbloquear(id) {
  const ramo = Object.values(mallaDatos)
    .flatMap(anio => Object.values(anio).flat())
    .find(r => r.id === id);
  if (!ramo) return;
  ramo.abre.forEach(dest => {
    const destDiv = document.getElementById(dest);
    if (estado[dest] !== "aprobado") {
      destDiv.classList.remove("bloqueado");
      estado[dest] = "activo";
    }
  });
}

for (const anio in mallaDatos) {
  const contenedorAnio = document.createElement("div");
  contenedorAnio.className = "anio";

  const tituloAnio = document.createElement("h2");
  tituloAnio.textContent = anio;
  contenedorAnio.appendChild(tituloAnio);

  const contenedorSemestres = document.createElement("div");
  contenedorSemestres.className = "semestres-container";

  for (const semestre in mallaDatos[anio]) {
    const contenedorSemestre = document.createElement("div");
    contenedorSemestre.className = "semestre";

    const tituloSemestre = document.createElement("h3");
    tituloSemestre.textContent = semestre;
    contenedorSemestre.appendChild(tituloSemestre);

    const desbloqueadoInicial = anio === "1° Año" && semestre === "1° Semestre";
    mallaDatos[anio][semestre].forEach(ramo => crearRamo(ramo, contenedorSemestre, desbloqueadoInicial));

    contenedorSemestres.appendChild(contenedorSemestre);
  }

  contenedorAnio.appendChild(contenedorSemestres);
  malla.appendChild(contenedorAnio);
}
