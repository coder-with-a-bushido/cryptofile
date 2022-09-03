import prisma from "../../../lib/prisma";
export default async function getFiles(req, res) {
  const { uid } = req.body;
  try {
    const files = await prisma.files.findMany({
      where: {
        userid: uid,
      },
    });
    // console.log(files);
    return res.status(200).json(
      files.map((file) => ({
        file_name: file.file_name,
        file_description: file.file_description,
        cid: file.cid,
        userid: file.userid,
        file_id: file.file_id,
      }))
    );
  } catch (err) {
    return res.status(509).json({ error: err });
  }
}
