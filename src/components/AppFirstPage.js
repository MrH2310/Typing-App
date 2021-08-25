import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PreviousPage from "./PreviousPage";

const AppFirstPage = () => {

const host = "http://localhost:3005";
const [texts, setTexts] = useState(null);
const [challenge, setChallenge] = useState(" ");
const [challengeID, setChallengeID] = useState(" ");

useEffect(()=> {
    fetch(`${host}/texts`)
    .then(response=> response.json())
    .then(texts => setTexts(texts))
}, [])

const handleChooseChallenge = text => (e)=> {
    e.preventDefault()
    setChallenge(text.title)
    setChallengeID(text.id)
};


const handleDelete = (id) =>{
    fetch(`${host}/texts/${id}`,{
        method: "DELETE"
    })
        .then(()=> setTexts(prev=> prev.filter(el => el.id !== id)))
        .catch(err => console.warn(err))
}

    return texts ?(
        <>
        <div className="entry">
            <PreviousPage/>
            <h2>1. Choose challenge:</h2>
            <div className="top-container">
                {texts.map(text => {
                    return (
                        <div className="challenges-box" >
                            <button className="challenge" value={challenge} key={text.id} onClick={handleChooseChallenge(text)}>{text.title}</button>
                            <button className="delete-challenge" onClick={() => handleDelete(text.id)}>X</button>
                        </div>
                    )    
                })}
            </div>
            <div className="bottom-container">
                <div>
                    <h3>2. Want new challenge?</h3>
                    <Link to='/app/add-text'> Add new text</Link>
                </div>
                <div>
                    <h3>3. Let's start?</h3>
                    <Link to={`/app/typing/${challengeID}`}>Start <span>typing</span></Link>
                </div>
            </div>
            <p><span style={{color:"rgb(25, 216, 19)"}}>Choosen challenge:</span> {challenge}</p>
        </div>
        </>
    ) : <p>Loading data...</p>
};

export default AppFirstPage;