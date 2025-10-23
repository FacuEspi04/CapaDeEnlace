import { calcularChecksum } from "./utils.js";

export class Receptor {
  recibirMarco(marco) {
    const checksumCalculado = calcularChecksum(marco.datos);
    if (checksumCalculado !== marco.checksum) {
      console.log(`[RX] Error en el marco #${marco.numero}`);
      return false;
    } else {
      console.log(`[RX] Marco #${marco.numero} recibido correctamente`);
      return true;
    }
  }
}
