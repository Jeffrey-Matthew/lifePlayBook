let gameMode = "automatic"; // Default mode is automatic

// Toggle between automatic and manual game modes
function toggleGameMode() {
    const mode = document.getElementById('gameMode').value;
    gameMode = mode;

    if (gameMode === "manual") {
        // Hide the "Roll the Dice" button in manual mode
        document.getElementById('roll-dice').style.display = 'none';
    } else {
        // Show the "Roll the Dice" button in automatic mode
        document.getElementById('roll-dice').style.display = 'block';
    }
}

// Manual selection of a choice (if game mode is manual)
function manualSelect(choice) {
    if (gameMode === "manual") {
        document.getElementById('result').innerHTML = "You selected Choice " + choice;
        // Redirect to the reveal page after a short delay
        setTimeout(function () {
            window.location.href = "/reveal?choice=" + choice;
        }, 1000);
    }
}

// Dice roll logic with visual spinning for automatic mode
function rollDice() {
    if (gameMode === "automatic") {
        // Generate a random number between 1 and 4
        const result = Math.floor(Math.random() * 4) + 1;

        // Calculate the degree for the wheel spin
        const baseSpin = 360 * 4;  // Base number of rotations (4 spins)
        const segmentAngle = 90;   // Each segment covers 90 degrees
        const finalRotation = baseSpin + (segmentAngle * (result - 1));

        // Apply the rotation to the roulette wheel
        const rouletteWheel = document.getElementById('roulette-wheel');
        rouletteWheel.style.transform = `rotate(${finalRotation}deg)`;

        // Display result after the spin animation
        setTimeout(function () {
            document.getElementById('result').innerHTML = "You landed on Choice " + result;

            // Redirect to the reveal page after a short delay
            setTimeout(function () {
                window.location.href = "/reveal?choice=" + result;
            }, 2000);

        }, 4000);  // Wait for the spin animation to complete
    }
}
