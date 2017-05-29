/* Common validation functions */
var Joi = require('joi');

/**
 * Validator for a new News item.
 * Checks that a title string and contents string was supplied
 * 
 * @param res The response object passed over from calling method (so 
 * that an error can be sent if validation fails)
 * @param params The params to validate the schema against
 */
exports.validateNewsItem = function (res, params) {
  var schema = {
    title: Joi.string().required(),
    contents: Joi.string().required()
  };

  return commonValidator(res, schema, params);
};

/**
 * Validator helper method. Wraps the Joi.validation() method such that
 * params are checked against a schema.
 * ALso sends back a generic HTTP 400 for a bad request.
 * @param res The response object sent from calling method so that errors can be sent back to client.
 * @param schema The schema to validate the params against.
 * @param params The params to validate the schema against.
 * @returns {boolean} The validity of the params (i.e. do they fullfil the requirments).
 */
function commonValidator(res, schema, params) {
  var valid = false;

  // Run the validation
  Joi.validate(params, schema, function (err, value) {
    // If there is no error, the params are valid
    if (err == null)
      valid = true;
    // Otherwise, the params are invalid, and we should send back an error to the client
    else {
      res.status(400)send({message: "Missing/Bad params.", errors: err});
      valid = false;
    }
  });

  // The caller needs to know if the validation went through successfully or not, so send back
  // the Boolean
  return valid;
}