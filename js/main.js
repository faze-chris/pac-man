const canvas = document.querySelector('#gameCanvas');
const c = canvas.getContext('2d');

const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
canvas.width = size;
canvas.height = size;

class Boundary {
    static width = 40;
    static height = 40;
    constructor({ position }) {
        this.position = position;
        this.width = 40;
        this.height = 40;
    }

    draw() {
        c.fillStyle = 'blue';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 18;
    }
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
};

const boundaries = [];
const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

let lastKey = '';

const map = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', ' ', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-'],
];

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        }
                    })
                );
                break;
        }
    });
});

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (keys.w.pressed && lastKey === 'w') {
        player.velocity.y = -2;
    } else if (keys.a.pressed && lastKey === 'a') {
        player.velocity.x = -2;
    } else if (keys.s.pressed && lastKey === 's') {
        player.velocity.y = 2;
    } else if (keys.d.pressed && lastKey === 'd') {
        player.velocity.x = 2;
    }

    boundaries.forEach(boundary => {
        boundary.draw();

        if (
            player.position.y - player.radius + player.velocity.y <= boundary.position.y + boundary.height &&
            player.position.x + player.radius + player.velocity.x >= boundary.position.x &&
            player.position.y + player.radius + player.velocity.y >= boundary.position.y &&
            player.position.x - player.radius + player.velocity.x <= boundary.position.x + boundary.width
        ) {
            console.log('het werkt');
            player.velocity.x = 0;
            player.velocity.y = 0;

        };
    });

    player.update();
    // player.velocity.x = 0;
    // player.velocity.y = 0;
}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
    }

    // console.log(keys.d.pressed);
    // console.log(keys.s.pressed);
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'w':
            keys.w.pressed = false;
            player.velocity.y = 0; 
            break;
        case 'a':
            keys.a.pressed = false;
            player.velocity.x = 0; 
            break;
        case 's':
            keys.s.pressed = false;
            player.velocity.y = 0; 
            break;
        case 'd':
            keys.d.pressed = false;
            player.velocity.x = 0; 
            break;
    }

    // console.log(keys.d.pressed);
    // console.log(keys.s.pressed);
});
