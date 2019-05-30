import React from 'react'; 
import { getGroups, setComments, addComment} from '../actions';
import { connect } from 'react-redux';
import CommentContainer from '../containers/CommentContainer';
import CommentForm from './CommentForm';
import { ActionCableConsumer } from 'react-actioncable-provider';
import withAuth from './WithAuth';
import { Grid, Segment } from 'semantic-ui-react';
import Header from './Header';
import Nav from './Nav';
import v4 from 'uuid';


class GroupContent extends React.Component{

    state = {
        open: false,
        input:""
    }

    // show = dimmer => () => this.setState({
    //     dimmer, open: true
    // })

    // close = () => this.setState({
    //     open: false
    // })

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
                .then(response =>this.props.setComments(response))
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
                return <CommentContainer key={v4()} handleCommentInput={this.handleCommentInput} group={group} />
            } else{
                return (
                    <div id="comment2">
                        <div className="speech-bubble-ds">
                        <br/>
                            <h4>Be the first to comment!</h4>
                        </div>
                    </div>
                )
            }
        }
    }

    // renderMembers = () => {
    //     const groupTopic = this.props.group.find(group => group.id === parseInt(this.props.match.params.id))
    //     groupTopic.users.map(users => {
    //         return (
    //             <div>
    //                 <li>{users.name}</li>
    //             </div>
    //         )
    //     })
    // }
        
    render(){ 
       const groupTopic= this.props.group.find(group => group.id === parseInt(this.props.match.params.id)) 
        // const { open, dimmer } = this.state
      
        return (
            <div id="div1">
                <Header />
                <Nav /> 
                    <ActionCableConsumer
                        channel={{channel:"FeedChannel"}}
                        onReceived={(comment) => {
                            this.props.addComment(comment)
                        }}
                    />
                    <h2>{this.props.group.length > 0 ? groupTopic.name : "Loading..."}</h2>
                <div id="div2">
                    
                    <Grid >
                            <div id="div3">
                            <Segment style={{ overflow: 'auto', minHeight: 550, maxHeight: 550 }} id="segment">

                                <Grid.Column width={10}>
                                    {this.renderComments()}
                                </Grid.Column>
                            </Segment>
                            </div>
                            <div id="div4">
                            <Grid.Column width={6}>
                                <CommentForm handleEditCommentClick={this.handleEditCommentClick} handleSubmit={this.handleSubmit} value={this.state.editComment} handleCommentInput={this.handleCommentInput} input={this.state.input}/> 
                                
                                {/* <Divider />
                                <div id="div7">
                                    <Button onClick={this.show('inverted')} className="ui prof button">See all members of group</Button> */}

                                    {/* <Modal dimmer={dimmer} open={open} onClose={this.close}>
                                        <Modal.Header>Members:</Modal.Header>
                                        <Modal.Content>
                                            <Modal.Description>
                                               { this.renderMembers()}
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='black' onClick={this.close}>
                                                Close
                                                </Button>
                                        </Modal.Actions>
                                    </Modal> */}


                                {/* </div> */}
                                {/* <div>
                                    <Button onClick={this.handleBackButton} className="ui prof button">Back to Profile</Button>
                                </div> */}
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