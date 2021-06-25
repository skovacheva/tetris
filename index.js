
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  TextureCache = PIXI.utils.TextureCache,
  Rectangle = PIXI.Rectangle,
  Graphics = PIXI.Graphics,
  Text = PIXI.Text

  const COLUMNS = 10;
  const ROWS = 20;
  const SQUARE_SIZE = 30;

  // Add sound at some point
  let app = new Application({
    width: COLUMNS * SQUARE_SIZE,
    height: ROWS * SQUARE_SIZE,
    antialias: true,
    transperant: true,
  });

  document.body.appendChild(app.view);
  // Cente view
  app.renderer.backgroundColor = 0x061639;

  const shapes = [
    [
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ],
    [
      [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
      ],
      [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
      ],
      [
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
      ],
      [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
      ],
    ],
    [
      [
        [0, 0, 0],
        [3, 3, 3],
        [0, 3, 0],
      ],
      [
        [0, 3, 0],
        [3, 3, 0],
        [0, 3, 0],
      ],
      [
        [0, 3, 0],
        [3, 3, 3],
        [0, 0, 0],
      ],
      [
        [0, 3, 0],
        [0, 3, 3],
        [0, 3, 0],
      ],
    ],
    [
      [
        [0, 4, 0],
        [0, 4, 0],
        [0, 4, 4],
      ],
      [
        [0, 0, 0],
        [4, 4, 4],
        [4, 0, 0],
      ],
      [
        [4, 4, 0],
        [0, 4, 0],
        [0, 4, 0],
      ],
      [
        [0, 0, 4],
        [4, 4, 4],
        [0, 0, 0],
      ],
    ],
    [
      [
        [0, 0, 0, 0],
        [0, 0, 5, 5],
        [0, 5, 5, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 5, 0, 0],
        [0, 5, 5, 0],
        [0, 0, 5, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 5, 5],
        [0, 5, 5, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 5, 0],
        [0, 0, 5, 5],
        [0, 0, 0, 5],
        [0, 0, 0, 0]
      ],
    ],
    [
      [
        [0, 0, 0, 0],
        [6, 6, 0, 0],
        [0, 6, 6, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 6, 0, 0],
        [6, 6, 0, 0],
        [6, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [6, 6, 0, 0],
        [0, 6, 6, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      [
        [0, 0, 6, 0],
        [0, 6, 6, 0],
        [0, 6, 0, 0],
        [0, 0, 0, 0]
      ],
    ],
    [
      [
        [0, 0, 0, 0],
        [0, 7, 7, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 7, 7, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 7, 7, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 7, 7, 0],
        [0, 7, 7, 0],
        [0, 0, 0, 0],
      ],
    ],
  ];

  const fillColors = {
    1: 0xff6666,
    2: 0x66b3ff,
    3: 0x9999ff,
    4: 0x80e5ff,
    5: 0xb3ffd9,
    6: 0xffb84d,
    7: 0xffdb4d,
  }

  const strokeColors = {
    1: 0xb30000,
    2: 0x0080ff,
    3: 0x3333ff,
    4: 0x008fb3,
    5: 0x00b359,
    6: 0x995c00,
    7: 0x997a00,
  }

  let rotation,
      currentShape,
      piece,
      gameOver,
      grid,
      playTime,
      numberOfPieces,
      numberOfLines,
      instructionText,
      keysDown

  // TODO: Add timer!  Count pieces ! When Game Over - render splash screen with GAME OVER text and details

  function init() {
    gameOver = false;
    grid = [];
    rotation = 0;
    playTime = 0;
    numberOfLines = 0;
    numberOfPieces = 0;
    keysDown = {};

    currentShape = shapes[randomInt(0, shapes.length)];

    piece = {
      shape: currentShape[rotation],
      position: {
        x: app.view.width / 2 - currentShape.length * SQUARE_SIZE / 2,
        y: currentShape[rotation].length * SQUARE_SIZE * -1
      },
    }

    // Draw Grid Background
    for (var row = 0; row < ROWS; row++) {
      grid.push(new Array(COLUMNS).fill(0));
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    play();
  }

  let fallCounter = 0;
  let interval = 1000;
  let lastTime = 0;

  function play(time = 0) {
    // Fall each second
    const deltaTime = time - lastTime;
    lastTime = time;

    fallCounter += deltaTime;
    playTime += deltaTime;

    if (gameOver) {
      handleGameOver();
    } else {
      if (fallCounter > interval) {
        moveDown();
        fallCounter = 0;
      }

      if (bottomCollision() &&
          !gameOver &&
          !keysDown[37] &&
          !keysDown[39]
        ) {

        copyOnGrid();

        // Check if top is reached
        grid[0].forEach((col, colIndex) => {
          if (grid[0][colIndex]) {
            gameOver = true;
          }
        })

        // Check for lines
        grid.forEach((row, rowIndex) => {
          let line = true;
          row.forEach((col, colIndex) => {
            if (!col) {
              line = false;
            }
          });
          if (line) {
            removeLine(rowIndex);
            numberOfLines++;
          }
        })

        numberOfPieces++;
        currentShape = shapes[randomInt(0, shapes.length)];
        rotation = 0;
        piece.shape = currentShape[rotation];
        piece.position.x = app.view.width / 2 - currentShape.length * SQUARE_SIZE / 2;
        piece.position.y = currentShape[rotation].length * SQUARE_SIZE * -1;
      }

      draw();
      requestAnimationFrame(play);
    }
  }

  // Create Shapes
  function createShapes(piece, position) {
    piece.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        if(value) {
          x = colIndex * SQUARE_SIZE + position.x;
          y = rowIndex * SQUARE_SIZE + position.y;

          let rectangle = new Graphics();
          rectangle.beginFill(fillColors[value], 0.8);
          rectangle.lineStyle(1, strokeColors[value], 1);
          rectangle.drawRect(x, y, 30, 30);
          rectangle.endFill();
          app.stage.addChild(rectangle);
        }
      })
    })
  }

  function draw() {
    // Clear previoustly drawn piece
    for (let i = app.stage.children.length - 1; i >= 0; i--) {
      app.stage.removeChild(app.stage.children[i])
    };

    createShapes(grid, { x: 0, y: 0 });
    createShapes(piece.shape, piece.position);
  }

  function removeLine(rowIndex) {
    for (var row = rowIndex; row > 0; row--) {
      let upperRow = grid[row - 1];
      grid[row] = upperRow;
      if (!gameOver && row === 1) {
        grid[row - 1].fill(0)
      }
    }
  }

  function handleKeyDown(event) {
    keysDown[event.keyCode] = true;

    if (keysDown[37]) {
      moveLeft();
    }

    if (keysDown[39]) {
      moveRight();
    }

    if (keysDown[40]) {
      moveDown();
    }

    if (keysDown[38]) {
      rotate();
    }

    if (keysDown[32]) {
      drop();
    }
  }

  function handleKeyUp(event) {
    keysDown[event.keyCode] = false;
  }

  function rotate() {
    let stuck = false;
    let moved = false;

    if (rotation === 3) {
      rotation = 0
    } else {
      rotation ++
    }

    piece.shape = currentShape[rotation];


    if (rightCollision()) {
      const initialPosition = piece.position.x;

      while (rightCollision(piece.position.x - SQUARE_SIZE)) {
        piece.position.x -= SQUARE_SIZE;
      }

      if (leftCollision(piece.position.x + SQUARE_SIZE)) {
        stuck = true;
        rotation--;
        if (rotation < 0) {
          rotation = 3
        }
        piece.shape = currentShape[rotation];
        piece.position.x = initialPosition;
      }
    }

    if (leftCollision()) {
      const initialPosition = piece.position.x

      while (leftCollision(piece.position.x + SQUARE_SIZE)) {
        piece.position.x += SQUARE_SIZE;
      }

      if (rightCollision(piece.position.x - SQUARE_SIZE)) {
        stuck = true;
        rotation--;
        if (rotation < 0) {
          rotation = 3
        }
        piece.shape = currentShape[rotation];
        piece.position.x = initialPosition;
      }
    }

  }

  function moveRight() {
    if (!rightCollision()) {
      piece.position.x += SQUARE_SIZE;
    }
  }

  function moveLeft() {
    if (!leftCollision()) {
      piece.position.x -= SQUARE_SIZE;
    }
  }

  function moveDown() {
    if (!bottomCollision()) {
      piece.position.y += SQUARE_SIZE;
    }
  }

  function drop() {
    while (!bottomCollision()) {
      piece.position.y += SQUARE_SIZE;
    }
  }

  function bottomCollision() {
    collision = false;
    bottom = false;

    for (let row = piece.shape.length - 1; row >= 0; row--) {
      if (!collision && !bottom) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            let rowOnGrid = (piece.position.y / SQUARE_SIZE) + row + 1;
            bottom = rowOnGrid >= grid.length;
            const colOnGrid = (piece.position.x / SQUARE_SIZE) + col;

            if (rowOnGrid > grid.length - 1) {
              rowOnGrid = grid.length - 1;
            }
            if (!(rowOnGrid < 0)) {
              if (grid[rowOnGrid][colOnGrid]) {
                collision = true;
              }
            }
          }
        }
      }
    }
    return collision || bottom
  }

  function rightCollision(xPos = piece.position.x) {
    collision = false;
    right = false;

    for (let row = 0; row < piece.shape.length; row++) {
      if (!collision && !right) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            if (xPos + SQUARE_SIZE * (col + 1) >= app.view.width) {
              right = true;
            }

            let rowOnGrid = (piece.position.y / SQUARE_SIZE) + row;
            const colOnGrid = (xPos / SQUARE_SIZE) + col;

            if (!(rowOnGrid < 0)) {
              if (grid[rowOnGrid][colOnGrid + 1]) {
                collision = true;
              }
            }
          }
        }
      }
    }
    return collision || right;
  }

  function leftCollision(xPos = piece.position.x) {
    collision = false;
    left = false;

    for (let row = 0; row < piece.shape.length; row++) {
      if (!collision && !left) {
        for (let col = 0; col < piece.shape[row].length; col++) {
          if (piece.shape[row][col]) {
            if (xPos + SQUARE_SIZE * col <= 0) {
              left = true;
            }

            let rowOnGrid = (piece.position.y / SQUARE_SIZE) + row;
            const colOnGrid = (xPos / SQUARE_SIZE) + col;

            if (!(rowOnGrid < 0)) {
              if (grid[rowOnGrid][colOnGrid - 1]) {
                collision = true;
              }
            }
          }
        }
      }
    }
    return collision || left;
  }

  function copyOnGrid() {
    // Index on Grid
    const startRowIndex = piece.position.y / SQUARE_SIZE;
    const startColIndex = piece.position.x / SQUARE_SIZE;

    piece.shape.forEach((row, rowIndex) => {
      row.forEach((colValue, colIndex) => {
        if (colValue && (startRowIndex + rowIndex) >= 0) {
          grid[startRowIndex + rowIndex][startColIndex + colIndex] = colValue;
        }
      })
    })
  }

  function handleGameOver() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    let rectangle = new Graphics();
    rectangle.beginFill(0x061639, 0.8);
    rectangle.drawRect(0, 0, app.view.width, app.view.height);
    rectangle.endFill();

    const mainTextOptions = {
        font: 'Roboto',
        fontSize: 48,
        fontWeight: 'bolder',
        fill: '#99ebff',
        dropShadow: true,
        dropShadowAlpha: 0.5,
        dropShadowAngle: Math.PI/2,
        // stroke: '#FFF',
        // strokeThickness: 1,
        // lineJoin: 'round'
    }
    const textOptions = {
        font: 'Roboto',
        fontSize: 18,
        fill: '#FFF',
        lineJoin: 'round'
    }
    const instructuionOptions = {
        font: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#FFF',
        lineJoin: 'round'
    }
    const gameOverText = new Text('Game Over!', mainTextOptions);
    const playTimeText = new Text('Time: ' + millisToMinutesAndSeconds(playTime), textOptions);
    const numberOfPiecesText = new Text('Pieces played: ' + numberOfPieces, textOptions);
    const numberOfLinesText = new Text('Lines: ' + numberOfLines, textOptions);
    instructionText = new Text('Press SPACE to play again', instructuionOptions);

    gameOverText.anchor.set(0.5, 0.5);
    gameOverText.x = app.view.width / 2;
    gameOverText.y = app.view.height / 2 - 50;

    numberOfPiecesText.y += 80;
    numberOfLinesText.y += numberOfPiecesText.height + 80;
    playTimeText.y += numberOfLinesText.height * 2 + 80;

    numberOfPiecesText.x = app.view.width / 2 - gameOverText.width / 2;
    numberOfLinesText.x = app.view.width / 2 - gameOverText.width / 2;
    playTimeText.x = app.view.width / 2 - gameOverText.width / 2;

    instructionText.anchor.set(0.5, 0.5);
    instructionText.x = app.view.width / 2;
    instructionText.y = app.view.height - 80;

    app.stage.addChild(rectangle);
    app.stage.addChild(gameOverText);
    app.stage.addChild(playTimeText);
    app.stage.addChild(numberOfPiecesText);
    app.stage.addChild(numberOfLinesText);
    app.stage.addChild(instructionText);
    animateText();

    document.addEventListener('keydown', restartGame);
    // finish ...
  }

  let scale = 1;
  let increase = true;

  function animateText(time) {
    if (increase) {
      scale += 0.002
      instructionText.scale.set(scale);
      if (scale >= 1.06) {
        increase = false;
      }

    }
    if (!increase) {
      scale -= 0.002
      instructionText.scale.set(scale);
      if (scale <= 1) {
        increase = true;
      }
    }
    if (gameOver) {
      requestAnimationFrame(animateText);
    }
  }

  function restartGame(event) {
    if (event.keyCode === 32) {
      document.removeEventListener('keydown', restartGame);
      init();
    }
  }

  init();

  // Helper functions
  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
