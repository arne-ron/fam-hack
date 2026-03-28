import {useState} from "react";

function SelectEventPreferences() {
    const [options, setOptions] = useState([
        "Boardgame night",
        "Pub quiz",
        "Arthurs Seat Hike",
        "National Museum",
        "Pool at Teviot"
    ])
    const [inputs, setInputs] = useState({});
    const [suggestion, setSuggestion] = useState<string>("")

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInputs(values => ({...values, [name]: value}))
    }



    return (
        <div className={'w-full'}>
            <h1>Event Options</h1>
            <p> What events would you like to see? </p>
            <div className={'flex-col space-y-2 p-3'}>
                {options.map(option =>
                    <div className={'flex gap-2 bg-gray-200 p-3 rounded-l'} key={option}>
                        <input
                            type="checkbox"
                            name={option}
                            checked={inputs[option] || false}
                            onChange={handleChange}
                        />
                        <p>{option}</p>
                    </div>
                )}
                <p>Make your own suggestion</p>
                <div className={'flex gap-2'}>
                    <input onChange={(e) => setSuggestion(e.target.value)} type={'text'} placeholder={"E.g. Portobello Campfire"} value={suggestion} className={'grow bg-gray-50 rounded-s px-2'}/>
                    <button type={"button"} onClick={() => {
                        setOptions(options => ([...options, suggestion]));
                        setSuggestion("")
                    }} className={'bg-green-100 p-1 rounded-s'}>
                        <p>Submit</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SelectEventPreferences