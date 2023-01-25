<template>
  <h1>The Page</h1>
  <p>Parent state: {{state.value}}</p>
  <p>Child state from actor: {{childActor?.state?.value}}</p>
  <p v-if="state.children.child">Child state from children: {{state.children.child._state.value}}</p>
  <button @click="clicked">DO IT</button>
</template>

<script setup>

import {createParentMachine} from "@/state/parentMachine";
import {useActor, useMachine} from "@xstate/vue";
import {onMounted, ref, watch} from "vue";

const {state, send} = useMachine(createParentMachine())

const childActor = ref(null);

if(state.value.context.childMachine){
  childActor.value = useActor(state.value.context.childMachine);
}

watch(() => state.value.context.childMachine, () => {
  console.log("Setting childActor")
  childActor.value = useActor(state.value.context.childMachine);
})

function clicked() {
  console.log("DO IT clicked")
  childActor.value.send({type: "DO_IT"})
}


onMounted(() => {
  send({type: "LOAD_DONE"})
})

</script>