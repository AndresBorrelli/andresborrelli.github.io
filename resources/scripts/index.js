//------------------------------------------------------------------------------
var speedValueElement;
var needleElement;
var speed;
//------------------------------------------------------------------------------
window.addEventListener('load', (e) => {
    speed = 0;
    speedValueElement = document.getElementById('speedValue');
    needleElement = document.getElementById('needle');
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(calculateSpeed, (error) => {
            console.error('Error getting location', error);
        }, {
            enableHighAccuracy: true // Request high accuracy for better speed readings
        });
    } 
    else {
        console.error('Geolocation is not supported by this browser.');
    }
});
//------------------------------------------------------------------------------
function updateSpeedometer() {
    speedValueElement.innerText = `Speed: ${speed.toFixed(2)} km/h`;
    const angle = (speed / 180) * 180; // Convert speed to angle
    needleElement.style.transform = `rotate(${angle - 90}deg)`;
}

function calculateSpeed(position) {
    // Get speed in meters per second and convert to kilometers per hour
    speed = position.coords.speed * 3.6; // Convert m/s to km/h
    updateSpeedometer();
}

