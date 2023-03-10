import { NavLink } from 'react-router-dom';

import './index.css';


function Projects() {
    return (
        <section>
            <h1>Панель проектов</h1>

            <nav>
                <NavLink to={".."} >Назад</NavLink>
            </nav>

            <section>
                <h2>Список проектов</h2>
                
            </section>
            <form>

            </form>
        </section>
    );
}

export default Projects;
