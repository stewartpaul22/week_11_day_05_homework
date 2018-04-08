var assert = require('assert');
var Customer = require('../customer.js');
var RecordStore = require('../record_store.js');
var Record = require('../record.js');

describe('Customer', function(){

  var customer1;
  var customer2;
  var record_store;
  var record1;
  var record2;
  var record3;
  var record4;
  var record5;

  beforeEach(function(){
    customer1 = new Customer('Jeff');
    customer2 = new Customer('Mary');
    record_store = new RecordStore('Disc Us', 'Glasgow');
    record1 = new Record('Black Sabbath', 'Sabbath Bloody Sabbath', 'Metal', 5.95);
    record2 = new Record('Four Tet', 'New Energy', 'Electronic', 9.99);
    record3 = new Record('Mary Ocher', 'Eden', 'Experimental', 7.50);
    record4 = new Record('Oneohtrix Point Never', 'Replica', 'Electronic', 5.95);
    record5 = new Record('New Order', 'Power, Corruption & Lies', 'New wave', 5.95);
    record_store.addRecord(record1);
    record_store.addRecord(record2);
    record_store.addRecord(record3);
    record_store.addRecord(record4);
  })

  it('should have a name', function(){
    assert.strictEqual(customer1.name, 'Jeff');
  });

  it('should have a record collection - empty', function(){
    assert.deepStrictEqual(customer1.recordCollection, []);
  });

  it('should have a wallet - zero balance', function(){
    assert.strictEqual(customer1.wallet, 0.00);
  });

  it('can add have funds added to wallet', function(){
    customer1.addFundsToWallet(50.00);
    assert.strictEqual(customer1.wallet, 50.00);
  });

  it('can buy a record from a store - has funds', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);
    assert.strictEqual(customer1.wallet, 44.05);
    assert.deepStrictEqual(customer1.recordCollection, [record1]);
    assert.strictEqual(record_store.balance, 5.95);
    assert.deepStrictEqual(record_store.inventory, [record2, record3, record4]);
  });

  it('cannot buy a record from a store - no funds', function(){
    customer1.buyRecordfromStore(record_store, record1);
    assert.strictEqual(customer1.wallet, 0.00);
    assert.deepStrictEqual(customer1.recordCollection, []);
    assert.strictEqual(record_store.balance, 0.00);
    assert.deepStrictEqual(record_store.inventory, [record1, record2, record3, record4]);
  });

  it('cannot buy a record from a store - record unavailable', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record5);
    assert.strictEqual(customer1.wallet, 50.00);
    assert.deepStrictEqual(customer1.recordCollection, []);
    assert.strictEqual(record_store.balance, 0.00);
    assert.deepStrictEqual(record_store.inventory, [record1, record2, record3, record4]);
  });


  it('can buy a record from another customer - available funds, record available', function(){
    customer2.addFundsToWallet(5.95);
    customer2.buyRecordfromStore(record_store, record1);
    customer1.addFundsToWallet(5.95);
    customer1.buyRecordFromCustomer(customer2, record1);
    assert.strictEqual(customer1.wallet, 0.00);
    assert.strictEqual(customer2.wallet, 5.95);
    assert.deepStrictEqual(customer1.recordCollection, [record1]);
  });

  it('cannot buy a record from another customer - no funds, record available', function(){
    customer2.addFundsToWallet(5.95);
    customer2.buyRecordfromStore(record_store, record1);
    customer1.buyRecordFromCustomer(customer2, record1);
    assert.strictEqual(customer1.wallet, 0.00);
    assert.strictEqual(customer2.wallet, 0.00);
  });

  it('cannot buy a record from another customer - funds available, record unavailable', function(){
    customer1.addFundsToWallet(5.95);
    customer1.buyRecordFromCustomer(customer2, record1);
    assert.strictEqual(customer1.wallet, 5.95);
    assert.deepStrictEqual(customer1.recordCollection, []);
  });

  //The RecordCollector should be able to view the total value of their collection

  //The RecordCollector should be able to view the total value of all records of a given Genre

  //The RecordCollector should be able to view their most valuable record.

  //The RecordCollector should be able to sort their records by value. (ascending or descending)

  //The RecordCollector should be able to compare the value of their collection with another RecordCollector


});
