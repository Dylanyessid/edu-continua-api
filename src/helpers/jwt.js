import  jwt  from 'jsonwebtoken';

export const generateToken = (payload)=>{

    return jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:'1d'})
}


export const validateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).send('Invalid token.');
  }
};