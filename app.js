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
