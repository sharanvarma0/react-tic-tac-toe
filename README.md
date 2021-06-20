This is a simple ReactJS app made for playing tic-tac-toe. This was created for learning purposes of JSX, REACT DOM and render, function components,etc.
While the app if fully functional, It can be improved. It is however a fully frontend based app and there is no backend logic for this.

The game works by rendering 6 squares as buttons on which you can click. Each click executes an event handler that changes a matrix like object's state in the game.
This change of state is recorded by react and rendered again which then allows the symbol to appear. This continues until a winner is decided.

Square (Function component): The square is the basic component. It is just an encapsulated button as a function component. Initially I thought of recording the state in this,
                             but it would be harder in the future to refactor the code if bugs propped up.

Board (React Component): The board component uses the square component to render several squares in a matrix like format (3x3 grid). Each square here is a button which when clicked,
                         triggers an event handler to display the character played.

Game (React Component): The Game component encapsulates both the square and the board as a complete unit. All the event handlers and history logic (what I call travel) is written here.
                        The event handlers can be accessed in board by just passing it as a property. In board, use {this.props.<function_name>} to invoke the handler.

Code: src/index.js
CSS: src/index.css

The syntax uses JSX (Javascript Extensions) for react which allows us to use full power of javascript to declare expressions and variables and use them in react frontend components.

Dockerfile
----------
I have created a docker file due to the unit based nature of this application. The docker file uses the following configurations:
    
    Base Image: NodeJS on Alpine LTS 3.13
    Working Directory: /app
    Muti stage build: No
    Commands: Install reactjs and react dom packages. Then run the app ('npm start')

You can find the docker image here: sharanvarma0/tic-tac-toe:1.0 (https://hub.docker.com/repository/docker/sharanvarma0/tic-tac-toe).

