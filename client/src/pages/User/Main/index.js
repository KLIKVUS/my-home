import { useLoaderData } from 'react-router-dom';

import './index.css';
import { useHttp } from '../../../hooks/http.hook';
import Feedback from '../../../components/Feedback';
import Project from '../../../components/Project';


function Main() {
    const { projects, feedbacks } = useLoaderData();

    return (
        <main>
            <section>
                <h1>Мои проекты:</h1>
                {projects && projects.data.map((project, i) => <Project key={i} title={project.title} description={project.description} img={project.img} likes={project.likes} />)}
            </section>

            <p>########################</p>

            <section>
                <h1>Отзывы:</h1>
                {feedbacks && feedbacks.data.map((feedback, i) => <Feedback key={i} firstName={feedback.firstName} lastName={feedback.lastName} text={feedback.text} rating={feedback.rating} />)}
            </section>
        </main>
    );
}

export const useMainLoader = async () => {
    const { request } = useHttp();
    const projects = await request("/api/projects");
    const feedbacks = await request("/api/feedbacks");
    return { projects, feedbacks };
}

export default Main;
