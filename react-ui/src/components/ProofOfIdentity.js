import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteDocumentsThunk } from "../redux/documents";
import { fetchSingleDocument } from "../redux/singleDocument";
import ReactModal from "react-modal";
import UpdateProofOfIdentity from "./UpdateProofOfIdentity";

export class ProofOfIdentity extends Component {
  constructor() {
    super();
    this.state = {
      showUpdateModal: false,
    };
    this.openUpdateModal = this.openUpdateModal.bind(this);
    this.closeUpdateModal = this.closeUpdateModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement("body");
  }

  openUpdateModal(id) {
    this.setState({ showUpdateModal: true });
    this.props.fetchSingleDocument(id);
  }

  closeUpdateModal() {
    this.setState({ showUpdateModal: false });
  }

  render() {
    const { deleteDocumentsThunk, imageUrl, description, id } = this.props;

    return (
      <div>
        <img src={imageUrl} alt="Proof of Identity" width="25%" height="25%" />
        <p>{`This is my ${description}`}</p>
        <button onClick={() => this.openUpdateModal(id)}>
          Update My Document
        </button>
        <ReactModal
          isOpen={this.state.showUpdateModal}
          contentLabel="Update Document"
          className="popup"
        >
          <button className="close" onClick={() => this.closeUpdateModal()}>
            X
          </button>
          <UpdateProofOfIdentity
            id={id}
            closeUpdateModal={this.closeUpdateModal}
            description={description}
            imageUrl={imageUrl}
          />
        </ReactModal>
        <button onClick={() => deleteDocumentsThunk(id)}>
          Delete My Document
        </button>
      </div>
    );
  }
}

const mapDispatch = { deleteDocumentsThunk, fetchSingleDocument };

export default connect(null, mapDispatch)(ProofOfIdentity);
