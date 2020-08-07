const professions = [
  "Babá",
  "Caseiro",
  "Costureiro/Alfaiate",
  "Cozinheiro",
  "Diarista",
  "Eletricista",
  "Encanador",
  "Jardineiro",
  "Mecânico",
  "Motorista",
  "Pedreiro",
  "Pintor",
  "Roçador",
  "Soldador",
];

const weekdays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

function getProfession(professionNumber) {
  return professions[professionNumber + 1];
}

module.exports = {
  professions,
  weekdays,
  getProfession,
};
