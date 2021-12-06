import Search from 'antd/lib/input/Search';
import React, {useState} from 'react'
import NotesList from './NotesList';
import SearchBar from "../components/SearchBar";


const AllNotes = ({notes, addNote, deleteNote}) => {
    const createNote = (text) =>{
        addNote(text)
    }
    const [searchText, setSearchText] = useState();
    const SearchedText = notes.filter((note) => note.title.toLowerCase().includes(searchText))

    return (
        <div className="notes-container">
            <SearchBar handleSearchNote={setSearchText} />
            <NotesList 
                notes={searchText ? SearchedText : notes} 
                handleAddNote={createNote} 
                deleteNote={deleteNote}/>
        </div>
    )
}

export default AllNotes;



