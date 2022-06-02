const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
const score = document.querySelector('.score__point')
const rest = document.querySelector('.rest')
const animation = document.querySelector('.mode')

const easyMode = document.querySelector('.easy')
const mediumMode = document.querySelector('.medium')
const hardMode = document.querySelector('.hard')

let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0
const audio = new Audio('audio.mp3')
const button = document.querySelector('button')
const victory = new Audio('victory.mp3')
const lose = new Audio('lose.mp3')
let mode = 99
let x = true
let y = true


for (let i = 0; i < 225; i++) {
	const square = document.createElement('div')
	grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
]




function draw() {
	for (let i = 0; i < alienInvaders.length; i++) {
		if (!aliensRemoved.includes(i)) {
			squares[alienInvaders[i]].classList.add('invader')
		}
	}
}

draw()

function remove() {
	for (let i = 0; i < alienInvaders.length; i++) {
		squares[alienInvaders[i]].classList.remove('invader')
	}
}

squares[currentShooterIndex].classList.add('shooter')





function moveShooter(e) {
	squares[currentShooterIndex].classList.remove('shooter')
	switch (e.key) {
		case 'ArrowLeft':
			if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
			break
		case 'ArrowRight':
			if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
			break
	}
	squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
	const leftEdge = alienInvaders[0] % width === 0
	const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
	remove()

	if (rightEdge && goingRight) {
		for (let i = 0; i < alienInvaders.length; i++) {
			alienInvaders[i] += width + 1
			direction = -1
			goingRight = false
		}
	}

	if (leftEdge && !goingRight) {
		for (let i = 0; i < alienInvaders.length; i++) {
			alienInvaders[i] += width - 1
			direction = 1
			goingRight = true
		}
	}

	for (let i = 0; i < alienInvaders.length; i++) {
		alienInvaders[i] += direction
	}

	draw()

	if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
		resultsDisplay.innerHTML = score
		
		
		resultsDisplay.innerHTML = results + ' GAME OVER'
		mode = 99
		lose.play()
		y = false
		clearInterval(invadersId)
	}

	for (let i = 0; i < alienInvaders.length; i++) {
		if (alienInvaders[i] > squares.length) {
			resultsDisplay.innerHTML = score

			
			resultsDisplay.innerHTML = results + ' GAME OVER'
			mode = 99
			lose.play()
			y = false
			clearInterval(invadersId)
		}
	}
	if (aliensRemoved.length === alienInvaders.length) {
		score.classList.add('hide')
		resultsDisplay.innerHTML = 'YOU WIN'
		victory.play()
		y = false

		clearInterval(invadersId)
	}
}



const easyModeFn = () => {
	if (mode == 200 || mode == 100){
		return
	} else {
		mode = 500
		invadersId = setInterval(moveInvaders, mode)
		easyMode.disabled = 'disabled'
	}

	x = false

	
}

const mediumModeFn = () => {
	if (mode == 500 || mode == 100){
		return
	} else {
		mode = 200
		invadersId = setInterval(moveInvaders, mode)
		mediumMode.disabled = 'disabled'
	}
	x = false
}

const hardModeFn = () => {
	if (mode == 200 || mode == 500) {
		return
	} else {
		mode = 100
		invadersId = setInterval(moveInvaders, mode)
		hardMode.disabled = 'disabled'
	}
	x = false
}

function shoot(e) {
	if (mode === 99) {
		return
	} else {
		let laserId
		let currentLaserIndex = currentShooterIndex
		function moveLaser() {
			squares[currentLaserIndex].classList.remove('laser')
			currentLaserIndex -= width
			squares[currentLaserIndex].classList.add('laser')

			if (squares[currentLaserIndex].classList.contains('invader')) {
				squares[currentLaserIndex].classList.remove('laser')
				squares[currentLaserIndex].classList.remove('invader')
				squares[currentLaserIndex].classList.add('boom')

				setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
				clearInterval(laserId)

				const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
				aliensRemoved.push(alienRemoved)
				results++
				resultsDisplay.innerHTML = results
			}
		}
		switch (e.key) {
			case 'ArrowUp':
				laserId = setInterval(moveLaser, 100)
		}
	}

	document.addEventListener('keydown', e => {
		if( y === true)
		switch (e.keyCode) {
			case 38:
				audio.play()
				break
		}
	})
}



document.addEventListener('keydown', shoot)





function restFn(){
	reload = location.reload();
	}






document.addEventListener('keydown', function(e) {
		switch (e.keyCode) {
			case 37:
				animation.classList.add("text-animation");
				break;
			case 38:
				animation.classList.add("text-animation");
				break;
			case 39:
				animation.classList.add("text-animation");
				break;
			case 40:
				animation.classList.add("text-animation");
				break;
		}


		if(x === false){
			animation.classList.remove("text-animation");
		} else {
			return
		}
			
	});
	



rest.addEventListener('click', restFn)
easyMode.addEventListener('click', easyModeFn)
mediumMode.addEventListener('click', mediumModeFn)
hardMode.addEventListener('click', hardModeFn)



window.addEventListener(
	'keydown', 
	function (e) {
		if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
			e.preventDefault()
		}
	},
	false
)


