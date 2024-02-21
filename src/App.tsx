import React from 'react';
import Header from './components/Header';
import Presentation from './components/Presentation';
import Form from './components/Form';
import Legend from './components/Legend';
import List from './components/List';
import Footer from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './store';
import { getLocations } from './store/reducers/location.reducer';
import Loading from './components/Loading';


function App() {

  const locations = useSelector((selector: AppState) => selector.location.data);
  const loading = useSelector((selector: AppState) => selector.location.loading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getLocations() as any);
  }, []);

  React.useEffect(() => {
    console.log(locations)
  }, [locations])


  return (
    <React.Fragment>
      <Header/>
     <div className="flex flex-col gap-8 p-5 max-w-[900px] mx-auto sm:pb-16">
        <Presentation/>
        <Form/>
        <Legend/>
        { loading && <Loading/>}
        { !loading && <List data={locations}/> }
     </div>
     <Footer/>
    </React.Fragment>
  )
}

export default App
