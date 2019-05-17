import React from 'react'

class CommentForm extends React.Component {

    state = {
        input: ""
    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state.input)
        this.setState({
            input: ""
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.handleChange} value={this.state.input} cols="30" rows="10"></textarea>
                    <button>Leave a comment!</button>
                </form>
            </div>
        )
    }
}

export default CommentForm