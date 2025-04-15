// Настройка Matter.js
const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
    }
});

Render.run(render);
Engine.run(engine);

// Добавление мыши для взаимодействия
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});
World.add(engine.world, mouseConstraint);

// Создание платформы
const platform = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 20, window.innerWidth, 20, { isStatic: true });
World.add(engine.world, platform);

// Обработка добавления фигур
function addShape(shape) {
    let newShape;
    if (shape === 'rectangle') {
        newShape = Bodies.rectangle(Math.random() * window.innerWidth, 0, 50, 50);
    } else if (shape === 'circle') {
        newShape = Bodies.circle(Math.random() * window.innerWidth, 0, 25);
    } else if (shape === 'triangle') {
        newShape = Bodies.polygon(Math.random() * window.innerWidth, 0, 3, 30);
    }
    World.add(engine.world, newShape);
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;

    // Обновление платформы при изменении размера окна
    Matter.Body.setPosition(platform, { x: window.innerWidth / 2, y: window.innerHeight - 20 });
    Matter.Body.scale(platform, window.innerWidth / platform.bounds.max.x, 1); // Масштабируем платформу
});

let wallsVisible = true; // Переменная для отслеживания состояния стен

document.getElementById('toggleWalls').addEventListener('click', function() {
    wallsVisible = !wallsVisible; // Меняем состояние стен
    toggleWalls(wallsVisible);
});

function toggleWalls(visible) {
    if (visible) {
        // Код для добавления боковых стен
        addWalls();
    } else {
        // Код для удаления боковых стен
        removeWalls();
    }
}

function addWalls() {
    // Логика для добавления боковых стен
}

function removeWalls() {
    // Логика для удаления боковых стен
}
