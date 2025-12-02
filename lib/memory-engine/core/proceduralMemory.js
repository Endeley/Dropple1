const procedures = [];

export function addProcedure(step) {
  procedures.push(step);
}

export function listProcedures(limit = 20) {
  return procedures.slice(-limit);
}
