import { findUser } from '../../../../src/controller/controller';
import mongoose from 'mongoose';

const mongoconnect = async () => {
  try {
    await mongoose.connect(`mongodb+srv://bereco:${process.env.DB_PWD}@cluster0.xh0hq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Conectado no MongoDB');
  } catch (error) {
    console.log('Erro ao conectar no MongoDB');
  }
};

mongoconnect();

export default async function request(req, res) {
  const userID = req.query.id
  const userName = req.query.name
  const document = await findUser(userName, userID)
  res.json(document)

}