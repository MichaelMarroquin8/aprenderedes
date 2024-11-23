import jsPDF from "jspdf";

const pdfLink = () => {
  const doc = new jsPDF("p", "mm", "a4"); // Documento A4
  const margin = 10;
  let cursorY = 20;

  const pageHeight = doc.internal.pageSize.getHeight();

  // Ajustar estilos globales
  const setFont = (size, style = `normal`) => {
    doc.setFont(`Helvetica`, style);
    doc.setFontSize(size);
  };

  // Función para agregar texto justificado
  const addJustifiedText = (
    text,
    x = margin,
    width = 190,
    size = 12,
    style = `normal`,
    color = [0, 0, 0]
  ) => {
    setFont(size, style);
    doc.setTextColor(...color);
    const textLines = doc.splitTextToSize(text, width);

    textLines.forEach((line) => {
      if (cursorY + 10 > pageHeight - margin) {
        doc.addPage(); // Añadir nueva página
        cursorY = margin; // Resetear el cursor al margen superior
      }
      doc.text(line, x, cursorY, { maxWidth: width, align: `justify` });
      cursorY += 8; // Espaciado entre líneas
    });
  };

  // ARTÍCULO 1 con texto justificado
  cursorY += 10;
  addJustifiedText(
    `https://www.ccc.org.co/sedevirtual/consulta-homonimia/
Este es el link para buscar si ya existe el nombre de una cooperativa(Homonimia)

https://enlinea.ccc.org.co/appbusquedasciiu/#/auth/login?returnUrl=%2Fuser%2Fbuscador
Buscar la actividad económica el CIIU`
  );

  doc.save(`Link.pdf`);
};

export default pdfLink;
