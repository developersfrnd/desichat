import React, { useState, useEffect } from 'react';
import contentModel from '../../ApiManager/contents'

const Content = (props) => {

	const [content, setContent] = useState({title:'', description:''})
    const slug = (props.match.params && props.match.params.slug) ? props.match.params.slug : null;

    useEffect(() => {
        contentModel.getContentBySlug(slug)
            .then( res => {
                setContent({title:res.data.data.title, description:res.data.data.description});
            })
            .catch(error => {
                console.log(error);
            })
        
        
    },[slug]);

    return (
        <section className="ds section_padding_50">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
                            <h1 className="highlight">{content.title}</h1>
							<div dangerouslySetInnerHTML={{ __html: content.description }}></div>
						</div>
					</div>
				</div>
			</section>
    );
}


export default Content;