import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

class ShowProfileID extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {},
      posts: [],
      profiles: []
    };
  }

  componentDidMount() {
    // TODO
    // GET profiles & map (p)
    //      If this.props.post account id = profile (p) account id
    //              Set the STATES for each field using that p.accountid
    /* axios
      .get(`/profile/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ profile: res.data });
      })
      .catch(err => console.log(err));
*/

    axios
      .get("/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => console.log(err));

    axios.get(`/profile/${this.props.post.profileId}`).then(res => {
      this.setState({ profile: res.data });
    });
  }

  render() {
    const { profile } = this.state;

    return (
      <div className="container pt-5">
        <div>
          <div className="fb-profile">
            <img
              align="left"
              className="fb-image-lg"
              src={`${profile.bgPic}`}
            />

            <img
              align="left"
              style={{
                width: "200px",
                height: "200px",
                borderColor: "white"
              }}
              src={`${profile.profilePic}`}
              className="rounded-circle fb-image-profile thumbnail"
            />
            <div className="pl-2">
              <div className="fb-profile-text">
                <p className="font-weight-bold">{profile.fullname}</p>
                <p className="lead pt-2 pb-1">{profile.bioInfo}</p>
              </div>
            </div>
          </div>

          <hr className="mt-5 pb-2" />

          <p className="text-center">
            {profile.facebook != null ? (
              <a className="fb-ic" href={`${profile.facebook}`} target="_blank">
                <i className="fab fa-facebook-f fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>
            ) : null}

            {profile.instagram != null ? (
              <a
                className="ig-ic"
                href={`${profile.instagram}`}
                target="_blank"
              >
                <i className="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>
            ) : null}

            {profile.linkedin != null ? (
              <a className="li-ic" href={`${profile.linkedin}`} target="_blank">
                <i className="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>
            ) : null}

            {profile.github != null ? (
              <a className="gh-ic" href={`${profile.github}`} target="_blank">
                <i className="fab fa-github fa-lg white-text mr-md-5 mr-3 fa-2x">
                  {" "}
                </i>
              </a>
            ) : null}
          </p>
        </div>

        <hr className="pt-2" />
        <h2 className="font-weight-bold pt-1 pb-3">
          {profile.fullname}'s article feed:
        </h2>

        {this.state.posts.map(p => (
          <div>
            {this.state.posts.length == undefined ? (
              <p className="lead pt-5 pb-3">This user has no posts!</p>
            ) : (
              <div>
                {profile.id == p.accountId ? (
                  <div>
                    <Link to={`/show/${p.id}`}>
                      <img
                        style={{
                          width: "100%",
                          height: "500px",
                          display: "block"
                        }}
                        className="mr-auto ml-auto"
                        src={`${p.imageURL}`}
                        alt=""
                      />
                    </Link>
                    <h3 className="font-weight-bold pt-2">{p.title}</h3>
                    <p className="lead pt-1">{p.subTitle}</p>
                    <p className="text-muted pt-3">Created by: {p.name}</p>
                    <hr className="pt-2 pb-3" />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

ShowProfileID.propTypes = {
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  post: state.post
});

export default connect(mapStateToProps)(ShowProfileID);