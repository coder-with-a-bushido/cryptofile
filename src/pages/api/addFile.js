import prisma from "../../../lib/prisma";
export default async function AddFile(req, res) {
  const { fname, description, cid, uid } = req.body;
  try {
    const files = await prisma.files.create({
      data: {
        file_name: fname,
        file_description: description,
        cid: cid,
        userid: uid,
      },
    });
    return res.status(200).json({ files });
  } catch (err) {
    return res.status(509).json({ error: err });
  }
}
