function FeedbackCard({ data }) {
    let selectedItems = [];
    for (let i = 0; i < 10; i++) {
        if (i < data.rating) {
            selectedItems.push(<li key={i} className="rating__item rating__item--selected" />);
            continue;
        }
        selectedItems.push(<li key={i} className="rating__item rating__item--not-selected" />);
    }

    return (
        <div className="cards-wrapper__card card">
            <div className="card__main-content-wrapper">
                <h2 className="card__title">{data.lastName} {data.firstName}</h2>
                <p className="card__text">{data.text}</p>

                <div className="card__rating-wrapper">
                    <p>Rating :</p>
                    <ul className="card__rating rating">
                        {selectedItems}
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default FeedbackCard;