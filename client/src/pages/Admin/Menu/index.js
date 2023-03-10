import { NavLink } from 'react-router-dom';

import './index.css';


function AdminMenu() {
    return (
        <section>
            <h1>Меню админа</h1>

            <nav>
                <NavLink to={"projects"}>Проекты</NavLink>
                <NavLink to={"/feedbacks"}>Отзывы</NavLink>
            </nav>
        </section>
    );
}

export default AdminMenu;
