class TxtImporter {
  import(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      callback(e.target.result);
    };
    reader.readAsText(file);
  }
}

export default TxtImporter;
