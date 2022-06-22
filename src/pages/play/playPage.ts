import { Router } from "@vaadin/router";
import { state } from "../../state";

export function initPlayPage() {
	class PlayPage extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			let shadow = this.attachShadow({ mode: "open" });

			let div: any = document.createElement("div");

			div.innerHTML = `
      <div class="container">
        <div class="hands-container-pc">
          <component-piedra id="piedra-pc" class="pc-hand"></component-piedra>
        <component-papel id="papel-pc" class="pc-hand"></component-papel>
        <component-tijera id="tijera-pc" class="pc-hand"></component-tijera>
        </div>
         <component-counter></component-counter>
            <div class="hands-container">
                <component-piedra id="piedra"></component-piedra>
                <component-papel id="papel"></component-papel>
                <component-tijera id="tijera"></component-tijera>
            </div>
      </div>
      `;

			/*********************STYLES *************************/

			const style = document.createElement("style");
			style.innerHTML = `
      .container{
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

    .hands-container{
      position: fixed;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 1rem;
      bottom: 0;
    }

    .hands-container-pc{
      position: fixed;
      width: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      gap: 1rem;
      top: 0;
      transform: rotate(180deg);
    }
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			/********************FUNCTIONS *************************/

			const $piedra = div.querySelector("#piedra"),
				$papel = div.querySelector("#papel"),
				$tijera = div.querySelector("#tijera"),
				$counter = div.querySelector("component-counter");

			// Vuelve a la página de reglas si se acaba el tiempo

			const backToRules = () => {
				Router.go("/reglas");
			};

			let backRulesTime = setTimeout(() => {
				backToRules();
			}, 5000);

			// Eventos de la jugada de PC

			const pcPlay = (userPlay) => {
				// Crea una jugada random
				const playRandom = () => {
					const randomNumber: number = Math.floor(
						Math.random() * (4 - 1) + 1 - 1,
					);
					const arrPlaysPc = ["piedra", "papel", "tijera"];
					const randomPlayPc = arrPlaysPc[randomNumber];
					return randomPlayPc;
				};

				let pcPlayed = playRandom();
				let userPlayed = userPlay;

				// Hace los displays none para la pc
				const displaysPc = () => {
					const $piedraPc = div.querySelector("#piedra-pc"),
						$papelPc = div.querySelector("#papel-pc"),
						$tijeraPc = div.querySelector("#tijera-pc");

					if (pcPlayed === "piedra") {
						$papelPc.style.display = "none";
						$tijeraPc.style.display = "none";
					} else if (pcPlayed === "papel") {
						$piedraPc.style.display = "none";
						$tijeraPc.style.display = "none";
					} else if (pcPlayed === "tijera") {
						$piedraPc.style.display = "none";
						$papelPc.style.display = "none";
					}
				};
				displaysPc();

				// Manda las jugadas al estado
				state.addCurrentPlay(pcPlayed, userPlayed);

				setTimeout(() => {
					Router.go("/resultado");
				}, 1500);
			};

			// Eventos de la jugada del usuario
			const userPlay = () => {
				const userSelect = (userPlay) => {
					clearTimeout(backRulesTime);
					$counter.style.display = "none";
					pcPlay(userPlay);
				};

				$piedra.addEventListener("click", (e) => {
					userSelect(e.target.id);
					$papel.style.display = "none";
					$tijera.style.display = "none";
				});

				$papel.addEventListener("click", (e) => {
					userSelect(e.target.id);
					$piedra.style.display = "none";
					$tijera.style.display = "none";
				});

				$tijera.addEventListener("click", (e) => {
					userSelect(e.target.id);
					$papel.style.display = "none";
					$piedra.style.display = "none";
				});
			};

			userPlay();
		}
	}
	customElements.define("play-page", PlayPage);
}
