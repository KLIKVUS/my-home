import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';


function FormContainer({ apiUrl, Form, formName, method="PUT" }) {
    const [formData, setFormData] = useState({});
    const handleChange = (data) => {
        setFormData({ ...formData, ...data });
    }

    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const navigate = useNavigate();
    const handleSend = async (event, method="PUT") => {
        event.preventDefault();
        try {
            const {id, ...data} = formData;
            const url = method == "PUT" ? `${apiUrl}/${id}` : apiUrl;
            await message.promiseMessage(request.bind(null, url, method, data));
            handleBack();
        } catch { }
    }
    const handleBack = () => navigate("..", { replace: true });

    useEffect(() => {
        clearError();
    }, [error, message, clearError])

    return (
        <div className="form-container" onClick={() => handleBack()}>
            <div className="form-container__content-wrapper" onClick={e => e.stopPropagation()}>
                <Form formName={formName} handleSend={handleSend} handleChange={handleChange} formData={formData} loading={loading} method={method} />
            </div>
        </div>
    );
}

export default FormContainer;
