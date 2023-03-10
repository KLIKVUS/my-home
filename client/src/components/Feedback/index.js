import './index.css';


function Feedback({ firstName, lastName, text, rating }) {
    return (
        <div>
            <h3>Фамилия: {lastName}</h3>
            <h3>Имя: {firstName}</h3>
            <p>{text}</p>
            <p>Оценка: {rating}</p>
        </div>
    );
}

export default Feedback;