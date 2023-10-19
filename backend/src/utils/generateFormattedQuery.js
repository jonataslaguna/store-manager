const getFormattedColumnNames = (object) => Object.keys((object)).join(',');

const getFormattedPlaceholders = (object) => Object.keys(object).map(() => '?').join(',');

const getFormattedUpdateColumns = (object) => Object.keys((object))
  .map((key) => `${key} = ?`)
  .join(', ');

module.exports = {
  getFormattedColumnNames,
  getFormattedPlaceholders,
  getFormattedUpdateColumns,
};
