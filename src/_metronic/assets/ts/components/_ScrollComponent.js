import { DataUtil, getObjectPropertyValueByKey, stringSnakeToCamel, getAttributeValueByBreakpoint, getViewPort, isVisibleElement, throttle, getCSS, ElementStyleUtil, } from '../_utils/index';
import { CookieComponent } from './_CookieComponent';
const defaultScrollOptions = {
    saveState: true,
};
class ScrollComponent {
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
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getOption", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name) => {
                if (this.element.hasAttribute('data-kt-scroll-' + name) === true) {
                    const attr = this.element.getAttribute('data-kt-scroll-' + name) || '';
                    let value = getAttributeValueByBreakpoint(attr);
                    if (value !== null && String(value) === 'true') {
                        value = true;
                    }
                    else if (value !== null && String(value) === 'false') {
                        value = false;
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
        Object.defineProperty(this, "getHeightType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.getOption('height')) {
                    return 'height';
                }
                if (this.getOption('min-height')) {
                    return 'min-height';
                }
                if (this.getOption('max-height')) {
                    return 'max-height';
                }
            }
        });
        Object.defineProperty(this, "getAutoHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let height = getViewPort().height;
                const dependencies = this.getOption('dependencies');
                const wrappers = this.getOption('wrappers');
                const offset = this.getOption('offset');
                // Height dependencies
                if (dependencies !== null) {
                    const elements = document.querySelectorAll(dependencies);
                    if (elements && elements.length > 0) {
                        for (let i = 0, len = elements.length; i < len; i++) {
                            const element = elements[i];
                            if (isVisibleElement(element) === false) {
                                continue;
                            }
                            height = height - parseInt(getCSS(element, 'height'));
                            height = height - parseInt(getCSS(element, 'margin-top'));
                            height = height - parseInt(getCSS(element, 'margin-bottom'));
                            const borderTop = getCSS(element, 'border-top');
                            if (borderTop) {
                                height = height - parseInt(borderTop);
                            }
                            const borderBottom = getCSS(element, 'border-bottom');
                            if (borderBottom) {
                                height = height - parseInt(borderBottom);
                            }
                        }
                    }
                }
                // Wrappers
                if (wrappers !== null) {
                    const elements = document.querySelectorAll(wrappers);
                    if (elements && elements.length > 0) {
                        for (let i = 0, len = elements.length; i < len; i++) {
                            const element = elements[i];
                            if (!isVisibleElement(element)) {
                                continue;
                            }
                            height = height - parseInt(getCSS(element, 'margin-top'));
                            height = height - parseInt(getCSS(element, 'margin-bottom'));
                            height = height - parseInt(getCSS(element, 'padding-top'));
                            height = height - parseInt(getCSS(element, 'padding-bottom'));
                            const borderTop = getCSS(element, 'border-top');
                            if (borderTop) {
                                height = height - parseInt(borderTop);
                            }
                            const borderBottom = getCSS(element, 'border-bottom');
                            if (borderBottom) {
                                height = height - parseInt(borderBottom);
                            }
                        }
                    }
                }
                // Custom offset
                if (offset !== null) {
                    height = height - parseInt(offset);
                }
                height = height - parseInt(getCSS(this.element, 'margin-top'));
                height = height - parseInt(getCSS(this.element, 'margin-bottom'));
                const borderTop = getCSS(this.element, 'border-top');
                if (borderTop) {
                    height = height - parseInt(borderTop);
                }
                const borderBottom = getCSS(this.element, 'border-bottom');
                if (borderBottom) {
                    height = height - parseInt(borderBottom);
                }
                height = String(height) + 'px';
                return height;
            }
        });
        Object.defineProperty(this, "setupHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const height = this.getHeight();
                const heightType = this.getHeightType();
                // Set height
                if (height !== null && height.length > 0) {
                    ElementStyleUtil.set(this.element, heightType, height);
                }
                else {
                    ElementStyleUtil.set(this.element, heightType, '');
                }
            }
        });
        Object.defineProperty(this, "setupState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.getOption('save-state') === true && this.id) {
                    const cookie = CookieComponent.get(this.id + 'st');
                    if (cookie) {
                        const pos = parseInt(cookie);
                        if (pos > 0) {
                            this.element.scrollTop = pos;
                        }
                    }
                }
            }
        });
        Object.defineProperty(this, "setupScrollHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.getOption('save-state') === true && this.id) {
                    this.element.addEventListener('scroll', this.scrollHandler);
                }
                else {
                    this.element.removeEventListener('scroll', this.scrollHandler);
                }
            }
        });
        Object.defineProperty(this, "scrollHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const cookieId = this.id + 'st';
                CookieComponent.set(cookieId, this.element.scrollTop, {});
            }
        });
        Object.defineProperty(this, "destroyScrollHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.element.removeEventListener('scroll', this.scrollHandler);
            }
        });
        Object.defineProperty(this, "resetHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const heghtType = this.getHeightType();
                if (heghtType) {
                    ElementStyleUtil.set(this.element, heghtType, '');
                }
            }
        });
        ///////////////////////
        // ** Public API  ** //
        ///////////////////////
        Object.defineProperty(this, "update", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                // Activate/deactivate
                if (this.getOption('activate') === true ||
                    !this.element.hasAttribute('data-kt-scroll-activate')) {
                    this.setupHeight();
                    this.setupScrollHandler();
                    this.setupState();
                }
                else {
                    this.resetHeight();
                    this.destroyScrollHandler();
                }
            }
        });
        Object.defineProperty(this, "getHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const heightType = this.getHeightType();
                const height = this.getOption(heightType || '');
                if (height instanceof Function) {
                    return height.call(height);
                }
                else if (height !== null && typeof height === 'string' && height.toLowerCase() === 'auto') {
                    return this.getAutoHeight();
                }
                else {
                    return height;
                }
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
        this.options = Object.assign(defaultScrollOptions, options);
        this.id = this.element.getAttribute('id') || '';
        this.update();
        // this.element.setAttribute('data-kt-scrolltop', 'true')
        DataUtil.set(this.element, 'scroll', this);
    }
    // Static methods
    static hasInstace(element) {
        return DataUtil.has(element, 'scroll');
    }
    static getInstance(element) {
        if (element !== null && ScrollComponent.hasInstace(element)) {
            const data = DataUtil.get(element, 'scroll');
            if (data) {
                return data;
            }
        }
    }
    // Create Instances
    static createInstances(selector) {
        const elements = document.body.querySelectorAll(selector);
        elements.forEach((element) => {
            const item = element;
            let scroll = ScrollComponent.getInstance(item);
            if (!scroll) {
                scroll = new ScrollComponent(item, defaultScrollOptions);
            }
        });
    }
    static destroyAll(attr = '[data-kt-scroll="true"]') { }
    static bootstrap(attr = '[data-kt-scroll="true"]') {
        ScrollComponent.createInstances(attr);
        ScrollComponent.resize();
    }
    static reinitialization(attr = '[data-kt-scroll="true"]') {
        ScrollComponent.createInstances(attr);
    }
    static updateAll() {
        const elements = document.body.querySelectorAll('[data-kt-scroll="true"]');
        elements.forEach((element) => {
            const instance = ScrollComponent.getInstance(element);
            if (instance) {
                instance.update();
            }
        });
    }
    static resize() {
        // Window Resize Handling
        window.addEventListener('resize', function () {
            let timer;
            throttle(timer, () => {
                // Locate and update Drawer instances on window resize
                ScrollComponent.updateAll();
            }, 200);
        });
    }
}
Object.defineProperty(ScrollComponent, "createInstance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (element, options = defaultScrollOptions) => {
        let scroll = ScrollComponent.getInstance(element);
        if (!scroll) {
            scroll = new ScrollComponent(element, options);
        }
        return scroll;
    }
});
export { ScrollComponent, defaultScrollOptions };
