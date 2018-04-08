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
    record5 = new Record('New Order', 'Power, Corruption & Lies', 'New wave', 9.99);
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
    assert.deepStrictEqual(customer2.recordCollection, []);
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

  it('can view the total value of their collection', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);
    customer1.buyRecordfromStore(record_store, record2);
    assert.strictEqual(customer1.collectionValue(), 15.94);
  });

  it('can view collection value by genre', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);
    customer1.buyRecordfromStore(record_store, record2);
    customer1.buyRecordfromStore(record_store, record3);
    customer1.buyRecordfromStore(record_store, record4);
    assert.strictEqual(customer1.collectionValue('Electronic'), 15.94);
  });

  it('can view their most valuable record - one match', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);
    customer1.buyRecordfromStore(record_store, record2);//9.99
    customer1.buyRecordfromStore(record_store, record3);
    customer1.buyRecordfromStore(record_store, record4);
    assert.strictEqual(customer1.mostValuableRecord(), 9.99);
  });

  it('can view their most valuable record - multiple matches', function(){
    record_store.addRecord(record5);
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);
    customer1.buyRecordfromStore(record_store, record2);//9.99
    customer1.buyRecordfromStore(record_store, record3);
    customer1.buyRecordfromStore(record_store, record4);
    customer1.buyRecordfromStore(record_store, record5);//9.99
    assert.strictEqual(customer1.mostValuableRecord(), 9.99);
  });

  it('can sort collection by value - low to high', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);//5.95
    customer1.buyRecordfromStore(record_store, record2);//9.99
    customer1.buyRecordfromStore(record_store, record3);//7.50
    customer1.buyRecordfromStore(record_store, record4);//5.95
    assert.deepStrictEqual(customer1.orderCollection('asc', 'asc'), [record4, record1, record3, record2]);
  });

  it('can sort collection by value - high to low', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);//5.95
    customer1.buyRecordfromStore(record_store, record2);//9.99
    customer1.buyRecordfromStore(record_store, record3);//7.50
    customer1.buyRecordfromStore(record_store, record4);//5.95
    assert.deepStrictEqual(customer1.orderCollection('desc', 'asc'), [record2, record3, record4, record1]);
  });

  it('can compare collection value with other customer - customer1 lesser', function(){
    customer1.addFundsToWallet(50.00);
    customer1.buyRecordfromStore(record_store, record1);//5.95
    customer1.buyRecordfromStore(record_store, record2);//9.99
    customer2.addFundsToWallet(50.00);
    customer2.buyRecordfromStore(record_store, record3);//7.50
    customer2.buyRecordfromStore(record_store, record4);//5.95
    let result = customer1.compareCollection(customer2);
    assert.strictEqual(result, "Jeff's collection is worth £15.94, Mary's collection is worth £13.45");
  });

});
