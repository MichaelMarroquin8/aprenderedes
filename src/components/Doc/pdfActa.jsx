import dayjs from "dayjs";
import jsPDF from "jspdf";

const PdfActa = ({ data }) => {
  const doc = new jsPDF(`p`, `mm`, `a4`);
  const marginLeft = 30;
  const marginRight = 30;
  const lineHeight = 8;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - marginLeft - marginRight;
  let cursorY = 20;

  // Configuración de fuente
  const setFont = (size, style = `normal`) => {
    doc.setFont(`Helvetica`, style);
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

        // Verificar si se necesita una nueva página
        checkAddPage();

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

      // Verificar si se necesita una nueva página
      checkAddPage();
    }
  };

  const addPeopleTable = (people) => {
    const columnWidth = contentWidth / 2; // Dividir el contenido en 2 columnas (persona principal y suplente)

    // Dibujar los encabezados de la tabla
    setFont(12, "bold");
    doc.text("Principal", marginLeft, cursorY);
    doc.text("Suplente", marginLeft + columnWidth, cursorY);
    cursorY += lineHeight;

    setFont(12); // Cambiar a fuente normal

    // Recorrer los datos de personas
    people.forEach((person) => {
      // Datos de la persona principal
      const personaName = person.nombre || "N/A";
      const personaCC = person.cc || "N/A";
      const personaFecha = person.fecha || "N/A";

      // Datos del suplente
      const suplenteName = person.nombre_suplente || "N/A";
      const suplenteCC = person.cc_suplente || "N/A";
      const suplenteFecha = person.fecha_suplente || "N/A";

      // Dibujar la columna de la persona principal
      doc.text("Nombre: " + personaName, marginLeft, cursorY);
      doc.text("Cédula: " + personaCC, marginLeft, cursorY + lineHeight);
      doc.text("Fecha: " + personaFecha, marginLeft, cursorY + 2 * lineHeight);

      // Dibujar la columna del suplente
      doc.text("Nombre: " + suplenteName, marginLeft + columnWidth, cursorY);
      doc.text(
        "Cédula: " + suplenteCC,
        marginLeft + columnWidth,
        cursorY + lineHeight
      );
      doc.text(
        "Fecha: " + suplenteFecha,
        marginLeft + columnWidth,
        cursorY + 2 * lineHeight
      );

      cursorY += 3 * lineHeight; // Saltar espacio para la siguiente persona

      // Verificar si se necesita agregar una nueva página
      checkAddPage();
    });
  };

  // Aquí agregas la tabla con las personas
  const people = data.personas; // Accede a las personas dentro de data

  const addPeopleTable2 = (people2) => {
    const columnWidth = contentWidth / 2; // Dividir el contenido en 2 columnas (persona principal y suplente)

    // Dibujar los encabezados de la tabla
    setFont(12, "bold");
    doc.text("Principal", marginLeft, cursorY);
    doc.text("Suplente", marginLeft + columnWidth, cursorY);
    cursorY += lineHeight;

    setFont(12); // Cambiar a fuente normal

    // Recorrer los datos de personas
    people2.forEach((person2) => {
      // Datos de la persona principal
      const personaName = person2.nombre2 || "N/A";
      const personaCC = person2.cc2 || "N/A";
      const personaFecha = person2.fecha2 || "N/A";

      // Datos del suplente
      const suplenteName = person2.nombre_suplente2 || "N/A";
      const suplenteCC = person2.cc_suplente2 || "N/A";
      const suplenteFecha = person2.fecha_suplente2 || "N/A";

      // Dibujar la columna de la persona principal
      doc.text("Nombre: " + personaName, marginLeft, cursorY);
      doc.text("Cédula: " + personaCC, marginLeft, cursorY + lineHeight);
      doc.text("Fecha: " + personaFecha, marginLeft, cursorY + 2 * lineHeight);

      // Dibujar la columna del suplente
      doc.text("Nombre: " + suplenteName, marginLeft + columnWidth, cursorY);
      doc.text(
        "Cédula: " + suplenteCC,
        marginLeft + columnWidth,
        cursorY + lineHeight
      );
      doc.text(
        "Fecha: " + suplenteFecha,
        marginLeft + columnWidth,
        cursorY + 2 * lineHeight
      );

      cursorY += 3 * lineHeight; // Saltar espacio para la siguiente persona

      // Verificar si se necesita agregar una nueva página
      checkAddPage();
    });
  };

  // Aquí agregas la tabla con las personas
  const people2 = data.personas2; // Accede a las personas dentro de data

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

    // Verificar si se necesita una nueva página
    checkAddPage();
  };

  const addSubtitle = (text, size = 14) => {
    setFont(size, `normal`);
    doc.text(text, pageWidth / 2, cursorY, { align: `center` });
    cursorY += lineHeight + 2;

    // Verificar si se necesita una nueva página
    checkAddPage();
  };

  // Contenido del documento replicando el estilo del ejemplo
  cursorY += 20;
  addCenteredBoldTitle(`ACTA DE CONSTITUCIÓN`, 12);

  cursorY += 8;

  addJustifiedText(
    `En la ciudad de ${data.ciudad}- Departamento ${data.departamento}, a los ${data.dia} días del mes de ${data.mesName} de ${data.cooperativaName}, siendo las ${data.hora}:${data.minutos}, nosotros los abajo firmantes, debidamente constituidos, domiciliados en el municipio de ${data.municipio} Departamento del ${data.departamento}, República de Colombia, mayores de 18 años, actuando en nuestro propio nombre, e instalados en Asamblea de constitución, hemos acordado lo siguiente:`
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
  addSubtitle(`DESARROLLO`, 12);

  cursorY += 5;
  addJustifiedText(
    `1. Se designó por unanimidad como PRESIDENTE de la sesión a y como SECRETARIO a ${data.nameBoss} Y ${data.nameSubBoss} respectivamente, para dirigir la presente Asamblea de constitución. Se deja constancia de que las anteriores personas manifestaron la aceptación a sus respectivos cargos.`
  );

  cursorY += 5;
  addJustifiedText(
    `2. Declarar constituida por unanimidad hoy ${data.dia} del mes de ${data.mesName} del año ${data.año} la persona jurídica que se denominará COOPERATIVA ${data.nameCooperativa}, sin ánimo de lucro, con domicilio en el municipio de ${data.municipio}, Departamento del ${data.departamento}, República de Colombia, la cual se forma inicialmente por los asociados que hacen parte de la presente acta.`
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
  addPeopleTable(people);

  cursorY += 5;
  addJustifiedText(
    `5. De igual manera se designó a los miembros de la junta de vigilancia de la siguiente manera:`
  );

  cursorY += 5;
  addPeopleTable2(people2);

  cursorY += 5;
  addJustifiedText(
    `6. La asamblea de constitución eligió por unanimidad como Revisor Fiscal a ${
      data.revisorFiscal
    }, con TP. ${data.revisorFiscalTP} y cédula de ciudadanía ${
      data.revisorFiscalCC
    }, expedida el día ${dayjs(data.expediciónCC).format(
      "DD"
    )} del mes ${dayjs(data.expediciónCC).format("MMMM")} del año ${dayjs(
      data.expediciónCC
    ).format("YYYY")} , De igual forma, manifestó aceptar la designación.`
  );

  cursorY += 5;
  addJustifiedText(
    `7. El Consejo de Administración elegido se reunió en forma separada y nombró por unanimidad como Gerente a: ${
      data.gerente
    } con cédula de ciudadanía No ${data.gerenteCC}, expedida el día ${dayjs(
      data.expediciónCCG
    ).format("DD")} del mes ${dayjs(data.expediciónCCG).format(
      "MMMM"
    )} del año ${dayjs(data.expediciónCCG).format(
      "YYYY"
    )}, quien estando presente manifiesta la aceptación de la designación del cargo.`
  );

  cursorY += 5;
  addJustifiedText(
    `8. La presente acta fue leída y aprobada por unanimidad, siendo las ${data.cooperativaName} y en constancia se firma:`
  );

  cursorY += 10;
  addJustifiedText(
    `________________________               ________________________`
  );
  addJustifiedText(
    `Presidente Ad-hoc                                  Secretario Ad-hoc`
  );

  // Guardar PDF
  doc.save(`Acta.pdf`);
};

export default PdfActa;
