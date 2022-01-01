let DS: string;

if (process.platform === "win32") {
  DS = "\\";
} else {
  DS = "/";
}

export default DS;
