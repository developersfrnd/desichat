import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import PageHeader from './Components/Content/Header'
import Search from './Components/Search/Search'
import PageTopLine from './Components/Content/Sections/PageTopLine';
import Copyright from './Components/Content/Sections/Copyright'
import PageRoutes from './Containers/PageRoutes';
import { AppContext } from './Context';
import BaseComponent from './Containers/BaseComponent';
import Flash from './Components/Shared/Flash';

class App extends BaseComponent {

  static contextType = AppContext;

  constructor(){
    super();
    this.state = {
      authUser: null,
      redirect:null,
      flashMessage:null
    }

    this.handleEvent = this.handleEvent.bind(this)
  }

  handleEvent = (newState = this.state) => {
    this.setState(newState)
  }

  render() {

    const contextValue = {
      stateData: this.state,
      handleEvent: this.handleEvent,
    }


    return (
      <BrowserRouter>
          <AppContext.Provider value={contextValue}>
            <BaseComponent>
              <Search />
                  <div id="canvas">
                      <div id="box_wrapper">
                          <PageTopLine />
                          <PageHeader />
                          <Flash />
                          <PageRoutes />
                          <Copyright />
                      </div>
                    </div>
              </BaseComponent>  
            </AppContext.Provider>
      </BrowserRouter>  
    );
  }
}

export default App;
