function FeedbackEditForm({ handleSend, handleChange, editFormData, loading }) {
    return (
        <section>
            <h2>Form for edit project</h2>
            <form onSubmit={handleSend}>
                <label>
                    last name:
                    <input name="lastName" onChange={handleChange} value={editFormData?.lastName} placeholder="Feedback last name.." />
                </label>

                <p />

                <label>
                    first name:
                    <input type="text" name="firstName" onChange={handleChange} value={editFormData?.firstName} placeholder="Feedback first name.." />
                </label>

                <p />

                <label>
                    text:
                    <textarea name="text" onChange={handleChange} value={editFormData?.text} placeholder="Feedback text.." />
                </label>

                <p />

                <label>
                    rating:
                    <input type="range" min="1" max="10" name="rating" onChange={handleChange} value={editFormData?.rating} placeholder="Project img.." />
                </label>

                <p />

                <button type="submit" disabled={loading}>Send</button>
            </form>
        </section>
    );
}

export default FeedbackEditForm;
