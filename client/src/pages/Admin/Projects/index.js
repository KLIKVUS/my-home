import { NavLink, Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import './index.scss';


function Projects() {
    const projects = useLoaderData();
    const submit = useSubmit();
    const handleDelete = (url) => {
        submit(null, { method: "delete", action: url });
    }

    return (
        <section className="content-wrapper">
            <NavLink className="admin-link" to="./create">Create project</NavLink>

            <h1 className="content-wrapper__title">Projects list:</h1>

            <div className="admin-cards-wrapper">
                {projects && projects.map((project) => (
                    <div key={project._id} className="admin-cards-wrapper_card card admin-card">
                        <h2 className="card__title">{project.title}</h2>
                        <p>Description: {project.description}</p>

                        <p>Implemented features:</p>
                        {project.implementedFeatures.length ?
                            <ul className="admin-card__list">
                                {project.implementedFeatures.map((elem, i) => {
                                    return <li key={i} className="admin-card__list-item">{elem}</li>
                                })}
                            </ul> :
                            <p>null</p>}

                        <p>Link status: {project.link ? "not null" : "null"}</p>

                        <div className="admin-card__links">
                            <NavLink to={`/admin/projects/${project._id}/edit`}>Edit</NavLink>
                            <button onClick={() => handleDelete(`/admin/projects/${project._id}/delete`)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <Outlet />
        </section>
    );
}

export default Projects;
