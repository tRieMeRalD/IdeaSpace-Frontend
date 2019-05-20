import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
/* import PropTypes from "prop-types";
 import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getAllPosts } from "../actions/PostAction"; */

import search from "../img/search.png";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hashtags: [],
      tags: [],
      aa: [],
      searchtags: [],
      postbytag: [],
      hashSearch: "",
      isToggleOn: false
    };

    /* this.showHash = this.showHash.bind(this); */
  }

  componentDidMount() {
    axios.get("/posts").then(res => {
      this.setState({ posts: res.data });
      console.log(this.state.posts);
    });

    axios
      .get("/hashtags")
      .then(res => {
        this.setState({ hashtags: res.data });
        console.log(this.state.hashtags);
      })
      .catch(err => console.log(err));
  }

  /* showHash() {
    const t = "";
    this.state.posts.map(p => {
      const s = p.hashtag;
      console.log(s);
      const a = s.split(",");
      t = t + a;
    });
    this.setState({ hashtags: t });
    console.log(this.state.hashtags);
  } */

  addTag = tag => {
    this.state.posts.map(p => {
      p.hashtag.split(",").map(h => {
        if (h == tag) {
          this.setState(state => ({
            isToggleOn: !state.isToggleOn,
            hashSearch: this.state.hashSearch + h + ", "
          }));
        }
      });
    });
    console.log(this.state.isToggleOn);
  };

  clearSearch() {
    this.setState({ hashSearch: "" });
  }

  onFilter() {
    var s = this.state.hashSearch;
    var a = s.split(", ");

    this.state.posts.map(p => {
      this.setState(
        { tags: this.state.tags.concat(this.state.tags.push(p.hashtag)) },
        () => console.log(this.state.tags)
      );
    });

    this.setState(
      {
        aa: this.state.aa.concat(this.state.hashSearch.split(", "))
      },
      () => console.log(this.state.aa)
    );

    /*     this.state.aa.forEach(e1 =>
      this.state.tags.forEach(t => {
        if (e1 == t) {
          this.setState(
            {
              searchtags: this.state.searchtags.concat(
                this.state.searchtags.push(t.accountId)
              )
            },
            () => console.log(this.state.searchtags)
          );
        }
      })
    ); */
  }

  onLoadFilter() {
    this.state.aa.map(a => {
      this.state.tags[0].split(", ").map(t => {
        if (a == t) {
          this.state.hashtags.map(tt => {
            if (tt.hashtags == t) {
              this.setState(
                {
                  searchtags: this.state.searchtags.concat(
                    this.state.searchtags.push(tt.accountId)
                  )
                },
                () => console.log(this.state.searchtags)
              );
            }
          });
        }
      });

      /*       for (var i = 0; i <= this.state.tags.length; i++) {
        if (a == this.state.tags[i]) {
          console.log("matches!");
          this.state.hashtags.map(tt => {
            if (tt.hashtag == this.state.tags[i]) {
              this.setState(
                {
                  searchtags: this.state.searchtags.concat(
                    this.state.searchtags.push(tt.accountId)
                  )
                },
                () => console.log(this.state.searchtags)
              );
            }
          });
        }
      } */
      /*       this.state.tags.map(t => {
        console.log(t);
        if (a == t) {
          console.log("matches!");
          this.state.hashtags.map(tt => {
            if (tt.hashtag == t) {
              this.setState(
                {
                  searchtags: this.state.searchtags.concat(
                    this.state.searchtags.push(tt.accountId)
                  )
                },
                () => console.log(this.state.searchtags)
              );
            }
          });
        }
      }); */
    });

    this.state.searchtags.map(t => {
      this.state.posts.map(p => {
        if (t == p.accountId) {
          axios
            .get(`/posts/${p.postId}`)
            .then(res => {
              this.setState(
                {
                  postbytag: this.state.postbytag.concat(res.data)
                },
                () => console.log(this.state.postbytag)
              );
            })
            .catch(err => console.log(err));
        }
      });
    });
  }

  render() {
    return (
      <div>
        <div className="container" style={{ marginBottom: "575px" }}>
          <h1 className="display-3 text-center pt-3 pb-1">
            Browse recent posts
          </h1>
          <img src={search} alt="" />
          <div className="d-flex justify-content-between">
            <div />
            <h2 className=" font-weight-bold text-center">Featured Posts</h2>

            <p>
              <a
                className="btn btn-outline-secondary"
                data-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                /* onClick={this.showHash} */
              >
                Sort by popular tags
              </a>
            </p>
          </div>
          <div className="collapse mt-4" id="collapseExample">
            <div className="card card-body border border-white">
              <p>
                {this.state.posts.map(p => (
                  <div>
                    {p.hashtag.split(",").map(h => (
                      <span
                        className={`badge badge-pill ${
                          this.state.isToggleOn ? "badge-success" : "badge-dark"
                        } btn-outline-secondary mr-3 pt-2 pb-2 mb-2`}
                        style={{ width: "10%" }}
                      >
                        <button
                          className="text-white font-weight-bold"
                          onClick={this.addTag.bind(this, h)}
                        >
                          {h}
                        </button>
                      </span>
                    ))}
                  </div>
                ))}
              </p>

              <div>
                <button
                  onClick={this.onFilter.bind(this)}
                  className="btn btn-outline-success mt-2 mb-2"
                >
                  Submit
                </button>

                <button
                  onClick={this.onLoadFilter.bind(this)}
                  className="btn btn-outline-primary mt-2 mb-2"
                >
                  Filter
                </button>

                <p className="text-muted">
                  {this.state.hashSearch == ""
                    ? "Searching for nothing!"
                    : "You are searching for: " + this.state.hashSearch}
                </p>
                <p className="text-muted">
                  Not what you are looking for?{" "}
                  <button
                    onClick={this.clearSearch.bind(this)}
                    className="text-muted text-primary"
                  >
                    <u>Restart Search.</u>
                  </button>
                </p>
              </div>
            </div>
          </div>

          {this.state.postbytag.map(p => (
            <div>
              <Link to={`/show/${p.id}`}>
                <img
                  style={{ display: "block" }}
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
          ))}
          {/* <nav className="uk-navbar-container mt-3" uk-navbar="true">
            <div className="uk-navbar-left">
              <div className="uk-navbar-item">
                <form className="uk-search uk-search-navbar">
                  <span uk-search-icon="true" />
                  <input
                    className="uk-search-input ml-3"
                    type="search"
                    placeholder="Search by tags . . ."
                  />
                </form>
              </div>
            </div>
          </nav> */}

          <hr className="pt-3 pb-4" />

          {this.state.posts.map(p => (
            <div>
              <Link to={`/show/${p.id}`}>
                <img
                  style={{ display: "block" }}
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
          ))}
        </div>
      </div>
    );
  }
}

/* Posts.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
}); */

export default Posts;
