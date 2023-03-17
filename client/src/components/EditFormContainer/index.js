import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import './index.css';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';


function EditFormContainer({ apiUrl, EditForm }) {
    const loaderData = useLoaderData();
    const [editFormData, setEditFormData] = useState(loaderData.data);
    const handleChange = (event) => {
        setEditFormData({ ...editFormData, [event.target.name]: event.target.value });
    }

    useEffect(() => {
        setEditFormData(loaderData.data);
    }, [loaderData])

    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const navigate = useNavigate();
    const handleSend = async (event) => {
        event.preventDefault();
        try {
            await message.promiseMessage(request.bind(null, `${apiUrl}:id?id=${loaderData.id}`, "PUT", editFormData));
            navigate(-1);
        } catch { }
    }

    useEffect(() => {
        clearError();
    }, [error, message, clearError])

    return (
        <EditForm handleSend={handleSend} handleChange={handleChange} editFormData={editFormData} loading={loading} />
    );
}

export default EditFormContainer;
