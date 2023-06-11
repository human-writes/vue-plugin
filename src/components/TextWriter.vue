<template>
    <div ref="root" class="text-snippet">
        <div class="to-be-written">
            <div id="to-write"></div>
        </div>
    </div>
</template>

<script lang="js" setup>
import { onMounted, ref } from "vue";
import { Writer } from "@human-writes/core";

const root = ref(null);

const props = defineProps({
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
});


onMounted(async () => {

    const $doc = root.value.ownerDocument;

    console.log({ $doc, root });
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
</script>

<script lang="js">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TextWriter"
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
