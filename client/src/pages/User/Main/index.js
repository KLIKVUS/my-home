import { useLoaderData } from 'react-router-dom';

import './index.css';
import Feedback from '../../../components/Feedback';
import Project from '../../../components/Project';


function Main() {
    const { projects, feedbacks } = useLoaderData();

    return (
        <main>
            <section>
                <h1>My projects:</h1>
                {projects && projects.map((project, i) => <Project key={i} title={project.title} description={project.description} img={project.img} likes={project.likes} />)}
            </section>

            <p>########################</p>

            <section>
                <h1>Feedbacks:</h1>
                {feedbacks && feedbacks.map((feedback, i) => <Feedback key={i} firstName={feedback.firstName} lastName={feedback.lastName} text={feedback.text} rating={feedback.rating} />)}
            </section>
        </main>
    );
}

export default Main;
