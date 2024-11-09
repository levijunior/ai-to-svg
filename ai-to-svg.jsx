// Dialog to choose file extension
var fileExtension = prompt(
  "Enter the file extension to process (e.g., .svg, .ai):",
  ".ai"
);

// Validate the input
if (!fileExtension || fileExtension[0] !== ".") {
  alert("Invalid file extension. Please start with a dot (e.g., .svg).");
} else {
  var SOURCE_FILE_EXTENSION = fileExtension.toLowerCase();
  var folder = Folder.selectDialog(
    "Select the folder with " + SOURCE_FILE_EXTENSION + " files to export"
  );

  if (folder) {
    var files = folder.getFiles("*" + SOURCE_FILE_EXTENSION);
    if (files.length === 0) {
      alert("No files with the extension " + SOURCE_FILE_EXTENSION + " found.");
    } else {
      var destinationFolder = Folder.selectDialog(
        "Select the destination folder for the .svg files"
      );

      if (destinationFolder) {
        for (var i = 0; i < files.length; i++) {
          var doc = app.open(files[i]);

          // SVG export options configuration
          var exportOptions = new ExportOptionsSVG();
          exportOptions.coordinatePrecision = 4;
          exportOptions.CSSProperties = SVGCSSPropertyLocation.STYLEELEMENTS;
          exportOptions.documentEncoding = SVGDocumentEncoding.UTF8;
          exportOptions.fontType = SVGFontType.OUTLINEFONT;

          // Export to SVG
          var svgFile = new File(
            destinationFolder +
              "/" +
              doc.name.replace(SOURCE_FILE_EXTENSION, ".svg")
          );
          doc.exportFile(svgFile, ExportType.SVG, exportOptions);
          doc.close(SaveOptions.DONOTSAVECHANGES);
        }
        alert("Export completed!");
      } else {
        alert("No destination folder selected.");
      }
    }
  } else {
    alert("No folder selected.");
  }
}
