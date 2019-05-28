import React from 'react';
import withAuth from './WithAuth';
import { connect } from 'react-redux';

class CommentForm extends React.Component {
    state ={
        input: ""
    }

    handleChange = (e) => {
        this.props.handleCommentInput(e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.props.input)
        this.props.handleCommentInput(this.state.input)
    }

    handleEditClick = () => {
        this.props.handleEditCommentClick(this.props.input)
        this.props.handleCommentInput(this.state.input)
    }

    render(){
        return(
            <div id="div5">
                <div id="div6">
                    <form className="ui reply form" onSubmit={this.handleSubmit}>
                        <textarea onChange={this.handleChange} value={this.props.input}></textarea>
                        <button className="ui prof icon button">
                            <i className="icon edit"></i>Leave a comment!</button>
                    </form>
                </div>
                    <div class="ui horizontal divider">Or</div>
                        <button onClick={this.handleEditClick} className="ui prof icon button">
                            <i className="icon edit"></i>Edit your comment!</button>
               
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(withAuth(CommentForm))