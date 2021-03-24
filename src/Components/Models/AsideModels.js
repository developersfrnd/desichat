import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userModel from '../../ApiManager/user';
import ListItem from '../Content/List/ListItem';
import Loading from '../Loaders/Loading';
import { toast } from 'react-toastify'

const aside = (props) => {

    const [similarModels, setsimilarModels] = useState('');
    const [loading, setloading] = useState(false)

    useEffect(() => {
        let params = {};
        params['category'] = props.categories;
        params['language'] = props.languages;
        params['similerId'] = props.id;
        
        userModel.getUsers({ params: params })
            .then(response => {
                    setloading(false);
                    setsimilarModels(response.data.data);
            })
            .catch((error) => {
                setloading(false);
                toast.error(error);
            });
    }, []);

    return (
        
        <aside>
            <div className="models_square">
                <div className="widget widget_popular_entries">
                    <h3 className="headingtag headingBg">Similar Models</h3>
                    {
                        (loading) ? <Loading /> : 
                        (!similarModels.length) ? <div className="profileContainer">No Similer Model</div> :
                        similarModels.map(model => {
                            return (
                                <div className="profileContainer">
                                    <ListItem key={model.id}  {...model} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </aside>
    )
}

export default aside