import App from './App.svelte';
import { init } from './scripts/init';

const app = new App({
	target: document.body
});

// Call init after App has been instantiated in order to prevent race condition
init();

export default app;