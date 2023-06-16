import { NavLink } from 'react-router-dom';

import './index.scss';


function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content-wrapper">
                <div className="social">
                    <NavLink to="https://vk.com/aappi" target="_blank" className="social__link social__link-img--vk" />
                    <NavLink to="https://t.me/KLIKVUS" target="_blank" className="social__link social__link-img--tg" />
                </div>

                <div className="footer__nav">
                    <div className="footer__nav-links-wrapper">
                        <NavLink to="/works" className="footer__nav-link">Works</NavLink>
                        <NavLink to="/feedbacks" className="footer__nav-link">Feedbacks</NavLink>
                    </div>
                    <div className="footer__nav-links-wrapper">
                        <NavLink to="/about" className="footer__nav-link">About</NavLink>
                        <NavLink to="/admin" className="footer__nav-link">Admin page</NavLink>
                    </div>
                </div >
            </div>
        </footer >
    );
}

export default Footer;