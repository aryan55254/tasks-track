const { ZodError } = require("zod");

const validate = (schema) => (req, res, next) => {
  try {
    if (schema?.body) schema.body.parse(req.body);
    if (schema?.query) schema.query.parse(req.query);
    if (schema?.params) schema.params.parse(req.params);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formatted =
        error.errors?.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })) || [];

      return res.status(400).json({
        type: "zod",
        message: "Validation Error",
        errors: formatted,
      });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = validate;
