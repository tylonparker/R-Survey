import React, {Component} from 'react';

var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyD5KWux2jKXqMF-n8X_hDAoEFZD-QGxesk",
    authDomain: "usurvey-160fd.firebaseapp.com",
    databaseURL: "https://usurvey-160fd.firebaseio.com",
    projectId: "usurvey-160fd",
    storageBucket: "usurvey-160fd.appspot.com",
    messagingSenderId: "1008226229465"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {

  nameSubmit(event){
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function(){
      console.log(this.state);
    });
  }
  answerSelected(event){
//TODO work on this
     var answers = this.state.answers;
     if (event.target.name === 'answer1') {
       answers.answer1 = event.target.value;
     }else if (event.target.name === 'answer2') {
       answers.answer2 = event.target.value;
     }else if (event.target.name === 'answer3') {
       answers.answer3 = event.target.value;
     }

     this.setState({answers: answers}, function(){
       console.log(this.state);
     });
  }

  questionSubmit(){
    //TODO work on this to
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }
  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers:{
        answer1:'',
        answer2:'',
        answer3:'',
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }
  render(){
    var studentName;
    var questions;


    if(this.state.studentName === '' && this.state.isSubmitted === false){
      studentName = <div>
        <h1>Hey Student, please let us know your name</h1>
        <form onSubmit={this.nameSubmit}>
          <input className="namy" type="text" placeholder="Enter your name" ref="name"/>
        </form>
    </div>;
    questions = ''
  } else if (this.state.studentName != '' && this.state.isSubmitted === false) {
    studentName = <h1>Welcome to U-Survey, {this.state.studentName}</h1>;
      questions = <div>
           <h2>Here are some questions:
            <form onSubmit={this.questionSubmit}>
              <div className="card">
               <label className='Size'>What kind of programmer are U:</label><br/>
               <input  type='radio' name='answer1' value='React Developer' onChange={this.answerSelected}/>React Developer
               <input  type='radio' name='answer1' value='C# Developer' onChange={this.answerSelected}/>C# Developer
               <input  type='radio' name='answer1' value='Java Developer' onChange={this.answerSelected}/>Java Developer
              </div>
              <div className="card">
               <label className='Size'>What kind of transportation do you use:</label><br/>
               <input  type='radio' name='answer2' value='Bus' onChange={this.answerSelected}/>Bus
               <input  type='radio' name='answer2' value='Car' onChange={this.answerSelected}/>Car
               <input  type='radio' name='answer2' value='Other' onChange={this.answerSelected}/>Other
              </div>
              <div className="card">
               <label className='Size'>Which level of programmer are you:</label><br/>
               <input  type='radio' name='answer3' value='Entry' onChange={this.answerSelected}/>Entry
               <input  type='radio' name='answer3' value='Junior' onChange={this.answerSelected}/>Junior
               <input  type='radio' name='answer3' value='Senior' onChange={this.answerSelected}/>Senior
              </div>
              <input className="feedback-button" type="submit" value="submit"/>
            </form>
           </h2>
      </div>
  }else if (this.state.isSubmitted === true) {
    studentName = <h1>Thanks, {this.state.studentName}</h1>;


  }
    return(
      <div>
       {studentName}
       ---------------------
       {questions}
       ---------------------

      </div>
    );
  }
}

export default Usurvey;
