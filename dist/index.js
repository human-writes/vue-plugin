import { defineComponent, ref, onMounted, openBlock, createElementBlock, createElementVNode } from 'vue';
import { Writer } from '@human-writes/core';

const _hoisted_1$1 = /*#__PURE__*/createElementVNode("div", { class: "to-be-written" }, [
  /*#__PURE__*/createElementVNode("div", { id: "to-write" })
], -1 /* HOISTED */);
const _hoisted_2$1 = [
  _hoisted_1$1
];

const __default__$1 = defineComponent({
    name: "TextWriter"
});


var script$1 = /*#__PURE__*/Object.assign(__default__$1, {
  props: {
    source: {
        default: ""
    },
    speed: {
        default: "60"
    },
    dependsOnSelector: {
        default: ""
    },
    makeTypos: {
        default: false
    },
    styles: {
        default: ""
    },
    classes: {
        default: ""
    },
    finished: {
        default: false
    },
    restart: {
        default: false
    }
},
  setup(__props) {

const props = __props;

const root = ref(null);




onMounted(async () => {

    const $doc = root.value.ownerDocument;

    /**
     * The magic starts here
     */
    if (props.styles !== "" && props.classes !== "") {
        const $styleList = props.styles.split(",");

        $styleList.forEach(($item) => {
            const style = $doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            $doc.head.appendChild(style);
        });

        const parentDiv = $doc.getElementById("to-write");
        parentDiv.setAttribute("class", props.classes);
    }

    if (props.dependsOnSelector !== "") {
        const component = $doc.querySelector(props.dependsOnSelector);
        if (
            component !== undefined &&
            (component.tagName === "TEXT-WRITER" ||
                component.tagName === "CODE-WRITER")
        ) {
            // Options for the observer (which mutations to observe)
            const config = { attributes: true };

            // Callback function to execute when mutations are observed
            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(async (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (
                        mutation.type === "attributes" &&
                        mutation.attributeName === "finished"
                    ) {
                        if (component.finished) {
                            observer.disconnect();
                            await writeLikeAHuman();
                        }
                    }
                }
            });

            // Start observing the target node for configured mutations
            observer.observe(component, config);
        }
    } else {
        await writeLikeAHuman();
    }
});

const writeLikeAHuman = async () => {
    const doc = root.value.ownerDocument;

    const tw = new Writer(doc, props.source, props.speed, props.makeTypos);
    await tw.writeLikeAHuman("to-write");
};

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: "text-snippet"
  }, _hoisted_2$1, 512 /* NEED_PATCH */))
}
}

});

script$1.__file = "src/components/TextWriter.vue";

const _hoisted_1 = /*#__PURE__*/createElementVNode("div", { class: "to-be-copied" }, [
  /*#__PURE__*/createElementVNode("pre", { id: "to-copy" }, [
    /*#__PURE__*/createElementVNode("code")
  ])
], -1 /* HOISTED */);
const _hoisted_2 = /*#__PURE__*/createElementVNode("div", { class: "to-be-written" }, [
  /*#__PURE__*/createElementVNode("pre", { id: "to-write" }, [
    /*#__PURE__*/createElementVNode("code")
  ])
], -1 /* HOISTED */);
const _hoisted_3 = [
  _hoisted_1,
  _hoisted_2
];

const __default__ = defineComponent({
    name: "CodeWriter"
});


var script = /*#__PURE__*/Object.assign(__default__, {
  props: {
    source: {
        default: ""
    },
    speed: {
        default: "60"
    },
    dependsOnSelector: {
        default: ""
    },
    makeTypos: {
        default: false
    },
    styles: {
        default: ""
    },
    classes: {
        default: ""
    },
    finished: {
        default: false
    },
    restart: {
        default: false
    },
    useHighlightJs: {
        default: false
    },
    theme: {
        default: ""
    },
    language: {
        default: ""
    }
},
  setup(__props) {

const props = __props;

const root = ref(null);



onMounted(async () => {
    const doc = root.value.ownerDocument;
    if (props.useHighlightJs) {
        const $theme = props.theme ?? "base16/monokai";
        const $language = props.language ?? "html";

        const script = doc.createElement("script");
        script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";
        doc.head.appendChild(script);

        const $styleList = [];
        $styleList.push(
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css"
        );
        $styleList.push(
            `https://highlightjs.org/static/demo/styles/${$theme}.css`
        );

        $styleList.forEach(($item) => {
            const style = doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            doc.head.appendChild(style);
        });

        const $parentDiv = doc.querySelectorAll("code");
        for (const node of $parentDiv) {
            node.setAttribute("class", `language-${$language}`);
        }
    }
    /**
     * The magic starts here
     */
    if (props.styles !== "" && props.classes !== "") {
        const $styleList = props.styles.split(",");

        $styleList.forEach(($item) => {
            const style = $doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            $doc.head.appendChild(style);
        });

        const parentDiv = $doc.getElementById("to-write");
        parentDiv.setAttribute("class", props.classes);
    }

    if (props.dependsOnSelector !== "") {
        const component = $doc.querySelector(props.dependsOnSelector);
        if (
            component !== undefined &&
            (component.tagName === "TEXT-WRITER" ||
                component.tagName === "CODE-WRITER")
        ) {
            // Options for the observer (which mutations to observe)
            const config = { attributes: true };

            // Callback function to execute when mutations are observed
            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(
                async (mutationList, observer) => {
                    for (const mutation of mutationList) {
                        if (
                            mutation.type === "attributes" &&
                            mutation.attributeName === "finished"
                        ) {
                            if (component.finished) {
                                observer.disconnect();
                                await writeLikeAHuman();
                            }
                        }
                    }
                }
            );

            // Start observing the target node for configured mutations
            observer.observe(component, config);
        }
    } else {
        await writeLikeAHuman();
    }
});

const writeLikeAHuman = async () => {
    const doc = root.value.ownerDocument;

    const tw = new Writer(doc, props.source, props.speed, props.makeTypos);
    await tw.writeLikeAHuman("to-write", "to-copy");
};

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    ref_key: "root",
    ref: root,
    class: "code-snippet"
  }, _hoisted_3, 512 /* NEED_PATCH */))
}
}

});

script.__file = "src/components/CodeWriter.vue";

// Used to create a new ColoredText. "options" will be whatever you add later to "app.use(VueWriterPlugin, options);"
const createVueWriter = (options) => {
    return {
        textSpeed: options.speed,
        textTypos: options.makeTypos
    };
};
// The Install function used by Vue to register the plugin
const VueWriterPlugin = {
    install(app, options) {
        // makes ColoredText available in your Vue.js app as either "$this.coloredText" (in your Source) or "{{ $coloredText }}" in your templates
        app.config.globalProperties.$writerOptions = createVueWriter(options);
        // register Headline as a global component, so you can use it wherever you want in your app
        app.component("TextWriter", script$1);
        app.component("CodeWriter", script);
    }
};

export { script as CodeWriter, script$1 as TextWriter, VueWriterPlugin };
//# sourceMappingURL=index.js.map
