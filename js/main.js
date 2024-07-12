// here I call my element "canvas".
const canvas = document.querySelector('.gameCanvas');
const c = canvas.getContext('2d');

// here I call my score 
const scoreb = document.querySelector('.score');
// console.log(score);

// this is the size of my map/game on my screen
const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
canvas.width = size;
canvas.height = size;

// this is where I set the boundary of how big and thick they are
class Boundary {
    static width = 40;
    static height = 40;
    constructor({ position, image }) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image;
    }

    // here I draw boundary
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y);
    }
}

// this is the player class / pacman
class Player {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 18; // the size of Pac-Man
    }

    // here I draw the pacman
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
    }

    // this is for the pacman's speed
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

// this is a class for the pellets
class Pellet {
    constructor({ position }) {
        this.position = position;
        this.radius = 3; // the size of a pellet
    }

    // drawing the pellets
    draw() {
        c.beginPath();
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }
}

// Arrays for storing pellets and obstacles
const pellets = [];
const boundaries = [];

// here I create a player
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

// with this I set all keys to false so that pacman cannot move at the same time
const keys = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
}

let lastKey = '';
let score = 0;

// this is the map of the game, this allows me to place where I want the walls and the pellets
const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['I', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'I'],
    ['I', '.', '0', '.', 'L', '7', 'R', '.', '0', '.', '0', '.', 'L', '7', 'R', '.', '0', '.', 'I'],
    ['I', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', 'I'],
    ['I', '.', 'L', 'R', '.', '.', '.', 'L', 'R', '.', 'L', 'R', '.', '.', '.', 'L', 'R', '.', 'I'],
    ['I', '.', '.', '.', '.', 'T', '.', '.', '.', '.', '.', '.', '.', 'T', '.', '.', '.', '.', 'I'],
    ['I', '.', '0', '.', 'L', '+', 'R', '.', '0', '.', '0', '.', 'L', '+', 'R', '.', '0', '.', 'I'],
    ['I', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', 'I'],
    ['I', '.', 'L', 'R', '.', '.', '.', 'L', 'R', '.', 'L', 'R', '.', '.', '.', 'L', 'R', '.', 'I'],
    ['I', '.', '.', '.', '.', 'T', '.', '.', '.', '.', '.', '.', '.', 'T', '.', '.', '.', '.', 'I'],
    ['I', '.', '0', '.', 'L', '5', 'R', '.', '0', '.', '0', '.', 'L', '5', 'R', '.', '0', '.', 'I'],
    ['I', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'I'],
    ['I', '.', '0', '.', 'L', '7', 'R', '.', '0', '.', '0', '.', 'L', '7', 'R', '.', '0', '.', 'I'],
    ['I', '.', '.', '.', '.', '_', '.', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', 'I'],
    ['I', '.', 'L', 'R', '.', '0', '.', 'L', 'R', '.', 'L', 'R', '.', '0', '.', 'L', 'R', '.', 'I'],
    ['I', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'I'],
    ['3', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '4'],
];

// function to create images
function createImage(src) {
    const image = new Image();
    image.src = src;
    return image;
}

// here I make the walls and the pellets for the game
map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/ph.png')
                    })
                );
                break;
            case 'I':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pv.png')
                    })
                );
                break;
            case '1':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pc1.png')
                    })
                );
                break;
            case '2':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pc2.png')
                    })
                );
                break;
            case '4':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pc3.png')
                    })
                );
                break;
            case '3':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pc4.png')
                    })
                );
                break;
            case '0':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/0.png')
                    })
                );
                break;
            case 'L':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./img/cl.png')
                    })
                )
                break;
            case 'R':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./img/cr.png')
                    })
                )
                break;
            case '_':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./img/cb.png')
                    })
                )
                break;
            case 'T':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./img/ct.png')
                    })
                )
                break;
            case '+':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./img/cps.png')
                    })
                )
                break;
            case '5':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./img/pct.png')
                    })
                )
                break;
            case '6':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./img/pcr.png')
                    })
                )
                break;
            case '7':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('./img/pcb.png')
                    })
                )
                break;
            case '8':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width,
                            y: i * Boundary.height
                        },
                        image: createImage('./img/L.png')
                    })
                )
                break;
            case '.':
                pellets.push(
                    new Pellet({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.height / 2
                        }
                    })
                )
                break;
            default:
                break;
        }
    });
});

// this is to check if the pac man crashes into the wall
function circleCollidesWithRectangle({ circle, rectang }) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectang.position.y + rectang.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectang.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectang.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectang.position.x + rectang.width
    )
}

// function for animation
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // Here I check if there is input and if there is then the pac man will move
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, velocity: {
                            x: 0,
                            y: -2
                        }
                    },
                    rectang: boundary
                })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = -2;
            }
        }
    } else if (keys.a.pressed && lastKey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, velocity: {
                            x: -2,
                            y: 0
                        }
                    },
                    rectang: boundary
                })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = -2;
            }
        }
    } else if (keys.s.pressed && lastKey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, velocity: {
                            x: 0,
                            y: 2
                        }
                    },
                    rectang: boundary
                })
            ) {
                player.velocity.y = 0;
                break;
            } else {
                player.velocity.y = 2;
            }
        }
    } else if (keys.d.pressed && lastKey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, velocity: {
                            x: 2,
                            y: 0
                        }
                    },
                    rectang: boundary
                })
            ) {
                player.velocity.x = 0;
                break;
            } else {
                player.velocity.x = 2;
            }
        }
    }

    // here I draw the pellets
    for (let i = pellets.length - 1; 0 < i; i--) {
       const pellet = pellets[i];
       pellet.draw();

       // here I check if the player has picked up a pellet
       if (Math.hypot(pellet.position.x - player.position.x,
           pellet.position.y - player.position.y) < pellet.radius + player.radius) {
           pellets.splice(i, 1);
           score += 10;
           scoreb.innerHTML = score;
       }
    };
   
    // here I draw the boundary
    boundaries.forEach(boundary => {
        boundary.draw();

        if (
            circleCollidesWithRectangle({
                circle: player,
                rectang: boundary
            })
        ) {
            player.velocity.x = 0;
            player.velocity.y = 0;
        };
    });

    // here I call player update
    player.update();
}

// here I call animation
animate()

// this event listener for pressing keycaps
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
});

// this event listener for releasing keycaps
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
});
