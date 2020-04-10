# superFunc

Library by Alex Merced of AlexMercedCoder.com (AlexMercedCoder.com/jslib)

## Purpose

Alex Merced first created a front-end UI library using the Web Component API called MercedUI that gives you many of the features developers are used to in frameworks like React. Although, the Web Component API is still not fully supported in all browsers which is why the default is still to use frameworks like React, Angular and Vue. Is to make use of these frameworks often needs lots of tooling, transpilation, etc. to get full benefit from. superFunc is a library that provides some tools to build complex reactive front end UI with features like state and props but without the need for extra tooling or the web component API.

## Getting started

Essentially all you need in your HTML to get started

```
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8" />
        <title></title>
        <script src="sfunc.js" charset="utf-8" defer></script>
        <script src="app.js" charset="utf-8" defer></script>
    </head>
    <body>
        <h1>jlklkjlk</h1>
        <div sfunc="app"><h1>Hello</h1></div>
    </body>
</html>
```

sfunc works by giving sfunc attirbutes to targets for rendering components

The code to render a component in the spot where sfunc=app is...

```
///////HelloWorld Component which has GoodbyeWorld as a child

const HelloWorld = superFunc({
    builder: (state, props) => {
        return `<h1>Hello World</h1>
                <div sfunc="second"></div>`;
    },
    mount: (state, props, target, globals) => {
        //initializing the GoodbyeWorld Component when component initially mounts
        [globals.setSecondState] = GoodbyeWorld('second', {}); //storing GoodbyeWorlds instance setState in the globals object
    },
    update: (state, props, target, globals) => {
        //reinitializing the GoodbyeWorld Component when component updates
        [globals.setSecondState] = GoodbyeWorld('second', {}); //replace GoodbyeWorlds instance setState in the globals object
    }
});

//GoodbyeWorld Component

const GoodbyeWorld = superFunc({
    builder: (state, props) => `<h1> Goodbye World </h1>`
});

// initializing the HelloWorld Component and storing its setState function in a variable
const [setAppState] = HelloWorld('app', { hello: 'Hello World' });
```

a config object is passed to the superFunc function which returns a creator function to create instances of that component. The creator function initially renders the component and returns an array where the first element is the setState function for changing the state and the second element is whatever is returned by the hookGen function if exists.

the config object takes 4 properties

mount(state, props, target, globals) => function that runs after builder the first time

update(state, props, target, globals) => function that runs after setState function updates state and re-runs builder

builder(state, props, globals) => a function that is passed the state and props objects and returns the template string to be rendered

assemble(state, props, target, globals) => a function to run the constructors on any custom components included in your template

hookGen(state, props, target, globals) => a function which can be used to return more support functions.

-   When the setState function is run it updates the state, then re-reruns the builder function, then the assemble is function is run to rebuild any custom components in your template.

That's it, just use setState to update any components state it should re-render and it will work! just remember to invoke constructors in assemble of children that are custom components (refer to the assemble function of the component above.)
