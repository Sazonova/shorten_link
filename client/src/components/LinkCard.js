import React, { useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/Auth.context';
import { useHistory } from 'react-router-dom';

export const LinkCard = ({ link }) => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const deleteHandler = async (id) => {
        try {
            await request(`/api/link/${id}`, 'DELETE', {from: link}, {
                Authorization: `Bearer ${auth.token}`
              })
            history.push(`/link`);
        } catch (error) {}
    }
    return (
        <div>
            <h2>Link</h2>
            <p>Shorted link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Clicks count: <strong>{link.clicks}</strong></p>
            <p>Created date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            <button className="btn btn-dark" onClick={e => deleteHandler(link._id)}>Delete</button>
        </div>
    )
}