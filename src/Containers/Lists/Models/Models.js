import React, { Component } from 'react'
import Filters from '../../../Components/Search/Filters/FIlters'
import ListItem from '../../../Components/Content/List/ListItem'
import PaginationLinks from '../../Pagination/PaginationLinks'
import BaseComponent from '../../BaseComponent'
import userModel from '../../../ApiManager/user'
import Loading from '../../../Components/Loaders/Loading'

class Models extends BaseComponent {
    constructor(){
        super()
        this.state = {
            loading:true,
            models: [],
            links:{},
            meta: {},
            page:1,
            category:null,
            ethnicity:null,
            language:null,
            orientation:null,
            sort:null
        }
    }

    setPageNumber = (pageNumber) => {
        this.setState({page:pageNumber,loading:true});
    }

    setCategory = (category) => {
        this.setState({category:category,page:1,loading:true});
    }

    setEthnicity = (ethnicity) => {
        this.setState({ethnicity:ethnicity,page:1,loading:true});
    }

    setLanguage = (language) => {
        this.setState({language:language,page:1,loading:true});
    }

    setOrientation = (orientation) => {
        this.setState({orientation:orientation,page:1,loading:true});
    }

    clearFilters = () => {
        this.setState({language:null,category:null, ethnicity:null, page:1, loading:true});
    }

    setSorting = (event) => {
        this.setState({sort:event.target.value,page:1,loading:true});
    }

    fetchUsers = () => {
        let params = {page:this.state.page};
        if(this.state.category){
            params['category'] = this.state.category;
        }
        if(this.state.ethnicity){
            params['ethnicity'] = this.state.ethnicity;
        }
        if(this.state.language){
            params['language'] = this.state.language;
        }
        if(this.state.orientation){
            params['orientation'] = this.state.orientation;
        }
        if(this.state.sort){
            params['sort'] = this.state.sort;
        }

        userModel.getUsers({params:params})
            .then( response => {
                this.setState({
                    ...this.state,
                    loading:false,
                    models: response.data.data,
                    links: response.data.links,
                    meta: response.data.meta
                })
            })
            .catch((error) => { 
                this.showMessage(error)
            });
    }

    componentDidMount(){
        this.fetchUsers()
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.page !== this.state.page || 
            prevState.category !== this.state.category || 
            prevState.ethnicity !== this.state.ethnicity ||
            prevState.language !== this.state.language ||
            prevState.orientation !== this.state.orientation ||
            prevState.sort !== this.state.sort
        ) {
            this.fetchUsers()
        }        
    }

    render(){
        return (
            (this.state.loading) ? <Loading /> : 
            <section className="ds page_models models_square gorizontal_padding section_padding_70 columns_padding_0">
				<div className="container-fluid">
                    <Filters 
                        setCategory={this.setCategory}  
                        setEthnicity={this.setEthnicity}  
                        setLanguage={this.setLanguage} 
                        setSorting={this.setSorting}
                        clearFilters={this.clearFilters} 
                        setOrientation={this.setOrientation}
                    />

					<div className="isotope_container isotope row masonry-layout bottommargin_20" data-filters=".isotope_filters">
                        {
                            this.state.models.map(model => {
                                return <ListItem key={model.id}  {...model} />
                            })    
                        }
                    </div>
                    <PaginationLinks links={this.state.links} meta={this.state.meta} clickEvent={this.setPageNumber} />
                </div>
			</section>
        )
    }
}

export default Models;