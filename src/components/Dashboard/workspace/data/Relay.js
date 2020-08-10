const Pi2 = Math.PI * 2;

export default class Relay {
    
    constructor() {
        this.callbacks = [];
    }

    start() {}
    stop() {}
    
    tick = (data) => {
        if (this.callbacks.length) {
            this.callbacks.forEach(cb => cb(data));
        }
    }

    onTick(callback) {
        this.callbacks.push(callback);
    }
}
