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
            <div className="ui stackable center aligned grid container">
                <div className="seven wide column">
                    <form className="ui reply form" onSubmit={this.handleSubmit}>
                        <textarea onChange={this.handleChange} value={this.state.input}></textarea>
                        <button className="ui prof icon button">
                            <i className="icon edit"></i>Leave a comment!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CommentForm