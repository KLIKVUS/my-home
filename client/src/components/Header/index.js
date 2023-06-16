import './index.scss';
import Nav from '../Nav';
import Gears from '../Gears/Gears';


function Header({ headerTitle, headerSubtitle, panelIcon }) {
    return (
        <header className="header">
            <Nav panelIcon={panelIcon} />

            <div className="header__text-wrapper">
                <h1 className="header__title">{headerTitle}</h1>
                {headerSubtitle && <p className="header__subtitle">{headerSubtitle}</p>}
            </div>

            <div className="header__gears-wrapper">
                <div className="header__gears">
                    <Gears />
                </div>
            </div>
        </header>
    );
}

export default Header;
