import './modal.css'
import React from "react";

var db = [];

for (var i=0; i<25; i++) {
    db.push(
        {
            seatNo: i+1,
            name: null,
            phoneNo: null,
            timeStamp: null, 
        }
    )
}

const dummyPassenger = {
    seatNo: 1, 
    name: "Dummy",
    phoneNo: "Dummy",
    timeStamp: "Dummy",
}

class PassengerRow extends React.Component {
    render() {
        const passenger = this.props.passenger;
        return(
            <tr className="modalTableRow">
                <td className="modalTableCell">{passenger.seatNo}</td>
                <td className="modalTableCell">{passenger.name}</td>
                <td className="modalTableCell">{passenger.phoneNo}</td>
                <td className="modalTableCell">{passenger.timeStamp}</td>
            </tr>
        );
    }
}

class PassengerTable extends React.Component {
    render() {
            const passengerRows = this.props.passengers.map(passenger =>
                <PassengerRow key={passenger.seatNo} passenger={passenger}/>
        );
        return (
            <table className="bordered-table">
            <thead>
                <tr>
                <th>Seat No</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Time Stamp</th>
                </tr>
            </thead>
            <tbody>
                {passengerRows}
            </tbody>
            </table>            
        )
    }
}

class DisplayHomePage extends React.Component {
    render() {
        return(
            <div>{this.props.displayTitle}</div>
        );
    }
}

class AddTraveller extends React.Component {
    constructor() {
        super();
        this.handleAdd = this.handleAdd.bind(this)
    }

    handleAdd(e) {
        e.preventDefault()
        const form = document.forms.addPassenger;
        const passenger = {
            seatNo:     form.seatNo.value,
            name:       form.passengerName.value,
            phoneNo:    form.passengerPhoneNo.value,
        }
        this.props.createPassenger(passenger)
        form.seatNo.value = "";
        form.passengerName.value = "";
        form.passengerPhoneNo.value = "";
    }
    render() {
        return(
            <form name="addPassenger" onSubmit={this.handleAdd} className="form">
                <input type="text" name="seatNo" placeholder="Seat No" className="input"/>
                <input type="text" name="passengerName" placeholder="Passenger Name" className="input"/>
                <input type="text" name="passengerPhoneNo" placeholder="Passenger Phone No" className="input"/>
                <button>Add</button>
            </form>
        );
    }
}

class DeleteTraveller extends React.Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(e) {
        e.preventDefault()
        const form = document.forms.deletePassenger;
        const passenger = {
            seatNo:     form.seatNo.value
        }      
        this.props.deletePassenger(passenger)
        form.seatNo.value = "";
    }

    render() {
        return(
            <form name="deletePassenger" onSubmit={this.handleDelete} className="form">
                <input type="text" name="seatNo" placeholder="Seat No" className="input"/>
                <button>Delete</button>
            </form>
        );
    }
}


class DisplayMessage extends React.Component {
    render() {
        return(
            <table>
                <thead><tr><th>{this.props.message}</th></tr></thead>
            </table>
        );
    }
}

class Dashboard extends React.Component {
    render() {             
            const passengerRows = this.props.passengers.map(passenger => 
                <PassengerRow key={passenger.seatNo} passenger={passenger}/>)
        return(
            <main>
                <Modal show={this.props.show} handleClose={this.props.hideModal}>
                    <table className="bordered-table">
                        <thead>
                            <tr>
                            <th>Seat No</th>
                            <th>Name</th>
                            <th>Phone No</th>
                            <th>Time Stamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passengerRows}
                        </tbody>
                    </table>    
                </Modal>
                <div className="button-container">
                    <button type="button" onClick={this.props.showModal} className="display-travellers-button">Display Travellers</button>
                </div>
            </main>
        )
    }
} 

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className = {showHideClassName}>
            <section className="modal-main">
                {children}
                <div className="modal-close-button-section">
                    <button type="button" onClick={handleClose} className="modal-close-button">
                        Close
                    </button>
                </div>
            </section>
        </div>
    );
};

class SeatMap extends React.Component {
    render() {
        const passengerRow1 = this.props.passengers.slice(0,5).map(passenger => 
            <MapCell key={passenger.seatNo} passenger={passenger}/>)
        
        const passengerRow2 = this.props.passengers.slice(5,10).map(passenger => 
            <MapCell key={passenger.seatNo} passenger={passenger}/>)

        const passengerRow3 = this.props.passengers.slice(10,15).map(passenger => 
            <MapCell key={passenger.seatNo} passenger={passenger}/>)

        const passengerRow4 = this.props.passengers.slice(15,20).map(passenger => 
            <MapCell key={passenger.seatNo} passenger={passenger}/>)
        
        const passengerRow5 = this.props.passengers.slice(20,25).map(passenger => 
            <MapCell key={passenger.seatNo} passenger={passenger}/>)
        return(
            <table className="bordered-table seatmap-table">
            <thead>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td className="empty tableCell">Free</td>
                    <td></td>
                    <td className="taken tableCell">Occupied</td>
                </tr>
                <tr>{passengerRow1}</tr>
                <tr>{passengerRow2}</tr>
                <tr>{passengerRow3}</tr>
                <tr>{passengerRow4}</tr>
                <tr>{passengerRow5}</tr>

            </tbody>
        </table>    
        )
    }
}

class MapCell extends React.Component {
    render() {
        const passenger = this.props.passenger;
        return(
            <td className={((passenger.name) ? "taken " : "empty ") + "tableCell"}>{passenger.seatNo}</td>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = { 
            passengers: [],
            show: false,
            count: 0,
            message: "Welcome"
            };
        this.createPassenger = this.createPassenger.bind(this);
        this.deletePassenger = this.deletePassenger.bind(this);
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
            this.setState({ 
                passengers: db,
                show: false,
                count: 0,
                message: "Welcome"
                });
        }, 500); 
    }

    createPassenger(passenger) {
        let newcount = this.state.count;
        const newpassengers = this.state.passengers.slice();
        var message = "";
        var regExp = new RegExp("/^\d+$/");
        console.log(parseInt(passenger.seatNo))

        if (newcount >= 24) {
            message = "No more seats available."
        } else if ((parseInt(passenger.seatNo) <= 0) || (parseInt(passenger.seatNo) > 25) || (regExp.test(passenger.seatNo))) {
            message = "Invalid seat number."
        } else if ((!passenger.seatNo) || (!passenger.name) || (!passenger.phoneNo)) {
            message = "Please fill up all fields."
        } else if (newpassengers[passenger.seatNo-1].name) {
            message = `Seat ${passenger.seatNo} has been taken. Please select another seat.`
        } else {
            passenger.timeStamp = new Date();
            newcount += 1;
            newpassengers[passenger.seatNo-1].name = passenger.name;
            newpassengers[passenger.seatNo-1].phoneNo = passenger.phoneNo;
            newpassengers[passenger.seatNo-1].timeStamp = passenger.timeStamp.toDateString();
            message = `Seat ${passenger.seatNo} has been booked for ${passenger.name}.`
        }

        this.setState({ passengers: newpassengers, count: newcount, message: message })
        //console.log(this.state.count, newcount)
    }

    deletePassenger(passenger) {
        const newpassengers = this.state.passengers.slice();
        let newcount = this.state.count;
        var message = "";
        var regExp = new RegExp("^\\d+$");
        // did I catch the null? 
        console.log(passenger.seatNo)
        if (!regExp.test(passenger.seatNo) || (parseInt(passenger.seatNo) <= 0) || (parseInt(passenger.seatNo) > 25)) {
            message = "Invalid input provided."
        } else if ((passenger.seatNo == null) || (passenger.seatNo == "")) {
            message = "No input provided."
        } else if (newpassengers[passenger.seatNo-1].name == null) {
            message = `No passenger at ${passenger.seatNo}.`
        } else {
            newcount -= newcount;
            message = "Passenger deleted."
            newpassengers[passenger.seatNo-1].name = null;
            newpassengers[passenger.seatNo-1].phoneNo = null;
            newpassengers[passenger.seatNo-1].timeStamp = null;
        }

        this.setState({ passengers: newpassengers, count: newcount, message: message })
    }

    showModal = () => {
        this.setState((prevState) => {
            return{
                passengers: prevState.passengers,
                show: true,
                count: prevState.count,
                message: prevState.message
            }
        })
    };

    hideModal = () => {
        this.setState((prevState) => {
            return{
                passengers: prevState.passengers,
                show: false,
                count: prevState.count,
                message: prevState.message
            }
        })    
    }
    
    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <h1>HSR Booking System</h1>
                <DisplayMessage message={this.state.message}/>
                <hr />
                <AddTraveller createPassenger={this.createPassenger} show={this.state.show} showModal={this.showModal} hideModal={this.hideModal} message={this.state.message}/>
                <DeleteTraveller deletePassenger={this.deletePassenger} show={this.state.show} showModal={this.showModal} hideModal={this.hideModal} message={this.state.message}/>
                <hr/>
                {/*<PassengerTable passengers={this.state.passengers}/>*/}
                <Dashboard show={this.state.show} showModal={this.showModal} hideModal={this.hideModal} passengers={this.state.passengers}/>
                <hr />
                <SeatMap passengers={this.state.passengers}/>
            </React.Fragment>
        )
    }
}

export default App;