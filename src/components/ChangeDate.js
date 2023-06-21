import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, privateRoutes, publicRoutes} from "../routes";
import Id from "../pages/groups/[id]";
import React from "react";
import {Button, Card} from "react-bootstrap";
import {Col, Form, Row} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

class ChangeDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date:[ new Date()], isValid:false};
        this.onAddNew = this.onAddNew.bind(this);
        this.deleteDate = this.deleteDate.bind(this);
        this.onChanged = this.onChanged.bind(this);
        this.timeRef = React.createRef();
        this.dateRef = React.createRef();
        this.props.setDate(this.state.date)
    }

    onAddNew(){
        let newDates = this.state.date.slice();
        let year = this.dateRef.current.value.split("-")[0]
        let month = this.dateRef.current.value.split("-")[1]
        let day = this.dateRef.current.value.split("-")[2]
        let hour = this.timeRef.current.value.split(":")[0]
        let minute = this.timeRef.current.value.split(":")[1]
        let newDate = new Date(year, month, day, hour, minute);
        newDates.push(newDate);
        this.setState({date:newDates});
        this.props.setDate(newDates)
    }

    deleteDate(date){
        let newDates = this.state.date.slice();
        newDates = newDates.filter(function(item) {
            return item !== date
        });
        this.props.setDate(newDates)
        this.setState({date:newDates});
    }

    onChanged() {
        let year = this.dateRef.current.value.split("-")[0]
        let month = this.dateRef.current.value.split("-")[1]
        let day = this.dateRef.current.value.split("-")[2]
        let hour = this.timeRef.current.value.split(":")[0]
        let minute = this.timeRef.current.value.split(":")[1]
        if((year !== undefined) && (month !== undefined) && (day !== undefined) && (hour !== undefined) && (minute !== undefined) &&
            (year !== "") && (month !== "") && (day !== "") && (hour !== "") && (minute !== "") &&
            (!isNaN(year)) && (!isNaN(month)) && (!isNaN(day)) && (!isNaN(hour)) && (!isNaN(minute))) {
            this.setState({isValid:true});
        }
        else {
            this.setState({isValid:false});
        }
    }

    render() {
        return (
            <Card>
                <ListGroup>
                    {
                        this.state.date.map((date)=>{
                            return(<ListGroup.Item>
                                    {date.getFullYear()}
                                    -
                                    {date.getMonth()}
                                    -
                                    {date.getDate()}
                                    <span> </span>
                                    {date.getHours()}
                                    :
                                    {date.getMinutes()}
                                    <Button className="btn btn-danger" onClick={()=>{this.deleteDate(date);}}>x</Button>
                            </ListGroup.Item>
                            )
                        })
                    }
                    <ListGroup.Item>
                        <Form>
                            <Form.Control type="date" placeholder="" onChange={this.onChanged} ref={this.dateRef}/>
                            <Form.Control type="time" placeholder="" onChange={this.onChanged} ref={this.timeRef}/>
                        </Form>
                        <Button onClick={this.onAddNew} disabled={!this.state.isValid}>Выбрать новую дату.</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        );
    }
};


export default ChangeDate;

