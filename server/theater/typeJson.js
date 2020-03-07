const { GraphQLScalarType } = require("graphql");

const typeJson = new GraphQLScalarType({
  name: "Json",
  description: "Json object or Json array custom scalar type",
  parseValue(value) {
    try {
      return JSON.stringify(value, null, 2);
    } catch (e) {
      console.error(e, value);
    }
    return value;
  },
  serialize(value) {
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.error(e, value);
      }
    }
    return value;
  }
});

exports.typeJson = typeJson;
