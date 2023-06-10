import TextWriter from "./components/text-writer.vue"

function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component("text-writer", TextWriter);
}

const plugin = {
	install,
};

let GlobalVue = null;
if (typeof window !== "undefined") {
	GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
	GlobalVue = global.vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

TextWriter.install = install;

export default TextWriter;