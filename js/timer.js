async function run() {
    let response = await fetch("https://api.spacexdata.com/v3/launches/upcoming")
    let details = await response.json()
    console.log(details)

    let container = document.getElementById("container");
    for (let i = 0; i < details.length; i++) {
        let item = details[i]
        let launchDate = Date.parse(item.launch_date_utc) - new Date()
        item.launchDate = launchDate
        container.innerHTML += `<div class="container">
                    <div class="timerDetails">
                        <p>Mission: <span>${item.mission_name}</span></p>
                        <p>Rocket Name: <span>${item.rocket.rocket_name} </p>
                        <p class="timeCount">Time: <span id="timer${i}"> ${launchDate <= 0 ? 'Launched': launchDate}</span></p>
                        <p id="rocket${i}" class="rocket"></p>
                    </div>
                    </div>
                    <hr/>
                    `
        if (launchDate > 0) {
            item.timeoutHandle = setInterval(function () {
                let span = document.getElementById(`timer${i}`);
                item.launchDate = item.launchDate - (1000);
                item.rocketPosition = 80;
                if (item.launchDate <= 0) {
                    span.innerHTML = 'Launched'

                    item.rocketLaunchHandle = setInterval(function () {
                        let rocket = document.getElementById(`rocket${i}`)
                        if (item.rocketPosition <= -20) {
                            clearInterval(item.rocketLaunchHandle)
                        } else {
                            item.rocketPosition -= 1;
                            rocket.style.top = `${item.rocketPosition}%`
                        }
                    }, 20)

                    clearInterval(item.timeoutHandle)
                } else {
                    days = item.launchDate / 1000 / 60 / 60
                    hours = days % 24
                    days = (days - hours) / 24;
                    hoursinminutes = hours * 60
                    minutes = hoursinminutes % 60
                    hours = (hoursinminutes - minutes) / 60
                    minutesinseconds = minutes * 60
                    seconds = minutesinseconds % 60
                    minutes = (minutesinseconds - seconds) / 60
                    seconds = Math.round(seconds)

                    span.innerHTML = `days: ${days}, ${hours}:${minutes}:${seconds}`
                }

            }, 1000)
        }

    }
}

run()