# Simulación de Protocolo de Capa de Enlace de Datos

Este proyecto implementa una **simulación del protocolo de la capa de enlace de datos**, mostrando cómo esta capa transforma un medio de transmisión en bruto en una línea que parece libre de errores no detectados para la capa de red.

El programa divide los datos en **marcos (frames)**, los envía de forma **secuencial**, procesa los **acuse de recibo (ACKs)** del receptor y simula los **errores, pérdidas y control de flujo** típicos de esta capa.

---

## Características principales

### Enmarcado
El mensaje de entrada se divide en partes (marcos) de tamaño definido por el usuario.

### Control de errores
Cada marco incluye un **checksum** calculado sobre sus datos.  
El receptor verifica este valor para detectar si el marco llegó dañado.

### Control de flujo
El emisor utiliza un modelo **Stop-and-Wait**, esperando la confirmación (ACK) antes de enviar el siguiente marco, evitando así saturar al receptor.

### Manejo de errores y pérdidas
Se simulan:
- **Pérdidas de marcos** (10% de probabilidad)
- **Errores en marcos** (20% de probabilidad)
  
Si un marco se pierde o llega dañado, el transmisor intenta reenviarlo hasta 3 veces.
