import React, { Component } from 'react'
import { getCategories } from '../../../ApiManager/categories'
import { getEthnicities } from '../../../ApiManager/ethnicities'
import { getLanguages } from '../../../ApiManager/languages'
import Loading from '../../Loaders/Loading';
import Constants from '../../../Config/Constants';

class Filters extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading:true,
            categories:[],
            languages:[],
            ethnicities:[],
            sort:''
        }
        
    }
    
    handleSortingEvent = (event) => {
        this.setState({sort:event.target.value});
    }

    componentDidMount(){
        let categories = [];
        let languages = [];
        let ethnicities = [];

        Promise.all([getCategories(), getEthnicities(), getLanguages()])
            .then( results => {

                results[0].data.data.map(category => {
                    categories.push(category)
                })
                results[1].data.data.map(ethnicity => {
                    ethnicities.push(ethnicity)
                })
                results[2].data.data.map(language => {
                    languages.push(language)
                })

                this.setState({categories:categories,ethnicities:ethnicities,languages:languages,loading:false})
            })
            .catch(error => {
                this.showMessage(error);
            });
    }

    render(){
        return (
            (this.state.loading) ? <Loading /> : 
            <div className="row bottommargin_50 boxed-padding">
                <div className="col-lg-9">
                    <div className="filters isotope_filters inline-block margin_0">
                    
                    <div className="dropdown">
                        <a href="#" data-filter="*" onClick={() => this.props.clearFilters()}>All </a>
                    </div>

                    <div className="dropdown">
                        <a href="#" data-filter="*">Categories </a>
                        <div className="dropdown-content">

                            {
                                this.state.categories.map(category => {
                                    return <p className="mm" onClick={() => this.props.setCategory(category.name)}>{category.name}</p>
                                })
                            }
                        </div>
                    </div>
                    
                    <div className="dropdown">
                        <a href="#" data-filter=".fashion">Ethnicities</a>
                        <div className="dropdown-content">
                            {
                                this.state.ethnicities.map(ethnicity => {
                                    return <p className="mm" onClick={() => this.props.setEthnicity(ethnicity.id)}>{ethnicity.name}</p>
                                })
                            }
                        </div>
                    </div>

                    <div className="dropdown">
                        <a href="#" data-filter=".session">Orientation</a>
                        <div className="dropdown-content">
                            {
                                Constants.orientation.map(orien => {
                                    if(orien.value) {
                                        return <p className="mm" onClick={() => this.props.setOrientation(orien.value)}>{orien.displayValue}</p>;
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
                            <select className="form-control orderby" name="orderby" id="orderby" value={this.state.sort} onChange={(val) => this.props.setSorting(val)}>
                                <option value="" defaultValue="">Default sorting</option>
                                <option value="name">Sort by name</option>
                                <option value="dob">Sort by age</option>
                            </select>
                            <i className="rt-icon2-chevron-thin-down form-button"></i>
                        </div>
                    </form>
                </div>
            </div>
        );
    }    
}

export default Filters;
