class Utils {
  getDataType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
  }

  removeKeysWithFalsyValues(data) {
    let dataType = this.getDataType(data),
        cleanData,
        filteredData;

    switch (dataType) {
      case 'Object':
        cleanData = Object.assign({}, data);
        break;
      case 'Array':
        filteredData = data.filter(el => (this.getDataType(el) === 'String' && el.length > 0) || el);
        cleanData = filteredData.length ? filteredData : undefined;
        break;
      default:
        return data ? data : undefined;
    }

    for (let prop in cleanData) {
      switch (this.getDataType(cleanData[prop])) {
        case 'Object':
          cleanData[prop] = this.removeKeysWithFalsyValues(cleanData[prop]);
          if (!Object.keys(cleanData[prop]).length) {
            delete cleanData[prop];
          }
          break;
        case 'Array':
          cleanData[prop] = this.removeKeysWithFalsyValues(cleanData[prop]);
          if (cleanData[prop] == undefined) {
            delete cleanData[prop];
          }
          break;
        default:
          if (cleanData[prop] == undefined || cleanData[prop] == '') {
            delete cleanData[prop];
          }
      }
    }
    return cleanData;
  }

  print(data) {
    const printObject = object => {
      if (object == null) { return printValue('null', false, false); }
      
      let stringifiedObject = printValue(getTypeName(object), false, true);
      stringifiedObject += printValue('{', false, false);

      let isFirstProperty = true;

      Object.keys(object).forEach(property => {
        stringifiedObject += isFirstProperty ? '' : printValue(',', false, false);
        isFirstProperty = false;
        stringifiedObject += printValue(`${property}:`, true, true);
        stringifiedObject += printValue(`${object[property]}`, false, false);
      });

      stringifiedObject += printValue('}', true, false);    
      return stringifiedObject;
    };

    const printValue = (value, leftPadding, rightPadding) => {
      return `${leftPadding ? ' ' : ''}${value}${rightPadding ? ' ' : ''}`;
    };

    const getTypeName = object => {
      const funcNameRegex = /function (.{1,})\(/;
      const results = (funcNameRegex).exec(object.constructor.toString());
      return (results && results.length > 1) ? results[1] : '';
    };

    return typeof data === 'object' ? printObject(data) :  printValue(data);
  }
}

module.exports = Utils;
