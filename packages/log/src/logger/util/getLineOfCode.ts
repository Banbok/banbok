const getLineOfCode = (): string | undefined => {
  const err = new Error();
  return err.stack?.split("\n")[3].trim().split(" ")[2].replace(/[()]/g, "");
};

export default getLineOfCode;
