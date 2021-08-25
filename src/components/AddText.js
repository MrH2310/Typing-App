import React, {useState} from "react";
import { useHistory } from "react-router";

import PreviousPage from "./PreviousPage";

const AddText = () => {
    const [title, setTitle] = useState("");
    const [sentence, setSentence] = useState("");
    const history = useHistory()

    const host = "http://localhost:3005";

    const handleChange = (e) => {
        e.preventDefault();
        handleAdd({
                title: title,
                sentence: sentence,
        });
    };

    const handleAdd = (newText) => {
        fetch(`${host}/texts`,{
            method: "POST",
            body:JSON.stringify(newText),
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then((response)=> response.json())
        .then(() => history.push("/first/page"))
    }

    return (
        <>
            <form onSubmit={handleChange} className="add-text">
                <PreviousPage/>
                <label htmlFor="title">Title:</label>
                <input value={title} type="text" onChange={(e)=> setTitle(e.target.value)}></input>
                <label htmlFor="text">Your text:</label>
                <textarea spellCheck="false" value={sentence} type="text" onChange={(e)=> setSentence(e.target.value)}></textarea>
                <button className='add-text-button' type="submit">Add your text</button>
            </form>
        </>
    )        
};

export default AddText;