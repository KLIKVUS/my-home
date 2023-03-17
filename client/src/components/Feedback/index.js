import './index.css';


function Feedback({ children, firstName, lastName, text, rating }) {
    return (
        <div>
            <h3>LastName: {lastName}</h3>
            <h3>FirstName: {firstName}</h3>
            <p>{text}</p>
            <p>Rating: {rating}</p>

            {children}
        </div>
    );
}

export default Feedback;