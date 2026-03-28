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
            <div className={'flex-col space-y-2 p-3 w-full'}>
                {options.map(option =>
                    <div className={'flex gap-2 bg-gray-200 dark:bg-gray-800 p-3 rounded-l'} key={option}>
                        <input
                            type="checkbox"
                            name={option}
                            checked={inputs[option] || false}
                            onChange={handleChange}
                            className={'accent-purple-500'}
                        />
                        <p className={'dark:text-gray-200'}>{option}</p>
                    </div>
                )}
                <p className={'mt-6 font-semibold dark:text-gray-100'}>Make your own suggestion</p>
                <div className={'flex gap-2'}>
                    <input 
                        onChange={(e) => setSuggestion(e.target.value)} 
                        type={'text'} 
                        placeholder={"E.g. Portobello Campfire"} 
                        value={suggestion} 
                        className={'grow bg-gray-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 border rounded-s px-2 py-2'}
                    />
                    <button 
                        type={"button"} 
                        onClick={() => {
                            setOptions(options => ([...options, suggestion]));
                            setSuggestion("")
                        }} 
                        className={'bg-green-100 dark:bg-green-700 dark:text-white p-2 rounded-s transition-colors hover:bg-green-200 dark:hover:bg-green-600'}
                    >
                        <p className={'font-bold'}>Submit</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SelectEventPreferences