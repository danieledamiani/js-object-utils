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
}

module.exports = Utils;
