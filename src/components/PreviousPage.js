import {useHistory} from "react-router-dom";

const PreviousPage = () => {
    const history = useHistory();

    const goBackHandle = () => {
        history.goBack();
    };

    return (
    <button className='go-back' onClick={goBackHandle}>Go back</button>
    )
};

export default PreviousPage;