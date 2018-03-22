import React, { Component } from 'react';
import {searchContact,clearSearch} from '../actions/index';

class Search extends Component{
    constructor(props){
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
            
    }
    handleSearch = (event) => {
        if(event.target.value === ''){
            this.props.clearSearch()
        }
        this.props.searchContact(event.target.value);     
    }


    render(){
        return(
            <div className="search"> 
            <input 
                type="text"
                onChange={this.handleSearch}
                placeholder="Search Contacts"
            />
            </div>
        )
    }
}
export default Search;