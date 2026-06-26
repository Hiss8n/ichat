import React, { useState } from 'react'

function SearchInput() {
       const [searchTerm, setSearchTerm] = useState('');
  return (
    <div>
        <label>
        <span className="sr-only">Search contacts</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search contact"
              className="w-full rounded-sm   px-3 py-1.5 text-sm outline-none transition  focus:bg-slate-300"
            />
          </label>
    </div>
  )
}

export default SearchInput