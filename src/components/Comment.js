import React from 'react';
import { connect } from 'react-redux';
import { removeComment, updateCommentId  } from '../actions';
import withAuth from './WithAuth';
import { Grid, Image } from 'semantic-ui-react';

class Comment extends React.Component {

     handleDeleteClick = (id) => {
        const token = localStorage.getItem("token")
        if (token) {
            fetch(`https://lqbackend.herokuapp.com/comments/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            })
                .then(res => res.json())
                .then(response => this.props.removeComment(response))
        }
    }

     handleEditClick = (e) => {
         this.props.handleCommentInput(e.target.name)
         this.props.updateCommentId(this.props.commentId)
    }


    renderDeleteButton = () => {
        if (this.props.currentUser && this.props.currentUser.id === parseInt(this.props.userId)){
            return <button onClick={() => this.handleDeleteClick(this.props.commentId)} className="ui mini submit button">Delete</button>
        } else{
            return null
        }
    }

    renderEditButton = () => {
        if (this.props.currentUser && this.props.currentUser.id === parseInt(this.props.userId)) {
            return <button className="ui mini submit button" name={this.props.userComment} onClick={this.handleEditClick}>Edit</button>
        } else {
            return null
        }
    }

    render(){
   
        return(
            <div >
                <div id="comment" > 
                    <Grid columns={2}>
                        <div id="div9">
                             <Grid.Column >
                                <Image src='../profile.jpg' width="100px" height="100px" circular/>
                            </Grid.Column>
                        </div>
                        <Grid.Column >
                            

                            <div id="commentBubble">
                                <div className="speech-bubble-ds">
                                    <h4>{this.props.username}</h4>
                                    <div className="test">
                                        {/* <Segment style={{ overflow: 'auto', maxHeight: 60 }} id="segment1"> */}
                                            {this.props.userComment}
                                        {/* </Segment> */}
                                    </div>
                                    <div>
                                        {this.renderEditButton()}
                                        {this.renderDeleteButton()}
                                    </div>
                                    <div className="speech-bubble-ds-arrow"></div>
                                </div>
                            </div>
                          
                        </Grid.Column>
                    </Grid>
                  
                </div>
            </div> 
               
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeComment: (comment) => {
            dispatch(removeComment(comment))
        },
        updateCommentId: (comment) => {
            dispatch(updateCommentId(comment))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withAuth(Comment))