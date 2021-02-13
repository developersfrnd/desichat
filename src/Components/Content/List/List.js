import React from 'react';
import ListItem from './ListItem'
import Filters from '../../Search/Filters/FIlters'


const modelList = () => {
    return (
        <section className="ds page_models models_square gorizontal_padding section_padding_70 columns_padding_0">
				<div className="container-fluid">
					<div className="row bottommargin_50 boxed-padding">
						<Filters />
						<div className="col-lg-3 text-lg-right">
							<form className="form-inline models-orderby">
								<div className="form-group select-group">
									<label className="sr-only" htmlFor="orderby">Sort By:</label>
									<select className="form-control orderby" name="orderby" id="orderby">
										<option value="default" selected="">Default sorting</option>
										<option value="name">Sort by name</option>
										<option value="date">Sort by age</option>
										<option value="date">Sort by location</option>
									
									</select>
									<i className="rt-icon2-chevron-thin-down form-button"></i>
								</div>

							</form>
						</div>
					</div>

					<div className="isotope_container isotope row masonry-layout bottommargin_20" data-filters=".isotope_filters">
                        <ListItem />
					</div>

					<div className="row">
						<div className="col-sm-12 text-center margin_0">
							<ul className="pagination ">
								<li>
									<a href="#">
										<span className="sr-only">Prev</span>
										<i className="rt-icon2-chevron-thin-left"></i>
									</a>
								</li>
								<li className="active">
									<a href="#">1</a>
								</li>
								<li>
									<a href="#">2</a>
								</li>
								<li>
									<a href="#">3</a>
								</li>
								<li>
									<a href="#">4</a>
								</li>
								<li>
									<a href="#">5</a>
								</li>
								<li>
									<a href="#">
										<span className="sr-only">Next</span>
										<i className="rt-icon2-chevron-thin-right"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>

				</div>
			</section>
    )
}

export default modelList;