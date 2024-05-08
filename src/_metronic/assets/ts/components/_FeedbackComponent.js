import { DataUtil, ElementStyleUtil, EventHandlerUtil, getUniqueIdWithPrefix, getAttributeValueByBreakpoint, } from '../_utils/index';
const defaultFeedbackOptions = {
    width: 100,
    placement: 'top-center',
    content: '',
    type: 'popup',
};
class FeedbackComponent {
    constructor(_element, options) {
        Object.defineProperty(this, "element", {
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
        Object.defineProperty(this, "instanceUid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "shown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this._go();
                });
            }
        });
        Object.defineProperty(this, "_go", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => { }
        });
        Object.defineProperty(this, "showPopup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.element = document.createElement('DIV');
                this.element.classList.add('feedback feedback-popup');
                this.element.innerHTML = this.options.content || '';
                if (this.options.placement === 'top-center') {
                    this.setPopupTopCenterPosition();
                }
                document.body.appendChild(this.element);
                this.element.classList.add('feedback-shown');
                this.shown = true;
            }
        });
        Object.defineProperty(this, "setPopupTopCenterPosition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const width = getAttributeValueByBreakpoint(this.options.width?.toString() || '0');
                const height = ElementStyleUtil.get(this.element, 'height');
                this.element.classList.add('feedback-top-center');
                ElementStyleUtil.set(this.element, 'width', width);
                ElementStyleUtil.set(this.element, 'left', '50%');
                ElementStyleUtil.set(this.element, 'top', '-' + height);
            }
        });
        Object.defineProperty(this, "hidePopup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.element.remove();
            }
        });
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        Object.defineProperty(this, "show", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (EventHandlerUtil.trigger(this.element, 'kt.feedback.show') === false) {
                    return;
                }
                if (this.options.type === 'popup') {
                    this.showPopup();
                }
                EventHandlerUtil.trigger(this.element, 'kt.feedback.shown');
                return this;
            }
        });
        Object.defineProperty(this, "hide", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (EventHandlerUtil.trigger(this.element, 'kt.feedback.hide') === false) {
                    return;
                }
                if (this.options.type === 'popup') {
                    this.hidePopup();
                }
                this.shown = false;
                EventHandlerUtil.trigger(this.element, 'kt.feedback.hidden');
                return this;
            }
        });
        Object.defineProperty(this, "isShown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.isShown;
            }
        });
        Object.defineProperty(this, "getElement", {
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
        this.options = Object.assign(defaultFeedbackOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('feedback');
        this.shown = false;
        // Event handlers
        this._handlers(); // will add in the show popup
        DataUtil.set(this.element, 'feedback', this);
    }
    // Create Instances
    static createInstances(selector) {
        throw new Error('not implemented');
    }
    // Static methods
    static hasInstace(element) {
        throw new Error('not implemented');
    }
    static getInstance(element) {
        throw new Error('not implemented');
    }
    static bootstrap(attr = '[data-Feedback]') {
        throw new Error('not implemented');
    }
}
export { FeedbackComponent, defaultFeedbackOptions };
