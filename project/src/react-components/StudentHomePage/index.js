import React from "react";
import {} from "react-bootstrap";
import {Link, Redirect, withRouter} from "react-router-dom";

import './styles.css'


class StudentHomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
      
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.setState({keywords: e.target.value});
    }
    

    render() {
        return (
            <div>
                <div className="search_box">
				    <label className="search_label" htmlFor="search_input">
					    <input
						    type="text"
						    value={this.state.keywords}
						    id="search_input"
                            placeholder="Search for research opportunities..."
                            onChange={this.handleChange}
					    />
					    <i className="fa fa-search search_icon"/>
				    </label>
			    </div>         
            </div>
        );
    
      }
}

export default withRouter(StudentHomePage);