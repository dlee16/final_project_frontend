import React from 'react'; 
import { getGroups } from '../actions';
import { connect } from 'react-redux';
import CommentContainer from '../containers/CommentContainer'

class GroupContent extends React.Component{

    componentDidMount() {
        fetch(`http://localhost:3000/groups`)
            .then(res => res.json())
            .then(this.props.getGroups)
    }

    renderComments = () => {
        if (this.props.group.length !==0 ){
            const group = this.props.group.find(group => {
                return group.id === parseInt(this.props.match.params.id) })
            return <CommentContainer key={group.id} group={group.comments} /> 
        }
    }


    render(){
        return (
            <div>
                {this.renderComments()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // loggedIn: !!state.currentUser.id,
        group: state.group
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroups: (groups) => {
            dispatch(getGroups(groups))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupContent)