import { NavLink, Outlet, useLoaderData } from 'react-router-dom';

import './index.css';
import Project from '../../../components/Project';


function Projects() {
    const projects = useLoaderData();

    return (
        <>
            <section>
                <h1>Projects list</h1>
                {projects && projects.map((project) => (
                    <Project key={project._id} title={project.title} description={project.description} img={project.img} likes={project.likes}>
                        <NavLink to={`/admin/projects/${project._id}/edit`}>Edit</NavLink>
                    </Project>
                ))}
            </section>

            <Outlet />
        </>
    );
}

export default Projects;
