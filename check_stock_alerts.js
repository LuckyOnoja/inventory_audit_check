const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./inventory.sqlite');

db.all("SELECT * FROM inventory", [], (err, rows) => {
    if (err) {
        throw err;
    }

    console.log("INVENTORY STOCK AUDIT");

    rows.forEach(row => {
        const status = row.stock_qty <= row.min_threshold ? " LOW STOCK ALERT PAY ATTENTION!!!!!!!!" : "Our Stock Level is Ok";
        console.log(`[ID:  ${row.id}] ${row.product_name} | stock : ${row.stock_qty} | min threshold : ${row.min_threshold} | ${status}`);
    });
});

db.close();