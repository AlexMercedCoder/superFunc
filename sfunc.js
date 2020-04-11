///////m-Blocks by Alex Merced of AlexMercedCoder.com

//////////////
//CaptureProps
/////////////

const captureProps = (element) => {
    const att = [...element.attributes];
    const entries = att.map((value) => {
        return [value.name, value.value];
    });

    return Object.fromEntries(entries);
};

/////////////////////////
//SuperFunc
////////////////////////

const superFunc = (config) => {
    const creator = (id, initialState) => {
        const globals = {};
        let state = config.state ? config.state : {};
        const target = document.querySelector(`[sfunc=${id}]`);
        let props = captureProps(target);
        target.innerHTML = config.builder(state, props, globals);
        config.assemble ? config.assemble(state, props, target, globals) : null;
        config.mount ? config.mount(state, props, target, globals) : null;
        globals.setState = (newState) => {
            state = newState;
            props = captureProps(target);
            target.innerHTML = config.builder(state, props, target, globals);
            config.assemble
                ? config.assemble(state, props, target, globals)
                : null;
            config.update ? config.update(state, props, target, globals) : null;
            return config.hookGen
                ? config.hookGen(state, props, target, globals)
                : null;
        };
        return [
            globals.setState,
            config.hookGen
                ? config.hookGen(state, props, target, globals)
                : null
        ];
    };

    return creator;
};
