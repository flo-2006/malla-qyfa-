const malla = document.getElementById("malla");

const mallaDatos = {
  "1° Año": {
    "1° Semestre": [
      { id: "qg1", nombre: "Química General 1", abre: ["qg2", "qo"] },
      { id: "bc", nombre: "Biología Celular", abre: ["fi"] },
      { id: "intro", nombre: "Introducción", abre: [] },
      { id: "mat", nombre: "Matemáticas", abre: ["calc", "fis", "bioest"] },
      { id: "integ", nombre: "Integrado", abre: ["fund"] },
      { id: "antro", nombre: "Antropología", abre: ["etica"] }
    ],
    "2° Semestre": [
      { id: "qg2", nombre: "Química General 2", abre: ["qa", "fq"] },
      { id: "bioest", nombre: "Bioestadística", abre: [] },
      { id: "fis", nombre: "Física", abre: [] },
      { id: "calc", nombre: "Cálculo", abre: [] },
      { id: "fund", nombre: "Fundamentos", abre: [] },
      { id: "etica", nombre: "Ética", abre: ["persoc"] }
    ]
  },
  // ... Resto de años igual que antes ...
};

// Primero: invertimos la relación para saber qué ramos dependen de cada ramo
const dependientes = {};

// Crear dependientes para facilitar desbloqueo
for (const anio in mallaDatos) {
  for (const semestre in mallaDatos[anio]) {
    mallaDatos[anio][semestre].forEach(ramo => {
      if (!(ramo.id in dependientes)) dependientes[ramo.id] = [];
      ramo.abre.forEach(abierto => {
        if (!(abierto in dependientes)) dependientes[abierto] = [];
        dependientes[abierto].push(ramo.id);
      });
    });
  }
}

const estado = {}; // estados: bloqueado, activo, aprobado

function puedeEstarActivo(ramoId) {
  // Un ramo puede activarse si TODOS sus prerequisitos están aprobados
  if (!(ramoId in dependientes)) return true; // Si no tiene prereqs
  return dependientes[ramoId].every(preReqId => estado[preReqId] === "aprobado");
}

function crearRamo(ramo, contenedor) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;
  div.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo);
  
  // Estado inicial:
  if (puedeEstarActivo(ramo.id)) {
    estado[ramo.id] = "activo";
  } else {
    estado[ramo.id] = "bloqueado";
    div.classList.add("bloqueado");
  }
  
  contenedor.appendChild(div);
}

function aprobarRamo(ramo) {
  if (estado[ramo.id] !== "activo") return; // solo activos pueden aprobarse
  const div = document.getElementById(ramo.id);
  div.classList.add("aprobado");
  div.onclick = null;
  estado[ramo.id] = "aprobado";
  
  // Al aprobar, intentamos activar todos los ramos que dependen de este
  for (const ramoId in estado) {
    if (estado[ramoId] === "bloqueado" && puedeEstarActivo(ramoId)) {
      estado[ramoId] = "activo";
      const divRamo = document.getElementById(ramoId);
      divRamo.classList.remove("bloqueado");
    }
  }
}

for (const anio in mallaDatos) {
  const tituloAnio = document.createElement("h2");
  tituloAnio.textContent = anio;
  malla.appendChild(tituloAnio);

  for (const semestre in mallaDatos[anio]) {
    const tituloSemestre = document.createElement("h3");
    tituloSemestre.textContent = semestre;
    malla.appendChild(tituloSemestre);

    const contenedor = document.createElement("div");
    contenedor.className = "semestre";
    malla.appendChild(contenedor);

    mallaDatos[anio][semestre].forEach(ramo => crearRamo(ramo, contenedor));
  }
}
