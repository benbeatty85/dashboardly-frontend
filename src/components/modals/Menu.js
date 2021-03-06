import React, { Component } from 'react';
import { Link } from 'react-router';
import onClickOutside from 'react-onclickoutside';
import auth from '../../auth';
import './Menu.css';
import api from '../../api.js';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUrl: ""
    };
  }
  
  componentDidMount() {
    this._fetchAvatar();
  }
  
  _fetchAvatar = () => {
    api.getAvatar()
    .then(res => {
      this.setState({ avatarUrl: res.body.avatarUrl })
    })
    .catch(console.error)
  }
  handleClickOutside = () => {
    this.props.closeMenu();
  }

  render() {
    let { avatarUrl } = this.state
    let { closeMenu, show } = this.props
    const isLoggedIn = auth.isLoggedIn()
    return (
      <div className={`menu ${show?"show":""}`}>

        <div className="menu__header">
          <img src={avatarUrl} alt="profile-pic" className="menu__avatar"/>
        </div>

        <div className="menu__list">

          <Link to="/" className="menu__item" onClick={closeMenu}>
            Home
          </Link>

          {!isLoggedIn ?
            <Link to="/login" className="menu__item" onClick={closeMenu}>
              Login
            </Link>
          : null}

          {!isLoggedIn ?
            <Link to="/signup" className="menu__item" onClick={closeMenu}>
              Signup
            </Link>
          : null}

          {isLoggedIn ?
            <Link to="/logout" className="menu__item" onClick={closeMenu}>
              Logout
            </Link>
          : null}
        </div>

      </div>
    );
  }

}

export default onClickOutside(Menu);
