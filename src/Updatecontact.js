import React, { Component } from 'react'
import axios from 'axios';
export default class Updatecontact extends Component {
    constructor(props){
        super()
        this.state={
            name:"",
            phone:"",
            mail:""
        }
    }
    handelchange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }  
    componentDidMount=()=>{
        axios.get('/contact/'+ this.props.id ).then(res => this.setState({
            ...res.data
        }))
    }
    onEditcontact=()=>{
        axios.put('/modify_contact/'+ this.props.id , {name:this.state.name, phone: this.state.phone, mail:this.state.mail})
        .then(res => alert(res.data))
        .catch(err=> alert(err))
    }
    render() {
        return (
            <div  className='contactadd'>
                <h3> Update contact</h3>
                <div className="drop">
                <div><label>Name:</label><input name="name" type="text" onChange={e=>this.handelchange(e)} value={this.state.name} /></div>
                <div><label>Phone:</label><input name="phone" type="text" onChange={e=>this.handelchange(e)} value={this.state.phone} /></div>
                <div><label>E-mail:</label><input name="mail" type="text" onChange={e=>this.handelchange(e)} value={this.state.mail} /></div>
                <button className="btnupdte" onClick={()=>{this.onEditcontact(); window.location.replace("http://localhost:3000/contact/")}}>Save</button>
                </div>
            </div>
        )
    }
}
