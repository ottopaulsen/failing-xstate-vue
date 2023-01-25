import {assign, createMachine, spawn} from "xstate";
import {createChildMachine} from "@/state/childMachine";

function createParentMachine() {

  return createMachine(
      {
        id: "parent",
        initial: "loading",
        context: {
          inputValue: null,
          childMachine: null
        },
        predictableActionArguments: true,
        states: {
          loading: {
            entry: [(context, event) => console.log("parent loading entry")],
            on: {
              LOAD_DONE: "runningChild",
            },
          },
          runningChild: {
            entry: [
              (context, event) => console.log("parent runningChild entry"),
              assign({
                childMachine: (context) => {
                  return spawn(createChildMachine(), "child");
                },
              }),
            ],
            on: {
              CHILD_DONE: {
                internal: true,
                actions: [
                  (context, event) => console.log("CHILD_DONE received"),
                ],
              },
              CHILD_COMPLETED: "childComplete",
            },
          },
          childComplete: {
            entry: [(context, event) => console.log("parent childComplete  entry")],
            always: [
              {
                target: "complete",
              },
            ],
          },
          complete: {
            entry: [(context, event) => console.log("parent complete entry")],
            type: "final",
          },
        },
      },
  );
}

export { createParentMachine };
