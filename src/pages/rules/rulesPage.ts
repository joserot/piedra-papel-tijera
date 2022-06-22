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
      <component-marker></component-marker>
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

    component-marker{
      position: fixed;
      top: 0;
      left:0;
      width: 100%;
      display: flex;
      flex-direction: column;
     align-items: flex-start;
    }
    
      `;

			shadow.appendChild(style);
			shadow.appendChild(div);

			/********************FUNCTIONS *************************/

			const next: any = div.querySelector("component-button");
			next.addEventListener("click", () => {
				Router.go("/piedra-papel-tijera/juego");
			});
		}
	}
	customElements.define("rules-page", RulesPage);
}
