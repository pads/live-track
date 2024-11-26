exports.exec = async (event) => {
  console.log("received event", event);
  return {
    statusCode: 204,
  };
};
