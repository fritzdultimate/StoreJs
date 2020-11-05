let $__DATA__$ = new Proxy({}, handler());
let $__Store = new Proxy({}, handler())
function storeSetup(object) {
    $__Store = new Proxy(object, handler());
    $__DATA__$ = Object.assign({}, $__Store.store.state());
}
function handler() {
    return {
        get: (target, prop, receiver) => {
            if(['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(target[prop])) > -1) {
                return new Proxy(target[prop], handler(target))
            }
            let value =  Reflect.get(target, prop, receiver);
            return typeof value == 'function' ? value.bind(target) : value;
        },

        set: (target, prop, val, receiver) => {
            return Reflect.set(target, prop, val, receiver); 
        },
    }
}

function storeGetters(getters) {
    let $_getters = {};
    if(Object.prototype.toString.call(getters) == '[object Object]') {
        try {
            for(let i = 0; i < Object.entries(getters).length; i++) {
                let property = Object.entries(getters)[i][1]
                if(!(property in $__Store.store.getters)) {
                    throw new Error('Unknown getter')
                }
                let get = $__Store.store.getters[property];
                $_getters[Object.entries(getters)[i][0]] = get($__DATA__$);
            }
        } catch(e) {
            console.error(e)
        }
    }
    return new Proxy($_getters, {
        get: (target, prop, receiver) => {
            if(['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(target[prop])) > -1) {
                return new Proxy(target[prop], handler(target))
            }
            let value =  Reflect.get(target, prop, receiver);
            return typeof value == 'function' ? value.bind(target) : value;
        }
    });
}

function storeActions(actions) {
    let $_actions = {};
    if(Object.prototype.toString.call(actions) == '[object Object]') {
        try {
            for(let i = 0; i < Object.entries(actions).length; i++) {
                let property = Object.entries(actions)[i][0]
                if(!(property in $__Store.store.actions)) {
                    throw new Error('Unknown action')
                }
                let action = $__Store.store.actions[property];
                $_actions[Object.entries(actions)[i][1]] = action;
                let parameters_values = Object.entries(actions)[i][1].split('|');
                let parameter = action().arguments.split('|');
                let obj = {};
                for(let i = 0; i < parameter.length; i++) {
                    if(parameters_values[i]) {
                        obj[parameter[i]] = parameters_values[i];
                    }
                }
                let method = action().method;

                let a = commit.call(null, method,  obj );
            }
        } catch(e) {
            console.error(e)
        }
    }
    return new Proxy($_actions, {
        get: (target, prop, receiver) => {
            if(['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(target[prop])) > -1) {
                return new Proxy(target[prop], handler(target))
            }
            let value =  Reflect.get(target, prop, receiver);
            return typeof value == 'function' ? value.bind(target) : value;
        },
        set: (target, prop, val) => {
            target[prop] = val; 
            return true;
        }
    });
}

function commit(mutation, args) {
    let meth = $__Store.store.mutations[mutation];
    meth($__DATA__$, args);
}



export {
    storeSetup,
    storeGetters,
    storeActions
}
