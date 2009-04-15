
describe 'Matchers'

  describe 'eql'
    it 'should work with strings'
      'test'.should.eql 'test'
      'test'.should.not.eql 'foo'
    end
    
    it 'should work with numbers'
      11.should.eql 11
      10.should.not.eql 11
    end
    
    it 'should loosely compare numbers as strings'
      '11'.should.eql 11
      '10'.should.not.eql 11
    end
    
    it 'should hash compare arrays'
      [1, 2].should.eql [1, 2]
      [1, 2].should.not.eql [1, 3]
      [1, 2, [3], { foo : 'bar' }].should.eql [1, 2, [3], { foo : 'bar' }]
    end
    
    it 'should hash compare objects'
      { foo : 'bar' }.should.eql { foo : 'bar' }
    end
  end
  
  describe 'equal'
    it 'should perform strict comparisons'
      'test'.should.equal 'test'
      '1'.should.not.equal 1
    end
  end
  
  describe 'match'
    it 'should match regular expressions'
      'foobar'.should.match(/foo/)
      'foobar'.should.not.match(/barfoo/)
    end
  end
  
  describe 'be_empty'
    it 'should consider any object responding to a length of 0 to be empty'
      ''.should.be_empty
      ' '.should.not.be_empty
      [].should.be_empty
      { length : 0 }.should.be_empty
    end
  end
  
  describe 'be_null'
    it 'should check if a value is null'
      null.should.be_null
      0.should.not.be_null
    end
  end
  
  describe 'have_length'
    it 'should compare the length of an object'
      'foo'.should.have_length 3
      [1, 2].should.have_length 2
    end
  end
  
  describe 'have_length_within'
    it 'should check if an object has a length within the specified range'
      'foo'.should.have_length_within 2..4
      'f'.should.not.have_length_within 2..4
    end
  end
  
  describe 'have_prop'
    it 'should check if a property exists'
      'foo'.should.have_prop 'length'
    end
    
    it 'should check that a property has a specific value'
      'foo'.should.have_prop 'length', 3
      { length : '3' }.should.have_prop 'length', 3
    end
    
    it 'should check object hashes'
      { foo : 1..3 }.should.have_prop 'foo',  1..3
    end
    
    it 'should fail when the property does not exist'
      'foo'.should.not.have_prop 'foo'
      'foo'.should.not.have_prop 'foo', 'bar'
    end
    
    it 'should fail when it is a function'
      'foo'.should.not.have_prop 'toString'
    end
  end
  
  describe 'have_property'
    it 'should check if a property exists'
      'foo'.should.have_property 'length'
    end
    
    it 'should check that a property has a specific value'
      'foo'.should.have_property 'length', 3
      { length : '3' }.should.not.have_property 'length', 3
    end
    
    it 'should fail when the property does not exist'
      'foo'.should.not.have_property 'foo'
      'foo'.should.not.have_property 'foo', 'bar'
    end
    
    it 'should fail when it is a function'
      'foo'.should.not.have_property 'toString'
    end
  end
  
  describe 'respond_to'
    it 'should check if an object contains a method'
      'test'.should.respond_to('toString')
      'test'.should.not.respond_to('rawr')
    end
  end
  
  describe 'include'
    it 'should check if an object includes a property'
      { hey : 'there' }.should.include 'hey'
      { hey : 'there' }.should.not.include 'foo'
    end
    
    it 'should check if a regular expression includes a string'
      (/(foo)?bar/).should.include '(foo)'
    end
    
    it 'should check if a function body includes a string'
      -{ return [foo, bar] }.should.include 'foo', 'bar'
    end
    
    it 'should check if an array contains element(s)'
      [1,2,3].should.include 1
      [1,2,3].should.include 1, 2, 3
      [1].should.not.include 0
      ['foo', 'bar'].should.include 'foo', 'bar'
      ['foo', 'bar'].should.include 'bar', 'foo'
      ['foo', 'bar'].should.not.include 'foo', 'rawr'
      ['foo', 'bar'].should.not.include 'rawr', 'foo'
    end
    
    it 'should check hashes of array elements'
      [1, [2]].should.include [2]
      [1, [2]].should.include [2], 1
      [1, { two : 'three' }].should.include { two : 'three' } 
    end
  end
  
  describe 'be_a'
    it 'should compare the constructor of an object'
      'test'.should.be_a String
      [].should.be_an Array
    end
  end

  describe 'throw_error'
    it 'should check if an error is thrown'
      -{ throw 'error' }.should_throw_error
      -{ return 'test' }.should_not_throw_error
    end
    
    it 'should check if an error with a specific message is thrown'
      -{ throw 'some foo bar' }.should.throw_error('some foo bar')
      -{ throw 'some foo bar' }.should.throw_error(/foo bar/)
      -{ throw 'some foo bar' }.should.not.throw_error(/rawr/)
      -{ throw 'some foo bar' }.should.not.throw_error('rawr')
    end
    
    it 'should check if an error of a specific constructor is thrown'
      -{ throw new Error('foo') }.should.throw_error(Error)
      -{ throw new TypeError('foo') }.should.throw_error(TypeError)
      -{ throw 'foo' }.should.not.throw_error(Error)
    end
  end
  
  describe 'be_type'
    it 'should compare the type of an object via typeof'
      'hey'.should.be_type 'string'
      {}.should.be_type 'object'
    end
  end

  describe 'be_within'
    it 'should check if a number is within a range'
      5.should.be_within 1..10
      15.should.not.be_within 10..5
    end
  end
  
  describe 'have'
    it 'should check the length of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have 2, 'pets'
      person.should.not.have 3, 'pets'
    end
  end
  
  describe 'have_at_least'
    it 'should check if a object has at least n of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have_at_least 1, 'pets'
      person.should.have_at_least 2, 'pets'
      person.should.not.have_at_least 3, 'pets'
    end
  end
  
  describe 'have_at_most'
    it 'should check if an object has at most n of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have_at_most 2, 'pets'
      person.should.have_at_most 3, 'pets'
      person.should.not.have_at_most 1, 'pets'
    end
  end
  
  describe 'be_within'
    it 'should check that an object has within n..n of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have_within 1..2, 'pets'
      person.should.have_within 2..5, 'pets'
      person.should.not.have_within 5..10, 'pets'
    end
  end
  
end

describe 'Negative specs'

  it 'should fail'
    'test'.should.not_eql 'test' 
  end

  it 'should fail with one faulty assertion'
    'test'.should.equal 'test' 
    'test'.should.equal 'foo' 
  end
  
  it 'should fail and print array with square braces'
    [1,2].should.equal [1,3] 
  end
  
  it 'should fail and print nested array'
    [1, ['foo']].should.equal [1, ['bar', ['whatever', 1.0, { foo : 'bar', bar : { 1 : 2 } }]]]
  end
  
  it 'should fail and print html elements'
    elem = document.createElement('a')
    elem.setAttribute('href', 'http://vision-media.ca')
    elem.should.not.eql elem
  end
  
  it 'should fail with selector for jQuery objects'
    elem = { jquery : '1.3.1', selector : '.foobar' } 
    elem.should.eql 'foo'
  end
  
  it 'should fail with negative message'
    '1'.should.not.be_true
  end
  
  it 'should fail with positive message'
    false.should.be_true
  end
  
  it 'should fail with function body'
    -{ rawr }.should.not.throw_error
  end
  
  it 'should fail with message of first failure'
    true.should.be_true
    'bar'.should.match(/foo/gm)
    'bar'.should.include 'foo'
  end
  
  it 'should fail with list'
    ['foo', 'bar'].should.include 'foo', 'car'
  end
  
  it 'should catch exceptions throw within specs'
    throw new Error('Oh noes!')
  end
  
  it 'should catch improper exceptions'
    throw 'oh noes'
  end
  
  it 'should catch proper exceptions'
    iDoNotExist
  end
  
end

describe 'Utility'
  describe 'query'
    it 'should return a pairs value'
      JSpec.query('suite', '?suite=Positive%20specs').should.equal 'Positive specs'
    end
    
    it 'should return null when key is not present'
      JSpec.query('foo', '?suite=Positive%20specs').should.be_null
    end
  end
  
  describe 'strip'
    it 'should strip whitespace by default'
      JSpec.strip(" foo \n\n").should.equal 'foo'
    end
    
    it 'should strip the characters passed'
      JSpec.strip('[foo]', '\\[\\]').should.equal 'foo'
    end
  end
end

describe 'Contexts'
  before 
    JSpec.context = { iLike : 'cookies' }
  end

  after
    JSpec.context = null
  end

  it 'should be replacable'
    .iLike.should.equal 'cookies'
  end
end

describe 'Misc'
  it 'requires implementation'
  end
end

