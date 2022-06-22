import "./router";
import { state } from "./state";
import { initButton } from "./components/Button";
import { initText } from "./components/Text";
import { initPiedra } from "./components/Piedra";
import { initPapel } from "./components/Papel";
import { initTijera } from "./components/Tijera";
import { initCounter } from "./components/Counter";
import { initMarker } from "./components/Marker";
import { initWelcomePage } from "./pages/welcome/welcomePage";
import { initRulesPage } from "./pages/rules/rulesPage";
import { initPlayPage } from "./pages/play/playPage";
import { initResultPage } from "./pages/result/resultPage";

const initApp = (params: Element | null) => {
	//State
	state.initState();
	// Pages
	initWelcomePage();
	initRulesPage();
	initPlayPage();
	initResultPage();
	// Components
	initButton();
	initText();
	initPiedra();
	initPapel();
	initTijera();
	initCounter();
	initMarker();
};

(function () {
	const root = document.getElementById("root");
	initApp(root);
})();
