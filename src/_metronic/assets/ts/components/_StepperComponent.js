import { DataUtil, DOMEventHandlerUtil, ElementAnimateUtil, ElementStyleUtil, EventHandlerUtil, getElementIndex, getUniqueIdWithPrefix, } from '../_utils/index';
const defaultStepperOptions = {
    startIndex: 1,
    animation: false,
    animationSpeed: '0.3s',
    animationNextClass: 'animate__animated animate__slideInRight animate__fast',
    animationPreviousClass: 'animate__animated animate__slideInLeft animate__fast',
};
class StepperComponent {
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
        Object.defineProperty(this, "steps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btnNext", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btnPrev", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btnSubmit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "totalStepsNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "passedStepIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "currentStepIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "_goTo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (index) => {
                EventHandlerUtil.trigger(this.element, 'kt.stepper.change');
                // Skip if this step is already shown
                if (index === this.currentStepIndex || index > this.totalStepsNumber || index < 0) {
                    return;
                }
                // Validate step number
                index = parseInt(index.toString());
                // Set current step
                this.passedStepIndex = this.currentStepIndex;
                this.currentStepIndex = index;
                // Refresh elements
                this.refreshUI();
                EventHandlerUtil.trigger(this.element, 'kt.stepper.changed');
            }
        });
        Object.defineProperty(this, "initHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.btnNext?.addEventListener('click', (e) => {
                    e.preventDefault();
                    EventHandlerUtil.trigger(this.element, 'kt.stepper.next', e);
                });
                this.btnPrev?.addEventListener('click', (e) => {
                    e.preventDefault();
                    EventHandlerUtil.trigger(this.element, 'kt.stepper.previous', e);
                });
                DOMEventHandlerUtil.on(this.element, '[data-kt-stepper-action="step"]', 'click', (e) => {
                    e.preventDefault();
                    if (this.steps && this.steps.length > 0) {
                        for (let i = 0; i < this.steps.length; i++) {
                            if (this.steps[i] === this.element) {
                                const index = i + 1;
                                const stepDirection = this._getStepDirection(index);
                                EventHandlerUtil.trigger(this.element, `stepper.${stepDirection}`, e);
                                return;
                            }
                        }
                    }
                });
            }
        });
        Object.defineProperty(this, "_getStepDirection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (index) => {
                return index > this.currentStepIndex ? 'next' : 'previous';
            }
        });
        Object.defineProperty(this, "getStepContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (index) => {
                const content = this.element.querySelectorAll('[data-kt-stepper-element="content"]');
                if (!content) {
                    return false;
                }
                if (content[index - 1]) {
                    return content[index - 1];
                }
                return false;
            }
        });
        Object.defineProperty(this, "getLastStepIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.totalStepsNumber;
            }
        });
        Object.defineProperty(this, "getTotalStepsNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.totalStepsNumber;
            }
        });
        Object.defineProperty(this, "refreshUI", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                let state = '';
                if (this.isLastStep()) {
                    state = 'last';
                }
                else if (this.isFirstStep()) {
                    state = 'first';
                }
                else {
                    state = 'between';
                }
                // Set state class
                this.element.classList.remove('last');
                this.element.classList.remove('first');
                this.element.classList.remove('between');
                this.element.classList.add(state);
                // Step Items
                const elements = this.element.querySelectorAll('[data-kt-stepper-element="nav"], [data-kt-stepper-element="content"], [data-kt-stepper-element="info"]');
                if (!elements || elements.length <= 0) {
                    return;
                }
                for (let i = 0, len = elements.length; i < len; i++) {
                    const element = elements[i];
                    const index = getElementIndex(element) + 1;
                    element.classList.remove('current');
                    element.classList.remove('completed');
                    element.classList.remove('pending');
                    if (index === this.currentStepIndex) {
                        element.classList.add('current');
                        if (this.options.animation !== false &&
                            element.getAttribute('data-kt-stepper-element') === 'content') {
                            ElementStyleUtil.set(element, 'animationDuration', this.options.animationSpeed);
                            const animation = this._getStepDirection(this.passedStepIndex) === 'previous'
                                ? this.options.animationPreviousClass
                                : this.options.animationNextClass;
                            ElementAnimateUtil.animateClass(element, animation);
                        }
                    }
                    else {
                        if (index < this.currentStepIndex) {
                            element.classList.add('completed');
                        }
                        else {
                            element.classList.add('pending');
                        }
                    }
                }
            }
        });
        Object.defineProperty(this, "isLastStep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.currentStepIndex === this.totalStepsNumber;
            }
        });
        Object.defineProperty(this, "isFirstStep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.currentStepIndex === 1;
            }
        });
        Object.defineProperty(this, "isBetweenStep", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.isLastStep() === false && this.isFirstStep() === false;
            }
        });
        //   ///////////////////////
        //   // ** Public API  ** //
        //   ///////////////////////
        //   // Plugin API
        Object.defineProperty(this, "goto", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (index) => {
                return this._goTo(index);
            }
        });
        Object.defineProperty(this, "goNext", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.goto(this.getNextStepIndex());
            }
        });
        Object.defineProperty(this, "goPrev", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.goto(this.getPrevStepIndex());
            }
        });
        Object.defineProperty(this, "goFirst", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.goto(1);
            }
        });
        Object.defineProperty(this, "goLast", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.goto(this.getLastStepIndex());
            }
        });
        Object.defineProperty(this, "getCurrentStepIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.currentStepIndex;
            }
        });
        Object.defineProperty(this, "getNextStepIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.totalStepsNumber >= this.currentStepIndex + 1) {
                    return this.currentStepIndex + 1;
                }
                else {
                    return this.totalStepsNumber;
                }
            }
        });
        Object.defineProperty(this, "getPassedStepIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return this.passedStepIndex;
            }
        });
        Object.defineProperty(this, "getPrevStepIndex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.currentStepIndex - 1 > 1) {
                    return this.currentStepIndex - 1;
                }
                else {
                    return 1;
                }
            }
        });
        Object.defineProperty(this, "getElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (index) => {
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
        Object.defineProperty(this, "destroy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                console.log('destroy stepper');
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
        this.options = Object.assign(defaultStepperOptions, options);
        this.instanceUid = getUniqueIdWithPrefix('stepper');
        // Elements
        this.steps = this.element.querySelectorAll('[data-kt-stepper-element="nav"]');
        this.btnNext = this.element.querySelector('[data-kt-stepper-action="next"]');
        this.btnPrev = this.element.querySelector('[data-kt-stepper-action="previous"]');
        this.btnSubmit = this.element.querySelector('[data-kt-stepper-action="submit"]');
        // Variables
        this.totalStepsNumber = this.steps?.length | 0;
        this.passedStepIndex = 0;
        this.currentStepIndex = 1;
        // Set Current Step
        if (this.options.startIndex > 1) {
            this._goTo(this.options.startIndex);
        }
        // Event Handlers
        this.initHandlers();
        // Bind Instance
        DataUtil.set(this.element, 'stepper', this);
    }
    // Static methods
    static hasInstace(element) {
        return DataUtil.has(element, 'stepper');
    }
    static getInstance(element) {
        if (element !== null && StepperComponent.hasInstace(element)) {
            const data = DataUtil.get(element, 'stepper');
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
            let stepper = StepperComponent.getInstance(item);
            if (!stepper) {
                stepper = new StepperComponent(item, defaultStepperOptions);
            }
        });
    }
    static bootstrap(attr = '[data-kt-stepper]') {
        StepperComponent.createInstances(attr);
    }
}
Object.defineProperty(StepperComponent, "createInsance", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (element, options = defaultStepperOptions) => {
        if (!element) {
            return null;
        }
        let stepper = StepperComponent.getInstance(element);
        if (!stepper) {
            stepper = new StepperComponent(element, options);
        }
        return stepper;
    }
});
export { StepperComponent, defaultStepperOptions };
