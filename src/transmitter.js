import { marcoPerdido, hayError } from "./utils.js";

export class Transmisor {
  constructor(receptor) {
    this.receptor = receptor;
  }

  async enviarMarco(marco) {
    console.log(`\n[TX] Enviando marco #${marco.numero}: "${marco.datos}"`);

    if (marcoPerdido()) {
      console.log(`[!] Marco #${marco.numero} perdido en transmisión.`);
      return false;
    }

    if (hayError()) {
      marco.datos = marco.datos.split("").reverse().join("");
      console.log(`[!] Marco #${marco.numero} llegó dañado.`);
    }

    await new Promise((r) => setTimeout(r, 500));

    return this.receptor.recibirMarco(marco);
  }
}
