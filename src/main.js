import readline from "readline";
import { Marco } from "./frame.js";
import { Transmisor } from "./transmitter.js";
import { Receptor } from "./receiver.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function preguntar(pregunta) {
  return new Promise((resolve) => rl.question(pregunta, resolve));
}

async function main() {
  const mensaje = await preguntar("Ingrese el mensaje a transmitir: ");
  const tamMarco = parseInt(await preguntar("Tamaño de cada marco: "), 10);

  const receptor = new Receptor();
  const transmisor = new Transmisor(receptor);

  const marcos = [];
  let contador = 0;
  for (let i = 0; i < mensaje.length; i += tamMarco) {
    marcos.push(new Marco(contador++, mensaje.slice(i, i + tamMarco)));
  }

  console.log("\n=== Transmisión iniciada ===");

  for (let marco of marcos) {
    let exito = false;
    let intentos = 0;

    while (!exito && intentos < 3) {
      exito = await transmisor.enviarMarco({ ...marco });
      if (!exito) {
        console.log(`[TX] Reintentando envío de marco #${marco.numero}...`);
        intentos++;
      } else {
        console.log(`[ACK] ACK recibido para marco #${marco.numero}`);
      }
    }

    if (!exito) console.log(`[X] Falló el envío del marco #${marco.numero}`);

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n=== Transmisión finalizada ===");
  rl.close();
}

main();