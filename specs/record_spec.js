var assert = require('assert');
var Record = require('../record.js');

describe('Record', function(){

  var record1;
  var record2;
  var record3;
  var record4;

  beforeEach(function(){
    record1 = new Record('Black Sabbath', 'Sabbath Bloody Sabbath', 'Metal', 5.95);
    record2 = new Record('Four Tet', 'New Energy', 'Electronic', 9.99);
    record3 = new Record('Mary Ocher', 'Eden', 'Experimental', 7.50);
    record4 = new Record('Prince', 'Controversy', 'New wave', 5.95);
  })

  it('should have an artitst', function(){
    assert.strictEqual(record1.artist, 'Black Sabbath');
  });

  it('should have a title', function(){
    assert.strictEqual(record1.title, 'Sabbath Bloody Sabbath');
  });

  it('should have a genre', function(){
    assert.strictEqual(record1.genre, 'Metal');
  });

  it('should have a price', function(){
    assert.strictEqual(record1.price, 5.95);
  });

});
