import { loadComunities } from '../../../src/controller/controller.js'

export default async function load(req, res) {
  const { userID } = req.query
  const comunities = await loadComunities(userID)
  res.json(comunities)
  return
}