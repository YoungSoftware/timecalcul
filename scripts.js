let timeFrameCount = 5;

function autoFormatTime(event) {
    let input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');

    if (value.length > 4) {
        value = value.slice(0, 4);
    }

    if (value.length > 2) {
        value = value.slice(0, 2) + ':' + value.slice(2);
    }

    input.value = value;
}

function validateTime(event) {
    let input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length < 4 && value.length > 0) {
        value = value.padStart(4, '0');
        value = value.slice(0, 2) + ':' + value.slice(2);
    } else if (value.length === 0) {
        input.value = '';
        return;
    } else {
        value = value.slice(0, 2) + ':' + value.slice(2);
    }

    let parts = value.split(':');
    let minutes = parseInt(parts[0], 10);
    let seconds = parseInt(parts[1], 10);

    if (minutes > 59 || seconds > 59) {
        input.value = '';
        alert('Please enter a valid time format (mm:ss) where mm and ss are between 00 and 59.');
    } else {
        input.value = value;
    }
}

function calculateAverage() {
    let times = [];
    for (let i = 1; i <= timeFrameCount; i++) {
        let time = document.getElementById('time' + i).value;
        if (time) {
            times.push(time);
        }
    }

    if (times.length === 0) {
        document.getElementById('average').innerText = 'Please enter at least one time period.';
        return;
    }

    let totalMinutes = 0;
    times.forEach(time => {
        let parts = time.split(':');
        let minutes = parseInt(parts[0]);
        let seconds = parseInt(parts[1]);
        totalMinutes += (minutes * 60) + seconds;
    });

    let averageMinutes = totalMinutes / times.length;
    let averageMinutesPart = Math.floor(averageMinutes / 60);
    let averageSecondsPart = Math.floor(averageMinutes % 60);

    let averageTime = averageMinutesPart + ":" + (averageSecondsPart < 10 ? '0' : '') + averageSecondsPart;
    document.getElementById('average').innerText = 'Average Time: ' + averageTime;
}

function addTimeFrame() {
    timeFrameCount++;
    let container = document.getElementById('timeFramesContainer');
    let newTimeFrame = document.createElement('div');
    newTimeFrame.className = 'time-frame';
    newTimeFrame.innerHTML = `
        <label for="time${timeFrameCount}">Time ${timeFrameCount} (mm:ss): </label>
        <input type="text" id="time${timeFrameCount}" placeholder="mm:ss" oninput="autoFormatTime(event)" onblur="validateTime(event)">
    `;
    container.appendChild(newTimeFrame);
}

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}
