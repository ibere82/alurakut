import { SiteClient } from 'datocms-client';
import { loadComunities, createComunity } from '../../src/controller/controller.js'

export default async function recebedorDeRequests(req, res) {
    if (req.method === 'POST') {
        const cc = await createComunity(req.body)
        res.json(cc)
        return
    }
}