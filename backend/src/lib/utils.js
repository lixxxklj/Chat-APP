import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  })

  res.cookie('jwt', token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,   // 毫秒
    httpOnly: true,    // 只允许HTTP(s)请求携带这个Cookie，禁止Javascript通过document.cookie读取或修改，防止XSS攻击
    sameSite: "strict",  // 地址栏的域名和Cookie的域名一致时才发送cookie，任何跨站的都不携带，防止跨站请求伪造（CSRF）
    secure: process.env.NODE_ENV !== 'development'  // 开发环境: false，生产环境: true(https)
  })

  return token
}