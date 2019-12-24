function assert(value, desc) {                             //
    let li = document.createElement('li');                 //
    li.className = value ? 'pass' : 'fail';                // 
    li.appendChild(document.createTextNode(desc));         //
    document.getElementById('result').appendChild(li)      //
}

function report(text) {
    assert(true, text)
}

function random(number) {
    return Math.floor(Math.random() * number)
}
function intRange(a, b) {
    return a + random(b - a)
}
const clr = {
    rgb() {
        return `rgb(${random(255)},${random(255)},${random(255)})`
    },
    rgbGray() {
        let number = random(100)
        return `rgb(${number},${number},${number})`
    }
}
window.onload = function () {
    console.log('hello')
    assert(true, 'The test suite is running')
    assert(false, 'fail')
}


//======================JS LETTER CANVAS=================

function initCanvas(id) {
    let canvas = document.getElementById(id);
    let w = canvas.width = canvas.parentNode.offsetWidth;
    let h = canvas.height = canvas.parentNode.offsetHeight;
    const ctx = canvas.getContext('2d');
    function getMetrics(number) {
        let smallSide = w < h ? w : h;
        let side = Math.floor((smallSide / 2) / 9);
        let rootX = Math.floor((w - side * 9) / 2)
        let rootY = Math.floor((h - side * 9) / 2)
        return {
            side,
            rootX,
            rootY
        }
    }
    let metrics = getMetrics(9);
    opts = {
        quantity: 40
    }
    class Particle {
        constructor(angle, x, y,radius, color) {
            this.radius = radius
            this.startX = x
            this.startY = y
            this.angle = angle
            this.x = x
            this.y = y
            this.color = color
        }
        update() {
            this.angle >= Math.PI * 2 ? this.angle = 0 : this.angle += 0.1;
            this.x = this.startX + Math.cos(this.angle) * 5;
            this.y = this.startY + Math.sin(this.angle) * 5;
        }
        draw() {
            // ctx.beginPath()
            // ctx.strokeStyle = '#202020'
            // ctx.lineWidth = 20;
            // ctx.arc(this.startX,this.startY, 100, 0, Math.PI * 2)
            // ctx.stroke()
            // ctx.closePath()
            ctx.beginPath()
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.closePath()
        }

    }

    let pixelMap = '05061727363534333231566777868574645352617182';

    let particles = pixelMap.match(/\d\d/g).map(a => {
        let pixelX = +[a[0]];
        let pixelY = +[a[1]];
        let x = metrics.rootX + pixelX * metrics.side
        let y = metrics.rootY + pixelY * metrics.side
        let arr = new Array(opts.quantity)
            .fill()
            .map(particle => new Particle(random(Math.PI * 2), x + random(metrics.side), y + random(metrics.side),intRange(metrics.side*0.1 ,metrics.side*0.3), clr.rgbGray()))
        // let arr = new Array(opts.quantity).fill().map(particle => new Particle(random(Math.PI * 2), x + random(metrics.side), y + random(metrics.side), clr.rgbGray()))
        return arr
    })
    particles = [].concat(...particles)
    console.log(particles)
         
    function animate() {
        ctx.clearRect(0, 0, w, h)
        particles.forEach(a => {
            a.update()
            a.draw()
        })
        window.requestAnimationFrame(animate)
    }
    animate()



}
initCanvas('btrn')
//======================JS LETTER CANVAS=================

function testing(first, ...rest) {
    console.log(Array.isArray(arguments), Array.isArray(rest))
}

testing(5, 4, 6, 7, 8, 3, 4, 5, 6)

let grit = name => console.log(this)

function sum(...rest) {
    return rest.reduce((a, b) => a + b, 0)
}
