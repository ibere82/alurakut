import { userModel } from '../models/user.js';
import { comunityModel } from '../models/comunities.js'

const findUser = async (userName, userID) => {
  try {
    const document = await userModel.findOne({ id: userID })
    if (document == null) {
      const newUser = await createUser(userName, userID)
      return newUser
    }
    return document
  } catch (error) {
  }
}

const createUser = async (userName, userID) => {
  const apiGH = await fetch('https://api.github.com/users/' + userName)
  const doc = await apiGH.json()
  const githubURL = doc.html_url
  const githubImage = doc.avatar_url

  return userModel.create(
    {
      id: userID,
      userName,
      githubURL,
      githubImage,
      recados: 42,
      fotos: 42,
      videos: 42,
      fas: 42,
      mensagens: 42,
      confiavel: 3,
      legal: 3,
      sexy: 3
    })
}

const loadComunities = async (userID) => {
  const comunities = await comunityModel.find({ creatorId: userID })
  return comunities
}

const createComunity = async (comunity) => {
  await comunityModel.create(comunity)
  return comunity
}


export { findUser, loadComunities, createComunity }
