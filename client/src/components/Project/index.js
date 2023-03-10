import './index.css';


function Project({ title, description, img, likes }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <img src={img} alt="Project img" />
            <p>Лайки: {likes}</p>
        </div>
    );
}

export default Project;