import { useLoaderData } from "react-router-dom";

import "./index.scss";


function CardsWrapper({ Card, children }) {
    const loaderData = useLoaderData();
    if (!loaderData && !children) return;

    return (
        <div className="cards-wrapper">
            {loaderData?.map((data, i) => (
                <Card key={i} data={data} />
            ))}

            {children}
        </div>
    )
}

export default CardsWrapper;
