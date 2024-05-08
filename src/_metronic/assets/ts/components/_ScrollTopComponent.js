import { getScrollTop, getAttributeValueByBreakpoint, throttle, getObjectPropertyValueByKey, stringSnakeToCamel, getUniqueIdWithPrefix, DataUtil, ElementAnimateUtil, } from '../_utils/index';
const defaultScrollTopOptions = {
    offset: 200,
    speed: 600,
};
class ScrollTopComponent {
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
        Object.defineProperty(this, "_handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let timer;
                window.addEventListener('scroll', () => {
                    throttle(timer, () => {
                        this._scroll();
                    });
                });
                this.element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this._go();
                });
            }
        });
        Object.defineProperty(this, "_scroll", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const offset = parseInt(this._getOption('offset'));
                const pos = getScrollTop(); // current vertical position
                if (pos > offset) {
                    if (!document.body.hasAttribute('data-kt-scrolltop')) {
                        document.body.setAttribute('data-kt-scrolltop', 'on');
                    }
                }
                else {
                    if (document.body.hasAttribute('data-kt-scrolltop')) {
                        document.body.removeAttribute('data-kt-scrolltop');
                    }
                }
            }
        });
        Object.defineProperty(this, "_go", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const speed = parseInt(this._getOption('speed'));
                ElementAnimateUtil.scrollTop(0, speed);
            }
        });
        Object.defineProperty(this, "_getOption", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name) => {
                const attr = this.element.getAttribute(`data-kt-scrolltop-${name}`);
                if (attr) {
                    const value = getAttributeValueByBreakpoint(attr);
                    return value !== null && String(value) === 'true';
                }
                const optionName = stringSnakeToCamel(name);
                const option = getObjectPropertyValueByKey(this.options, optionName);
                if (option) {
                    return getAttributeValueByBreakpoint(option);
                }
                return null;
            }
        });
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        // Plugin API
        Object.defineProperty(this, "go", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this._go();
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
        this.element = _element;
        this.options = Object.assign(defaultScrollTopOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('scrolltop');
        // Event Handlers
        this._handlers();
        // Bind Instance
        DataUtil.set(this.element, 'scrolltop', this);
    }
}
// Static methods
Object.defineProperty(ScrollTopComponent, "getInstance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (el) => {
        const scrollTop = DataUtil.get(el, 'scrolltop');
        if (scrollTop) {
            return scrollTop;
        }
    }
});
Object.defineProperty(ScrollTopComponent, "createInstances", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (selector) => {
        const elements = document.body.querySelectorAll(selector);
        elements.forEach((el) => {
            const item = el;
            let scrollTop = ScrollTopComponent.getInstance(item);
            if (!scrollTop) {
                scrollTop = new ScrollTopComponent(item, defaultScrollTopOptions);
            }
        });
    }
});
Object.defineProperty(ScrollTopComponent, "createInsance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (selector, options = defaultScrollTopOptions) => {
        const element = document.body.querySelector(selector);
        if (!element) {
            return;
        }
        const item = element;
        let scrollTop = ScrollTopComponent.getInstance(item);
        if (!scrollTop) {
            scrollTop = new ScrollTopComponent(item, options);
        }
        return scrollTop;
    }
});
Object.defineProperty(ScrollTopComponent, "bootstrap", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        ScrollTopComponent.createInstances('[data-kt-scrolltop="true"]');
    }
});
Object.defineProperty(ScrollTopComponent, "reinitialization", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        ScrollTopComponent.createInstances('[data-kt-scrolltop="true"]');
    }
});
Object.defineProperty(ScrollTopComponent, "goTop", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: () => {
        ElementAnimateUtil.scrollTop(0, defaultScrollTopOptions.speed);
    }
});
export { ScrollTopComponent, defaultScrollTopOptions };
