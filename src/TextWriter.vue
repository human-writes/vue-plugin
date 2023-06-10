<template>
  <div ref="$el" class="text-snippet">
    <div class="to-be-written">
      <div id="to-write">
        DOC
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const $el = ref(null);
const $doc = ref($el.ownerDocument);

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

onMounted(() => {
  const config = { attributes: true };

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

})

const writeLikeAHuman = () => {};

</script>

<script>
export default {
  name: "TextWriter"
}
</script>

