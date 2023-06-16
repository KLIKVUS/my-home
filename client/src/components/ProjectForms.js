import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';


function ProjectEditForm(params) {
    const loaderData = useLoaderData();

    useEffect(() => {
        params.handleChange(loaderData);
    }, [loaderData])

    return Form(params);
}

function Form({ formName, handleSend, handleChange, formData, loading, method }) {
    const feature = (index = 0, text = "") => (
        <input key={index} className="form-wrapper__label-input form-wrapper__label-input--inline" name="features" onChange={(event) => handleChangeFeature(event, index)} value={text} placeholder="..." />
    );

    const handleRenderedFeatures = () => {
        if (formData.implementedFeatures && formData.implementedFeatures.length) {
            return formData.implementedFeatures.map((text, index) => (
                <li key={index} className="admin-card__list-item">
                    {feature(index, text)}
                    <button type="button" className="form-wrapper__input-btn" onClick={() => handleDellFeature(index)}>dell</button>
                </li>
            ));
        }

        return (
            <li className="admin-card__list-item">{feature()}</li>
        )
    }
    const handleChangeFeature = (event, index) => {
        const features = formData.implementedFeatures?.slice() || [];
        features[index] = event.target.value;
        handleChange({ "implementedFeatures": features });
    }
    const handleDellFeature = (index) => {
        const features = formData.implementedFeatures.slice();
        features.splice(index, 1);
        handleChange({ "implementedFeatures": features });
    }
    const handleAddFeature = () => {
        const features = formData?.implementedFeatures || [];
        features.push("");
        handleChange({ "implementedFeatures": features });
    }

    return (
        <section className="form-wrapper">
            <h2 className="form-wrapper__title">Form for {formName} project</h2>
            <form onSubmit={(event) => handleSend(event, method)}>
                <label className="form-wrapper__label">
                    title:
                    <input className="form-wrapper__label-input" type="text" name="title" onChange={(event) => handleChange({ [event.target.name]: event.target.value })} value={formData?.title || ""} placeholder="Project title.." />
                </label>

                <label className="form-wrapper__label">
                    description:
                    <textarea className="form-wrapper__label-input" name="description" onChange={(event) => handleChange({ [event.target.name]: event.target.value })} value={formData?.description || ""} placeholder="Project description.." />
                </label>

                <label className="form-wrapper__label">
                    implemented features:
                    <ul className="admin-card__list">{handleRenderedFeatures()}</ul>
                    <button type="button" className="form-wrapper__add-btn" onClick={handleAddFeature}>add</button>
                </label>

                <label className="form-wrapper__label">
                    link:
                    <input className="form-wrapper__label-input" type="url" name="link" onChange={(event) => handleChange({ [event.target.name]: event.target.value })} value={formData?.link || ""} placeholder="Project link.." />
                </label>

                <button className="form-wrapper__btn" type="submit" disabled={loading}>Send</button>
            </form>
        </section>
    );
}

export { ProjectEditForm, Form as ProjectCreateForm };
