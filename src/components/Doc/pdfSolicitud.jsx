import jsPDF from "jspdf";

const pdfSolicitud = () => {
  const doc = new jsPDF("p", "mm", "a4"); // Documento A4
  const margin = 25;
  let cursorY = margin;

  // Ajustar estilos globales
  const setFont = (size, style = "normal") => {
    doc.setFont("Helvetica", style);
    doc.setFontSize(size);
  };

  // Función para agregar texto en una posición específica
  const addText = (
    text,
    x,
    y,
    size = 12,
    style = "normal",
    align = "justify"
  ) => {
    setFont(size, style);
    doc.text(text, x, y, { align });
  };

  cursorY += 25;
  // Título (Fecha y ciudad)
  addText("Fecha, ciudad", margin, cursorY);
  cursorY += 25;

  // Datos del destinatario
  addText("Doctor", margin, cursorY);
  cursorY += 6;
  addText("_____________________________", margin, cursorY);
  cursorY += 6;
  addText("Presidente Ejecutivo", margin, cursorY);
  cursorY += 6;
  addText("Cámara de Comercio de ________________", margin, cursorY);
  cursorY += 6;
  addText("Ciudad - Departamento", margin, cursorY);
  cursorY += 20;

  // Saludo
  addText("Cordial Saludo:", margin, cursorY);
  cursorY += 15;

  // Cuerpo de la carta con texto justificado
  const bodyText = `Yo, _______________________, identificado con la cédula de ciudadanía No.
_____________, actuando en representación legal de la Cooperativa _______________,
solicito se nos otorgue la personería jurídica de nuestra organización, para lo cual me
permito presentar constancia de los numerales que se indican en el artículo primero de su
parágrafo segundo del decreto 0427 de 1996 y declaramos que nos comprometemos a
cumplir las disposiciones legales y estatutarias que rigen la organización.`;

  // Función para agregar texto justificado
  const addJustifiedText = (
    text,
    x = margin,
    width = 170,
    size = 12,
    style = "normal"
  ) => {
    setFont(size, style);
    const textLines = doc.splitTextToSize(text, width);

    const lineHeight = 8; // Altura de cada línea
    const totalHeight = textLines.length * lineHeight;
    const totalY = cursorY + totalHeight;

    // Si el texto ocupa más de una página, se debe manejar el salto de página
    if (totalY > doc.internal.pageSize.getHeight()) {
      doc.addPage();
      cursorY = margin; // Reinicia la posición vertical en una nueva página
    }

    // Dibujar cada línea y ajustar el cursorY
    textLines.forEach((line) => {
      const lineWidth = doc.getTextWidth(line);
      const spaceLeft = width - lineWidth;
      const spacesCount = line.split(" ").length - 1; // Número de espacios en la línea
      const spaceWidth = spacesCount > 0 ? spaceLeft / spacesCount : 0;

      // Agregar la línea de texto
      const xOffset = x; // Posición inicial del texto
      doc.text(
        line
          .split(" ")
          .map((word, index) => {
            if (index < spacesCount) {
              return word + " ".repeat(Math.floor(spaceWidth));
            }
            return word;
          })
          .join(" "),
        xOffset,
        cursorY
      );

      cursorY += lineHeight; // Aumentar la posición Y para la siguiente línea
    });
  };

  // Añadir el texto del cuerpo de la carta
  addJustifiedText(bodyText);
  cursorY += 25;

  // Despedida
  addText("Atentamente,", margin, cursorY);
  cursorY += 25;

  // Firma
  addText("Firma Gerente", margin, cursorY);
  cursorY += 6;
  addText("___________________________", margin, cursorY);
  cursorY += 6;
  addText("Cédula", margin, cursorY);

  // Guardar el PDF
  doc.save("Solicitud.pdf");
};

export default pdfSolicitud;
