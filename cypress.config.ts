import { defineConfig } from "cypress";

export default defineConfig({
	e2e: {
		baseUrl: "https://mostly-mundane-movies.netlify.app/",
	},
});