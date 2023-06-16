import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './index.scss';


function Nav({ panelIcon }) {
    const location = useLocation();
    const [linkSelectorWidth, setLinkSelectorWidth] = useState();

    const [panelIsActive, setPanelIsActive] = useState(false);

    useEffect(() => {
        const elem1 = document.querySelector(".panel__link-selector");
        const elem2 = document.querySelector("a.nav__link.active");

        if (!elem1 || !elem2) return setLinkSelectorWidth(null);

        const el1 = elem1.getBoundingClientRect();
        const el2 = elem2.getBoundingClientRect();
        setLinkSelectorWidth(Math.round(Math.abs(el1.left - el2.left - el2.width)));
    }, [location])

    return (
        <div className={panelIsActive ? "panel panel--open" : "panel"}>
            <div className="panel__icons-wrapper">
                <div className="panel__icon">
                    <div className="panel__page-icon" style={panelIcon && { backgroundImage: `url(/icons/page/${panelIcon})` }} />
                </div>

                <div className="panel__icon panel__btn-icon">
                    <button className={["panel__btn", "btn", panelIsActive ? "btn--close" : null].join(" ")} onClick={() => setPanelIsActive(!panelIsActive)}>
                        <span className="btn__line" />
                        <span className="btn__line" />
                    </button>
                </div>
            </div>

            <div className="panel__links-wrapper">
                <div style={linkSelectorWidth ? { width: linkSelectorWidth + 20 + "px" } : null} className={"panel__link-selector"}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "" : "panel__back-link"}
                    />
                </div>

                <nav className="panel__nav nav">
                    <NavLink to="/works" className="nav__link">Works</NavLink>
                    <NavLink to="/feedbacks" className="nav__link">Feedbacks</NavLink>
                    <NavLink to="/about" className="nav__link">About</NavLink>
                </nav>
            </div>

            <div className="panel__social social">
                <NavLink to="https://vk.com/aappi" target="_blank" className="social__link social__link-img--vk" />
                <NavLink to="https://t.me/KLIKVUS" target="_blank" className="social__link social__link-img--tg" />
            </div>
        </div>
    );
}

export default Nav;
