import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useMessage } from '../../hooks/message.hook';
import { useHttp } from '../../hooks/http.hook';


function ProjectCard({ data }) {
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();

    useEffect(() => {
        clearError();
    }, [error, message, clearError])

    const likeHandler = async (id) => {
        try {
            await message.promiseMessage(request.bind(null, `/api/project/${id}/like`, "PATCH"));
        } catch { }
    }

    return (
        <div className="cards-wrapper__card card">
            <div className="card__content">
                <div className="card__main-content-wrapper">
                    <h2 className="card__title">{data.title}</h2>
                    <p>{data.description}</p>
                </div>

                <div className="card__content-wrapper">
                    <p>Implemented features :</p>
                    <ul className="card__list card__list--under-subtitle">
                        {data?.implementedFeatures.map((elem, i) => {
                            return <li key={i} className="card__list-item">{elem}</li>
                        })}
                    </ul>
                </div>
            </div>

            <div className="card__btns-wrapper">
                <button className="card__btn card__btn--like" onClick={() => likeHandler(data._id)} disabled={loading} />
                {data.link && <NavLink className="card__btn card__btn--link" to={data.link} target="_blank" />}
            </div>
        </div>
    );
}

export default ProjectCard;