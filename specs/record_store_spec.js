var assert = require('assert');
var RecordStore = require('../record_store.js');
var Record = require('../record.js');

describe('Record Store', function(){

  var record_store;
  var record1;
  var record2;
  var record3;
  var record4;

  beforeEach(function(){
    record_store = new RecordStore('Disc Us', 'Glasgow');
    record1 = new Record('Black Sabbath', 'Sabbath Bloody Sabbath', 'Metal', 5.95);
    record2 = new Record('Four Tet', 'New Energy', 'Electronic', 9.99);
    record3 = new Record('Mary Ocher', 'Eden', 'Experimental', 7.50);
    record4 = new Record('Oneohtrix Point Never', 'Replica', 'Electronic', 5.95);
  })

  it('should have a name', function(){
    assert.strictEqual(record_store.name, 'Disc Us');
  });

  it('should have a city', function(){
    assert.strictEqual(record_store.city, 'Glasgow');
  });

  it('should have an inventory - empty', function(){
    assert.deepStrictEqual(record_store.inventory, []);
  });

  it('should have an inventory - with record', function(){
    record_store.addRecord(record1);
    record_store.addRecord(record2);
    assert.deepStrictEqual(record_store.inventory, [record1, record2]);
  });

  it('should have a balance', function(){
    assert.strictEqual(record_store.balance, 0);
  });

  it('should be able to print its properties as a string', function(){
    assert.strictEqual(record_store.printProperties(record1), "artist: Black Sabbath. title: Sabbath Bloody Sabbath. genre: Metal. price: 5.95. \n");
  });

  it('should be able to list the inventory', function(){
    record_store.addRecord(record1);
    record_store.addRecord(record2);
    assert.strictEqual(record_store.listInventory(), "artist: Black Sabbath. title: Sabbath Bloody Sabbath. genre: Metal. price: 5.95. \nartist: Four Tet. title: New Energy. genre: Electronic. price: 9.99. \n")
  });

  it('should be able to sell a record that increases the balance and reduces the inventory', function(){
    record_store.addRecord(record2);
    record_store.addRecord(record1);
    record_store.addRecord(record3);
    record_store.sellRecord(record1);
    assert.strictEqual(record_store.inventory.length, 2);
    assert.strictEqual(record_store.balance, 5.95);
  });

  it('should be able to get the current inventory value - no stock', function(){
    assert.strictEqual(record_store.getInventoryValue(), 0.00);
  });

  it('should be able to get the current inventory value - with stock', function(){
    record_store.addRecord(record1);
    assert.strictEqual(record_store.getInventoryValue(), 5.95);
  });

  it('should be able to show balance and inventory value - no sales', function(){
    record_store.addRecord(record1); //5.95
    record_store.addRecord(record2); //9.99 + 5.95 = 15.94
    record_store.addRecord(record3); //7.50 + 9.99 + 5.95 = 23.44
    assert.strictEqual(record_store.reportFinancial(), "Balance: £0.00 - Inventory value: £23.44");
    record_store.sellRecord(record3);
  });

  it('should be able to show balance and inventory value - stock sold', function(){
    record_store.addRecord(record1); //5.95
    record_store.addRecord(record2); //9.99 + 5.95 = 15.94
    record_store.addRecord(record3); //7.50 + 9.99 + 5.95 = 23.44
    record_store.sellRecord(record3); //23.44 - 7.50 = 15.94
    assert.strictEqual(record_store.reportFinancial(), "Balance: £7.50 - Inventory value: £15.94");
  });
  
  it('should be able to view all records by genre', function(){
    record_store.addRecord(record1);
    record_store.addRecord(record2);
    record_store.addRecord(record3);
    record_store.addRecord(record4);
    assert.deepStrictEqual(record_store.allByGenre('Electronic'), [record2, record4]);
  });

});
