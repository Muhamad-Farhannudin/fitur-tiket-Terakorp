import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useThemeMode } from '../../../_metronic/partials';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
const BODY_CLASSES = ['bgi-size-cover', 'bgi-position-center', 'bgi-no-repeat'];
const ErrorsLayout = () => {
    const { mode } = useThemeMode();
    useEffect(() => {
        BODY_CLASSES.forEach((c) => document.body.classList.add(c));
        document.body.style.backgroundImage =
            mode === 'dark'
                ? `url(${toAbsoluteUrl('media/auth/bg7-dark.jpg')})`
                : `url(${toAbsoluteUrl('media/auth/bg7.jpg')})`;
        return () => {
            BODY_CLASSES.forEach((c) => document.body.classList.remove(c));
            document.body.style.backgroundImage = 'none';
        };
    }, [mode]);
    return (_jsx("div", { className: 'd-flex flex-column flex-root', children: _jsx("div", { className: 'd-flex flex-column flex-center flex-column-fluid', children: _jsx("div", { className: 'd-flex flex-column flex-center text-center p-10', children: _jsx("div", { className: 'card card-flush  w-lg-650px py-5', children: _jsx("div", { className: 'card-body py-15 py-lg-20', children: _jsx(Outlet, {}) }) }) }) }) }));
};
export { ErrorsLayout };
