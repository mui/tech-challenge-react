# ⚛️ Technical challenge @ MUI

This challenge is part of the hiring process at MUI for the React Engineer position.
The idea is to make as much progress as possible under a given time constraint (3-4 hours).

## Context

In the short term, MUI is on a mission to become the UI toolkit for React. We are unifying the fragmented ecosystem of dependencies into a single set of simple, beautiful, consistent, and accessible React components.

In the long term, MUI is on a mission to make building great React UIs and web applications quicker, simpler, and accessible to more people through low-code solutions. We resonate with this vision: https://youtu.be/GnO7D5UaDig?t=2451.

Your challenge is split into two phases:

- In the **[first phase](#first-phase)**, your objective is to build a simplified version of a Combo Box.
- In the **[second phase](#second-phase)**, your objective is to handle a fake GitHub issue of the [same Combo Box component](https://mui.com/components/autocomplete/) that runs in production.

## First phase

###### _~2 hours - The basics_

### Introduction

A Combo Box is a component that combines a _text box_ with a _dropdown list_, allowing the users to choose among a list of a long list of mutually exclusive values. For instance, Chrome's URL bar:

<img src="/combo-box.png" width="100%" />

### Objective

The goal of this first phase is to implement the above component:

- [ ] no high-level primitives, e.g. without [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist), without pre-made React components
- [ ] reproduce as much of the UX of Chrome's URL bar as possible. You can also benchmark with the UX of Google's main search bar to adjust the tradeoffs. The end goal is to be able to use the component for the same search use case.
- [ ] use React hooks, no class components
- [ ] be written in TypeScript, `any` and `@ts-ignore` are accepted but need to be justified (comments)
- [ ] be performant, it can render 300 options without virtualization
- [ ] be accessible, end-users could only use the keyboard, see [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices/#combobox) for guidance. Their [examples](https://www.w3.org/TR/wai-aria-practices/examples/combobox/combobox-autocomplete-both.html) might be the most helpful.
- [ ] looks great, has a beautiful UI
- [ ] make the existing test pass, add tests for edge cases
- [ ] has no lintint errors (`yarn prettier && yarn lint && yarn typescript`)
- [ ] has an ergonomic API

In practice, such a solution would require dozens of hours to reach the high-quality bar we expect MUI components to have (if not > 100 hours). To keep the challenge short, we will focus on solving a subset of the problem:

- you may drop behaviors that have a too high time opportunity cost. Please **document the behaviors your drop and why**.
- don't write documentation but enough to see how to use the component, e.g. one demo.
- only one browser support (of your choice)
- no touch screen support
- no dark mode support
- no right-to-left support
- no npm publish

## Work environment

To save you time, a working environment was created with Next.js/TypeScript/eslint/prettier/testing-library/Babel, etc.
It's a reproduction of the [mui/material-ui](https://github.com/mui/material-ui) repository.
You can install this environment following these steps:

- clone the repo: `git clone git@github.com:mui/react-technical-challenge.git`
- install the dependencies: `yarn`
- start Next.js: `yarn start`
- open http://0.0.0.0:3003/components/phase1/

You can find the source of this URL at [`docs/pages/components/phase1.tsx`](https://github.com/mui/react-technical-challenge/blob/master/docs/pages/components/phase1.tsx), it already contains a data set of 248 countries.

You can find the existing test to make pass at [`docs/pages/components/ComboBox.test.js`](https://github.com/mui/react-technical-challenge/blob/master/docs/pages/components/ComboBox.test.js).
The tests in the file can be run with this command: `yarn t ComboBox`.

## Second phase

###### _~1-2 hours - The polish_

### Introduction

Congratulations, you have completed the first implementation of the component in the first phase. Now, it's time to push it to production!

Fast forward a couple of months and hours of iteration on the component, you might reach a state close to [same Combo Box component](https://mui.com/components/autocomplete/) that we run in production.

This second phase is about handling a fake GitHub issue a developer has just opened.

### Issue

_Developers rarely spend the time to explain the pain point they face in detail nor provide context. Lucky for us, we got a reproduction we can leverage:_

---

Hi, I'm facing problem, please help.

#### Steps to reproduce 🕹

1. Open https://codesandbox.io/s/recursing-mclean-2dub0?file=/demo.tsx
2. Type <kbd>1</kbd> in the textbox. Once the options are loaded, the component displays options filtered by input value. The callback `onHighlightChange` log correct value `option 1 1`.
3. Then type <kbd>2</kbd> in the textbox. The textbox now contains `12`. The component displays options filtered by input value. The callback `onHighlightChange` log wrong value `option 1 1` instead of `option 2 12`.

#### Environment

`@material-ui/core@5.0.0-alpha.15`

---

### Objective

The goal of this second phase is to improve the component from v5.0.0-alpha.15 and hopefully solve most of the pain points of this developer.

- [ ] Commit your changes
- [ ] Explain the tradeoff taken, compared to the alternatives

### Guidance

The repository you have cloned in the beginning includes a simplified version of https://github.com/mui/material-ui on v5.0.0-alpha.15.

- The documentation of the Autocomplete component can be found at http://0.0.0.0:3003/components/autocomplete/. It's updating live with changes in the source.
- The tests of the Autocomplete component can be found at [`packages/material-ui/src/Autocomplete/Autocomplete.test.js`](https://github.com/mui/react-technical-challenge/blob/master/packages/material-ui/src/Autocomplete/Autocomplete.test.js)
- The tests of the Autocomplete component can be run with `yarn t Autocomplete`.
- We expect bug fixes to come with a new test.
- Fixing this bug might require breaking other tests, you should evaluate if the tradeoff is acceptable.

## Submission

**DO NOT** host your project on a public repository.
Send us a zip file containing this project (with the _.git_ but without the _node_modules_) at job@mui.com.
Thanks!
