import React from 'react'
import { Image, Button } from 'semantic-ui-react'

class Home extends React.Component {

    handleSignInClick= () => {
        this.props.history.push(`/userlogin`)
    }

    handleSignUpClick = () => {
        this.props.history.push(`/signup`)
    }

    render(){
        return (
            
            <React.Fragment>
                <div className="frame">
                    <div className="circle"></div>
                    <div className="line left"></div>
                    <div className="line right"></div>
                    <div className="bracket left"></div>
                    <div className="bracket right"></div>
                    <div className="small bottom"><Image src="../logo4.png" alt="logo" /></div>
                    <div className="hide top"></div>
                    <div className="hide bottom"></div>
                </div>
                <div className="ui hidden divider"></div>
                <div >
                    <Button onClick={this.handleSignInClick} className="ui submit button">SignIn</Button>
                    <Button onClick={this.handleSignUpClick} className="ui submit button">SignUp</Button>
                </div>
                
            </React.Fragment>
        

        )
    }
}

export default Home 