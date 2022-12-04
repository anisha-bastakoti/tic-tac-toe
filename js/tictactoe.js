const boxes = document.querySelectorAll('.box');
const message = document.getElementById('message');
const restart = document.getElementById('restart');
const playerIcon = '✖';
const botIcon = '';
const board = new Array(9).fill(null);
const combinationsWins = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
};
const startGame = (e) => {
	if (!e.target.textContent) {
		const id = e.target.id;
		board[id] = playerIcon;
		e.target.innerText = playerIcon;
		if (checkForWin(playerIcon)) {
			endgame(playerIcon);
		} else if (!board.some((box) => box === null)) {
			message.innerHTML = `No Winner`;
		} else {
			boxDrawBot();
		}
		if (checkForWin(botIcon)) {
			endgame(botIcon);
		}
	}
};
function boxDrawBot() {
	let boolStateRandowPoss = false;
	do {
		let randomNum = getRandomInt(0, 8);
		if (!board[randomNum]) {
			boxes[randomNum].textContent = botIcon;
			board[randomNum] = botIcon;
			boolStateRandowPoss = true;
		}
	} while (!boolStateRandowPoss);
}

const checkForWin = (Icon) => {
	return combinationsWins.some((combination) => {
		return combination.every((comb) => {
			return board[comb] === Icon;
		});
	});
};

const endgame = (Icon) => {
	message.innerHTML = `Winner ${Icon}`;
	boxes.forEach((box) => box.removeEventListener('click', startGame));
};

const reset = () => {
	message.innerHTML = `Lets's GO!`;
	boxes.forEach((box) => (box.textContent = ''));
	boxes.forEach((box) => box.addEventListener('click', startGame));
	board.fill(null);
};

boxes.forEach((box) => box.addEventListener('click', startGame));

restart.addEventListener('click', reset);
