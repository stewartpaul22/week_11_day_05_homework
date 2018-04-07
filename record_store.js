var RecordStore = function(name, city){
  this.name = name;
  this.city = city;
  this.inventory = [];
  this.balance = 0;
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
  let result = ""
  for (let record of this.inventory) {
    result += this.printProperties(record);
  }
  return result;
};

RecordStore.prototype.sellRecord = function (record) {
  this.balance += record.price;
  const index = this.inventory.indexOf(record);
  this.inventory = this.inventory.splice(index, 1);
};

module.exports = RecordStore;
