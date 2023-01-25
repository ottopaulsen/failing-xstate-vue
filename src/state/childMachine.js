import {assign, createMachine, sendParent, spawn} from "xstate";

const performSomething = function() {
  return new Promise((resolve) => {
    console.log("Resolving promise")
    resolve("Done")
  })
}
function createChildMachine() {

  return createMachine(
      {
        id: "child",
        initial: "ready",
        context: {
          inputValue: null,
        },
        predictableActionArguments: true,
        states: {
          ready: {
            entry: [(context, event) => console.log("child ready entry")],
            exit: [(context, event) => console.log("child ready exit")],
            on: {
              DO_IT: "doing",
            },
          },
          doing: {
            entry: [(context, event) => console.log("child doing entry")],
            invoke: {
              id: "performSomething",
              src: performSomething,
              onDone: "complete",
            }
          },
          complete: {
            type: "final",
            entry: [(context, event) => console.log("child complete entry"),
            sendParent({type: "CHILD_COMPLETED"})]
          },
        },
      },
  );
}

export { createChildMachine };
