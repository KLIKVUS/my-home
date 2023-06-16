import { NavLink, Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import './index.scss';


function Feedbacks() {
    const feedbacks = useLoaderData();
    const submit = useSubmit();
    const handleDelete = (url) => {
        submit(null, { method: "delete", action: url });
    }

    return (
        <section className="content-wrapper">
            <NavLink className="admin-link" to="./create">Create feedback</NavLink>

            <h1 className="content-wrapper__title">Feedbacks list:</h1>

            <div className="admin-cards-wrapper">
                {feedbacks && feedbacks.map((feedback) => (
                    <div key={feedback._id} className="admin-cards-wrapper_card card admin-card">
                        <h2 className="card__title">{feedback.firstName}{feedback.lastName}</h2>
                        <p>Text: {feedback.text}</p>
                        <p>Rating: {feedback.rating}</p>

                        <div className="admin-card__links">
                            <NavLink to={`/admin/feedbacks/${feedback._id}/edit`}>Edit</NavLink>
                            <button onClick={() => handleDelete(`/admin/feedbacks/${feedback._id}/delete`)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <Outlet />
        </section>
    );
}

export default Feedbacks;
