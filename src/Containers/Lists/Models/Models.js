import React, { useState, useEffect } from 'react';
import Filters from '../../../Components/Search/Filters/FIlters'
import ListItem from '../../../Components/Content/List/ListItem'
import PaginationLinks from '../../Pagination/PaginationLinks'
import userModel from '../../../ApiManager/user'
import Loading from '../../../Components/Loaders/Loading'
import { toast } from 'react-toastify';


function Models() {

    const [category, setcategory] = useState(null);
    const [ethnicity, setethnicity] = useState(null);
    const [language, setlanguage] = useState(null);
    const [orientation, setorientation] = useState(null);
    const [sort, setsort] = useState(null);
    const [page, setpage] = useState(1);
    const [meta, setmeta] = useState({});
    const [links, setlinks] = useState({});
    const [models, setmodels] = useState([]);
    const [loading, setloading] = useState(true);

    const clearFilters = () => {
        setlanguage(null);
        setcategory(null);
        setethnicity(null);
        setpage(1);
        setloading(true);
    }

    const setSorting = (event) => {
        setsort(event.target.value);
        setpage(1);
        setloading(true);
    }

    const setPageNumber = (pageNumber) => {
        setpage(pageNumber);
        setloading(true);
    }

    useEffect(() => {
        let params = { page: page };
        if (category) {
            params['category'] = category;
        }
        if (ethnicity) {
            params['ethnicity'] = ethnicity;
        }
        if (language) {
            params['language'] = language;
        }
        if (orientation) {
            params['orientation'] = orientation;
        }
        if (sort) {
            params['sort'] = sort;
        }

        let isMounted = true;
        userModel.getUsers({ params: params })
            .then(response => {
                if (isMounted) {
                    setloading(false);
                    setmodels(response.data.data);
                    setlinks(response.data.links);
                    setmeta(response.data.meta);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setloading(false);
                    toast.error(error);
                }
            });

        return () => {
            isMounted = false
        }

    }, [page, category, ethnicity, language, orientation, sort]);


    return (
            <section className="ds page_models models_square gorizontal_padding section_padding_20 columns_padding_5">
                <div className="container-fluid">
                    {
                        (loading) ? <Loading /> :
                        <>
                            <Filters
                                setCategory={setcategory}
                                setEthnicity={setethnicity}
                                setLanguage={setlanguage}
                                setSorting={setsort}
                                clearFilters={clearFilters}
                                setOrientation={setorientation}
                            />

                            <div className="isotope_container isotope row masonry-layout bottommargin_20" data-filters=".isotope_filters">
                                {
                                    models.map(model => {
                                        return <ListItem key={model.id}  {...model} />
                                    })
                                }
                            </div>
                            <PaginationLinks links={links} meta={meta} clickEvent={setPageNumber} />
                        </>
                    }
                </div>
            </section>
    )
}

export default Models
