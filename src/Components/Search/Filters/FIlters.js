import React, { useState, useEffect } from 'react';
import { getCategories } from '../../../ApiManager/categories'
import { getEthnicities } from '../../../ApiManager/ethnicities'
import { getLanguages } from '../../../ApiManager/languages'
import Constants from '../../../Config/Constants';
import { toast } from 'react-toastify';



function FIlters(props) {

    const [categories, setcategory] = useState(null);
    const [ethnicities, setethnicity] = useState(null);
    const [language, setlanguage] = useState(null);
    const [sort, setsort] = useState(null);
    const [loading, setloading] = useState(true);

    const handleSortingEvent = (event) => {
        setsort(event.target.value);
    }

    useEffect(() => {
        let categories = [];
        let languages = [];
        let ethnicities = [];

        Promise.all([getCategories(), getEthnicities(), getLanguages()])
            .then(results => {

                results[0].data.data.map(category => {
                    categories.push(category)
                })
                results[1].data.data.map(ethnicity => {
                    ethnicities.push(ethnicity)
                })
                results[2].data.data.map(language => {
                    languages.push(language)
                })

                setcategory(categories);
                setethnicity(ethnicities);
                setlanguage(languages);
                setloading(false);
            })
            .catch(error => {
                toast.error(error);
            });
    }, []);


    return (
        (loading) ? 'Loading...' :
            <div className="row bottommargin_0 topmargin_0 boxed-padding">
                <div className="col-lg-9">
                    <div className="filters isotope_filters inline-block margin_0">

                        <div className="dropdown">
                            <a href="#" data-filter="*" onClick={() => props.clearFilters()}>All </a>
                        </div>

                        <div className="dropdown">
                            <a href="#" data-filter="*">Categories </a>
                            <div className="dropdown-content">

                                {
                                    categories.map(category => {
                                        return <p className="mm" onClick={() => props.setCategory(category.name)}>{category.name}</p>
                                    })
                                }
                            </div>
                        </div>

                        <div className="dropdown">
                            <a href="#" data-filter=".fashion">Ethnicities</a>
                            <div className="dropdown-content">
                                {
                                    ethnicities.map(ethnicity => {
                                        return <p className="mm" onClick={() => props.setEthnicity(ethnicity.id)}>{ethnicity.name}</p>
                                    })
                                }
                            </div>
                        </div>

                        <div className="dropdown">
                            <a href="#" data-filter=".session">Orientation</a>
                            <div className="dropdown-content">
                                {
                                    Constants.orientation.map(orien => {
                                        if (orien.value) {
                                            return <p className="mm" onClick={() => props.setOrientation(orien.value)}>{orien.displayValue}</p>;
                                        }
                                    })
                                }
                            </div>
                        </div>

                        <div className="dropdown">
                            <a href="#" data-filter=".session">Popularity</a>
                            <div className="dropdown-content">
                                <p className="mm"> Any </p>
                                <p className="mm"> 5 Stars Only </p>
                                <p className="mm"> 4 Stars Only </p>
                                <p className="mm"> 3 Stars Only </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 text-lg-right">
                    <form className="form-inline models-orderby">
                        <div className="form-group select-group">
                            <label className="sr-only" htmlFor="orderby">Sort By:</label>
                            <select className="form-control orderby" name="orderby" id="orderby" value={sort} onChange={(val) => props.setSorting(val)}>
                                <option value="" defaultValue="">Default sorting</option>
                                <option value="name">Sort by name</option>
                                <option value="dob">Sort by age</option>
                            </select>
                            <i className="rt-icon2-chevron-thin-down form-button"></i>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default FIlters