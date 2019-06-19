import React, { Component } from "react";
import axios from "axios";
export default class Addcontact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      mail: ""
    };
  }
  componentDidMount = () => {
    !this.props.add &&
      axios.get("/contact/" + this.props.id).then(res =>
      this.setState({
          ...res.data
        }) 
      )
  };

  componentWillReceiveProps = () => {
    this.setState({
        name: "",
        phone: "",
        mail: ""
      })
  }
  handelchange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onAddcontact = () => {
    axios
      .post("/add_contact", {
        name: this.state.name,
        phone: this.state.phone,
        mail: this.state.mail
      })
      .then(res => axios.get("/contact").then(res =>
        this.setState({
            ...res.data
          }) 
        ))
      .catch(err => alert(err));
    this.setState({
      add: false
    });
  };
  onEditcontact = () => {
    axios
      .put("/modify_contact/" + this.props.id, {
        name: this.state.name,
        phone: this.state.phone,
        mail: this.state.mail
      })
      .then(res => axios.get("/contact").then(res =>
        this.setState({
            ...res.data
          }) 
        ))
      .catch(err => alert(err));
  };
  render() {
   
    return (
      <div className="contactadd">
        {this.props.add ? <h3> Create new contact </h3> : <h3> Update contact </h3>}
        <div className="drop">
          <div>
            
            <label> Name: </label>
            <input
              name="name"
              type="text"
              onChange={e => this.handelchange(e)}
              value={this.state.name}
            />
          </div>
          <div>
            
            <label> Phone: </label>
            <input
              name="phone"
              type="text"
              onChange={e => this.handelchange(e)}
              value={this.state.phone}
            />
          </div>
          <div>
            
            <label> E-mail: </label>
            <input
              name="mail"
              type="text"
              onChange={e => this.handelchange(e)}
              value={this.state.mail}
            />
          </div>
          <button
            className="btnadd"
            onClick={() => {
              this.props.add ? this.onAddcontact() : this.onEditcontact();
              window.location.replace("http://localhost:3000/contact/");
            }}
          >
            
            Save
          </button>
        </div>
      </div>
    );
  }
}
