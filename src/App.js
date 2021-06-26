import './App.scss';
import { ClassProvider } from './contexts/ClassContext';
import { HooksContextProvider } from './contexts/HooksContext';
import { ReduxLikeContextProvider } from './contexts/ReduxContext';

import { Header, Intro } from './components';
import { ClassContextList, HooksContextList, ReduxLikeContextList } from './components';

function App() {
  return (
    <ClassProvider>
      <HooksContextProvider>
        <ReduxLikeContextProvider>
            <Header />
            <div className="content">
              <Intro />
              <ClassContextList />
              <ReduxLikeContextList />
              <HooksContextList />
            </div>
        </ReduxLikeContextProvider>
      </HooksContextProvider>
    </ClassProvider>
  );
}

export default App;
