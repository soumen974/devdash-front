import React from 'react'
import { EXCEL_FILE_BASE64 } from '../Store/constants';
import FileSaver from 'file-saver';

function DownloadExcel() {
    const handelDownload = () => {
        // alert("download starts");
        let dataBlob = EXCEL_FILE_BASE64;
        let sliceSize = 1024;
        let byteCharacters = atob(dataBlob);
        let bytesLength = byteCharacters.length;
        let sliceCount = Math.ceil(bytesLength / sliceSize);
        let byteArrays = new Array(sliceCount);
        for(let sliceIndex = 0; sliceIndex < sliceCount; ++sliceIndex){
            let begin = sliceIndex * sliceSize;
            let end = Math.min(begin + sliceSize, bytesLength);
            let bytes = new Array(end - begin);
            for(var offset = begin, i = 0; offset < end; offset++, i++) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
             }
             byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        let blob = new Blob(byteArrays, {type: 'application/vnd.ms-excel'});
        FileSaver.saveAs(new Blob([blob], {}),"FoxDev.xlsx");
    }
  return (
    <div>
      <button onClick={handelDownload}  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition duration-200">Download Format</button>
    </div>
  )
}

export default DownloadExcel
