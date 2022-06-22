import { Router } from "@vaadin/router";

export function initRulesPage() {
	class RulesPage extends HTMLElement {
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
             <component-text>Presioná jugar
              y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</component-text>
             <component-button >¡Jugar!</component-button>
            <div class="hands-container">
                <component-piedra></component-piedra>
                <component-papel></component-papel>
                <component-tijera></component-tijera>
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

     .container > *{
        margin: 0 auto;
        text-align: center;
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
    
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			/********************FUNCTIONS *************************/

			const next: any = div.querySelector("component-button");
			next.addEventListener("click", () => {
				Router.go("/juego");
			});
		}
	}
	customElements.define("rules-page", RulesPage);
}
