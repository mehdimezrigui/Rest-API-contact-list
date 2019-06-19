import React, { Component } from "react";
import axios from "axios";
import Contact from "./Contact";
export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount = () => {
    axios
      .get("/contact")
      .then(res =>
        this.setState({
          list: res.data
        })
      )
      .catch(err => console.log("err"));
  };
  onDeleteContact=(id)=>{
      axios.delete('/delete_contact/'+id).then(res =>  axios
        .get("/contact")
        .then(res =>
          this.setState({
            list: res.data
          })
        )
        .catch(err => alert(err)))
      .catch(err => alert(err));
  }

  render() {
    return (
      <div>
        <h3>This is the contact page</h3>
        <div className="contactbody">
          {this.state.list.map(el => (
            <Contact info={el} getId={this.props.getId} del={this.onDeleteContact} />
          ))}
        </div>
      </div>
    )
  }
}
