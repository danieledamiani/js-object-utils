const { expect } = require('chai');
const Utils = require('./Utils');


describe('Utils', () => {
  it('should be true', () => {
    expect(true).to.equal(true);
  });

  let utils;
  
  beforeEach(() => {
    utils = new Utils();
  });

  describe('.removeKeysWithFalsyValues()', () => {
    it('should return an empty object when an empty object is passed', () => {
      const dataObj = {};
      const result = utils.removeKeysWithFalsyValues(dataObj);
      expect(result).to.eql({});
    }); 
    
    it('should return undefined when an undefined object is passed', () => {
      const dataObj = undefined;
      const result = utils.removeKeysWithFalsyValues(dataObj);
      expect(result).to.equal(undefined);
    }); 
    
    it('should return undefined when a null object is passed', () => {
      const dataObj = null;
      const result = utils.removeKeysWithFalsyValues(dataObj);
      expect(result).to.equal(undefined);
    }); 
    
    it('should return the same value when a primitive value is passed', () => {
      const dataObj = 1;
      const result = utils.removeKeysWithFalsyValues(dataObj);
      expect(result).to.equal(1);
    }); 

    it('should return an object with the same keys as the input when all keys have a truthy value', () => {
      const dataObj = {
        propA: 123,
        propB: 'abc'
      };
      const expected = {
        propA: 123, 
        propB: 'abc'
      };
      const result = utils.removeKeysWithFalsyValues(dataObj);
      expect(result).to.eql(expected);
    });

    it('should return an object that contains only the keys that have a truthy value', () => {
      const dataObj = {
        propA: 123,
        propB: '',
        propC: false,
        propD: {},
        propE: {
          subProp1: true,
          subProp2: 3
        },
        propF: [],
        propG: [1, 2, 3]
      };
      const expected = {
        propA: 123,
        propE: {
          subProp1: true,
          subProp2: 3
        },
        propG: [1, 2, 3]
      };
      const result = utils.removeKeysWithFalsyValues(dataObj);
      expect(result).to.eql(expected);
    });
    
    it('should return an object that contains thruty values and falsy when enabled in options', () => {
      const dataObj = {
        prop1: 123,
        prop2: '',
        prop3: false,
        prop4: {},
        prop5: [],
        prop6: 0
      };
      const options = {
        emptyString: true,
        falseBool: true,
        emptyArray: true,
        emptyObject: true,
        zero: true
      };
      const expected = {
        prop1: 123,
        prop2: '',
        prop3: false,
        prop4: {},
        prop5: [],
        prop6: 0
      };
      const result = utils.removeKeysWithFalsyValues(dataObj, options);
      expect(result).to.eql(expected);
    });
  });

  describe('.print()', () => {
    it('should return the string null for a null object', () => {
      const data = null;
      const result = utils.print(data);
      expect(result).to.equal('null');
    });

    it('should return the string Object {} for an empty object', () => {
      const data = {};
      const result = utils.print(data);
      expect(result).to.equal('Object { }');
    });
    
    
    it('should return the string 123 given the number 123', () => {
      const data = 123;
      const result = utils.print(data);
      expect(result).to.equal('123');
    });
    
    it('should return the string Object { a: 123 } given an object with property a and value 123', () => {
      const data = {
        a: 123
      };
      const result = utils.print(data);
      expect(result).to.equal('Object { a: 123 }');
    });
    
    it('should return the string Object { a: 123, b: true } given an object with property a and value 123', () => {
      const data = {
        a: 123,
        b: true
      };
      const result = utils.print(data);
      expect(result).to.equal('Object { a: 123, b: true }');
    });
  });
});
