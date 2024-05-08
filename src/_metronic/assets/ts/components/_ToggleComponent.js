import { DataUtil, getUniqueIdWithPrefix, EventHandlerUtil } from '../_utils/index';
// Helpers
import { CookieComponent } from './_CookieComponent';
const defaultToggleOptions = {
    saveState: false,
};
class ToggleComponent {
    constructor(_element, options) {
        Object.defineProperty(this, "element", {
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
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "mode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "target", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "attribute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "_handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.element.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (this.mode === '') {
                        this._toggle();
                        return;
                    }
                    if (this.mode === 'off' && !this._isEnabled()) {
                        this._toggle();
                    }
                    else if (this.mode === 'on' && this._isEnabled()) {
                        this._toggle();
                    }
                });
            }
        });
        // Event handlers
        Object.defineProperty(this, "_toggle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                // Trigger "after.toggle" event
                EventHandlerUtil.trigger(this.element, 'kt.toggle.change');
                if (this._isEnabled()) {
                    this._disable();
                }
                else {
                    this._enable();
                }
                // Trigger "before.toggle" event
                EventHandlerUtil.trigger(this.element, 'kt.toggle.changed');
                return this;
            }
        });
        Object.defineProperty(this, "_enable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this._isEnabled()) {
                    return;
                }
                EventHandlerUtil.trigger(this.element, 'kt.toggle.enable');
                this.target?.setAttribute(this.attribute, 'on');
                if (this.state.length > 0) {
                    this.element.classList.add(this.state);
                }
                if (this.options.saveState) {
                    CookieComponent.set(this.attribute, 'on', {});
                }
                EventHandlerUtil.trigger(this.element, 'kt.toggle.enabled');
                return this;
            }
        });
        Object.defineProperty(this, "_disable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!this._isEnabled()) {
                    return false;
                }
                EventHandlerUtil.trigger(this.element, 'kt.toggle.disable');
                this.target?.removeAttribute(this.attribute);
                if (this.state.length > 0) {
                    this.element.classList.remove(this.state);
                }
                if (this.options.saveState) {
                    CookieComponent.delete(this.attribute);
                }
                EventHandlerUtil.trigger(this.element, 'kt.toggle.disabled');
                return this;
            }
        });
        Object.defineProperty(this, "_isEnabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (!this.target) {
                    return false;
                }
                return String(this.target.getAttribute(this.attribute)).toLowerCase() === 'on';
            }
        });
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        // Plugin API
        // Plugin API
        Object.defineProperty(this, "toggle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this._toggle();
            }
        });
        Object.defineProperty(this, "enable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this._enable();
            }
        });
        Object.defineProperty(this, "disable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this._disable();
            }
        });
        Object.defineProperty(this, "isEnabled", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this._isEnabled();
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
            value: (name, handlerId) => {
                return EventHandlerUtil.off(this.element, name, handlerId);
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
        this.options = Object.assign(defaultToggleOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('toggle');
        this.element = _element;
        const elementTargetAttr = this.element.getAttribute('data-kt-toggle-target');
        if (elementTargetAttr) {
            this.target = document.querySelector(elementTargetAttr);
        }
        const elementToggleAttr = this.element.getAttribute('data-kt-toggle-state');
        this.state = elementToggleAttr || '';
        const elementModeAttr = this.element.getAttribute('data-kt-toggle-mode');
        this.mode = elementModeAttr || '';
        this.attribute = 'data-kt-' + this.element.getAttribute('data-kt-toggle-name');
        // Event Handlers
        this._handlers();
        // Update Instance
        // Bind Instance
        DataUtil.set(this.element, 'toggle', this);
    }
}
// Static methods
Object.defineProperty(ToggleComponent, "getInstance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (el) => {
        const toggleElement = DataUtil.get(el, 'toggle');
        if (toggleElement) {
            return toggleElement;
        }
        return null;
    }
});
Object.defineProperty(ToggleComponent, "createInstances", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (selector) => {
        const elements = document.body.querySelectorAll(selector);
        elements.forEach((el) => {
            let toggle = ToggleComponent.getInstance(el);
            if (!toggle) {
                toggle = new ToggleComponent(el, defaultToggleOptions);
            }
        });
    }
});
Object.defineProperty(ToggleComponent, "reinitialization", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        ToggleComponent.createInstances('[data-kt-toggle]');
    }
});
Object.defineProperty(ToggleComponent, "bootstrap", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        ToggleComponent.createInstances('[data-kt-toggle]');
    }
});
export { ToggleComponent, defaultToggleOptions };
