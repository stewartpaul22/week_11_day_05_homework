var Customer = function(name){
  this.name = name;
  this.recordCollection = [];
  this.wallet = 0.00;
}

Customer.prototype.addFundsToWallet = function (amount) {
  this.wallet += amount;
};


module.exports = Customer;
