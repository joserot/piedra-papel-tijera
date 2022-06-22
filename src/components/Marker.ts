import { state } from "../state";

export function initMarker() {
	class MarkerElement extends HTMLElement {
		constructor() {
			super();
		}
		connectedCallback() {
			this.render();
		}
		render() {
			let shadow = this.attachShadow({ mode: "open" });

			/********************  FUNCTIONS **********************/

			let historyMaquina = state.history.pc;
			let historyVos = state.history.user;

			let div: any = document.createElement("div");
			div.innerHTML = `
      <div class="container">
        <h3>Maquina: ${historyMaquina} </h3>
        <hr />
        <h3>Vos: ${historyVos}</h3>
      </div>
  `;

			/* STYLES */

			let styles = document.createElement("style");
			styles.innerHTML = `
      hr{
       border: 2px solid #006CFC;
      }
      `;

			shadow.appendChild(styles);
			shadow.appendChild(div);
		}
	}
	customElements.define("component-marker", MarkerElement);
}
