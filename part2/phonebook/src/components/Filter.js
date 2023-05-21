const Filter = ({ searchValue, setSearchValue, persons, setFilteredPersons }) => {
    const findContact = () => {
        const filteredContacts = persons.filter((person) =>
            person.name.toLowerCase().includes(searchValue.toLowerCase()))
        setFilteredPersons(filteredContacts)
    }
    return (
        <div>Find a contact: <input
            value={searchValue}
            onChange={(event) => {
                setSearchValue(event.target.value);
                findContact();
            }} />
        </div>
    )
}

export default Filter