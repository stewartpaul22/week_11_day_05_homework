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
  // for enumeration, check if there is a stringBuilder
};

RecordStore.prototype.listInventory = function () {
  let result = ""
  for (let record of this.inventory) {
    result += this.printProperties(record);
  }
  return result;
  // for enumeration, check if there is a stringBuilder
};

RecordStore.prototype.sellRecord = function (record) {
  this.balance += record.price;
  const index = this.inventory.indexOf(record);
  this.inventory.splice(index, 1);
};

RecordStore.prototype.getInventoryValue = function() {
  return this.inventory.reduce((runningTotal, record) => runningTotal + record.price, 0);
};

RecordStore.prototype.reportFinancial = function() {
  let inventoryValue = this.getInventoryValue().toFixed(2);
  let result = "";
  result = `Balance: £${this.balance.toFixed(2)} - Inventory value: £${inventoryValue}`;
  return result;
};


module.exports = RecordStore;
