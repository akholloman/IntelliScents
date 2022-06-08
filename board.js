var five = require("johnny-five");
const { Board, Motor } = require("johnny-five");
var speed = 100;
port = process.argv[2]
var motor;
board = new five.Board({ port });

createMotor = function(pwm, dir, invertPWM) {
    motor = new Motor({
        pins: { pwm, dir, invertPWM},
        invertPWM,
    });
    return motor
}

board.on("ready", () => {
    motor = createMotor(3, 4, true)
    led = new five.Led(13);

    board.repl.inject({
        motor,
    });

    board.on('exit', () => {
        motor.stop()
        led.off()
    })
})

setMotorSpeed = function(speed) {
    motor.start(speed)
}

stopMotor = function() {
    motor.stop();
}

setLEDon = function(){
    led.on(); // on
}

setLEDoff = function(){
    led.off(); // off
}

module.exports = {
    setMotorSpeed,
    stopMotor,
    setLEDon,
    setLEDoff
}


