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
    const globals = {};
    const creator = (id, initialState) => {
        let state = initialState;
        const target = document.querySelector(`[sfunc=${id}]`);
        let props = captureProps(target);
        target.innerHTML = config.builder(state, props, globals);
        config.mount ? config.mount(state, props, target, globals) : null;

        return [
            (newState) => {
                state = newState;
                props = captureProps(target);
                target.innerHTML = config.builder(state, props, globals);
                config.update
                    ? config.update(state, props, target, globals)
                    : null;
                return config.hookGen
                    ? config.hookGen(state, props, target, globals)
                    : null;
            },
            config.hookGen
                ? config.hookGen(state, props, target, globals)
                : null
        ];
    };

    return creator;
};

module.exports = { superFunc };
