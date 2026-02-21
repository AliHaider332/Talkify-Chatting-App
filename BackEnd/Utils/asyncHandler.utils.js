export const asyncHandler = (callback) => {
  return (req, res, next) => {
    Promise.resolve(callback(req, res)).catch((err) => next(err));
  };
};


// const asyncHandler = (func) => (req, res, next) => {
//   Promise.resolve(func(req, res, next)).catch(next);
// };

// router.post('/register', asyncHandler(async (req, res) => {
//   const { firstName, lastName, email, username, password } = req.body;

//   if (!firstName || !lastName || !email || !username || !password) {
//     throw new Error('All fields required');
//   }

//   const exist = await User.findOne({ email });
//   if (exist) {
//     throw new Error('User already exists');
//   }

//   res.send('User can be created');
// }));
