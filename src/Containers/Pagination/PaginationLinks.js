import React, { Component } from 'react'
import BaseComponent  from '../BaseComponent'
import Pagination from "react-js-pagination";
import Constants from '../../Config/Constants'

class PaginationLinks extends BaseComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            activePage: props.meta.current_page
        };
    }
    
    
    render() {
        return (
            (this.props.meta.total <= this.props.meta.per_page) ? '' : 
            <div className="row">
                <div className="col-sm-12 text-center margin_0">
                    <Pagination
                        hideFirstLastPages
                        hideDisabled
                        activePage={this.props.meta.current_page}
                        itemsCountPerPage={Constants.pagination.recordPerPage}
                        totalItemsCount={this.props.meta.total}
                        pageRangeDisplayed={Constants.pagination.pageRangeDisplayed}
                        onChange={this.props.clickEvent.bind(this)}
                    />
                </div>
            </div>
        )
    }    
}

export default PaginationLinks