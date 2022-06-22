import { Router } from "@vaadin/router";
import { stat } from "fs";
import { state } from "../../state";

export function initResultPage() {
	class ResultPage extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			let shadow = this.attachShadow({ mode: "open" });

			let div: any = document.createElement("div");
			let result = "";
			let historyUser = "";
			let historyPc = "";

			/********************FUNCTIONS *************************/

			// Asigna el texto del resultado
			const assignResult = () => {
				let lastWin = state.lastWin;

				if (lastWin === "pcWin") {
					result = "Perdiste";
				}

				if (lastWin === "userWin") {
					result = "Ganaste";
				}

				if (lastWin === "tie") {
					result = "Empate";
				}
			};

			assignResult();

			// Asigna la clase del resultado
			const assignClass = () => {
				let $resultEl = div.querySelector("h2");
				let lastWin = state.lastWin;

				if (lastWin === "pcWin") {
					$resultEl?.classList.add("perdiste");
				}

				if (lastWin === "userWin") {
					$resultEl?.classList.add("ganaste");
				}

				if (lastWin === "tie") {
					$resultEl?.classList.add("empate");
				}
			};

			const historyPlays = (hUser, hPc) => {
				historyUser = hUser;
				historyPc = hPc;
			};

			historyPlays(state.history.user, state.history.pc);

			/*********************************************/

			div.innerHTML = `
      <div class="container">
          <h2>${result}</h2>
          <div class="score-container">
            <h3>Score</h3>
            <p>Vos: ${historyUser} </p>
            <p>Maquina: ${historyPc} </p>
          </div>
          <component-button>Volver a Jugar</component-button>
      </div>
      `;

			assignClass();

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

      h2{
        font-size: 4.5rem;
	      font-family: "Open Sans", sans-serif;
        margin: 0;
      }

      .ganaste{
        color: #6CB46C;
      }

      .perdiste{
        color: #DC5B49;
      }

      .empate{
        color: #006CFC;
      }

      .score-container{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 1rem;
        border: 0.4rem solid #000;
        border-radius: 10px;
        width: 50%;
        margin: 2rem auto;
        padding: 1.5rem;
      }

      h3{
        font-size: 2.5rem;
	      font-family: "Open Sans", sans-serif;
        margin: 0;
      }

      p{
        font-size: 1.5rem;
	      font-family: "Open Sans", sans-serif;
        margin: 0;
      }
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			// Volver al jugar
			const backToRules = () => {
				Router.go("/reglas");
			};

			const $btn = div.querySelector("component-button");
			$btn.addEventListener("click", backToRules);
		}
	}
	customElements.define("result-page", ResultPage);
}
