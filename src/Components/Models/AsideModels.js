import React from 'react'
import { Link } from 'react-router-dom';

const dummyModels = [
    {
        id: 24,
        creditPoints: 0,
        role: 1,
        name: "Rekhaa",
        email: "rakshaasingh45@gmail.com",
        phone: "9044899868",
        emailVerified: 0,
        dob: "1990-02-24",
        age: 31,
        gender: 0,
        profilePicture: "http://localhost:3001/img/no-image.jpg",
        address: "kanpur",
        city: "kanpur",
        state: "u.p.",
        country: "India",
        zipcode: "208014",
        categories: null,
        languages: null,
        languagesArr: [],
        categoriesArr: [],
        body: null,
        ethnicity: null,
        speaking: null,
        ethnicityResource: null,
        weight: null,
        height: null,
        hairColor: null,
        hairLength: null,
        eyeColor: null,
        orientation: null,
        isProfilePublished: 1,
        status: 1,
        room: "9d282406-71ce-49c1-88ff-ae67c8a77367",
        is_online: 1,
        created_at: "2021-02-22 03:54:02",
        updated_at: "2021-02-24 13:26:43",
    }, {
        id: 24,
        creditPoints: 0,
        role: 1,
        name: "Rekhaa",
        email: "rakshaasingh45@gmail.com",
        phone: "9044899868",
        emailVerified: 0,
        dob: "1990-02-24",
        age: 31,
        gender: 0,
        profilePicture: "http://localhost:3001/img/no-image.jpg",
        address: "kanpur",
        city: "kanpur",
        state: "u.p.",
        country: "India",
        zipcode: "208014",
        categories: null,
        languages: null,
        languagesArr: [],
        categoriesArr: [],
        body: null,
        ethnicity: null,
        speaking: null,
        ethnicityResource: null,
        weight: null,
        height: null,
        hairColor: null,
        hairLength: null,
        eyeColor: null,
        orientation: null,
        isProfilePublished: 1,
        status: 1,
        room: "9d282406-71ce-49c1-88ff-ae67c8a77367",
        is_online: 1,
        created_at: "2021-02-22 03:54:02",
        updated_at: "2021-02-24 13:26:43",
    },
    {
        id: 24,
        creditPoints: 0,
        role: 1,
        name: "Rekhaa",
        email: "rakshaasingh45@gmail.com",
        phone: "9044899868",
        emailVerified: 0,
        dob: "1990-02-24",
        age: 31,
        gender: 0,
        profilePicture: "http://localhost:3001/img/no-image.jpg",
        address: "kanpur",
        city: "kanpur",
        state: "u.p.",
        country: "India",
        zipcode: "208014",
        categories: null,
        languages: null,
        languagesArr: [],
        categoriesArr: [],
        body: null,
        ethnicity: null,
        speaking: null,
        ethnicityResource: null,
        weight: null,
        height: null,
        hairColor: null,
        hairLength: null,
        eyeColor: null,
        orientation: null,
        isProfilePublished: 1,
        status: 1,
        room: "9d282406-71ce-49c1-88ff-ae67c8a77367",
        is_online: 1,
        created_at: "2021-02-22 03:54:02",
        updated_at: "2021-02-24 13:26:43",
    }, {
        id: 24,
        creditPoints: 0,
        role: 1,
        name: "Rekhaa",
        email: "rakshaasingh45@gmail.com",
        phone: "9044899868",
        emailVerified: 0,
        dob: "1990-02-24",
        age: 31,
        gender: 0,
        profilePicture: "http://localhost:3001/img/no-image.jpg",
        address: "kanpur",
        city: "kanpur",
        state: "u.p.",
        country: "India",
        zipcode: "208014",
        categories: null,
        languages: null,
        languagesArr: [],
        categoriesArr: [],
        body: null,
        ethnicity: null,
        speaking: null,
        ethnicityResource: null,
        weight: null,
        height: null,
        hairColor: null,
        hairLength: null,
        eyeColor: null,
        orientation: null,
        isProfilePublished: 1,
        status: 1,
        room: "9d282406-71ce-49c1-88ff-ae67c8a77367",
        is_online: 1,
        created_at: "2021-02-22 03:54:02",
        updated_at: "2021-02-24 13:26:43",
    }
];

const aside = () => {
    return (
        <aside>
            <div className="with_background with_padding models_square">
                <div className="widget widget_popular_entries">
                    <h3 className="widget-title">Similar Models</h3>
                    {
                        dummyModels.map(model => {
                            return (<div className="isotope-item fashion">
                                <div className="vertical-item content-absolute">
                                    <div className="item-media">
                                        <img src={model.profilePicture} alt="" />
                                        <div className="media-links"></div>
                                    </div>
                                    <div className="item-content text-center before_cover cs">

                                        <div className="links-wrap">
                                            <a className="p-link" title="" href="#">
                                                {model.name} &nbsp;
                                                (
                                                    {(model.age) ? `${model.age} Yrs` : null} &nbsp;
                                                    {(model.country) ? <img src={`images/flag/${model.country}.png`} style={{ width: "10%" }} /> : null}
                                                )
                                            </a>
                                        </div>

                                        <div className="bg_overlay"></div>
                                        <div className="model-parameters">

                                            {
                                                (model.speaking) ?
                                                    <div className="iSpeak">
                                                        <span className="bold">I speak</span>
                                                        <br />
                                                        <span>
                                                            {model.speaking.map((speak) => {
                                                                let flag = `images/flag/${speak.flag}`
                                                                return <img src={flag} style={{ "width": "10%", "padding-left": "2px" }} />
                                                            })}
                                                        </span>
                                                    </div>

                                                    : null
                                            }
                                            <div className="ratingRow">
                                                <div>
                                                    <span className="bold">Rating</span>
                                                    <br />
                                                    <span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span>
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="bold">Group</span>
                                                    <br />
                                                    <span>30 Credit/min.</span>
                                                </div>
                                            </div>
                                            <div>
                                                <br />
                                                <span>
                                                    <Link to={`model/${model.id}`}>
                                                        <button type="button" className="theme_button color1">Profile</button>
                                                    </Link>
                                                </span>
                                            </div>
                                            <div>
                                                <br />
                                                <span>
                                                    {
                                                        (model.is_online) ?
                                                            <Link to={`model/${model.id}`}>
                                                                <button type="button" className="theme_button" style={{ "backgroundColor": "#4cb80e !important" }}>Free Chat</button>
                                                            </Link>
                                                            :
                                                            <Link to={`model/${model.id}`}>
                                                                <button type="button" className="theme_button" style={{ "backgroundColor": "#999999 !important" }}>Offline</button>
                                                            </Link>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        (model.is_online) ?
                                            <div className="onlineSign">
                                                Online
                                        </div>
                                            : null
                                    }
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </aside>
    )
}

export default aside