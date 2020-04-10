///////HelloWorld Component which has GoodbyeWorld as a child
//GoodbyeWorld Component

const GoodbyeWorld = superFunc({
    builder: (state, props) => `<h1> Goodbye World </h1>`
});

//HelloWorld COmponent
const HelloWorld = superFunc({
    builder: (state, props) => {
        return `<h1>Hello World</h1>
                <div sfunc="second"></div>`;
    },
    mount: (state, props, target, globals) => {
        //initializing the GoodbyeWorld Component when component initially mounts
        globals.test = 'cheese';
        [globals.setSecondState] = GoodbyeWorld(
            //adding a value to the globals object
            'second',
            {}
        ); //storing GoodbyeWorlds instance setState in the globals object
    },
    update: (state, props, target, globals) => {
        //reinitializing the GoodbyeWorld Component when component updates
        console.log(globals);
        [globals.setSecondState] = GoodbyeWorld(
            //logging the globals object
            'second',
            {}
        ); //replace GoodbyeWorlds instance setState in the globals object
    },

    hookGen: (state, props, target, globals) => () => state //Create hook to capture the state from outside the component function
});

// initializing the HelloWorld Component and storing its setState function in a variable along the getState hook created via hookGen
let [setAppState, getState] = HelloWorld('app', { hello: 'Hello World' });

console.log(getState());

getState = setAppState({ ...getState(), cheese: 'text' }); //updating the state, update getState hook

console.log(getState()); //seeing the updated state
