import React, {Component} from 'react';
import Question from './question/Question';
import Answer from './answer/Answer';
import './QuizMain.css';

export default class Quiz extends Component {

    // initiating the local state
    state = {
        quiestions: {
            1: 'Who was the very first American Idol winner?',
            2: 'Paul McCartney and John Lennon wrote which Rolling Stones song?',
            3: 'Which member of *NSYNC was a replacement for another who quit before they got big?', 
            4: 'Prince introduced his iconic symbol on the cover of which single?'
        },
        answers: {
            1: {
                1: 'Justin Guarini',
                2: 'Kelly Clarkson',
                3: 'Tamyra Gray'
            },
            2: {
                1: 'I Wanna Be Your Man',
                2: '(I Can’t Get No) Satisfaction',
                3: 'Moonlight Mile'
            },
            3: {
                1: 'Lance Bass',
                2: 'Justin Timberlake',
                3: 'JC Chasez'
            }, 
            4: {
                1: 'Purple Rain',
                2: 'When Doves Cry',
                3: '1999'
            }
        },
        correctAnswers: {
            1: '2',
            2: '1',
            3: '1', 
            4: '3'
        },
        correctAnswer: 0,
        clickedAnswer: 0,
        step: 1,
        score: 0
    }

    // the method that checks the correct answer
    checkAnswer = answer => {
        const { correctAnswers, step, score } = this.state;
        if(answer === correctAnswers[step]){
            this.setState({
                score: score + 1,
                correctAnswer: correctAnswers[step],
                clickedAnswer: answer
            });
        }else{
            this.setState({
                correctAnswer: 0,
                clickedAnswer: answer
            });
        }
    }

    // method to move to the next question
    nextStep = (step) => {
        this.setState({
            step: step + 1,
            correctAnswer: 0,
            clickedAnswer: 0
        });
    }

    render(){
        let { quiestions, answers, correctAnswer, clickedAnswer, step, score } = this.state;
        return(
            <div className="Content">
                {step <= Object.keys(quiestions).length ? 
                    (<>
                        <Question
                            question={quiestions[step]}
                        />
                        <Answer
                            answer={answers[step]}
                            step={step}
                            checkAnswer={this.checkAnswer}
                            correctAnswer={correctAnswer}
                            clickedAnswer={clickedAnswer}
                        />
                        <button
                        className="NextStep"
                        disabled={
                            clickedAnswer && Object.keys(quiestions).length >= step
                            ? false : true
                        }
                        onClick={() => this.nextStep(step)}>Next</button>
                    </>) : (
                        <div className="finalPage">
                            <h1>You have completed the quiz!</h1>
                            <p>Your score is: {score} of {Object.keys(quiestions).length}</p>
                            <p>Thank you!</p>
                        </div>
                    )
                }
            </div>
        );
    }
}