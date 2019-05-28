import React from 'react'; 
import { getGroups, setComments, addComment} from '../actions';
import { connect } from 'react-redux';
import CommentContainer from '../containers/CommentContainer';
import CommentForm from './CommentForm';
import { ActionCableConsumer } from 'react-actioncable-provider';
import withAuth from './WithAuth';
import { Container, Grid, Button, Segment, Divider } from 'semantic-ui-react'

class GroupContent extends React.Component{

    state ={
        input: "",
        amCommenting: false
    }

    // componentDidMount() {
    //     fetch(`http://localhost:3000/comments`)
    //     .then(res => res.json())
    //     .then(this.props.setComments)
    // }

    handleCommentInput = (comment) => {
        this.setState({
            input: comment
        })
    }

    addingComment = (user_id, group_id, input) => {
        fetch('http://localhost:3000/comments', {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id,
                group_id,
                user_comment: input
            }),
        })
        // .then(res => res.json())
        // .then((response)=> this.props.addComment(response))
    }

    handleSubmit = (input) => {
        this.addingComment(this.props.currentUser.id, parseInt(this.props.match.params.id), input)
    }

    editComment = (id, input) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`http://localhost:3000/comments/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    user_comment: input
                })
            })
                .then(res => res.json())
                .then(response => this.props.setComments(response))
        }
    }

    handleEditCommentClick = (input) => {
        this.editComment(this.props.updatedCommentId, input)
    }

    handleBackButton = () => {
        this.props.history.push(`/${this.props.currentUser.id}/profile`)
    }

    renderComments = () => {
       
        if (this.props.comments.length === 0) {
            fetch('http://localhost:3000/comments')
            .then(res => res.json())
            .then(response => this.props.setComments(response))
        } else {
            const group = this.props.comments.filter(comment => {
                return comment.group_id === parseInt(this.props.match.params.id)
            }) 
            if (group.length > 0){
                return <CommentContainer key={group.id} handleCommentInput={this.handleCommentInput} group={group} />
            } else{
                return (
                    
                    <div id="comment2">
                        <div className="speech-bubble-ds">
                            <h4>Be the first to comment!</h4>
                        </div>
                    </div>
                )
            }
        }
    }
        
    render(){      
        return (
            <div id="div1">
                
                    <ActionCableConsumer
                        channel={{channel:"FeedChannel"}}
                        onReceived={(comment) => {
                            console.log("recieved comment", comment)
                            console.log("recieved comment type", typeof comment.user_comment)
                            this.props.addComment(comment)
                        }}
                    />
                    <h2>title</h2>
                <div id="div2">
                    
                    <Grid >
                            <div id="div3">
                            <Segment style={{ overflow: 'auto', maxHeight: 500 }} id="segment">

                                <Grid.Column width={10}>
                                    {this.renderComments()}
                                </Grid.Column>
                            </Segment>
                            </div>
                            <div id="div4">
                            <Grid.Column width={6}>
                                <CommentForm handleEditCommentClick={this.handleEditCommentClick} handleSubmit={this.handleSubmit} value={this.state.editComment} handleCommentInput={this.handleCommentInput} input={this.state.input}/> 
                                
                                <Divider />
                                <div id="div7">
                                    <Button className="ui prof button">See all members of group</Button>
                                </div>
                                <div>
                                    <Button onClick={this.handleBackButton} className="ui prof button">Back to Profile</Button>
                                </div>
                            </Grid.Column>
                            </div>
                        </Grid>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedIn: !!state.currentUser.id,
        group: state.group,
        comments: state.comments,
        updatedCommentId: state.updatedCommentId,
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (groups) => {
            dispatch(getGroups(groups))
        },
        setComments: (comments) => {
            dispatch(setComments(comments))
        },
        addComment: (comments) => {
            dispatch(addComment(comments))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(GroupContent))