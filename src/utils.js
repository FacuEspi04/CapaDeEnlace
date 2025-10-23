export function calcularChecksum(data) {
  let suma = 0;
  for (let c of data) suma += c.charCodeAt(0);
  return suma % 256;
}

export function hayError() {
  return Math.random() < 0.2;
}

export function marcoPerdido() {
  return Math.random() < 0.1;
}
