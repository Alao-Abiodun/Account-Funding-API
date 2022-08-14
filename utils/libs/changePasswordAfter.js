module.exports = {
  changePasswordAfter: async (req, res, next) => {
    try {
      const result = await userServices.changePasswordAfter(req.user.iat);
      const dataInfo = {
        message: "User password changed successfully",
        result,
      };
      return successResMsg(res, 200, dataInfo);
    } catch (error) {
      console.log(error.message);
    }
  },
};
