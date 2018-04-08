var Customer = function(name){
  this.name = name;
  this.recordCollection = [];
  this.wallet = 0.00;
}

Customer.prototype.addFundsToWallet = function (amount) {
  this.wallet += amount;
};

Customer.prototype.buyRecordfromStore = function (store, record) {
  if (this.wallet < record.price) { return }
  if (!(store.inventory.includes(record))) { return }
  this.recordCollection.push(store.sellRecord(record));
  this.decreaseWallet(record);
};

Customer.prototype.buyRecordFromCustomer = function(sellingCustomer, record) {
  if (this.wallet < record.price) { return }
  if (!(sellingCustomer.recordCollection.includes(record))) { return }
  this.recordCollection.push(sellingCustomer.sellToCustomer(record));
  this.decreaseWallet(record);
};

Customer.prototype.sellToCustomer = function(record) {
  this.increaseWallet(record);
  this.removeRecordFromCollection(record);
  return record;
};

Customer.prototype.collectionValue = function(genre) {
  let total = 0.00;
  for (let item of this.recordCollection) {
    if (genre === item.genre) { total += item.price; }
    if (genre === undefined) { total += item.price; }
  }
  return parseFloat(total.toFixed(2));

  // return parseFloat((this.recordCollection.reduce((runningTotal, record) => runningTotal + record.price, 0)).toFixed(2));
};

Customer.prototype.removeRecordFromCollection = function (record) {
  const index = this.recordCollection.indexOf(record);
  this.recordCollection.splice(index, 1);
};

Customer.prototype.decreaseWallet = function(record) {
  this.wallet -= record.price;
};

Customer.prototype.increaseWallet = function(record) {
  this.wallet += record.price;
};

module.exports = Customer;
