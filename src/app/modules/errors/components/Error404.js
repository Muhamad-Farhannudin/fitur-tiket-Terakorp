import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
const Error404 = () => {
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'fw-bolder fs-2hx text-gray-900 mb-4', children: "Oops!" }), _jsx("div", { className: 'fw-semibold fs-6 text-gray-500 mb-7', children: "We can't find that page." }), _jsxs("div", { className: 'mb-3', children: [_jsx("img", { src: toAbsoluteUrl('media/auth/404-error.png'), className: 'mw-100 mh-300px theme-light-show', alt: '' }), _jsx("img", { src: toAbsoluteUrl('media/auth/404-error-dark.png'), className: 'mw-100 mh-300px theme-dark-show', alt: '' })] }), _jsx("div", { className: 'mb-0', children: _jsx(Link, { to: '/dashboard', className: 'btn btn-sm btn-primary', children: "Return Home" }) })] }));
};
export { Error404 };
