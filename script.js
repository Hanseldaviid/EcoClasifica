document.addEventListener("DOMContentLoaded", () => {
    const residuos = document.querySelectorAll(".residuo");
    const canecas = document.querySelectorAll(".caneca");
    const temporizador = document.getElementById("temporizador");
    const mensajeEducativo = document.getElementById("mensaje-educativo");
    const mensaje = document.getElementById("mensaje");
    
    let tiempoRestante = 60; // 60 segundos de tiempo
    let puntos = 0;

    // Temporizador
    setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            temporizador.textContent = `Tiempo restante: ${tiempoRestante}s`;
        } else {
            mostrarMensaje("¡Tiempo agotado!", "red");
        }
    }, 1000);

    // Función para mostrar mensajes
    function mostrarMensaje(texto, color) {
        mensaje.textContent = texto;
        mensaje.style.color = color;
        mensaje.style.fontWeight = "bold";
    }

    // Función para mostrar mensaje educativo
    function mostrarMensajeEducativo(tipoResiduo) {
        const datos = {
            papel: "El papel reciclado puede usarse hasta 7 veces antes de que pierda su calidad.",
            plastico: "El plástico reciclado reduce la necesidad de fabricar más plástico, protegiendo el medio ambiente.",
            vidrio: "El vidrio puede reciclarse indefinidamente sin perder calidad.",
        };

        mensajeEducativo.textContent = datos[tipoResiduo] || "¡Sigue reciclando para un futuro mejor!";
    }

    // Función de dragstart y dragend para los residuos
    residuos.forEach(residuo => {
        residuo.addEventListener("dragstart", e => {
            e.dataTransfer.setData("tipo", residuo.dataset.tipo);
            e.dataTransfer.setData("id", residuo.alt);
            e.dataTransfer.setData("html", residuo.outerHTML);
            e.target.classList.add("arrastrando");
        });

        residuo.addEventListener("dragend", e => {
            e.target.classList.remove("arrastrando");
        });
    });

    // Función para manejar el drop en las canecas
    canecas.forEach(caneca => {
        const contenedor = caneca.querySelector(".contenedor-drop");

        caneca.addEventListener("dragover", e => {
            e.preventDefault();
        });

        caneca.addEventListener("drop", e => {
            e.preventDefault();
            const tipoResiduo = e.dataTransfer.getData("tipo");
            const htmlResiduo = e.dataTransfer.getData("html");

            if (tipoResiduo === caneca.dataset.tipo) {
                contenedor.innerHTML += htmlResiduo;

                // Oculta el residuo original para que desaparezca de arriba
                const arrastrado = document.querySelector(".arrastrando");
                if (arrastrado) arrastrado.style.display = "none";

                // Incrementa los puntos
                puntos += 10;
                mostrarMensaje(`¡Correcto! Puntos: ${puntos}`, "green");

                // Muestra mensaje educativo
                mostrarMensajeEducativo(tipoResiduo);

                // Agrega retroalimentación visual a la caneca
                caneca.classList.add("correcta");
                setTimeout(() => {
                    caneca.classList.remove("correcta");
                }, 1000);
            } else {
                mostrarMensaje("Incorrecto. Ese residuo no va allí.", "red");
            }
        });
    });
});
