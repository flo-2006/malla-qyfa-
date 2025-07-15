// script.js
const malla = document.getElementById("malla");

const ramos = [
  { id: "qg1", nombre: "Química General 1", abre: ["qg2", "qo"] },
  { id: "bc", nombre: "Biología Celular", abre: ["fi"] },
  { id: "intro", nombre: "Introducción", abre: [] },
  { id: "mat", nombre: "Matemáticas", abre: ["calc", "fis", "bioest"] },
  { id: "integ", nombre: "Integrado", abre: ["fund"] },
  { id: "antro", nombre: "Antropología", abre: ["etica"] },
  { id: "qg2", nombre: "Química General 2", abre: ["qa", "fq"] },
  { id: "bioest", nombre: "Bioestadística", abre: [] },
  { id: "fis", nombre: "Física", abre: [] },
  { id: "calc", nombre: "Cálculo", abre: [] },
  { id: "fund", nombre: "Fundamentos", abre: [] },
  { id: "etica", nombre: "Ética", abre: ["persoc"] },
  { id: "qa", nombre: "Química Analítica Cuali/Cuantitativa", abre: ["aqi"] },
  { id: "qo", nombre: "Química Orgánica", abre: ["bqg", "qoa"] },
  { id: "fi", nombre: "Fisiología Integrada", abre: ["fp"] },
  { id: "fq", nombre: "Fisicoquímica", abre: ["tf1"] },
  { id: "salpop", nombre: "Salud Poblacional", abre: ["epid"] },
  { id: "gestper", nombre: "Gestión Personal", abre: [] },
  { id: "aqi", nombre: "Análisis Químico Instrumental", abre: [] },
  { id: "bqg", nombre: "Bioquímica General", abre: ["microb"] },
  { id: "fp", nombre: "Fisiopatología", abre: ["farma1"] },
  { id: "qoa", nombre: "Química Orgánica Avanzada", abre: ["qf1"] },
  { id: "epid", nombre: "Epidemiología", abre: [] },
  { id: "saludig", nombre: "Salud Digital", abre: [] },
  { id: "microb", nombre: "Microbiología", abre: [] },
  { id: "farma1", nombre: "Farmacología 1", abre: ["farma2"] },
  { id: "tf1", nombre: "Tecnología Farmacéutica 1", abre: ["tf2"] },
  { id: "qf1", nombre: "Química Farmacéutica 1", abre: ["qf2"] },
  { id: "persoc", nombre: "Persona y Sociedad", abre: [] },
  { id: "bioet", nombre: "Bioética", abre: [] },
  { id: "farma2", nombre: "Farmacología 2", abre: ["farmcli1", "toxi"] },
  { id: "tf2", nombre: "Tecnología Farmacéutica 2", abre: ["legis"] },
  { id: "qf2", nombre: "Química Farmacéutica 2", abre: ["farmacog"] },
  { id: "elect1", nombre: "Electivo 1", abre: [] },
  { id: "metod", nombre: "Metodología de Investigación", abre: [] },
  { id: "cc", nombre: "Control y Calidad", abre: ["biofarma"] },
  { id: "farmcli1", nombre: "Farmacia Clínica 1", abre: ["farmcli2"] },
  { id: "legis", nombre: "Legislación Farmacéutica", abre: [] },
  { id: "farmacog", nombre: "Farmacognosia y Fitoterapia", abre: [] },
  { id: "elect2", nombre: "Electivo 2", abre: [] },
  { id: "biofarma", nombre: "Biofarmacia", abre: [] },
  { id: "farmcli2", nombre: "Farmacia Clínica 2", abre: [] },
  { id: "toxi", nombre: "Toxicología", abre: [] },
  { id: "farmasis", nombre: "Farmacia Asistencial", abre: [] },
  { id: "gestmkt", nombre: "Gestión y Marketing", abre: [] },
  { id: "farmacov", nombre: "Farmacovigilancia y Tecnovigilancia", abre: [] },
  { id: "elect3", nombre: "Electivo 3", abre: [] },
  { id: "internado", nombre: "Internado", abre: [] },
];

const estado = {}; // id: aprobado/bloqueado

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;
  div.id = ramo.id;
  div.onclick = () => aprobarRamo(ramo);
  malla.appendChild(div);
  estado[ramo.id] = "activo";
  if (ramo.abre.length === 0) div.classList.add("aprobado");
}

function aprobarRamo(ramo) {
  const div = document.getElementById(ramo.id);
  div.classList.add("aprobado");
  div.onclick = null;
  estado[ramo.id] = "aprobado";
  desbloquear(ramo.id);
}

function desbloquear(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo) return;
  ramo.abre.forEach(dest => {
    const destDiv = document.getElementById(dest);
    if (estado[dest] !== "aprobado") {
      destDiv.classList.remove("bloqueado");
      estado[dest] = "activo";
    }
  });
}

ramos.forEach(crearRamo);
