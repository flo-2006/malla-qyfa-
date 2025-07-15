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
      { id: "epid", nombre: "Epidemiología", abre:
