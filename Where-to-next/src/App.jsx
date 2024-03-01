import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './components/search/search';

function App() {

    const handleOnSearchChange = (searchData) =>
  {
    console.log(searchData);
  }

  return (
    <>
    <h1 className="title"> Where To Next? </h1>
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
    </div>
    </>
  )
}

export default App
