import React from 'react';

const searchModel = (props) => {
	return (
        <div className="modal" tabIndex="-1" role="dialog" aria-labelledby="search_modal" id="search_modal">
		<div className="widget widget_search">
			<form method="get" className="searchform form-inline" action="">
				<div className="form-group">
					<input type="text" name="search" className="form-control" placeholder="Type search keyword here..." id="modal-search-input" />
				</div>
				<button type="submit" className="theme_button input_button">Search</button>
			</form>
		</div>
	</div>
    ) 
}

export default searchModel;