var _a;
import { EventHandlerUtil, getUniqueIdWithPrefix, getObjectPropertyValueByKey, stringSnakeToCamel, getAttributeValueByBreakpoint, throttle, getCSS, DOMEventHandlerUtil, ElementStyleUtil, } from '../_utils/index';
export class DrawerStore {
    static set(instanceId, drawerComponentObj) {
        if (DrawerStore.has(instanceId)) {
            return;
        }
        DrawerStore.store.set(instanceId, drawerComponentObj);
    }
    static get(instanceId) {
        if (!DrawerStore.has(instanceId)) {
            return;
        }
        return DrawerStore.store.get(instanceId);
    }
    static remove(instanceId) {
        if (!DrawerStore.has(instanceId)) {
            return;
        }
        DrawerStore.store.delete(instanceId);
    }
    static has(instanceId) {
        return DrawerStore.store.has(instanceId);
    }
    static getAllInstances() {
        return DrawerStore.store;
    }
}
Object.defineProperty(DrawerStore, "store", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new Map()
});
const defaultDrawerOptions = {
    overlay: true,
    baseClass: 'drawer',
    overlayClass: 'drawer-overlay',
    direction: 'end',
};
class DrawerComponent {
    constructor(_element, options) {
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "overlayElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "toggleElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "instanceUid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "shown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lastWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "closeElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "_handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const togglers = this._getOption('toggle');
                const closers = this._getOption('close');
                if (togglers !== null && togglers.length > 0) {
                    DOMEventHandlerUtil.on(document.body, togglers, 'click', (e) => {
                        e.preventDefault();
                        this.toggleElement = document.getElementById(togglers);
                        this._toggle();
                    });
                }
                if (closers !== null && closers.length > 0) {
                    DOMEventHandlerUtil.on(document.body, closers, 'click', (e) => {
                        e.preventDefault();
                        this.closeElement = document.getElementById(closers);
                        this._hide();
                    });
                }
            }
        });
        Object.defineProperty(this, "_update", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const width = String(this._getOption('width'));
                const direction = String(this._getOption('direction'));
                // Reset state
                const hasBaseClass = this.element.classList.contains(`${this.options.baseClass}-on`);
                const bodyCanvasAttr = String(document.body.getAttribute(`data-kt-drawer-${this.name}-`));
                if (hasBaseClass === true && bodyCanvasAttr === 'on') {
                    this.shown = true;
                }
                else {
                    this.shown = false;
                }
                // Activate/deactivate
                if (this._getOption('activate') === true) {
                    this.element.classList.add(this.options.baseClass);
                    this.element.classList.add(`${this.options.baseClass}-${direction}`);
                    ElementStyleUtil.set(this.element, 'width', width, true);
                    this.lastWidth = parseInt(width);
                }
                else {
                    ElementStyleUtil.set(this.element, 'width', '');
                    this.element.classList.remove(this.options.baseClass);
                    this.element.classList.remove(`${this.options.baseClass}-${direction}`);
                    this._hide();
                }
            }
        });
        Object.defineProperty(this, "_getOption", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name) => {
                const attr = this.element.getAttribute(`data-kt-drawer-${name}`);
                if (attr) {
                    const value = getAttributeValueByBreakpoint(attr);
                    if (value !== null && String(value) === 'true') {
                        return true;
                    }
                    else {
                        if (value !== null && String(value) === 'false') {
                            return false;
                        }
                    }
                    return value;
                }
                else {
                    const optionName = stringSnakeToCamel(name);
                    const option = getObjectPropertyValueByKey(this.options, optionName);
                    if (option) {
                        return getAttributeValueByBreakpoint(option);
                    }
                    else {
                        return null;
                    }
                }
            }
        });
        Object.defineProperty(this, "_toggle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (EventHandlerUtil.trigger(this.element, 'kt.drawer.toggle') === false) {
                    return;
                }
                if (this.shown) {
                    this._hide();
                }
                else {
                    this._show();
                }
                EventHandlerUtil.trigger(this.element, 'kt.drawer.toggled');
            }
        });
        Object.defineProperty(this, "_hide", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (EventHandlerUtil.trigger(this.element, 'kt.drawer.hide') === false) {
                    return;
                }
                this.shown = false;
                this._deleteOverlay();
                document.body.removeAttribute(`data-kt-drawer-${this.name}`);
                document.body.removeAttribute(`data-kt-drawer`);
                this.element.classList.remove(`${this.options.baseClass}-on`);
                if (this.toggleElement != null) {
                    this.toggleElement.classList.remove('active');
                }
                EventHandlerUtil.trigger(this.element, 'kt.drawer.after.hidden');
            }
        });
        Object.defineProperty(this, "_show", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (EventHandlerUtil.trigger(this.element, 'kt.drawer.show') === false) {
                    return;
                }
                this.shown = true;
                this._createOverlay();
                document.body.setAttribute(`data-kt-drawer-${this.name}`, 'on');
                document.body.setAttribute('data-kt-drawer', 'on');
                this.element.classList.add(`${this.options.baseClass}-on`);
                if (this.toggleElement !== null) {
                    this.toggleElement.classList.add('active');
                }
                EventHandlerUtil.trigger(this.element, 'kt.drawer.shown');
            }
        });
        Object.defineProperty(this, "_createOverlay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._getOption('overlay') === true) {
                    this.overlayElement = document.createElement('DIV');
                    const elementZIndex = getCSS(this.element, 'z-index');
                    if (elementZIndex) {
                        const overlayZindex = parseInt(elementZIndex) - 1;
                        ElementStyleUtil.set(this.overlayElement, 'z-index', overlayZindex); // update
                    }
                    document.body.append(this.overlayElement);
                    const overlayClassOption = this._getOption('overlay-class');
                    if (overlayClassOption) {
                        this.overlayElement.classList.add(overlayClassOption.toString());
                    }
                    if (!this._getOption('permanent')) {
                        this.overlayElement.addEventListener('click', (e) => {
                            e.preventDefault();
                            this._hide();
                        });
                    }
                }
            }
        });
        Object.defineProperty(this, "_deleteOverlay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.overlayElement !== null && this.overlayElement.parentNode) {
                    this.overlayElement.parentNode.removeChild(this.overlayElement);
                }
            }
        });
        Object.defineProperty(this, "_getDirection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return String(this._getOption('direction')) === 'left' ? 'left' : 'right';
            }
        });
        Object.defineProperty(this, "_getWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let width = this._getOption('width');
                if (width && width === 'auto') {
                    width = getCSS(this.element, 'width');
                }
                return width;
            }
        });
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        Object.defineProperty(this, "toggle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._toggle();
            }
        });
        Object.defineProperty(this, "show", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._show();
            }
        });
        Object.defineProperty(this, "hide", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._hide();
            }
        });
        Object.defineProperty(this, "isShown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.shown;
            }
        });
        Object.defineProperty(this, "update", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this._update();
            }
        });
        Object.defineProperty(this, "goElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.element;
            }
        });
        // Event API
        Object.defineProperty(this, "on", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, handler) => {
                return EventHandlerUtil.on(this.element, name, handler);
            }
        });
        Object.defineProperty(this, "one", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, handler) => {
                return EventHandlerUtil.one(this.element, name, handler);
            }
        });
        Object.defineProperty(this, "off", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, handerId) => {
                return EventHandlerUtil.off(this.element, name, handerId);
            }
        });
        Object.defineProperty(this, "trigger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, event) => {
                return EventHandlerUtil.trigger(this.element, name, event);
            }
        });
        this.element = _element;
        this.options = Object.assign(defaultDrawerOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('drawer');
        this.overlayElement = null;
        this.name = this.element.getAttribute('data-kt-drawer-name') || '';
        this.shown = false;
        this.toggleElement = null;
        // Event Handlers
        this._handlers();
        // Update Instance
        this._update();
        // Bind Instance
        DrawerStore.set(this.element.id, this);
    }
    // Create Instances
    static createInstances(selector) {
        const elements = document.body.querySelectorAll(selector);
        elements.forEach((element) => {
            const item = element;
            let drawer = _a.getInstance(item.id);
            if (!drawer) {
                drawer = new _a(item, defaultDrawerOptions);
            }
            drawer.element = item;
            drawer.hide();
        });
    }
    // Global Initialization
    static initGlobalHandlers() {
        // Window Resize Handling
        window.addEventListener('resize', function () {
            let timer;
            throttle(timer, () => {
                // Locate and update Drawer instances on window resize
                const elements = document.body.querySelectorAll('[data-kt-drawer="true"]');
                elements.forEach((el) => {
                    const item = el;
                    const instance = _a.getInstance(item.id);
                    if (instance) {
                        instance.element = item;
                        instance.update();
                    }
                });
            }, 200);
        });
    }
}
_a = DrawerComponent;
// Static methods
Object.defineProperty(DrawerComponent, "hasInstace", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (elementId) => {
        return DrawerStore.has(elementId);
    }
});
Object.defineProperty(DrawerComponent, "getInstance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (elementId) => {
        return DrawerStore.get(elementId);
    }
});
Object.defineProperty(DrawerComponent, "hideAll", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        const oldInstances = DrawerStore.getAllInstances();
        oldInstances.forEach((dr) => {
            dr.hide();
        });
    }
});
Object.defineProperty(DrawerComponent, "updateAll", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        const oldInstances = DrawerStore.getAllInstances();
        oldInstances.forEach((dr) => {
            dr.update();
        });
    }
});
// Dismiss instances
Object.defineProperty(DrawerComponent, "handleDismiss", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        // External drawer toggle handler
        DOMEventHandlerUtil.on(document.body, '[data-kt-drawer-dismiss="true"]', 'click', () => {
            /* @ts-ignore */
            const element = _a.closest('[data-kt-drawer="true"]');
            if (element) {
                const drawer = _a.getInstance(element);
                if (drawer && drawer.isShown()) {
                    drawer.hide();
                }
            }
        });
    }
});
Object.defineProperty(DrawerComponent, "bootstrap", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        _a.createInstances('[data-kt-drawer="true"]');
        _a.initGlobalHandlers();
        _a.handleDismiss();
    }
});
Object.defineProperty(DrawerComponent, "reinitialization", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        _a.createInstances('[data-kt-drawer="true"]');
        _a.hideAll();
        _a.updateAll();
        _a.handleDismiss();
    }
});
export { DrawerComponent, defaultDrawerOptions };
