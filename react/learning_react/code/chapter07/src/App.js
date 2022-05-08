import CheckBox from './components/CheckBox';
import AppComponent from './components/App';
import { useLayoutEffect } from 'react';

function App() {
  useLayoutEffect(() => console.log('use layout effect'));
  return (
    <div>
      <CheckBox />
      {/* <AppComponent /> */}
    </div>
  );
}

export default App;
