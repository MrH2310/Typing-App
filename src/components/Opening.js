import React from "react";
import {Link} from "react-router-dom";

const Opening = () => {

    return(
        <div className="opening">
            <h1>How fast you can <span>type</span> on your keyboard ?</h1>
            <h2>This app is going to show how good you are in <span>typing</span> and also improve your skill overtime during practice!</h2>
            <h2>Give it a try and checkout if you are a <span>typing</span> master or just apprentice ;)</h2>
            <Link to='/first/page'><button>Open App</button></Link>
        </div>
    )
};

export default Opening;