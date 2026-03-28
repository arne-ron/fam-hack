import {useState} from "react";

function SelectEventPreferences() {
    const options: string[] = [
        "Boardgame night",
        "Pub quiz",
        "Arthurs Seat Hike",
        "National Museum",
        "Pool at Teviot"
    ]
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInputs(values => ({...values, [name]: value}))
    }


    return (
        <div className={'flex-col space-y-3 p-3'}>
            {options.map(option =>
                <div className={'flex gap-2 bg-gray-200 p-3 rounded-l'}>
                    <input
                        type="checkbox"
                        name="tomato"
                        checked={inputs[option]}
                        onChange={handleChange}
                    />
                    <p>{option}</p>
                </div>
            )}
            <div className={'flex'}>
                <input type={'text'} placeholder={"Suggestion"} />
                <button type={"button"} onClick={() => {}} className={'bg-green-100 p-1 rounded-s'}>
                    <p>Submit</p>
                </button>
            </div>
        </div>
    )
}

export default SelectEventPreferences