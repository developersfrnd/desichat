import React from 'react';
import List from './List/List'
import AddStrip from './Sections/AddStrip'
import About from './About'
import WantToBeAModel from './Sections/WantToBeAModel'
import Aux from '../../hoc/Aux';
import Models from '../../../src/Containers/Lists/Models/Models'

const home = () => {
    return (
        <Aux>

            <Models />
            <AddStrip />
            <About />
            <WantToBeAModel />
        </Aux>
    )
}

export default home;