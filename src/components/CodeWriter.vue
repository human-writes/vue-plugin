<template>
    <div ref="root" class="code-snippet">
        <div class="to-be-copied">
            <pre id="to-copy"><code></code></pre>
        </div>
        <div class="to-be-written">
            <pre id="to-write"><code></code></pre>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { Writer } from "@human-writes/core";

const root = ref(null);

const props = defineProps({
    source: {
        default: ""
    },
    speed: {
        default: 20
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
        default: "base16/monokai"
    },
    language: {
        default: "html"
    }
});

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
            const style = doc.createElement("style");
            style.innerHTML = `@import "${$item}"`;

            doc.head.appendChild(style);
        });

        const parentDiv = doc.getElementById("to-write");
        parentDiv.setAttribute("class", props.classes);
    }

    if (props.dependsOnSelector !== "") {
        const component = doc.querySelector(props.dependsOnSelector);
        if (component !== null) {
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
                            const attr = component.getAttribute("finished");

                            if (attr === "true") {
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

const onFinishedWriting = function (html) {
    // Raise an event outside the shadow DOM
    // when all is done and ready
    const finishedEvent = new CustomEvent("finishedWriting", {
        bubbles: true,
        cancellable: true,
        detail: {
            content: html
        }
    });
    root.value.dispatchEvent(finishedEvent);
    root.value.setAttribute("finished", "true");
};

const writeLikeAHuman = async () => {
    const doc = root.value.ownerDocument;

    const writerOptions = inject("writerOptions");

    console.log({ writerOptions });

    const speed = props.speed;
    const makeTypos = props.makeTypos;

    const tw = new Writer(
        doc,
        props.source,
        speed,
        makeTypos,
        onFinishedWriting
    );
    await tw.writeLikeAHuman("to-write", "to-copy");
};
</script>
<script>
import { defineComponent } from "vue";
import "../style.css";

export default defineComponent({
    name: "CodeWriter"
});
</script>
// watches
<!-- static get observeAttributes() {
//         /**
//          * Attributes passed inline to the component
//          */
//         return [
//             "source",
//             "speed",
//             "depends-on-selector",
//             "make-mistakes",
//             "styles",
//             "classes",
//             "finished"
//         ];
//     } -->
<style scoped>
:root {
    --snippet-width: 50vw;
}

#to-copy {
    display: block;
    position: relative;
    float: left;
    width: var(--snippet-width);
}

#to-write {
    width: var(--snippet-width);
}

.to-be-copied {
    display: block;
    position: relative;
    float: left;
}

.to-be-written {
    display: flex;
    position: absolute;
    width: var(--snippet-width);
}

.code-snippet {
    display: flex;
    font-size: medium;
}

div,
p,
span,
textarea {
    -tab-size: 4;
    -o-tab-size: 4;
    -moz-tab-size: 4;
}

</style>