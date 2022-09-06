function App() {
    return (<div className="App">
        <h1>Welcome Ayaz</h1>
        <h4>Your Tasks</h4>
        <div className="list">
            <div className="todo">
                <div className="checkbox"></div>
                <div className="text">Get Help</div>
                <div className="delete-todo">X</div>
            </div>
            <div className="todo">
                <div className="checkbox"></div>
                <div className="text">Go to the gym</div>
                <div className="delete-todo">X</div>
            </div>
            <div className="todo is-complete">
                <div className="checkbox"></div>
                <div className="text">Get Milk</div>
                <div className="delete-todo">X</div>
            </div>

        </div>

    </div>
    );
}

export default App;