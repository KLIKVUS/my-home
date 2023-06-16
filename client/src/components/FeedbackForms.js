import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';


function FeedbackEditForm(params) {
    const loaderData = useLoaderData();

    useEffect(() => {
        params.handleChange(loaderData);
    }, [loaderData])

    return Form(params);
}

function Form({ formName, handleSend, handleChange, formData, loading, method }) {
    return (
        <section className="form-wrapper">
            <h2 className="form-wrapper__title">Form for {formName} project</h2>
            <form onSubmit={(event) => handleSend(event, method)}>
                <label className="form-wrapper__label">
                    last name:
                    <input className="form-wrapper__label-input" name="lastName" type="text" onChange={(event) => handleChange({ [event.target.name]: event.target.value })} value={formData?.lastName || ""} placeholder="Feedback last name.." />
                </label>

                <label className="form-wrapper__label">
                    first name:
                    <input className="form-wrapper__label-input" type="text" name="firstName" onChange={(event) => handleChange({ [event.target.name]: event.target.value })} value={formData?.firstName || ""} placeholder="Feedback first name.." />
                </label>

                <label className="form-wrapper__label">
                    text:
                    <textarea className="form-wrapper__label-input" name="text" onChange={(event) => handleChange({ [event.target.name]: event.target.value })} value={formData?.text || ""} placeholder="Feedback text.." />
                </label>

                <label className="form-wrapper__label">
                    rating:
                    <input type="range" min="0" max="10" step="1" name="rating" onChange={(event) => handleChange({ [event.target.name]: event.target.value })} value={formData?.rating || 0} />
                    {formData?.rating || 0}
                </label>

                <button className="form-wrapper__btn" type="submit" disabled={loading}>Send</button>
            </form>
        </section>
    );
}

export {FeedbackEditForm, Form as FeedbackCreateForm};
