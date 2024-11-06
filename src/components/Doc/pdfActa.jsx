import jsPDF from "jspdf";

const PdfActa = () => {
  const doc = new jsPDF("p", "mm", "a4");
  const marginLeft = 30;
  const marginRight = 30;
  const lineHeight = 8;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - marginLeft - marginRight;
  let cursorY = 20;

  // Configuración de fuente
  const setFont = (size, style = "normal") => {
    doc.setFont("Helvetica", style);
    doc.setFontSize(size);
  };

  // Función para verificar si es necesario agregar una nueva página
  const checkAddPage = () => {
    if (cursorY + lineHeight > pageHeight - 20) {
      // 20 es el margen inferior
      doc.addPage();
      cursorY = 20; // Reiniciar cursor al principio de la nueva página
    }
  };

  // Función para simular justificación de texto
  const addJustifiedText = (text, size = 12) => {
    setFont(size);
    const words = text.split(" ");
    let line = "";
    let lineWidth = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordWidth = doc.getTextWidth(word + " ");

      if (lineWidth + wordWidth > contentWidth) {
        // Si la línea excede el ancho del contenido, justificarla
        const justifiedLine = justifyLine(line, lineWidth, contentWidth);
        doc.text(justifiedLine, marginLeft, cursorY);
        cursorY += lineHeight;

        // Verificar si se necesita una nueva página
        checkAddPage();

        // Nueva línea con la palabra que no cabía
        line = word + " ";
        lineWidth = wordWidth;
      } else {
        // Agregar palabra a la línea actual
        line += word + " ";
        lineWidth += wordWidth;
      }
    }

    // Dibujar la última línea
    if (line) {
      doc.text(line.trim(), marginLeft, cursorY);
      cursorY += lineHeight;

      // Verificar si se necesita una nueva página
      checkAddPage();
    }
  };

  // Función para justificar una línea de texto
  const justifyLine = (line, lineWidth, contentWidth) => {
    const words = line.trim().split(" ");
    const numSpaces = words.length - 1;
    if (numSpaces > 0) {
      const extraSpace = (contentWidth - lineWidth) / numSpaces;
      return words.join(
        " ".repeat(Math.ceil(extraSpace / doc.getTextWidth(" ")))
      );
    }
    return line;
  };

  // Añadir título centrado en negrilla
  const addCenteredBoldTitle = (text, size = 14) => {
    setFont(size, "bold");
    doc.text(text, pageWidth / 2, cursorY, { align: "center" });
    cursorY += lineHeight + 2;

    // Verificar si se necesita una nueva página
    checkAddPage();
  };

  const addSubtitle = (text, size = 14) => {
    setFont(size, "normal");
    doc.text(text, pageWidth / 2, cursorY, { align: "center" });
    cursorY += lineHeight + 2;

    // Verificar si se necesita una nueva página
    checkAddPage();
  };

  // Contenido del documento replicando el estilo del ejemplo
  cursorY += 20;
  addCenteredBoldTitle("ACTA DE CONSTITUCIÓN", 12);

  cursorY += 8;

  addJustifiedText(
    `En la ciudad de _________- Departamento ____________, a los _____ días del mes de __________ de _____, siendo las _______ , nosotros los abajo firmantes, debidamente constituidos, domiciliados en el municipio de_____________ Departamento del _________, República de Colombia, mayores de 18 años, actuando en nuestro propio nombre, e instalados en Asamblea de constitución, hemos acordado lo siguiente:`
  );

  cursorY += 5;

  addJustifiedText(`Orden del día:`);

  cursorY += 5;

  addJustifiedText(`1. Nombramiento de Presidente y Secretario Ad-hoc.`);
  addJustifiedText(`2. Aprobación, constitución de la Cooperativa.`);
  addJustifiedText(`3. Aprobación de estatutos.`);
  addJustifiedText(`4. Elección de Consejo de administración.`);
  addJustifiedText(`5. Elección de Junta de vigilancia.`);
  addJustifiedText(`6. Elección del Revisor Fiscal.`);
  addJustifiedText(`7. Elección de Gerente.`);
  addJustifiedText(`8. Aprobación del Acta.`);

  cursorY += 8;
  addSubtitle("DESARROLLO", 12);

  cursorY += 5;
  addJustifiedText(
    `1. Se designó por unanimidad como PRESIDENTE de la sesión a y como SECRETARIO a ___________________ Y _______________________ respectivamente, para dirigir la presente Asamblea de constitución. Se deja constancia de que las anteriores personas manifestaron la aceptación a sus respectivos cargos.`
  );

  cursorY += 5;
  addJustifiedText(
    `2. Declarar constituida por unanimidad hoy ___ del mes de _________ del año ________ la persona jurídica que se denominará COOPERATIVA_________________________, sin ánimo de lucro, con domicilio en el municipio de __________, Departamento del ___________, República de Colombia, la cual se forma inicialmente por los asociados que hacen parte de la presente acta.`
  );

  cursorY += 5;
  addJustifiedText(
    `3. De conformidad con el acuerdo Cooperativo, la Asamblea de Constitución aprobó los Estatutos de la Cooperativa por unanimidad, los cuales se adjuntan a la presente acta y hacen parte integral de la misma.`
  );

  cursorY += 5;
  addJustifiedText(
    `4. Se procedió a la elección de los miembros del Consejo de administración de la siguiente manera:`
  );

  cursorY += 5;
  addJustifiedText(`mas`);

  cursorY += 5;
  addJustifiedText(
    `5. De igual manera se designó a los miembros de la junta de vigilancia de la siguiente manera:`
  );

  cursorY += 5;
  addJustifiedText(`mas`);

  cursorY += 5;
  addJustifiedText(
    `6. La asamblea de constitución eligió por unanimidad como Revisor Fiscal a _____________, con TP. ________ y cédula de ciudadanía ________________, expedida el día ______del mes________ del año_______, De igual forma, manifestó aceptar la designación.`
  );

  cursorY += 5;
  addJustifiedText(
    `7. El Consejo de Administración elegido se reunió en forma separada y nombró por unanimidad como Gerente a: _____________________ con cédula de ciudadanía No ______________, expedida el día ______del mes________ del año_______, quien estando presente manifiesta la aceptación de la designación del cargo.`
  );

  cursorY += 5;
  addJustifiedText(
    `8. La presente acta fue leída y aprobada por unanimidad, siendo las ____ _m y en constancia se firma:`
  );

  cursorY += 5;
  addJustifiedText(
    `________________________               ________________________`
  );
  addJustifiedText(`Presidente Ad-hoc                                  Secretario Ad-hoc`);

  // Guardar PDF
  doc.save("Acta.pdf");
};

export default PdfActa;
