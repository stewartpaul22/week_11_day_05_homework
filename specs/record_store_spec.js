var assert = require('assert');
var RecordStore = require('../record_store.js');
var Record = require('../record.js');

describe('Record Store', function(){

  var record_store;

  beforeEach(function(){
    record_store = new RecordStore('Disc Us', 'Glasgow');
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

  it('should have a balance', function(){
    assert.strictEqual(record_store.balance, 0);
  });
  
});
