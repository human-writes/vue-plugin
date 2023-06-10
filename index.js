import Components from "./src/Components.js";

const Plugin = {
    install (Vue) {
        for (const prop in Components) {
            if (Components.hasOwnProperty(prop)) {
                const component = Components[prop]
                Vue.component(component.name, component)
            }
        }
    }
}


export default Plugin
