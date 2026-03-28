import {useState} from "react";

function SelectEventPreferences() {
    const [options, setOptions] = useState<{name: string, chosenBy: string[]}[]>([
        {name: "Boardgame night", chosenBy: ["Tom", "Paul"]},
        {name: "Arthurs Seat Hike", chosenBy: []},
        {name: "Pub quiz", chosenBy: ["Karl"]},
        {name: "National Museum", chosenBy: []},
        {name: "Pool at Teviot", chosenBy: []}
    ])
    const [inputs, setInputs] = useState({});
    const [suggestion, setSuggestion] = useState<string>("")

    const handleChange = (e) => {
        const username = "TestUser"

        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setInputs(values => ({...values, [name]: value}))
        let others = options.filter(o => o.name !== name)
        let selected = options.find(o => o.name === name)
        if (value) {
            if (!selected!.chosenBy.includes(username)) {
                selected!.chosenBy.push(username)

            }
        } else {
            selected!.chosenBy = selected!.chosenBy.filter(name => name != username)
        }
        setOptions([...others, selected])
    }



    return (
        <div className={'w-full'}>
            <h1>Event Options</h1>
            <p> What events would you like to see? </p>
            <div className={'flex-col space-y-2 p-3 w-full'}>
                {options
                    .sort((o1, o2) => o2.chosenBy.length - o1.chosenBy.length)
                    .map(option =>
                    <div className={'flex gap-2 bg-gray-200 p-3 rounded-l items-center'} key={option.name}>
                        <input
                            type="checkbox"
                            name={option.name}
                            checked={inputs[option.name] || false}
                            onChange={handleChange}
                        />
                        <p>{option.name}</p>
                        <p className={'text-xs'}>{"Chosen by " + option.chosenBy.length + " others"}</p>
                    </div>
                )}
                <p>Make your own suggestion</p>
                <div className={'flex gap-2'}>
                    <input onChange={(e) => setSuggestion(e.target.value)} type={'text'} placeholder={"E.g. Portobello Campfire"} value={suggestion} className={'grow bg-gray-50 rounded-s px-2'}/>
                    <button type={"button"} onClick={() => {
                        if (suggestion.trim() === "") return
                        setOptions(options => ([...options, {name: suggestion, chosenBy: []}]));
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