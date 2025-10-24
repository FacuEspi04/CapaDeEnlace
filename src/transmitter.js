import { marcoPerdido, hayError } from "./utils.js";

export class Transmisor {
  constructor(receptor) {
    this.receptor = receptor;
  }

  async enviarMarco(marco) {
    console.log(`\n[TX] Enviando marco #${marco.numero}: "${marco.datos}"`);

    // Simular pérdida del marco
    if (marcoPerdido()) {
      console.log(`[!] Marco #${marco.numero} perdido en transmisión.`);
      return false;
    }

    // Simular error en transmisión (daño en los datos)
    // Se crea una copia profunda para no modificar el original
    const marcoTransmitido = {
      numero: marco.numero,
      datos: marco.datos,
      checksum: marco.checksum
    };
    
    if (hayError()) {
      // Dañar los datos pero NO recalcular el checksum
      // Esto simula corrupción en el medio de transmisión
      const datosOriginales = marcoTransmitido.datos;
      marcoTransmitido.datos = marcoTransmitido.datos.split("").reverse().join("");
      console.log(`[!] Marco #${marco.numero} sufrió corrupción durante la transmisión.`);
      console.log(`[DEBUG] Datos originales: "${datosOriginales}" | Datos corruptos: "${marcoTransmitido.datos}"`);
      console.log(`[DEBUG] Checksum enviado: ${marcoTransmitido.checksum}`);
    }

    // Simular tiempo de transmisión
    await new Promise((r) => setTimeout(r, 500));

    // El receptor verifica la integridad
    return this.receptor.recibirMarco(marcoTransmitido);
  }
}