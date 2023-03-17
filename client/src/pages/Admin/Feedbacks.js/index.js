import { NavLink, Outlet, useLoaderData } from 'react-router-dom';

import './index.css';
import Feedback from '../../../components/Feedback';


function Feedbacks() {
    const feedbacks = useLoaderData();

    return (
        <>
            <section>
                <h1>Feedbacks list</h1>
                {feedbacks && feedbacks.map((feedback) => (
                    <Feedback key={feedback._id} firstName={feedback.firstName} lastName={feedback.lastName} text={feedback.text} rating={feedback.rating}>
                        <NavLink to={`/admin/feedbacks/${feedback._id}/edit`}>Edit</NavLink>
                    </Feedback>
                ))}
            </section>

            <Outlet />
        </>
    );
}

export default Feedbacks;
