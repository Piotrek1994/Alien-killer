const grid = document.querySelector('.grid')
let currentShooterIndex = 202
let width = 15


for(let i = 0; i < 255; i++){
    const square = document.createElement('div')
    grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))


const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw() {
    for(let i =0; i<alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.add('invader')
    }   
}

draw()

squares[currentShooterIndex].classList.add('shooter')



function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
            break
            case 'ArrowRight' :
                if (currentShooterIndex % width < width -1) currentShooterIndex += 1
                break
    }

    squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)


function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1 
}