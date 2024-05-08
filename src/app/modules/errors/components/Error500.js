import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
const Error500 = () => {
    return (_jsxs(_Fragment, { children: [_jsx("h1", { className: 'fw-bolder fs-2qx text-gray-900 mb-4', children: "System Error" }), _jsx("div", { className: 'fw-semibold fs-6 text-gray-500 mb-7', children: "Something went wrong! Please try again later." }), _jsxs("div", { className: 'mb-11', children: [_jsx("img", { src: toAbsoluteUrl('media/auth/500-error.png'), className: 'mw-100 mh-300px theme-light-show', alt: '' }), _jsx("img", { src: toAbsoluteUrl('media/auth/500-error-dark.png'), className: 'mw-100 mh-300px theme-dark-show', alt: '' })] }), _jsx("div", { className: 'mb-0', children: _jsx(Link, { to: '/dashboard', className: 'btn btn-sm btn-primary', children: "Return Home" }) })] }));
};
export { Error500 };
