export function calcularChecksum(data) {
  let suma = 0;
  for (let i = 0; i < data.length; i++) {
    // Multiplica cada carácter por su posición + 1
    // Esto hace que el orden importe
    suma += data.charCodeAt(i) * (i + 1);
  }
  return suma % 65536; // Usar módulo más grande para menos colisiones
}

export function hayError() {
  return Math.random() < 0.2;
}

export function marcoPerdido() {
  return Math.random() < 0.1;
}