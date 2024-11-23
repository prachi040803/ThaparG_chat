import React from 'react'
import Sidebar from './components/sidebar/sidebar'
import Main from './components/Main/Main'
//import './App.css'; // Import your CSS file

const App = () => {
  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  )
}

export default App


// import React, { useState } from 'react';

// const App = () => {
//     const [query, setQuery] = useState('');
//     const [response, setResponse] = useState('');

//     const handleQuery = async () => {
//         try {
//             const res = await fetch(`http://127.0.0.1:8000/api/query/?query=${query}`);
//             const data = await res.json();
//             setResponse(data.response || data.error);
//         } catch (error) {
//             setResponse("Failed to fetch response.");
//         }
//     };

//     return (
//         <div>
//             <h1>Query FastAPI through Django</h1>
//             <input
//                 type="text"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Enter your query"
//             />
//             <button onClick={handleQuery}>Send Query</button>
//             <p>Response: {response}</p>
//         </div>
//     );
// };

// export default App;
