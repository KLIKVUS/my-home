import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth.hook';

import './index.css';


function AdminMenu() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleExit = () => {
        logout();
        navigate("/");
    }

    return (
        <>
            <section>
                <h1>Admin menu</h1>

                <nav>
                    <NavLink to={"/admin/projects"}>Projects</NavLink>

                    <p />

                    <NavLink to={"/admin/feedbacks"}>Feedbacks</NavLink>

                    <p />

                    <button onClick={handleExit}>Exit</button>
                </nav>
            </section>

            <Outlet />
        </>
    );
}

export default AdminMenu;
