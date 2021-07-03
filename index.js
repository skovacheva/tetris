
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
      keysDown,
      startTime,
      interval,
      level,
      levelUpStartTime,
      levelText,
      levelUpTextPosition,
      fadeOpacity,
      rowsUntillBrake,
      rowsToRest,
      breaking,
      gamePaused

  function init() {
    gameOver = false;
    grid = [];
    rotation = 0;
    playTime = 0;
    numberOfLines = 0;
    numberOfPieces = 0;
    keysDown = {};
    level = 1;
    rowsUntillBrake = undefined;
    rowsToRest = undefined;
    breaking = false;
    gamePaused = false;

    interval = {
      1: 800,
      2: 600,
      3: 400,
      4: 350,
      5: 250,
    }

    piece = newPiece();
    newGrid();
    startTime = Date.now();

    addEventListeners();

    app.ticker.add(gameLoop);
    app.ticker.add(isGameOver);
    app.ticker.start();
  }

  function addEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  }

  function removeEventListeners() {
    keysDown = {};
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
  }

  function newPiece() {
    rotation = 0;
    currentShape = shapes[randomInt(0, shapes.length)];

    let emptyRows = 0
    for (let i = currentShape[rotation].length - 1; i >= 0; i--) {
      let isEmpty = true
      currentShape[rotation][i].forEach((col) => {
        if (col) isEmpty = false;
      });
      if (isEmpty) emptyRows++
    }

    return {
      shape: currentShape[rotation],
      position: {
        x: app.view.width / 2 - currentShape.length * SQUARE_SIZE / 2,
        y: (currentShape[rotation].length - emptyRows) * SQUARE_SIZE * -1
      },
    }
  }

  function newGrid() {
    for (var row = 0; row < ROWS; row++) {
      grid.push(new Array(COLUMNS).fill(0));
    }
  }

  let fallCounter = 0;
  let lastTime = Date.now();
  function gameLoop() {
    let now = Date.now();
    playTime = now - startTime;

    const deltaTime = now - lastTime;
    lastTime = now;
    fallCounter += deltaTime;

    if (fallCounter > interval[level]) {
      moveDown();
      fallCounter = 0;
      if (bottomCollision()) {

        if (keysDown[37] && !leftCollision()) {
          piece.position.x -= SQUARE_SIZE;
          keysDown = {};
          if (!bottomCollision()) {
            return;
          }
        }
        if (keysDown[39] && !rightCollision()) {
          piece.position.x += SQUARE_SIZE;
          keysDown = {};
          if (!bottomCollision()) {
            return;
          }
        }

        copyOnGrid();
        checkLines();

        numberOfPieces++;
        piece = newPiece();
        moveDown();
      }
    }
    draw();
  }

  function isGameOver() {
    grid[0].forEach((col, colIndex) => {
      if (grid[0][colIndex]) {
        gameOver = true;
        app.ticker.remove(gameLoop);
      }
    })
    if (gameOver) {
      playTime = app.ticker.lastTime;
      draw();
      handleGameOver();
      app.ticker.remove(isGameOver);
    }
  }

  function checkLines() {
    const linesToRemove = [];

    grid.forEach((row, rowIndex) => {
      let line = true;
      row.forEach((col, colIndex) => {
        if (!col) {
          line = false;
        }
      });
      if (line) {
        linesToRemove.push(rowIndex)
        numberOfLines++;
      }
    })

    removeLine(linesToRemove);

    switch (true) {
      case numberOfLines >= 20 && numberOfLines < 40 && level != 2:
        level = 2;
        levelText = 'Level 2';
        displaySplah();
        break;
      case numberOfLines >= 40 && numberOfLines < 60 && level != 3:
        level = 3;
        levelText = 'Level 3';
        displaySplah();
        break;
      case numberOfLines >= 60 && numberOfLines < 80 && level != 4:
        level = 4;
        levelText = 'Level 4';
        displaySplah();
        break;
      case numberOfLines >= 80 && level != 5:
        rowsUntillBrake = 5;
        level = 5;
        levelText = 'Wow! Level 5';
        displaySplah();
        break
      case level === 5:
        if (rowsUntillBrake <= 0 && !breaking) {
          breaking = true;
          rowsToRest = 0
          interval[5] = 500;
          levelText = 'have a break, pro!';
          displaySplah();
        } else if (rowsToRest >= 5 && breaking) {
          breaking = false;
          rowsUntillBrake = 5;
          interval[5] = 150;
          levelText = 'back to business';
          displaySplah();
        }
        break;
    }
  }

  function displaySplah() {
    removeEventListeners();
    app.ticker.stop();
    app.ticker.remove(gameLoop);
    app.ticker.add(levelUp);
    app.ticker.start();
    levelUpStartTime = Date.now()
    levelUpTextPosition = app.view.height / 2;
    fadeOpacity = 0;
  }

  function levelUp() {
    let now = Date.now();

    if(now - levelUpStartTime > 1800) {
      app.ticker.stop();
      app.ticker.remove(levelUp);
      app.ticker.add(gameLoop);
      app.ticker.start();
      addEventListeners();
    }

    levelUpTextPosition -= 0.3;
    fadeOpacity += 0.010
    levelUpSplash(levelUpTextPosition, fadeOpacity);
  }

  function levelUpSplash(textPosition, fadeOpacity) {
    draw();

    const mainTextOptions = {
        font: 'Roboto',
        fontSize: 32,
        fontWeight: 'bolder',
        fill: '#ffb84d',
        dropShadow: true,
        dropShadowAlpha: 0.5,
        dropShadowAngle: Math.PI/2,
    }
    const levelUpText = new Text(`${levelText}`, mainTextOptions);
    levelUpText.anchor.set(0.5, 0.5);
    levelUpText.x = app.view.width / 2;
    levelUpText.y = textPosition;
    app.stage.addChild(levelUpText);

    let fadeText = new Graphics();
    fadeText.beginFill(0x061639, fadeOpacity);
    fadeText.drawRect(0, 0, app.view.width, app.view.height);
    fadeText.endFill();
    app.stage.addChild(fadeText);
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
    for (let i = app.stage.children.length - 1; i >= 0; i--) {
      app.stage.removeChildAt(i);
    };

    createShapes(grid, { x: 0, y: 0 });
    createShapes(piece.shape, piece.position);
  }

  function removeLine(indices) {
    indices.forEach((index) => {
      grid.splice(index, 1);
      grid.unshift(new Array(COLUMNS).fill(0));
    });

    if (rowsUntillBrake) {
      rowsUntillBrake -= indices.length;
    }

    if (rowsToRest !== undefined) {
      rowsToRest += indices.length
    }
  }

  function pause() {
    gamePaused = true;
    app.ticker.stop();
    app.ticker.remove(gameLoop);
    app.ticker.add(animateText);

    let rectangle = new Graphics();
    rectangle.beginFill(0x061639, 0.8);
    rectangle.drawRect(0, 0, app.view.width, app.view.height);
    rectangle.endFill();

    app.stage.addChild(rectangle);

    const mainTextOptions = {
        font: 'Roboto',
        fontSize: 48,
        fontWeight: 'bolder',
        fill: '#1affc6',
        dropShadow: true,
        dropShadowAlpha: 0.5,
        dropShadowAngle: Math.PI/2,
        align: 'center',
    }
    const instructuionOptions = {
        font: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#FFF',
        lineJoin: 'round'
    }

    const pausedText = new Text('Game \n Paused!', mainTextOptions);
    instructionText = new Text('Press ENTER to resume', instructuionOptions);

    pausedText.anchor.set(0.5, 0.5);
    pausedText.x = app.view.width / 2;
    pausedText.y = app.view.height / 2 - 50;

    instructionText.anchor.set(0.5, 0.5);
    instructionText.x = app.view.width / 2;
    instructionText.y = app.view.height - 80;

    app.stage.addChild(pausedText);
    app.stage.addChild(instructionText);
    app.ticker.start();

  }

  function resume() {
    gamePaused = false;

    childsToremove = 3;
    while (childsToremove > 0) {
      app.stage.removeChildAt(app.stage.children.length - 1);
      childsToremove--;
    }
    app.ticker.remove(animateText);
    app.ticker.add(gameLoop);
    app.ticker.start();
  }

  function handleKeyDown(event) {
    keysDown[event.keyCode] = true;

    if (event.keyCode === 13) {
      console.log(app.ticker);
      if (!gamePaused) {
        pause();
      } else {
        resume();
      }
    }

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
    if (bottomCollision()) {
      return;
    }
    
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
    app.ticker.add(animateText);

    removeEventListeners();

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

    document.addEventListener('keydown', restartGame);
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
  }

  function restartGame(event) {
    if (event.keyCode === 32) {
      document.removeEventListener('keydown', restartGame);
      app.ticker.remove(animateText);
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
