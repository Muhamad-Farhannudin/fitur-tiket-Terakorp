import { EventHandlerUtil } from '../_utils';
class ThemeMode {
    constructor() {
        Object.defineProperty(this, "menu", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "getParamName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (postfix) => {
                const ktName = document.body.hasAttribute('data-kt-name');
                const name = ktName ? ktName + '_' : '';
                return 'kt_' + name + 'theme_mode_' + postfix;
            }
        });
        Object.defineProperty(this, "getMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const modeParam = this.getParamName('value');
                const themeMode = this.getMenuMode();
                const defaultMode = 'light';
                if (!localStorage.getItem(modeParam)) {
                    return defaultMode;
                }
                const ls = localStorage.getItem(modeParam);
                if (ls) {
                    return ls;
                }
                const dataTheme = this.element?.getAttribute('data-bs-theme');
                if (dataTheme) {
                    return dataTheme;
                }
                if (!themeMode) {
                    return defaultMode;
                }
                if (themeMode === 'system') {
                    return this.getSystemMode();
                }
                return themeMode;
            }
        });
        Object.defineProperty(this, "setMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (mode, menuMode) => {
                // Check input values
                if (mode !== 'light' && mode !== 'dark') {
                    return;
                }
                // Get param names
                const modeParam = this.getParamName('value');
                const menuModeParam = this.getParamName('menu');
                // Reset mode if system mode was changed
                if (menuMode === 'system') {
                    if (this.getSystemMode() !== mode) {
                        mode = this.getSystemMode();
                    }
                }
                // Check menu mode
                if (!menuMode) {
                    menuMode = mode;
                }
                // Read active menu mode value
                const activeMenuItem = this.menu?.querySelector('[data-kt-element="mode"][data-kt-value="' + menuMode + '"]') || null;
                // Enable switching state
                this.element?.setAttribute('data-kt-theme-mode-switching', 'true');
                // Set mode to the target element
                this.element?.setAttribute('data-bs-theme', mode);
                // Disable switching state
                const self = this;
                setTimeout(function () {
                    self.element?.removeAttribute('data-kt-theme-mode-switching');
                }, 300);
                // Store mode value in storage
                if (localStorage) {
                    localStorage.setItem(modeParam, mode);
                }
                // Set active menu item
                if (activeMenuItem && localStorage) {
                    localStorage.setItem(menuModeParam, menuMode);
                    this.setActiveMenuItem(activeMenuItem);
                }
                // Flip images
                this.flipImages();
            }
        });
        Object.defineProperty(this, "getMenuMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                const menuModeParam = this.getParamName('menu');
                const menuItem = this.menu?.querySelector('.active[data-kt-element="mode"]');
                const dataKTValue = menuItem?.getAttribute('data-kt-value');
                if (dataKTValue) {
                    return dataKTValue;
                }
                if (!menuModeParam) {
                    return '';
                }
                const ls = localStorage ? localStorage.getItem(menuModeParam) : null;
                return ls || '';
            }
        });
        Object.defineProperty(this, "getSystemMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            }
        });
        Object.defineProperty(this, "initMode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.setMode(this.getMode(), this.getMenuMode());
                if (this.element) {
                    EventHandlerUtil.trigger(this.element, 'kt.thememode.init');
                }
            }
        });
        Object.defineProperty(this, "getActiveMenuItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                return (this.menu?.querySelector('[data-kt-element="mode"][data-kt-value="' + this.getMenuMode() + '"]') || null);
            }
        });
        Object.defineProperty(this, "setActiveMenuItem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (item) => {
                const menuModeParam = this.getParamName('menu');
                const menuMode = item.getAttribute('data-kt-value');
                const activeItem = this.menu?.querySelector('.active[data-kt-element="mode"]');
                if (activeItem) {
                    activeItem.classList.remove('active');
                }
                item.classList.add('active');
                if (localStorage && menuMode && menuModeParam) {
                    localStorage.setItem(menuModeParam, menuMode);
                }
            }
        });
        Object.defineProperty(this, "handleMenu", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.menu
                    ?.querySelectorAll('[data-kt-element="mode"]')
                    ?.forEach((item) => {
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        const menuMode = item.getAttribute('data-kt-value');
                        const mode = menuMode === 'system' ? this.getSystemMode() : menuMode;
                        if (mode) {
                            this.setMode(mode, menuMode);
                        }
                    });
                });
            }
        });
        Object.defineProperty(this, "flipImages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                document.querySelectorAll('[data-kt-img-dark]')?.forEach((item) => {
                    if (item.tagName === 'IMG') {
                        if (this.getMode() === 'dark' && item.hasAttribute('data-kt-img-dark')) {
                            item.setAttribute('data-kt-img-light', item.getAttribute('src') || '');
                            item.setAttribute('src', item.getAttribute('data-kt-img-dark') || '');
                        }
                        else if (this.getMode() === 'light' && item.hasAttribute('data-kt-img-light')) {
                            item.setAttribute('data-kt-img-dark', item.getAttribute('src') || '');
                            item.setAttribute('src', item.getAttribute('data-kt-img-light') || '');
                        }
                    }
                    else {
                        if (this.getMode() === 'dark' && item.hasAttribute('data-kt-img-dark')) {
                            item.setAttribute('data-kt-img-light', item.getAttribute('src') || '');
                            item.style.backgroundImage = "url('" + item.getAttribute('data-kt-img-dark') + "')";
                        }
                        else if (this.getMode() === 'light' && item.hasAttribute('data-kt-img-light')) {
                            item.setAttribute('data-kt-img-dark', item.getAttribute('src') || '');
                            item.style.backgroundImage = "url('" + item.getAttribute('data-kt-img-light') + "')";
                        }
                    }
                });
            }
        });
        Object.defineProperty(this, "on", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, hander) => {
                if (this.element) {
                    return EventHandlerUtil.on(this.element, name, hander);
                }
            }
        });
        Object.defineProperty(this, "off", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, handlerId) => {
                if (this.element) {
                    return EventHandlerUtil.off(this.element, name, handlerId);
                }
            }
        });
        Object.defineProperty(this, "init", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.menu = document.querySelector('[data-kt-element="theme-mode-menu"]');
                this.element = document.documentElement;
                this.initMode();
                if (this.menu) {
                    this.handleMenu();
                }
            }
        });
    }
}
const ThemeModeComponent = new ThemeMode();
// Initialize app on document ready => ThemeModeComponent.init()
export { ThemeModeComponent };
