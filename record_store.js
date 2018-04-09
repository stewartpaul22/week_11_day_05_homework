var RecordStore = function(name, city){
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = 0.00;
}

RecordStore.prototype.addRecord = function (record) {
  this.inventory.push(record);
};

RecordStore.prototype.printProperties = function(record) {
  let result = "";
  for (var property in record) {
    result += property + ": " + record[property] + ". ";
  }
  return result + "\n";
};

RecordStore.prototype.listInventory = function () {
  let result = "";
  (this.inventory).forEach(record => result += (this.printProperties(record)));
  return result;
};

RecordStore.prototype.sellRecord = function (record) {
  this.increaseBalance(record);
  this.removeRecordFromInventory(record);
  return record;
};

RecordStore.prototype.increaseBalance = function(record) {
  this.balance += record.price;
};

RecordStore.prototype.removeRecordFromInventory = function (record) {
  const index = this.inventory.indexOf(record);
  this.inventory.splice(index, 1);
};

RecordStore.prototype.reportFinancial = function() {
  let inventoryValue = this.getInventoryValue().toFixed(2);
  let result = "";
  result = `Balance: £${this.balance.toFixed(2)} - Inventory value: £${inventoryValue}`;
  return result;
};

RecordStore.prototype.getInventoryValue = function() {
  return this.inventory.reduce((runningTotal, record) => runningTotal + record.price, 0);
};

RecordStore.prototype.allByGenre = function(genre) {
  return (this.inventory).filter(record => record.genre === genre);
};


module.exports = RecordStore;
