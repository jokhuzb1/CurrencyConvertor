import './App.css';
import Counter, { decrement, increment } from './Components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Convertor from './Components/Convertor';
import Main from './Components/Tab'
import Charts from './Components/Charts'
function App() {




  const classes = useStyles()
  const dispatch = useDispatch();
  return (
    <div className="App">

      <Main />
    </div>
  );
}



const useStyles = makeStyles({
  btn: {
    backgroundColor: "#3D56B2",
    "&:hover": {
      backgroundColor: '#5C7AEA',
    },
    color: 'white'
  }
})
export default App;
