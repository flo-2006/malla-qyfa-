// script.js
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
  "2° Año": {
    "1° Semestre": [
      { id: "qa", nombre: "Química Analítica Cuali/Cuantitativa", abre: ["aqi"] },
      { id: "qo", nombre: "Química Orgánica", abre: ["bqg", "qoa"] },
      { id: "fi", nombre: "Fisiología Integrada", abre: ["fp"] },
      { id: "fq", nombre: "Fisicoquímica", abre: ["tf1"] },
      { id: "salpop", nombre: "Salud Poblacional", abre: ["epid"] },
      { id: "gestper", nombre: "Gestión Personal", abre: [] }
    ],
    "2° Semestre": [
      { id: "aqi", nombre: "Análisis Químico Instrumental", abre: [] },
      { id: "bqg", nombre: "Bioquímica General", abre: ["microb"] },
      { id: "fp", nombre: "Fisiopatología", abre: ["farma1"] },
      { id: "qoa", nombre: "Química Orgánica Avanzada", abre: ["qf1"] },
      { id: "epid", nombre: "Epidemiología", abre: [] }
    ]
  },
  "3° Año": {
    "1° Semestre": [
      { id: "saludig", nombre: "Salud Digital", abre: [] },
      { id: "microb", nombre: "Microbiología", abre: [] },
      { id: "farma1", nombre: "Farmacología 1", abre: ["farma2"] },
      { id: "tf1", nombre: "Tecnología Farmacéutica 1", abre: ["tf2"] },
      { id: "qf1", nombre: "Química Farmacéutica 1", abre: ["qf2"] },
      { id: "persoc", nombre: "Persona y Sociedad", abre: [] }
    ],
    "2° Semestre": [
      { id: "bioet", nombre: "Bioética", abre: [] },
      { id: "farma2", nombre: "Farmacología 2", abre: ["farmcli1", "toxi"] },
      { id: "tf2", nombre: "Tecnología Farmacéutica 2", abre: ["legis"] },
      { id: "qf2", nombre: "Química Farmacéutica 2", abre: ["farmacog"] },
      { id: "elect1", nombre: "Electivo 1", abre: [] }
    ]
  },
  "4° Año": {
    "1° Semestre": [
      { id: "metod", nombre: "Metodología de Investigación", abre: [] },
      { id: "cc", nombre: "Control y Calidad", abre: ["biofarma"] },
      { id: "farmcli1", nombre: "Farmacia Clínica 1", abre: ["farmcli2"] },
      { id: "legis", nombre: "Legislación Farmacéutica", abre: [] },
      { id: "farmacog", nombre: "Farmacognosia y Fitoterapia", abre: [] },
      { id: "elect2", nombre: "Electivo 2", abre: [] }
    ],
    "2° Semestre": [
      { id: "biofarma", nombre: "Biofarmacia", abre: [] },
      { id: "farmcli2", nombre: "Farmacia Clínica 2", abre: [] },
      { id: "toxi", nombre: "Toxicología", abre: [] },
      { id: "farmasis", nombre: "Farmacia Asistencial", abre: [] }
    ]
  },
  "5° Año": {
    "1° Semestre": [
      { id: "gestmkt", nombre: "Gestión y Marketing", abre: [] },
      { id: "farmacov", nombre: "Farmacovigilancia y Tecnovigilancia", abre: [] },
      { id: "electeleg", nombre: "Electivo Elección", abre: [] },
      { id: "elect3", nombre: "Electivo 3", abre: [] }
    ],
    "2° Semestre": [
      { id: "internado", nombre: "Internado", abre: [] }
    ]
  }
};

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
  for (const anio in mallaDatos) {
    for (const semestre in mallaDatos[anio]) {
      mallaDatos[anio][semestre].forEach(ramo => {
        if (ramo.abre.includes(id)) {
          const destino = document.getElementById(id);
          if (destino && estado[id] === "bloqueado") {
            destino.classList.remove("bloqueado");
            estado[id] = "activo";
          }
        }
      });
    }
  }
  const ramo = Object.values(mallaDatos).flatMap(a => Object.values(a).flat()).find(r => r.id === id);
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

    const desbloqueadoInicial = anio === "1° Año" && semestre === "1° Semestre";
    mallaDatos[anio][semestre].forEach(ramo => crearRamo(ramo, contenedor, desbloqueadoInicial));
  }
}
