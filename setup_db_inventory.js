const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./inventory.sqlite');

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS inventory");
    db.run(`CREATE TABLE inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT NOT NULL,
        stock_qty INTEGER NOT NULL,
        min_threshold INTEGER NOT NULL
    )`);

    const stmt = db.prepare("INSERT INTO inventory (product_name, stock_qty, min_threshold) VALUES (?, ?, ?)");
    const items = [
        ["Wireless Mouse", 45, 20],
        ["Mechanical Keyboard", 12, 15],
        ["USB-C Hub", 8, 25],
        ["27-inch Monitor", 5, 10],
        ["Ergonomic Chair", 19, 15],
        ["Laptop Stand", 30, 10],
        ["HDMI Cable", 60, 30],
        ["Webcam 1080p", 4, 12],
        ["Desk Pad", 22, 15],
        ["Bluetooth Speaker", 14, 20]
    ];
    
    items.forEach(item => stmt.run(item));
    stmt.finalize();
    console.log("Inventory database initialized with 10 records.");
});

db.close();