import { App, Plugin } from "vue";
import TextWriter from "./components/TextWriter.vue";
import { VueWriter } from "./types";
import { VueWriterOptions } from "./types";

// Used to create a new ColoredText. "options" will be whatever you add later to "app.use(VueWriterPlugin, options);"
const createVueWriter = (options: VueWriterOptions): VueWriter => {
    return {
        textSpeed: options.speed,
        textTypos: options.makeTypos
    };
};

// The Install function used by Vue to register the plugin
export const VueWriterPlugin: Plugin = {
    install(app: App, options: VueWriterOptions) {
        // makes ColoredText available in your Vue.js app as either "$this.coloredText" (in your Source) or "{{ $coloredText }}" in your templates
        app.config.globalProperties.$writerOptions = createVueWriter(options);
        // register Headline as a global component, so you can use it wherever you want in your app
        app.component("TextWriter", TextWriter);
    }
};
