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
    record4 = new Record('Prince', 'Controversy', 'New wave', 5.95);
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

});
