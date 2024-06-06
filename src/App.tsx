import React from 'react';
import './App.css';
import UserList from './components/UserList';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <UserList />
            </header>
        </div>
    );
};

export default App;
