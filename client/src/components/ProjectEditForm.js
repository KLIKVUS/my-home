function ProjectEditForm({ handleSend, handleChange, editFormData, loading }) {
    return (
        <section>
            <h2>Form for edit project</h2>
            <form onSubmit={handleSend}>
                <label>
                    title:
                    <input type="text" name="title" onChange={handleChange} value={editFormData?.title} placeholder="Project title.." />
                </label>

                <p />

                <label>
                    description:
                    <textarea name="description" onChange={handleChange} value={editFormData?.description} placeholder="Project description.." />
                </label>

                <p />

                <label>
                    img:
                    <input type="text" name="img" onChange={handleChange} value={editFormData?.img} placeholder="Project img.." />
                </label>

                <p />

                <button type="submit" disabled={loading}>Send</button>
            </form>
        </section>
    );
}

export default ProjectEditForm;
