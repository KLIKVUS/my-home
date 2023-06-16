import { NavLink } from 'react-router-dom';

import './index.scss';


function Main({ children }) {
    return (
        <main className="main" id="main">
            <span className="main__side-line">
                <div className="main__anchor-link-wrapper">
                <NavLink className="main__anchor-link main__anchor-link--eye" to={{pathname: "", hash: "#main"}} />
                </div>
            </span>

            {children}

            {/* <div className="main__btns btns">
                <button className="btns__btn btns__btn-img--theme" />
                <button className="btns__btn">En</button>
            </div> */}
        </main>
    );
}

export default Main;
