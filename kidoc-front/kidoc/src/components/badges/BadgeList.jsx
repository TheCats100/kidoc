import React from 'react';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Axios from 'axios';

import closeIcon from '../../icon/closeicon.png'
import arrowBack from '../../icon/arrowback.png'
// import Anniversaire from '../../icon/badges/Anniversaire.png';
// import Inscription from '../../icon/badges/Inscription.png';
// import Liste1 from '../../icon/badges/Liste1.png';
// import Liste2 from '../../icon/badges/Liste2.png';
// import Liste3 from '../../icon/badges/Liste3.png';
// import Niveau1 from '../../icon/badges/Niveau1.png';
// import Niveau2 from '../../icon/badges/Niveau2.png';
// import Niveau3 from '../../icon/badges/Niveau3.png';
// import Niveau4 from '../../icon/badges/Niveau4.png';
// import Niveau5 from '../../icon/badges/Niveau5.png';
// import OnTime from '../../icon/badges/OnTime.png';

import './badges.css'
class BadgeList extends React.Component {
  constructor() {
    super();
    this.state = {
      badges: [],
      myBadges: [],
      id_child: 2
    };
    this.getAllBadges = this.getAllBadges.bind(this);
    this.getMyBadges = this.getMyBadges.bind(this);
  };

  componentDidMount() {
    this.getAllBadges();
    this.getMyBadges();
  }

  getAllBadges = () => {
    const url = 'http://localhost:8000/badges'
    Axios.get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          badges: data
        });
      });
  };

  getMyBadges = () => {
    const { id_child } = this.state
    const url = `http://localhost:8000/children_badges/${id_child}`
    Axios.get(url)
      .then((response) => response.data)
      .then((data) => this.setState({ myBadges: data}))
  };

  render() {
    const { badges, myBadges } = this.state;
    return (
      <>
        <Link to="/">
          <img alt="arrow back" className="badgeArrowBack" src={arrowBack}/>
        </Link>
        <h1 className="badgeTitleList">My badges</h1>
        <div className="badgeList">
        {myBadges.map((myBadge) => {
          return (
            <>
              <div>
                <div onClick={() => {
                  let modalBox = document.getElementById(myBadge.title);
                  modalBox.style.display = "block"
                }}>
                  <img className="badgeListImg" alt={myBadge.title} src={myBadge.path} />
                </div>


                <div id={myBadge.title} className="badgeModal">
                  <div className="badgeModalBack">

                    <p className="badgeListTitle">
                      {myBadge.title}
                    </p>
                    <p>{myBadge.description}</p>

                    <div onClick={() => {
                      let modalBox = document.getElementById(myBadge.title);
                      modalBox.style.display = "none"
                    }}>
                      <img className="badgeModalClose" alt="close button" src={closeIcon} />
                    </div>

                  </div>
                </div>
              </div>
            </>
          )
        })}
        </div>
        <h1 className="badgeTitleList">All badges</h1>
        <div className="badgeList">
          {badges.map((badge) => {
            return (
              <>
                <div>
                  <div onClick={() => {
                    let modalBox = document.getElementById(badge.title);
                    modalBox.style.display = "block"
                  }}>
                    <img className="badgeListImg" alt={badge.title} src={badge.path} />
                  </div>


                  <div id={badge.title} className="badgeModal">
                    <div className="badgeModalBack">

                      <p className="badgeListTitle">
                        {badge.title}
                      </p>
                      <p>{badge.description}</p>

                      <div onClick={() => {
                        let modalBox = document.getElementById(badge.title);
                        modalBox.style.display = "none"
                      }}>
                        <img className="badgeModalClose" alt="close button" src={closeIcon} />
                      </div>

                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
      </>
    );
  };
};

export default BadgeList;
