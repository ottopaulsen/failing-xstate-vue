# vue-xstate

This repo shows a problem I am having with xstate and Vue.

There are two state machines, one parent and one child. The child is started from the parent
using `spawn`. The parent is started using `useMachine`.

The parent starts in `loading`, then goes to `runningChild`, where the child machine
is spawned on entry. The child machine starts in `ready`, and on a button click
it goes to `doing`, where it is invoking a promise. When the promise is resolved,
the `onDone` takes the machine to the final `complete` state, where a `CHILD_COMPLETE` event
is sent to the parent. The parent then goes to the `childComplete` state and from there
further to the `complete` state.

On the screen, I am displaying the states from the two machines. The parent state I am
getting from the `useMachine` call, and the child state I am getting from the `useActor`
call.

**The problem** is that when the child has completed, and the parent is in the `complete`
state, the state displayed on the screen for the child is still `doing`. It does not show
the `complete` state from the child.

However, if I read the childs state through the `children` property of the parent machine,
I can see that the state is `complete` as expected.

Reading the state through the children property is awkward and fragile, so I believe the
correct way is reading the state from `useActor`, but this may be where I am doing wrong.
How else could I do this?

This is a problem in my real project because I am displaying text on the screen
based on the state of the machines, and one text is hanging because the child machines
state is not read correctly.

I have tried reading the state via the children, but this is also giving me similar problems,
but I have not yet been able to isolate the other problems as good as this one.

So I need help. Is this a bug in @xstate/vue, or am I doing something wrong?


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```
