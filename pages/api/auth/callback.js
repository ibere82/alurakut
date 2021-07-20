export default async function callback(req, res) {
  const { code } = req.query;
  res.redirect(`/finduser/${code}`);
}

