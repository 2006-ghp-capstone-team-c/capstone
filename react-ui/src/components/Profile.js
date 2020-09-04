import React, { Component } from "react";
import { connect } from "react-redux";
import UploadProofOfIdentity from "./UploadProofOfIdentity";
import ReactModal from "react-modal";
import ProofOfIdentity from "./ProofOfIdentity";
import { Link } from "react-router-dom";
import { fetchDocuments } from "../redux/documents";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showUploadModal: false,
    };
    this.openUploadModal = this.openUploadModal.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.fetchDocuments();
  }

  openUploadModal() {
    this.setState({ showUploadModal: true });
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  render() {
    const { firstName, lastName, email } = this.props.currentUser;
    const { documents } = this.props;
    if (!documents) {
      return "No Documents";
    }
    return (
      <div className="loginSignup">
        <h1>User Profile</h1>
        <h4>
          Name: {firstName} {lastName}
        </h4>
        <h4>Email: {email}</h4>

        {documents.map((doc) => {
          const { type, id, imageUrl, description } = doc;
          return (
            <div key={id}>
              {type === "Proof of Identity" && (
                <ProofOfIdentity
                  id={id}
                  imageUrl={imageUrl}
                  description={description}
                />
              )}
            </div>
          );
        })}

        <Link to="#" onClick={() => this.openUploadModal()}>
          Upload your insurance card and ID card here.
        </Link>
        <div className="popup">
          <ReactModal
            isOpen={this.state.showUploadModal}
            contentLabel="Upload Documents"
          >
            <button className="close" onClick={() => this.closeUploadModal()}>
              X
            </button>
            <UploadProofOfIdentity closeUploadModal={this.closeUploadModal} />
          </ReactModal>
        </div>
        <Link to="documents">Upload your medical documents here.</Link>
      </div>
    );
  }
}

const mapState = ({ currentUser, documents }) => ({ currentUser, documents });


const mapDispatch = { fetchDocuments }

export default connect(mapState, mapDispatch)(Profile);
