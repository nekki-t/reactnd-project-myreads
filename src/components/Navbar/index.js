import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';

import {URL, NAV_TAB_INDEX} from '../../constants';


class Navbar extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedTab: NAV_TAB_INDEX.CURRENT,
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setDefaultTabFromUrl();
  }

  setDefaultTabFromUrl = () => {
    let url = window.location.href;
    if(url.indexOf(URL.CURRENT) > -1) {
      this.setState({selectedTab: NAV_TAB_INDEX.CURRENT});
    } else if (url.indexOf(URL.WANT) > -1) {
      this.setState({selectedTab: NAV_TAB_INDEX.WANT});
    } else if (url.indexOf(URL.READ) > -1) {
      this.setState({selectedTab: NAV_TAB_INDEX.READ});
    } else {
      this.setState({selectedTab: NAV_TAB_INDEX.CURRENT});
    }
  };

  changeTab = (value) => {
    this.setState({selectedTab: value});
  };

  render() {
    return (
      <Tabs onChange={this.changeTab} value={this.state.selectedTab}>
        <Tab
          value={NAV_TAB_INDEX.CURRENT}
          label="Currently Reading"
          containerElement={<Link to={URL.CURRENT}/>}
        >
        </Tab>
        <Tab
          value={NAV_TAB_INDEX.WANT}
          label="Want to Read"
          containerElement={<Link to={URL.WANT}/>}
        >
        </Tab>
        <Tab
          value={NAV_TAB_INDEX.READ}
          label="Read"
          containerElement={<Link to={URL.READ}/>}
        >
        </Tab>
      </Tabs>    );
  }
}

export default Navbar;