import React from 'react';
import Header from './Header';
import Nav from './Nav';

class About extends React.Component{
    render(){
        return(
            <div>
                <Header />
                <Nav />
                <div className="about">
                    <h3>Welcome to Lifestage Q!</h3>
                    <p>Everyone's life seems perfect on social media, but is it really?</p>
                    <p>At Lifestage Q, join a or multiple lifestage of your choosing. You can create to join existing groups where you can share your struggles, advice, and resources with those experiencing the same things in life. It's about forming a community where we can all encourage each other and where it's OK to not have it all together.
                    </p>
                    <p>So bring on the encouragment and know that you are exactly where you need to be in life. Don't give up! </p>

                    <span role="img" aria-label="yellow_heart">💛Diana</span>
                </div>
            </div>
        )
    }
}

export default About