import React from 'react';
import withAuth from './WithAuth';
import { connect } from 'react-redux'; 
import { updateCommentId } from '../actions';

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
        this.props.updateCommentId(null)
    }

    handleEditClick = () => {
        this.props.handleEditCommentClick(this.props.input)
        this.props.handleCommentInput(this.state.input)
        this.props.updateCommentId(null)
    }

    render(){
        if (this.props.updatedCommentId){
        return(
            <div id="div5">
                <div id="div6">
                    <form className="ui reply form" onSubmit={this.handleSubmit}>
                        <textarea id="commentbkgd"  onChange={this.handleChange} value={this.props.input}></textarea>
                    </form>
                </div>
                <button onClick={this.handleEditClick} className="ui prof icon button">
                    <i className="icon edit"></i>Edit your comment!</button>
            </div>

        )} else{
            return(
            <div id="div5">
                <div id="div6">
                    <form className="ui reply form" onSubmit={this.handleSubmit}>
                        <textarea id="commentbkgd" onChange={this.handleChange} value={this.props.input}></textarea>
                        <button className="ui prof icon button">
                            <i className="icon edit"></i>Leave a comment!</button>
                    </form>
                </div>
                
        
            </div>

            )}
        
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        updatedCommentId: state.updatedCommentId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCommentId: (comment) => {
            dispatch(updateCommentId(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(CommentForm))