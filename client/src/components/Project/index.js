import './index.css';


function Project({ children, title, description, img, likes }) {
    return (
        <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <img src={img} alt="Project img" />
            <p>Likes: {likes}</p>

            {children}
        </div>
    );
}

export default Project;