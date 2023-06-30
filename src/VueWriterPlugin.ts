import { App, Plugin } from "vue";
import CodeWriter from "./components/CodeWriter.vue";
import TextWriter from "./components/TextWriter.vue";

// The Install function used by Vue to register the plugin
export const VueWriterPlugin: Plugin = {
    install(app: App) {
        // register Headline as a global component, so you can use it wherever you want in your app
        app.component("text-writer", TextWriter);
        app.component("code-writer", CodeWriter);
    }
};
