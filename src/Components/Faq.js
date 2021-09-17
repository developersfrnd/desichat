import React, { useEffect, useState } from 'react'
import { getFaqs } from '../ApiManager/faq'

function Faq() {
	const [faqs, setFaqs] = useState([])
	useEffect(() => {
		getFaqs().then(res=>{
			setFaqs(res.data.data)
		})
	}, [])
    return (
        <section className="ds section_padding_70 section_padding_bottom_50">
				<div className="container">
					<div className="row bottommargin_20">
						<div className="col-sm-12 text-center">
							<h2 className="big topmargin_0 bottommargin_40">
								Got Questions? We've Got Answers!
							</h2>
							
						</div>
					</div>

					<div className="row">

						<div className="col-sm-12">
							<div className="panel-group" id="accordion1">
								{faqs.map((faq, index) => (
									<div className="panel panel-default" key={faq.id}>
										<div className="panel-heading">
											<h4 className="panel-title">
												<a data-toggle="collapse" data-parent="#accordion1" href={"#collapse"+faq.id} className={(index == 0)?"":"collapsed"}>
													<i className="rt-icon2-bubble highlight"></i>
													{faq.question}
												</a>
											</h4>
										</div>
										<div id={"collapse"+faq.id} className={(index == 0)?"panel-collapse collapse in":"panel-collapse collapse"}>
											<div className="panel-body" dangerouslySetInnerHTML={{ __html: faq.answer }}>
											</div>
										</div>
									</div>
								))}

							</div>
						</div>
					</div>

				</div>
			</section>
    )
}

export default Faq
