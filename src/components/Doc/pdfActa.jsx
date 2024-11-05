import jsPDF from "jspdf";

const pdfActa = ({ data }) => {
  const doc = new jsPDF("p", "mm", "a4"); // Documento A4
  const margin = 10;
  let cursorY = 20;

  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

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

  // Función para agregar texto centrado
  const addCenteredText = (
    text,
    size = 12,
    style = `normal`,
    color = [0, 0, 0]
  ) => {
    setFont(size, style);
    doc.setTextColor(...color);
    if (cursorY + 10 > pageHeight - margin) {
      doc.addPage(); // Añadir nueva página si no hay espacio
      cursorY = margin;
    }
    doc.text(text, pageWidth / 2, cursorY, { align: `center` });
    cursorY += 10;
  };

  // Título principal centrado en amarillo
  addCenteredText(`FORMATO GUÍA ESTATUTOS COOPERATIVA`, 16, `bold`);

  // Título 'ESTATUTOS' centrado
  cursorY += 10;
  addCenteredText(`ESTATUTOS`, 18, `bold`, [0, 0, 0]);

  // Subtítulo 'CAPÍTULO I' centrado
  cursorY += 10;
  addCenteredText(`CAPÍTULO I`, 14, `bold`, [0, 0, 0]);

  // Subtítulo largo centrado
  cursorY += 5;
  addCenteredText(
    `NATURALEZA, RAZÓN SOCIAL, DOMICILIO, ÁMBITO TERRITORIAL Y DURACIÓN`,
    12,
    `bold`
  );

  // ARTÍCULO 1 con texto justificado
  cursorY += 10;
  addJustifiedText(
    `ARTÍCULO 1. Con base en el Acuerdo Cooperativo, se crea y organiza una persona jurídica de derecho privado denominada Cooperativa, cuyas actividades deben cumplirse con fines de interés social y sin ánimo de lucro, que se denominará COOPERATIVA ${data.name}.`
  );

  // ARTÍCULO 2 con texto justificado
  addJustifiedText(
    `ARTÍCULO 2. El domicilio principal de la Cooperativa es el Municipio de ${data.municipio}, Departamento del ${data.country}, República de Colombia y su radio de operaciones comprenderá todo el territorio Nacional.`
  );

  // ARTÍCULO 3 con texto justificado
  addJustifiedText(
    `ARTÍCULO 3. La duración de la Cooperativa es indefinida, pero puede disolverse y liquidarse en cualquier momento, en los casos, en la forma y términos establecidos por la Ley y los presentes Estatutos.`
  );

  // ARTÍCULO 4 con texto justificado
  addJustifiedText(
    `ARTÍCULO 4. La Cooperativa se regirá por la Ley 79 de 1988, sus Decretos reglamentarios, por los presentes Estatutos, por sus reglamentos, por la doctrina y Principios Cooperativos aceptados y por las disposiciones generales sobre asociaciones, fundaciones y sociedades que por naturaleza le sean aplicables.`
  );

  // Subtítulo 'CAPÍTULO II' centrado
  cursorY += 10;
  addCenteredText(`CAPÍTULO II`, 14, `bold`);
  addCenteredText(`OBJETIVOS Y ACTIVIDADES DE LA COOPERATIVA`, 12, `bold`);

  // ARTÍCULO 5 con texto justificado
  addJustifiedText(
    `ARTÍCULO 5. OBJETO SOCIAL. En razón del acuerdo cooperativo, la Cooperativa ${data.name}, tiene como objetivo ${data.obj}.`
  );

  // Actividades de la cooperativa (puntos a-d) con texto justificado
  addJustifiedText(
    `Para el cumplimiento del objetivo indicado, la Cooperativa puede desarrollar las siguientes actividades:`
  );
  addJustifiedText(`${data.name}`);

  addJustifiedText(
    `ARTICULO 6. El Consejo de Administración elaborará y aprobará los reglamentos para la prestación de los servicios consagrados en los objetivos ya conocidos.`
  );
  addJustifiedText(
    `PARÁGRAFO. Cuando no sea posible o conveniente prestar directamente un servicio, la Cooperativa podrá atenderlo por intermedio de otras entidades, en especial del sector Cooperativo, para lo cual se celebran convenios especiales.`
  );

  // Subtítulo 'CAPÍTULO II' centrado
  cursorY += 10;
  addCenteredText(`CAPÍTULO III`, 14, `bold`);
  addCenteredText(
    `REQUISITOS Y PROCEDIMIENTO PARA LA ADQUISICIÓN DE LA CALIDAD DE ASOCIADO.`,
    12,
    `bold`
  );

  addJustifiedText(
    `ARTÍCULO 7. La Cooperativa estará integrada por las personas fundadoras y por quienes sean aceptados posteriormente por el Consejo de Administración que adhieran y se sometan a los presentes estatutos, suscribiendo el acuerdo Cooperativo, previsto en el artículo 3 de la Ley 79 de 1988.`
  );

  addJustifiedText(
    `ARTICULO 8. Para ser asociado de la Cooperativa se requiere:`
  );
  addJustifiedText(
    `a)	Ser mayor de dieciocho (18) años y no estar afectado de incapacidad.`
  );
  addJustifiedText(
    `b)	Suscribir el acta de constitución o ser admitido con posterioridad por el Consejo de Administración.`
  );
  addJustifiedText(
    `c)	Estar domiciliado dentro del ámbito de operaciones de la Cooperativa.`
  );
  addJustifiedText(
    `d)	Pagar la cuota de admisión del ___% de un salario mínimo mensual del año vigente, una vez sea aceptado por el Consejo de Administración, la que no será devolutiva y se destinará a cubrir gastos de organización y funcionamiento.`
  );
  addJustifiedText(
    `e)	Suscribir en aportes el valor del ____% del salario mínimo. En certificados de aportación y pagar como mínimo la cuarta parte de ellos una vez aceptado por el Consejo.`
  );
  addJustifiedText(
    `f)	Acreditar haber recibido como mínimo 20 horas educación Cooperativa.`
  );

  addJustifiedText(
    `PARÁGRAFO. En la medida en que la Cooperativa amplíe sus actividades que involucre la generación de puestos de trabajo, el Consejo de Administración podrá aceptar el ingreso de nuevos asociados que ocupen o reemplacen estos puestos, siempre y cuando los nuevos asociados cumplan con los requisitos estatutarios`
  );
  cursorY += 10;
  addCenteredText(`DERECHOS Y DEBERES DE LOS ASOCIADOS.`, 12, `bold`);
  addJustifiedText(
    `ARTICULO 9. Los asociados tendrán además de los derechos consagrados en las disposiciones legales y las normas concordantes de los presentes estatutos, los siguientes derechos fundamentales:`
  );
  addJustifiedText(
    `a.	Cumplir con dedicación, interés, eficiencia, ética, honestidad, responsabilidad y lealtad en el trabajo que se le asigne y someterse a las disposiciones reglamentarias del mismo.`
  );
  addJustifiedText(
    `b.	Participar en la administración de la Cooperativa mediante el desempeño de cargos sociales.`
  );
  addJustifiedText(
    `c.	Ejercer la función del sufragio cooperativo en las Asambleas generales, de tal modo que a cada asociado hábil le corresponda un voto.`
  );
  addJustifiedText(
    `d.	Gozar de los beneficios y prerrogativas de la Cooperativa.`
  );
  addJustifiedText(
    `e.	Beneficiarse de los programas educativos y de capacitación profesional que se realicen.`
  );
  addJustifiedText(
    `f.	Asistir a las Asambleas Generales ordinarias y extraordinarias y desempeñar los cargos para los cuales sean nombrados. `
  );
  addJustifiedText(
    `g.	Retirarse voluntariamente de la Cooperativa mientras esta no se haya disuelto.`
  );
  addJustifiedText(
    `h.	Abstenerse de efectuar actos o incurrir en omisiones que afecten la estabilidad económica o el prestigio social de la Cooperativa.`
  );
  addJustifiedText(
    `i.	Comportarse solidariamente en sus relaciones con la Cooperativa y los asociados de la misma.`
  );
  addJustifiedText(
    `ARTICULO 10. Los derechos consagrados en la Ley y en los Estatutos solo serán ejercidos por los asociados que estén al día en el cumplimiento de sus deberes.`
  );
  addJustifiedText(
    `ARTICULO 11. Los asociados tendrán además de los deberes consagrados en las disposiciones legales y en las normas concordantes de los presentes estatutos, los siguientes deberes especiales:`
  );
  addJustifiedText(
    `a.	Comportarse siempre con espíritu cooperativo tanto en sus relaciones con la Cooperativa como con los miembros de la misma.`
  );
  addJustifiedText(
    `b.	Abstenerse de ejecutar hechos e incurrir en omisiones que afecten o puedan afectar la estabilidad económica o el prestigio social de la Cooperativa.`
  );
  addJustifiedText(
    `c.	Cumplir fielmente los compromisos adquiridos con la Cooperativa.`
  );
  addJustifiedText(
    `d.	Aceptar y cumplir las determinaciones que las directivas adoptan conforme a los Estatutos.`
  );

  // Subtítulo 'CAPÍTULO IV' centrado
  cursorY += 10;
  addCenteredText(`CAPÍTULO IV`, 14, `bold`);
  addCenteredText(
    `CONDICIONES PARA LA ADMISIÓN Y EXCLUSIÓN DE LOS ASOCIADOS.`,
    12,
    `bold`
  );

  addJustifiedText(
    `ARTICULO 12. Para ser admitido como asociado de la Cooperativa por el Consejo de Administración, se requiere solicitud del interesado y la expresa demostración de que cumple en artículo anterior.`
  );
  addJustifiedText(`ARTICULO 13. La calidad de asociado de la Cooperativa se pierde por:

a.	Retiro voluntario.
b.	Exclusión.
c.	Retiro forzoso.
d.	Fallecimiento.
`);
  addJustifiedText(`ARTICULO 14. El Consejo de Administración de la Cooperativa aceptará el retiro voluntario de un asociado siempre que medie solicitud por escrito. En caso de existir deuda a favor de la Cooperativa y el asociado con sus aportes cubra la misma se efectuará el cruce de cuentas de compensación.`);
  addJustifiedText(``);
  addJustifiedText(``);
  addJustifiedText(``);
  addJustifiedText(``);
  addJustifiedText(``);
  addJustifiedText(``);
  addJustifiedText(``);
  addJustifiedText(``);
  addJustifiedText(``);
  doc.save(`Estatutos_Cooperativa_Replica.pdf`);
};

export default pdfActa;
