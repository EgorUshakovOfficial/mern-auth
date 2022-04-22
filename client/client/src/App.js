import logo from './logo.svg';
import { Provider, connect } from 'react-redux';
import { store } from './state/store';
import { mapStateToProps } from './state/mapstatetoprops';
import { mapDispatchToProps } from './state/mapdispatchtoprops'; 
import './App.css';
import Presentational from './components/Presentational';

// Wrapper 
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

const App = () => {
  return (
    <Provider store={store}>
        <Container />
    </Provider>
  );
}

export default App;
