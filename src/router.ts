import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("root"));
router.setRoutes([
	{ path: "/piedra-papel-tijera/", component: "welcome-page" },
	{ path: "/piedra-papel-tijera/reglas", component: "rules-page" },
	{ path: "/piedra-papel-tijera/juego", component: "play-page" },
	{ path: "/piedra-papel-tijera/resultado", component: "result-page" },
]);
