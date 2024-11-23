import jsPDF from "jspdf";

const pdfConstanciaGerente = ({ data }) => {
  const doc = new jsPDF(`p`, `mm`, `a4`);
  const marginLeft = 25;
  const marginRight = 25;
  const lineHeight = 8;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - marginLeft - marginRight;
  let cursorY = 20;

  // Configuración de fuente
  const setFont = (size, style = `normal`) => {
    doc.setFont(`Helvetica`, style);
    doc.setFontSize(size);
  };

  // Función para simular justificación de texto
  const addJustifiedText = (text, size = 12) => {
    setFont(size);
    const words = text.split(` `);
    let line = ``;
    let lineWidth = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordWidth = doc.getTextWidth(word + ` `);

      if (lineWidth + wordWidth > contentWidth) {
        // Si la línea excede el ancho del contenido, justificarla
        const justifiedLine = justifyLine(line, lineWidth, contentWidth);
        doc.text(justifiedLine, marginLeft, cursorY);
        cursorY += lineHeight;

        // Nueva línea con la palabra que no cabía
        line = word + ` `;
        lineWidth = wordWidth;
      } else {
        // Agregar palabra a la línea actual
        line += word + ` `;
        lineWidth += wordWidth;
      }
    }

    // Dibujar la última línea
    if (line) {
      doc.text(line.trim(), marginLeft, cursorY);
      cursorY += lineHeight;
    }
  };

  // Función para justificar una línea de texto
  const justifyLine = (line, lineWidth, contentWidth) => {
    const words = line.trim().split(` `);
    const numSpaces = words.length - 1;
    if (numSpaces > 0) {
      const extraSpace = (contentWidth - lineWidth) / numSpaces;
      return words.join(
        ` `.repeat(Math.ceil(extraSpace / doc.getTextWidth(` `)))
      );
    }
    return line;
  };

  // Añadir título centrado en negrilla
  const addCenteredBoldTitle = (text, size = 14) => {
    setFont(size, `bold`);
    doc.text(text, pageWidth / 2, cursorY, { align: `center` });
    cursorY += lineHeight + 2;
  };

  const addSubtitle = (text, size = 14) => {
    setFont(size, `normal`);
    doc.text(text, pageWidth / 2, cursorY, { align: `center` });
    cursorY += lineHeight + 2;
  };

  // Contenido del documento replicando el estilo del ejemplo
  cursorY += 40;
  addCenteredBoldTitle(`EL SUSCRITO GERENTE DE LA COOPERATIVA`, 12);
  cursorY += 25;
  addSubtitle(` ${data.cooperativaName}`, 12);
  cursorY += 25;

  addSubtitle(`HACE CONSTAR`, 12);

  cursorY += 25;

  addJustifiedText(
    `Que los asociados fundadores de la Cooperativa  ${
      data.cooperativaName
    }, han cancelado cada uno la suma de  ${
      data.cantidadE
    } MIL PESOS (${data.cantidadN.toLocaleString()}) M/CTE, como aporte social inicial suscrito y pagado, de conformidad con lo establecido en los estatutos.`
  );

  cursorY += 25;

  addJustifiedText(` ${data.date},  ${data.ciudad}.`);

  cursorY += 30;

  addCenteredBoldTitle(`Firma Gerente`, 12);
  cursorY += 8;
  addSubtitle("___________________________", 12);
  addSubtitle(`Cédula`, 12);
  // Guardar PDF
  doc.save(`Constancia gerencia.pdf`);
};

export default pdfConstanciaGerente;
