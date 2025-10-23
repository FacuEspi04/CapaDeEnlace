import { calcularChecksum } from "./utils.js";

export class Receptor {
  constructor(tamMarco) {
    this.tamMarco = tamMarco;
    this.marcosRecibidos = [];
  }

  recibirMarco(marco) {
    const checksumCalculado = calcularChecksum(marco.datos);
    if (checksumCalculado !== marco.checksum) {
      console.log(`[RX] Error en el marco #${marco.numero}`);
      return false;
    } else {
      console.log(`[RX] Marco #${marco.numero} recibido correctamente`);
      this.marcosRecibidos.push(marco);
      return true;
    }
  }

  obtenerMensaje() {
    // Concatenar todos los datos de los marcos
    let mensaje = this.marcosRecibidos
      .sort((a, b) => a.numero - b.numero)
      .map(m => m.datos)
      .join('');
    
    // Eliminar el padding (caracteres null al final)
    return mensaje.replace(/\0+$/, '');
  }
}