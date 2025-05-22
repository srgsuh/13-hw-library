class EventController {
    events;

    constructor() {
        this.events = {};
    }

    subscribe(event, callback) {
        if (!(event in this.events)) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    unsubscribe(event, cbToUnsubscribe) {
        if (!(event in this.events)) return;
        this.events[event] = this.events[event].filter(callback => callback !== cbToUnsubscribe);
    }

    processEvent(event, data) {
        if (!(event in this.events)) return;
        this.events[event].forEach(callback => callback(data));
    }
}