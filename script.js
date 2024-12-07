let cumulativeRotation = 0; // Rotation cumulée en degrés
let clockwiseRotations = 0; // Nombre de rotations complètes dans le sens horaire
let counterClockwiseRotations = 0; // Nombre de rotations complètes dans le sens antihoraire
let totalRotations = 0; // Total des rotations cumulées (positif + négatif)

const rotationDisplay = document.getElementById("rotationCount");
const resetButton = document.getElementById("resetButton");

// Vérifie si le capteur gyroscopique est disponible
if ('AbsoluteOrientationSensor' in window || 'Gyroscope' in window) {
    const sensor = new Gyroscope({ frequency: 60 });

    sensor.addEventListener("reading", () => {
        const rotationRateZ = sensor.z; // Rotation en rad/s
        const deltaTime = 1 / 60; // Intervalle de temps en secondes (fréquence de 60Hz)

        // Convertir la vitesse angulaire en degrés et ajouter à la rotation cumulée
        const deltaRotation = (rotationRateZ * 180 / Math.PI) * deltaTime;
        cumulativeRotation += deltaRotation;

        // Vérifie si une rotation complète est atteinte dans le sens horaire ou antihoraire
        if (cumulativeRotation >= 360) {
            const rotations = Math.floor(cumulativeRotation / 360); // Nombre de rotations complètes
            clockwiseRotations += rotations;
            totalRotations += rotations; // Mise à jour du total
            cumulativeRotation %= 360; // Réinitialiser la rotation cumulée
        } else if (cumulativeRotation <= -360) {
            const rotations = Math.floor(-cumulativeRotation / 360); // Nombre de rotations complètes
            counterClockwiseRotations += rotations;
            totalRotations += rotations; // Mise à jour du total
            cumulativeRotation %= 360; // Réinitialiser la rotation cumulée
        }

        // Met à jour l'affichage
        rotationDisplay.textContent = `
            Rotations horaires : ${clockwiseRotations}, 
            Rotations antihoraires : ${counterClockwiseRotations},
            Total des rotations cumulées : ${totalRotations}
        `;
    });

    sensor.start();
} else {
    rotationDisplay.textContent = "Gyroscope non supporté sur cet appareil.";
}

// Bouton RESET pour remettre à zéro les compteurs
resetButton.addEventListener("click", () => {
    clockwiseRotations = 0;
    counterClockwiseRotations = 0;
    totalRotations = 0;
    cumulativeRotation = 0;

    rotationDisplay.textContent = `
        Rotations horaires : ${clockwiseRotations}, 
        Rotations antihoraires : ${counterClockwiseRotations},
        Total des rotations cumulées : ${totalRotations}
    `;
});
