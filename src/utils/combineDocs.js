export const combineDocs = (docs) =>
  docs.map((doc) => doc.pageContent).join("\n\n");
