import { calcularChecksum } from "./utils.js";

export class Marco {
  constructor(numero, datos) {
    this.numero = numero;
    this.datos = datos;
    this.checksum = calcularChecksum(datos);
  }
}
