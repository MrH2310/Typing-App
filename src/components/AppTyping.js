import React, {useState, useEffect} from "react";
import { useParams } from "react-router";

import useKeyPress from "./useKeyPress";
import PreviousPage from "./PreviousPage";


const AppTyping = () => {
    const [type, setType] = useState("")

    const [incomingChars, setIncomingChars] = useState("");
    const [outgoingChars, setOutgoingChars] = useState("");
    const [currentChar, setCurrentChar] = useState("");

    const { text } = useParams();

    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(" ").join(""),
    );

    const [accuracy, setAccuracy] = useState(0);
    const [typedChars, setTypedChars] = useState("");

    const [startTime, setStartTime] = useState();
    const [wordCount, setWordCount] = useState(0);
    const [wpm, setWpm] = useState(0);

    const currentTime = () => new Date().getTime();

    useEffect(() => {
        fetch(`http://localhost:3005/texts/${text}`)
            .then(r => r.json())
            .then(data => setType(data.sentence))
    }, [text])

    useEffect(() => {
        setCurrentChar(type.charAt(0));
        setIncomingChars(type.substr(1))
    }, [type])

    useKeyPress(key => {
        if (!startTime){
            setStartTime(currentTime());
        }

        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;

        if (key === currentChar){
            if (leftPadding.length > 0) {
                setLeftPadding(leftPadding.substring(1));
            }
            updatedOutgoingChars += currentChar;
            setOutgoingChars(updatedOutgoingChars);

            setCurrentChar(incomingChars.charAt(0));

            updatedIncomingChars = incomingChars.substring(1);
            setIncomingChars(updatedIncomingChars);

            if (incomingChars.charAt(0) === " "){
                setWordCount(wordCount + 1);
                const timeInMinutes = (currentTime() - startTime) / 60000.0;
                setWpm(((wordCount + 1) / timeInMinutes).toFixed(2))
            }
        }
            const updatedTypedChars = typedChars + key;
            setTypedChars(updatedTypedChars);
            setAccuracy(
                ((updatedOutgoingChars.length * 100) / updatedTypedChars.length).toFixed(2),
            );
    })

    return(
        <div className="app-main">  
            <PreviousPage/>
            <p className="character">
                <span className="character-out">
                    {(leftPadding + outgoingChars).slice(-4)}
                </span>
                <span className="character-current">
                    {currentChar}
                </span>
                <span className="incoming-chars">{incomingChars.substr(0, 20)}</span>
            </p>
            <div className="result">
            <h3>Accuracy: {accuracy} %</h3>
            <h3>Word/Min: {wpm} </h3>
            </div>
        </div>
    )
};

export default AppTyping;