import React from "react";
import { connect } from "react-redux";
import { getAllDoctorsThunk, addDoctorThunk } from "../redux/doctors";
import { fetchSingleDoctor } from "../redux/singleDoctor";
import { AddDoctor } from "./AddDoctor";
import ReactModal from "react-modal";
import SingleDoctor from "./SingleDoctor";
import { getAppointmentThunk } from "../redux/dcDoctor";

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };

export class AllDoctors extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDocModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.openDocModal = this.openDocModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDocModal = this.closeDocModal.bind(this);
  }
  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.getAllDoctors();
  }

  openModal() {
    this.setState({ showModal: true });
  }

  openDocModal(id) {
    this.setState({ showDocModal: true });
    this.props.fetchSingleDoctor(id);
    this.props.getAppointments();
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  closeDocModal() {
    this.setState({ showDocModal: false });
  }

  render() {
    const doctors = this.props.doctors;
    return (
      <div className="main">
        <div className="column">
          <h3>My Doctors</h3>
          <div className="scroll">
            {doctors &&
              doctors.map((doctor) => {
                return (
                  <div className="listItem" key={doctor.id}>
                    <button
                      className="bigButton"
                      onClick={() => this.openDocModal(doctor.id)}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </button>
                    <ReactModal
                      isOpen={this.state.showDocModal}
                      contentLabel="Single Document"
                    >
                      <SingleDoctor closeTheModal={this.closeDocModal} />
                      <button onClick={this.closeDocModal}>close</button>
                    </ReactModal>
                  </div>
                );
              })}
          </div>
          <button onClick={this.openModal}>Add a Doctor</button>
        </div>
        <div className="column">
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Example Modal"
          >
            <AddDoctor
              currentUser={this.props.currentUser}
              addNewDoctor={this.props.addNewDoctor}
            />

            <button onClick={this.closeModal}>Close</button>
          </ReactModal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    doctor: state.doctor,
    doctors: state.doctors,
    currentUser: state.currentUser,
    appointment: state.appointment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(getAllDoctorsThunk()),
    addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
    fetchSingleDoctor: (id) => dispatch(fetchSingleDoctor(id)),
    getAppointments: () => dispatch(getAppointmentThunk()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
