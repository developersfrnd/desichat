import React, { useState, useEffect } from 'react'
import Article from '../../../Components/Models/Article'
import Aside from '../../../Components/Models/Aside'
import Filters from '../../../Components/Search/Filters/FIlters'
import BaseComponent from '../../BaseComponent';
import usersModel from '../../../ApiManager/user';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Loaders/Loading';

function Model() {

    const [model, setmodel] = useState({})
    const [loading, setloading] = useState(true)
    const { userId } = useParams()

    useEffect(() => {
        usersModel.getUser(userId)
            .then( res => {
                setmodel(res.data.data)
                setloading(false);
            })
            .catch((error) => { 
                toast.error(error.message)
            });
    }, [])

    return (
        (loading) ? <Loading /> : 
        <section className="ds section_padding_top_100 section_padding_bottom_50 columns_padding_25">
            <div className="container">
                <Filters />
                <div className="row">
                    <div className="col-sm-7 col-md-8 col-lg-8">
                        <Article {...model} /> 
                    </div>
                    <Aside />
                </div>
            </div>
        </section>
    )
}

export default Model