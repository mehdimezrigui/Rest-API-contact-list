import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ContactList from "./ContactList";
import Addcontact from "./Addcontact";
import "./App.css";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      add: false
    };
  }
  getId = (id, add) => {
    this.setState({ id, add });
  };
  add= (add) => {
    this.setState({
      add
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to="/">
              <h1>Contact List</h1>
            </Link>
            <Link to="/contact">
              <button>Contact List</button>
            </Link>
            <Link to="/add_contact/">
              <button onClick={()=>this.getId("",true)}>Add Contact</button>
            </Link>
          </div>
          <Route path="/" />
          <Route
            path="/contact"
            render={() => <ContactList getId={this.getId} />}
          />
          <Route
            path="/(add_contact|modify_contact)/"
            render={() => <Addcontact id={this.state.id} add={this.state.add}/>}
          />
        </div>
      </Router>
    );
  }
}

export default App;
