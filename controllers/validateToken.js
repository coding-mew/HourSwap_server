import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  try {
      const token = req.cookies.token
      console.log('iam token from validatedtoken', req.cookies)
      const payload = jwt.verify(token, process.env.SECRETKEY)
      console.log("i am secret", process.env.SECRETKEY)
      console.log("🚀 ~ file: userValidation.js:38 ~ validate ~ payload:", payload)
      req.user = payload
      return res.status(200).json({msg: 'valid access token'})

    
    } catch (error) {
      return res.status(401).json({msg: 'invalid access token'})
    }
    };