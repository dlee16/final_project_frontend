import React from 'react'

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
            <div className="ui stackable center aligned grid container">
                <div className="seven wide column">
                    <form className="ui reply form" onSubmit={this.handleSubmit}>
                        <textarea onChange={this.handleChange} value={this.props.input}></textarea>
                        <button className="ui prof icon button">
                            <i className="icon edit"></i>Leave a comment!</button>
                    </form>
                        <button onClick={this.handleEditClick} className="ui prof icon button">
                            <i className="icon edit"></i>Edit your comment!</button>
                </div>
            </div>
        )
    }
}

export default CommentForm