import { Router } from "@vaadin/router";

const router = new Router(document.getElementById("root"));
router.setRoutes([
	{ path: "/", component: "welcome-page" },
	{ path: "/reglas", component: "rules-page" },
	{ path: "/juego", component: "play-page" },
	{ path: "/resultado", component: "result-page" },
]);
