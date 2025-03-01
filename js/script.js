        let stage, wheel, numSlices = 6;
        gsap.registerPlugin(EaselPlugin);

        function setWheelSlices() {
            let slices = document.getElementById("numSlices").value;
            if (["6", "8", "12"].includes(slices)) {
                numSlices = parseInt(slices);
                document.getElementById("stopAt").max = numSlices;
                drawWheel();
            } else {
                alert("Invalid input! Choose 6, 8, or 12.");
            }
        }

        function drawWheel() {
            const canvas = document.getElementById("circleCanvas");
            if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
                console.error("Canvas element not found.");
                return;
            }

            stage = new createjs.Stage(canvas);
            wheel = new createjs.Container();
            let radius = 200;
            let sliceAngle = 360 / numSlices;
            let colors = ["red", "blue", "green", "yellow", "purple", "orange"];

            for (let i = 0; i < numSlices; i++) {
                let wedge = new createjs.Shape();
                let startAngle = (i * sliceAngle) * (Math.PI / 180);
                let endAngle = ((i + 1) * sliceAngle) * (Math.PI / 180);
                
                wedge.graphics.beginFill(colors[i % colors.length]);
                wedge.graphics.moveTo(250, 250);
                wedge.graphics.arc(250, 250, radius, startAngle, endAngle);
                wedge.graphics.lineTo(250, 250);
                wheel.addChild(wedge);
            }

            wheel.regX = 250;
            wheel.regY = 250;
            wheel.x = 250;
            wheel.y = 250;

            stage.removeAllChildren();
            stage.addChild(wheel);
            stage.update();
        }

        function spinWheel() {
            let stopAt = parseInt(document.getElementById("stopAt").value);
            if (isNaN(stopAt) || stopAt < 1 || stopAt > numSlices) {
                alert("Enter a valid wedge number between 1 and " + numSlices);
                return;
            }

            let targetRotation = 360 - (stopAt - 1) * (360 / numSlices) + (360 * 5); // Extra spins
            gsap.to(wheel, {
                duration: 4,
                rotation: targetRotation,
                ease: "power4.out",
                onUpdate: () => stage.update()
            });
        }

        document.addEventListener("DOMContentLoaded", () => {
            drawWheel();
            document.getElementById("setWheelBtn").addEventListener("click", setWheelSlices);
            document.getElementById("spinBtn").addEventListener("click", spinWheel);
        });
