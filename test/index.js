var Lazy = require('../index.js');
require("should");
var arr = [10, 23, 34, 35, 72];
describe('lazy-evaluation test', function(){
  it('test when there is no computing function', function(){
    let result = new Lazy(arr).take(2).exe();
    result.should.eql([10,23]);
  })

  it('test when input is an empty array', function(){
    try{
        let result = new Lazy([]).take(2).exe();
      }catch(e){
        e.message.should.eql('Sorry,array cannot be empty.');
      }
  })

  it('test when input is not an array', function(){
    try{
        let result = new Lazy(23).take(2).exe();
      }catch(e){
        e.message.should.eql('Sorry,only array is supported.');
      }
  })

  it('test when filter function is not invalid', function(){
      try{
            let result = new Lazy(arr).filter([23]).exe();
      }catch(e){
        e.message.should.eql('Sorry,parameter should be a function.');
      }
  })

  it('test when map function is not invalid', function(){
      try{
            let result = new Lazy(arr).map([23]).exe();
      }catch(e){
        e.message.should.eql('Sorry,parameter should be a function.');
      }
  })

  it('test when there is only filter function', function(){
    let result = new Lazy(arr).filter(item => item > 20).exe();
    result.should.eql([23, 34, 35,72]);
  })

  it('test when there is only map function', function(){
    let result = new Lazy(arr).map(item => item * 2).take(3).exe();
    result.should.eql([20, 46, 68]);
  })

  it('test when there is only filter and map function', function(){
    let result = new Lazy(arr).filter(item => item < 30).map(item => item * 2).take(1).exe();
    result.should.eql([20]);
  })

  it('test when there is filter and map function cross existence', function(){
    let result = new Lazy(arr).map(item => item * 2).filter(item => item > 60).map(item => item * 2).take(3).exe();
    result.should.eql([136,140,288]);
  })

});