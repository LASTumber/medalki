const db = require('../../config/db'); // используем твой метод подключения к БД

async function updatePurchaseCounts(cardIds = []) {
  const updatePromises = cardIds.map(id =>
    db.query('UPDATE cards SET purchases_count = purchases_count + 1 WHERE id = ?', [id])
  );
  await Promise.all(updatePromises);
}

module.exports = updatePurchaseCounts;
