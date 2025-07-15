const malla = document.getElementById("malla");

const estado = {}; // Estado de cada ramo

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

function desbloquear(idAprobado) {
  for (const anio of Object.values(mallaDatos)) {
    for (const semestre of Object.values(anio)) {
      for (const ramo of semestre) {
        if (ramo.abre.includes(idAprobado)) {
          const divDestino = document.getElementById(ramo.id);
          if (divDestino && estado[ramo.id] === "bloqueado") {
            divDestino.classList.remove("bloqueado");
            estado[ramo.id] = "activo";
          }
        }
      }
    }
  }
}

// Generación visual
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

    mallaDatos[anio][semestre].forEach(ramo =>
      crearRamo(ramo, contenedorSemestre, desbloqueadoInicial)
    );

    contenedorSemestres.appendChild(contenedorSemestre);
  }

  contenedorAnio.appendChild(contenedorSemestres);
  malla.appendChild(contenedorAnio);
}
