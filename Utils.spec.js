const { expect } = require('chai');
const Utils = require('./Utils');


describe('Utils', () => {
  it('should be true', () => {
    expect(true).to.equal(true);
  });

  describe('.removeKeysWithFalsyValues()', () => {
    let utils;

    beforeEach(() => {
      utils = new Utils();
    });

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
  });
});
