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
  cursorY += 25;
  addCenteredBoldTitle(
    `EL SUSCRITO GERENTE DE LA COOPERATIVA ${data.cooperativaName}`,
    12
  );
  cursorY += 30;

  addSubtitle(`HACE CONSTAR`, 12);

  cursorY += 10;

  addJustifiedText(
    `Que el Estatuto, contiene las previsiones de la Ley 79 de 1988, el cual se encuentra firmado por el Presidente y Secretario de la Asamblea, realizada en reunión celebrada el día ${data.dia} de ${data.mes} de ${data.año}`
  );
  cursorY += 7;

  addJustifiedText(
    `Que el acta de la asamblea de constitución está suscrita por los asociados fundadores en número no inferior a 3 personas, en el cual se indica el número del documento de identidad.`
  );
  cursorY += 7;

  addJustifiedText(
    `Que los socios fundadores han recibido Educación Cooperativa con intensidad horaria de 20 horas.`
  );
  cursorY += 7;

  addJustifiedText(
    `Que se ha dado cumplimiento de las normas especiales legales y reglamentarias para la constitución de la cooperativa.`
  );
  cursorY += 7;

  addJustifiedText(
    `Ciudad ${data.cooperativaName} Se firma a los ${data.dia} días del mes de ${data.mesName} de ${data.año}`
  );

  cursorY += 25;

  addCenteredBoldTitle(`Firma Gerente`, 12);
  addSubtitle(`___________________________`, 12);
  addSubtitle(`Cédula`, 12);
  // Guardar PDF
  doc.save(`Constancia Aprobacion.pdf`);
};

export default pdfConstanciaGerente;
