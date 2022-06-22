type Jugado = "piedra" | "papel" | "tijera";
type Result = "userWin" | "pcWin" | "tie";

export const state = {
	data: {
		currentGame: {
			jugadaUser: "",
			jugadaPc: "",
		},
	},
	history: {
		user: 0,
		pc: 0,
	},
	lastWin: "",
	listeners: [],
	getState() {
		return this.data;
	},
	setState(newState) {
		this.data = newState;
		for (const cb of this.listeners) {
			cb();
		}
	},
	// Inicia el estado con lo guardado en el local storage
	initState() {
		let lastWinStorage = localStorage.getItem("lastWin");
		lastWinStorage !== null ? (this.lastWin = lastWinStorage) : null;

		let historyUserStorage = Number(localStorage.getItem("historyUser"));
		let historyPcStorage = Number(localStorage.getItem("historyPc"));

		historyUserStorage !== null
			? (this.history.user = historyUserStorage)
			: null;

		historyPcStorage !== null ? (this.history.pc = historyPcStorage) : null;
	},
	/* Agrega la jugada actual */
	addCurrentPlay(jugadaPc, JugadaUser) {
		state.setState({
			currentGame: {
				jugadaUser: JugadaUser,
				jugadaPc: jugadaPc,
			},
		});

		this.whoWin(jugadaPc, JugadaUser);
	},
	//Ver jugada actual y guardarlas en una variable
	whoWin(playPc: Jugado, playUser: Jugado) {
		let result: Result | "" = "";

		if (playPc === playUser) {
			result = "tie";
		} else if (playPc === "piedra" && playUser === "papel") {
			result = "userWin";
		} else if (playPc === "piedra" && playUser === "tijera") {
			result = "pcWin";
		} else if (playPc === "papel" && playUser === "piedra") {
			result = "pcWin";
		} else if (playPc === "papel" && playUser === "tijera") {
			result = "userWin";
		} else if (playPc === "tijera" && playUser === "piedra") {
			result = "userWin";
		} else if (playPc === "tijera" && playUser === "papel") {
			result = "pcWin";
		}

		this.historyPush(result);
		this.lastWinResult(result);
	},
	// Suma el historal de victorias
	historyPush(result) {
		let data = this.history;

		if (result === "pcWin") {
			data.pc = data.pc + 1;
		} else if (result === "userWin") {
			data.user = data.user + 1;
		} else if (result === "tie") {
			data = data;
		}

		localStorage.setItem("historyUser", data.user);
		localStorage.setItem("historyPc", data.pc);
	},
	// determina ultimo ganador
	lastWinResult(result) {
		this.lastWin = result;

		localStorage.setItem("lastWin", this.lastWin);
	},
};
