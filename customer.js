var Customer = function(name){
  this.name = name;
  this.recordCollection = [];
  this.wallet = 0.00;
}

Customer.prototype.addFundsToWallet = function (amount) {
  this.wallet += amount;
};

Customer.prototype.buyRecordfromStore = function (store, record) {
  if (this.wallet >= record.price) {
    this.recordCollection.push(store.sellRecord(record));
    this.wallet -= record.price;
  }
};


module.exports = Customer;
