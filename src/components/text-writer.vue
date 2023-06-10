<template>
  <div ref="$el" class="text-snippet">
    <div class="to-be-written">
      <div id="to-write"></div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const $el = ref(null);

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
  makeMistakes: {
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

const $doc = $el.ownerDocument;

onMounted(() => {
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

  if (props.dependsOnSelector !== null) {
    const component = $doc.querySelector(props.dependsOnSelector);
    if (
        component !== undefined &&
        (component.tagName === "TEXT-WRITER" ||
            component.tagName === "CODE-WRITER")
    ) {
      // Options for the observer (which mutations to observe)
      const config = {attributes: true};

      // Callback function to execute when mutations are observed
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (
              mutation.type === "attributes" &&
              mutation.attributeName === "finished"
          ) {
            if (component.finished) {
              observer.disconnect();
              writeLikeAHuman();
            }
          }
        }
      });

      // Start observing the target node for configured mutations
      observer.observe(component, config);
    }
  } else {
    writeLikeAHuman();
  }
});

const writeLikeAHuman = () => {
};
</script>
<script>
export default {
  name: "TextWriter"
};
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
