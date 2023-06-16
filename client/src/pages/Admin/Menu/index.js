import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import './index.scss';
import { AuthContext } from "../../../context/AuthContext";


function AdminMenu() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const handleExit = () => {
        authContext.logout();
        navigate("/");
    }

    return (
        <div className="content-wrapper">
            <section className="admin-nav-wrapper">
                <h1 className="admin-nav-wrapper__title"># Admin menu</h1>

                <nav className="admin-nav-wrapper__nav">
                    <NavLink className="admin-nav-wrapper__nav-link" to={"/admin/projects"}>Projects</NavLink>
                    <NavLink className="admin-nav-wrapper__nav-link" to={"/admin/feedbacks"}>Feedbacks</NavLink>

                    <button className="admin-nav-wrapper__btn" onClick={handleExit}>Exit</button>
                </nav>
            </section>

            <Outlet />
        </div>
    );
}

export default AdminMenu;
