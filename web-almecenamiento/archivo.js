


  const fileList = document.getElementById('fileList');
  const storedFiles = JSON.parse(localStorage.getItem('files')) || [];

  document.getElementById('fileInput').addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      storedFiles.push({ name: file.name, data: URL.createObjectURL(file) });
      displayFile(file.name, URL.createObjectURL(file));
    });
    localStorage.setItem('files', JSON.stringify(storedFiles));
  });

  storedFiles.forEach(file => displayFile(file.name, file.data));

  function displayFile(fileName, fileURL) {
    const listItem = document.createElement('li');
    listItem.classList.add('file-item');
    listItem.textContent = fileName;

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btn-container');

    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = '⬇️ Descargar';
    downloadBtn.classList.add('download-btn');
    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = fileURL;
      a.download = fileName;
      a.click();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '❌ Eliminar';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
      listItem.remove();
      const index = storedFiles.findIndex(f => f.name === fileName);
      storedFiles.splice(index, 1);
      localStorage.setItem('files', JSON.stringify(storedFiles));
    };

    btnContainer.appendChild(downloadBtn);
    btnContainer.appendChild(deleteBtn);
    listItem.appendChild(btnContainer);
    fileList.appendChild(listItem);
  }
