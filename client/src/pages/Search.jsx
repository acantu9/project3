// // Search.jsx
import React, {useState} from 'react';
import SearchForm from '../components/search/searchForm';
// import Results from './Results';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    console.log("3: Start searching for pets!")
  }

  return (
    <div>
      {searchResults}
      <h1 className="h1 mb-10">Let's Find Your Purrfect Pet!</h1>
      <SearchForm onSearch={handleSearch} />
      {searchResults.length > 0 && <Results results={searchResults} />}
    </div>
  );
};

export default Search;

// import React, { useState } from 'react';
// import SearchForm from '../components/search/SearchForm';

// const Search = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   // Callback function to handle search results
//   const handleSearch = (results) => {
//     setSearchResults(results);
//   };

//   return (
//     <div>
//       <h1 className="h1 mb-10">Let's Find Your Purrfect Pet!</h1>
//       <SearchForm onSearch={handleSearch} />

//       {/* Display the list of search results */}
//       <div>
//         <h2>Search Results</h2>
//         <ul>
//           {searchResults.map((pet) => (
//             <li key={pet.id}>
//               <p>{`Name: ${pet.name}`}</p>
//               <p>{`Type: ${pet.type}`}</p>
//               {/* Add more details as needed */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Search;
