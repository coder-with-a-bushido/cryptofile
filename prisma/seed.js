const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  const files = ["file1.txt", "file2.txt", "file3.txt", "file4.txt"].map(
    async (fname) =>
      await prisma.files.create({
        data: {
          userid: "test@gmail.com",
          file_name: fname,
          file_description: "",
          cid: "",
        },
      })
  );
  console.log(`created ${files.length} files`);
};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
