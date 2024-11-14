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
  const addJustifiedText = (text, size = 11) => {
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

  // Contenido del documento replicando el estilo del ejemplo
  cursorY += 20;
  addCenteredBoldTitle(`MODELO GUÍA DE ESTATUTOS`, 12);
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO I`, 12);
  cursorY += 3;
  addCenteredBoldTitle(`NATURALEZA, RAZÓN SOCIAL, DOMICILIO, ÁMBITO`, 12);
  addCenteredBoldTitle(`TERRITORIAL Y DURACIÓN`, 12);

  cursorY += 8;
  addJustifiedText(
    `ARTICULO 1.   Con base en el Acuerdo Cooperativo, se crea y organiza una Empresa Asociativa de Derecho Privado, de responsabilidad Limitada, sin ánimo de lucro, del sector solidario, que se denominará COOPERATIVA ${data.rSocial} con sigla ${data.sigla}`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 2.  El domicilio principal de la Cooperativa es el Municipio de ${data.municipio}, Departamento del ${data.departamento}, República de Colombia y su radio de operaciones comprenderá todo el territorio Nacional.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 3.  La duración de la Cooperativa es indefinida, pero puede disolverse y liquidarse en cualquier momento, en los casos, en la forma y términos establecidos por la Ley y los presentes Estatutos.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 4. La Cooperativa se regirá por la Ley 79 de 1988, sus Decretos reglamentarios, por los presentes Estatutos, por sus reglamentos, por la doctrina y Principios Cooperativos aceptados y por las disposiciones generales sobre asociaciones, fundaciones y sociedades que por naturaleza le sean aplicables`
  );

  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO II`, 12);
  cursorY += 3;
  addCenteredBoldTitle(`OBJETIVOS Y ACTIVIDADES DE LA COOPERATIVA`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 5. OBJETO SOCIAL. El objeto principal de la cooperativa es ${data.objSocial}.`
  );
  cursorY += 1;
  addJustifiedText(
    `La cooperativa, no tiene ánimo de lucro, por lo cual todos los ingresos, su patrimonio y cualquier otra clase de venta que reciba estará dedicada al logro de sus fines.  
    Para el cumplimiento de los objetivos concretos expuestos en el artículo anterior. Esta COOPERATIVA desarrollara las siguientes actividades a través de las secciones de ${data.secciónCorrespondiente}.`
  );

  cursorY += 2;
  addJustifiedText(
    `ARTICULO 6. El Consejo de Administración elaborará y aprobará los reglamentos para la prestación de los servicios consagrados en los objetivos ya conocidos.`
  );
  cursorY += 1;
  addJustifiedText(
    `PARÁGRAFO. Cuando no sea posible o conveniente prestar directamente un servicio, la cooperativa podrá atenderlo por intermedio de otras entidades, en especial del sector Cooperativo, para lo cual se celebran convenios especiales.`
  );

  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO III`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `REQUISITOS Y PROCEDIMIENTO PARA LA ADQUISICIÓN DE LA CALIDAD DE ASOCIADO.`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTÍCULO 7. La cooperativa estará integrada por las personas fundadoras y por quienes sean aceptados posteriormente por el Consejo de Administración que adhieran y se sometan a los presentes estatutos, suscribiendo el acuerdo Cooperativo, previsto en el artículo 3 de la Ley 79 de 1988.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 8. Para ser asociado de la cooperativa se requiere:`
  );
  addJustifiedText(
    `  a). Ser mayor de dieciocho (18) años y no estar afectado de incapacidad.`
  );
  addJustifiedText(
    `  b). Suscribir el acta de constitución o ser admitido con posterioridad por el Consejo de Administración.`
  );
  addJustifiedText(
    `  c). Estar domiciliado dentro del ámbito de operaciones de la cooperativa.`
  );
  addJustifiedText(
    `  d). Pagar la cuota de admisión del ${data.admisión}% un salario mínimo mensual del año vigente, una vez sea aceptado por el Consejo de Administración, la que no será devolutiva y se destinará a cubrir gastos de organización y funcionamiento.`
  );
  addJustifiedText(
    `  e). Suscribir en aportes el valor del ${data.aportes}% del salario mínimo. En certificados de aportación y pagar como mínimo la ${data.aportación} parte de ellos una vez aceptado por el Consejo.`
  );
  addJustifiedText(
    `  f). Acreditar haber recibido como mínimo educación Cooperativa con una intensidad de 20 horas o comprometerse a realizarlo durante los  ${data.acreditar} meses siguientes a su ingreso.`
  );

  //
  cursorY += 8;
  addCenteredBoldTitle(`DERECHOS Y DEBERES DE LOS ASOCIADOS`, 12);
  cursorY += 3;
  addJustifiedText(
    `ARTICULO 9. Los asociados tendrán además de los derechos consagrados en las disposiciones legales y las normas concordantes de los presentes estatutos, los siguientes derechos fundamentales:`
  );
  cursorY += 2;
  addJustifiedText(
    `a) Cumplir con dedicación, interés, eficiencia, ética, honestidad, responsabilidad y lealtad en el trabajo que se le asigne y someterse a las disposiciones reglamentarias del mismo.`
  );
  addJustifiedText(
    `b) Participar en la administración de la cooperativa mediante el desempeño de cargos sociales.`
  );
  addJustifiedText(
    `c) Ejercer la función del sufragio cooperativo en las Asambleas generales, de tal modo que a cada asociado hábil le corresponda un voto.`
  );
  addJustifiedText(
    `d) Gozar de los beneficios y prerrogativas de la cooperativa.`
  );
  addJustifiedText(
    `e) Beneficiarse de los programas educativos y de capacitación profesional que se realicen.`
  );
  addJustifiedText(
    `f) Asistir a las Asambleas Generales ordinarias y extraordinarias y desempeñar los cargos para los cuales sean nombrados.`
  );
  addJustifiedText(
    `g) Retirarse voluntariamente de la cooperativa mientras esta no se haya disuelto.`
  );
  addJustifiedText(
    `h) Abstenerse de efectuar actos o incurrir en omisiones que afecten la estabilidad económica o el prestigio social de la Cooperativa.`
  );
  addJustifiedText(
    `i) Abstenerse de efectuar actos o incurrir en omisiones que afecten la estabilidad económica o el prestigio social de la Cooperativa.`
  );
  cursorY += 3;
  addJustifiedText(
    `ARTICULO  10. Los derechos consagrados en la Ley y en los Estatutos solo serán ejercidos por los asociados que estén al día en el cumplimiento de sus deberes.`
  );
  cursorY += 3;
  addJustifiedText(
    `ARTICULO 11. Los asociados tendrán además de los deberes consagrados en las disposiciones legales y en las normas concordantes de los presentes estatutos, los siguientes deberes especiales:`
  );
  cursorY += 2;
  addJustifiedText(
    `a) Comportarse siempre con espíritu cooperativo tanto en sus relaciones con la cooperativa como con los miembros de la misma`
  );
  addJustifiedText(
    `b) Abstenerse de ejecutar hechos e incurrir en omisiones que afecten o puedan afectar la estabilidad económica o el prestigio social de la Cooperativa.`
  );
  addJustifiedText(
    `c) Cumplir fielmente los compromisos adquiridos con la Cooperativa.`
  );
  addJustifiedText(
    `d) Aceptar y cumplir las determinaciones que las directivas adoptan conforme a los Estatutos.`
  );

  //
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO IV`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `CONDICIONES PARA LA ADMISIÓN Y EXCLUSIÓN DE LOS ASOCIADOS.`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 12. Para ser admitido como asociado de la cooperativa por el consejo de Administración, se requiere solicitud del interesado y la expresa demostración de que cumple en artículo anterior.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 13. La calidad de asociado de la cooperativa se pierde por:`
  );
  cursorY += 1;
  addJustifiedText(`a) Retiro voluntario.`);
  addJustifiedText(`b) Exclusión.`);
  addJustifiedText(`c) Retiro forzoso.`);
  addJustifiedText(`d) Fallecimiento.`);

  cursorY += 2;
  addJustifiedText(
    `ARTICULO 14. El Consejo de Administración de la Cooperativa aceptará el retiro voluntario de un asociado siempre que medie solicitud por escrito. En caso de existir deuda a favor de la cooperativa y el asociado con sus aportes cubra la misma se efectuará el cruce de cuentas.`
  );

  cursorY += 2;
  addJustifiedText(
    `ARTICULO 15. El Consejo de Administración tendrá un plazo máximo de ${data.plazoMáximo} días para la devolución del saldo de sus aportes.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 16. El Consejo de Administración no concederá el retiro de los asociados en los siguientes casos:`
  );
  cursorY += 1;
  addJustifiedText(
    `1) Cuando se reduzca el número mínimo de asociados que exige la ley para la constitución de la cooperativa o se afecte el patrimonio mínimo social requerido para la existencia de ella.`
  );
  addJustifiedText(
    `2) Cuando el retiro proceda con la confabulación e indisciplina o tenga estos propósitos.`
  );
  addJustifiedText(
    `3) Cuando el asociado haya incurrido en causales de exclusión o suspensión.`
  );

  cursorY += 2;
  addJustifiedText(
    `ARTICULO 17. El consejo de Administración de la cooperativa excluirá a los asociados por los siguientes casos:`
  );
  cursorY += 1;
  addJustifiedText(
    `1) Por infracciones graves a la disciplina social que pueda desviar los fines de la cooperativa.`
  );
  addJustifiedText(
    `2) Por ejercer dentro de la cooperativa actividades de carácter político, religioso o racial.`
  );
  addJustifiedText(
    `3) Por actividades desleales contrarias a los ideales del cooperativismo.`
  );
  addJustifiedText(
    `4)  Por servirse de la cooperativa en provecho de terceros.`
  );
  addJustifiedText(
    `5)  Por entregar a la cooperativa en provecho de terceros.`
  );
  addJustifiedText(
    `6)  Por falsedad o reticencia en los informes o documentos que la cooperativa requiera.`
  );
  addJustifiedText(
    `7)  Por descontar vales, libranzas, pagarés y otros documentos a favor de terceros.`
  );
  addJustifiedText(
    `8)  Por mora mayor de ${data.moraMayor} días en el cumplimiento de las obligaciones  con la cooperativa.`
  );
  addJustifiedText(
    `9)  Por efectuar operaciones ficticias en el perjuicio de la cooperativa, de los asociados o de terceros.`
  );
  addJustifiedText(
    `10) Por cambiar la finalidad de los recursos financieros obtenidos de la cooperativa.`
  );
  addJustifiedText(
    `11) Por negarse, sin causa justificada a cumplir las comisiones o encargos de utilidad general conferidos por la cooperativa.`
  );
  addJustifiedText(
    `12) Por no hacer uso de los servicios de la cooperativa por un término mayor de noventa (90) días.    `
  );
  addJustifiedText(
    `13) Por negarse a recibir capacitación o impedir que los demás asociados la puedan recibir.`
  );
  addJustifiedText(
    `14) Por delitos que impliquen penas privativas de la libertad.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 18. Para que la exclusión sea procedente es esencial una información sumaria previa, adelantada por el consejo de Administración que constara en actas suscritas por el Presidente y el Secretario del Consejo y mediante la cual se le formule por escrito al asociado implicado, los cargos a que hubiere lugar, para luego también darle la oportunidad de que presente los respectivos descargos.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 19. La exclusión será aprobada por mayoría de los miembros principales del Consejo de Administración mediante la resolución motivada.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 20. La resolución de exclusión será notificada al asociado personalmente dentro de los cinco (5) días siguientes a la fecha de su expedición. Si no fuere posible hacer la notificación en la forma personal, se hará mediante edicto, que se fijará en un lugar visible de la cooperativa por él término de diez (10) días, al cabo de los cuales se dará por notificado.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 21. Contra la resolución de exclusión procede únicamente el recurso de reposición elevado por el asociado ante el Consejo de Administración, con el objeto de que se aclare, se modifique o revoque. El Consejo de Administración resolverá el recurso dentro de los quince (15) días siguientes, contados a partir del recibo del mismo.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 22. Confirmada la resolución esta quedará ejecutoriada o en firme y entonces prescindirá a surtir todos sus efectos legales.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 23. Quedan vigentes las obligaciones que consten en libranzas, pagarés o cualquier otro documento debidamente firmado por el Asociado en su calidad de tal antes ser excluido y las garantías otorgadas por él a favor de la cooperativa.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 24. El Asociado excluido podrá recurrir ante los jueces civiles municipales, con el fin de impugnar el acto de exclusión preferido por el Consejo de Administración.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 25. El retiro forzoso del Asociado de la cooperativa se origina en los siguientes casos:`
  );
  cursorY += 1;
  addJustifiedText(`1) Cambio definitivo de domicilio.`);
  addJustifiedText(
    `2) Incapacidad civil y estatutaria para ejercer derechos y contraer obligaciones.`
  );
  addJustifiedText(
    `3) Pérdida del vínculo común en el cual se constituyó la cooperativa.`
  );

  cursorY += 2;
  addJustifiedText(
    `ARTICULO 26. El Asociado que por retiro forzoso dejare de pertenecer a la cooperativa y deseare afiliarse nuevamente a ella, deberá acreditar los requisitos exigidos para los nuevos asociados. Tal admisión podrá concederse en cualquier momento, siempre que demuestre la desaparición de las causas que originaron su retiro.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 27. El Asociado que por retiro voluntario dejare de pertenecer a la cooperativa y deseare afiliarse nuevamente a ella, deberá acreditar los requisitos exigidos para los nuevos asociados. Tal admisión sólo podrá concederse ${data.retiroVoluntario} meses después de su retiro.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 28. En caso de fallecimiento de un Asociado los certificados de aportación, revalorizaciones y retornos que le correspondan pasarán a sus herederos quienes se subrogarán en los derechos y obligaciones de aquel. Silos herederos no ingresan a la cooperativa por  cualquiera causa, ésta les reintegrará dichos valores mientras no se afecte el mantenimiento del capital inicial. De todas formas, los herederos designarán dentro de un término no mayor de treinta (30) días a partir de la fecha del fallecimiento del asociado, la persona que debe representarlo en la cooperativa.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO V`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `DEVOLUCIÓN DE APORTES DE LOS ASOCIADOS DESVINCULADOS DE LA COOPERATIVA.`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 29. Aceptado el retiro voluntario o forzoso o confirmada la exclusión, la cooperativa dispondrá de un plazo máximo de ${data.retiroVoluntario2} días para proceder a la devolución de los aportes.`
  );
  addJustifiedText(
    `El Consejo de Administración deberá expedir el reglamento que fije el procedimiento para satisfacer las obligaciones sin que sobrepase el término establecido anteriormente.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 30. La devolución de aportes de capital podrá hacerse en obligaciones pagaderas en un plazo no mayor de un (1) año y con interés del 18% anual sobre saldos, cuando la mayor parte del capital de la cooperativa esté representado en activos fijos.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 31. Si a la fecha de desvinculación del asociado de la cooperativa está dentro de su estado financiero y de acuerdo con el último balance producido, presenta pérdidas, el Consejo de Administración podrá ordenar la retención de los aportes en forma proporcional a la pérdida registrada y hasta por el término de expiración de la responsabilidad.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 32. Si dentro de los (2) años siguientes a la fecha del balance en que se reflejaron las pérdidas, la cooperativa no muestra recuperación económica que le permita la devolución de los aportes retenidos a los asociados retirados, la siguiente asamblea deberá resolver sobre el procedimiento para la cancelación de las pérdidas.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 33. Si vencido el término fijado para la devolución de los aportes al tenedor del artículo 29 la cooperativa no ha procedido de conformidad, el valor de los correspondientes aportes empezará a devengar un interés de mora del 3% mensual.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO VI`, 12);
  cursorY += 3;
  addCenteredBoldTitle(`REGIMEN DE SANCIONES CAUSALES Y PROCEDIMIENTOS.`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 34. El consejo de Administración podrá imponer por faltas que no constituyan causal de exclusión, las siguientes sanciones:`
  );
  cursorY += 1;
  addJustifiedText(`1) Llamada de atención por escrito.`);
  addJustifiedText(
    `2) Multa entre un salario mínimo diario vigente, hasta cuatro salarios mínimos diarios vigente.`
  );
  addJustifiedText(
    `3) Suspensión de la prestación de los servicios hasta por el término de ${data.suspensión} meses.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 35. Con excepción de la sanción establecida en el literal a del artículo anterior, el procedimiento para la aplicación de las restantes sanciones, será el establecido en los artículos 18, 19, 20, 21 y 22 de los presentes estatuto.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO VII`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `PROCEDIMIENTO PARA RESOLVER DIFERENCIAS O CONFLICTOS.`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 36. Cláusula compromisoria (Opcional). Para solucionar eventuales controversias que surgieren con ocasión de la constitución, interpretación, ejecución, terminación, liquidación o cualquier otro asunto relativo al presente contrato, incluida la impugnación de las decisiones de la Asamblea General con fundamento en cualquiera de las causas legales, los asociados acuerdan someter sus diferencias a través de cualquiera de los siguientes mecanismos de solución de conflictos, a elección de la parte convocante, que se tramitará en el Centro de Conciliación, Arbitraje y Amigable Composición de la Cámara de Comercio de la ciudad ${data.nameCCC}`
  );
  cursorY += 2;
  addJustifiedText(
    `Amigable composición: Se tramitará bajo las reglas contenidas en el Reglamento Interno del Centro de Amigable Composición de la Cámara de Comercio de ${data.nameCCC}. Los miembros podrán determinar por mutuo acuerdo el número de amigables componedores y su designación, si no hay acuerdo al respecto, habrá un único amigable componedor y se delegará su designación al Centro.`
  );
  cursorY += 2;
  addJustifiedText(
    `Arbitraje: Los asociados someterán la controversia a decisión de un Tribunal de Arbitramento, el cual, decidirá en derecho, en conformidad con las reglas contenidas en el Reglamento Interno del Centro y de la Ley 1563 de 2012. La designación de los árbitros será dada por mutuo acuerdo entre los asociados, en caso de que estos no logren convenirlo, los asociados acuerdan delegar su designación al Centro, a través de sorteo conforme con su lista oficial de árbitros según la materia de la controversia. En el evento de que la cuantía de la controversia no supere las 2400 UVT, los asociados acuerdan someter el asunto al procedimiento del Arbitraje Abreviado según las reglas y el procedimiento del Reglamento Interno de la Cámara de Comercio de ${data.nameCCC}.`
  );
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO VIII`, 12);
  cursorY += 3;
  addCenteredBoldTitle(`DEL REGIMEN ECONÓMICO.`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 37. El patrimonio de la cooperativa estará constituido por:`
  );
  addJustifiedText(`a) Los aportes sociales individuales.`);
  addJustifiedText(`b) Los fondos y reservas de carácter permanente.`);
  addJustifiedText(
    `c) Las donaciones o auxilios que se reciban con destino al incremento patrimonial.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 38. El aporte social estará compuesto por las aportaciones individuales que hagan los asociados, las cuales podrán ser satisfechas en dinero, en especie o en trabajo, convencionalmente avaluados y estarán representadas en certificados de un valor igual nominal. El avalúo de bienes y servicios, en caso de que se aporten, se hará al firmar el acta de constitución o al incorporarse el asociado posteriormente a la cooperativa, de común acuerdo entre el asociado y el Consejo Administrativo.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 39. El Consejo de Administración determinará a que parte del capital social de la Cooperativa, podrá pertenecer a cada una de las acciones.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTCULO 40. Las aportaciones de los asociados se representarán en certificados de igual valor nominal de un salario mínimo mensual pesos M/CTE. cada uno, firmados por el Gerente y el Secretario. Dichos certificados no tendrán distinción por razón de las diferentes secciones de la Cooperativa y en ningún caso tendrán el carácter de Títulos valores.`
  );
  cursorY += 2;
  addJustifiedText(
    `El Consejo de Administración reglamentará la forma de presentar las fracciones de capital inferiores al valor de un certificado de aportación, mientras se completa la cantidad requerida para la expedición del certificado respectivo.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 41. Los certificados de aportación, podrán cederse a otro asociado únicamente con la aprobación del Concejo de Administración, de acuerdo con la reglamentación general para el efecto y serán inembargables.`
  );
  cursorY += 2;
  addJustifiedText(
    `Cualquier cesión de tales certificados de aportación, retornos o derechos que los asociados hagan a favor de otros asociados, no implicará perjuicio ninguno en los derechos preferenciales de la cooperativa.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 42. Los bienes y valores distintos a los aportes de los asociados destinados a capital, no tendrán el carácter de aportaciones y por lo taño no serán repartidas, ni darán derecho a retorno, ni se computarán como excedentes repartibles.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 43. Fíjese la suma de ${data.sumaDe} MIL PESOS ($${data.sumaDeN}) M/CTE.  El aporte Social inicial suscrito de la Cooperativa del cual se haya pagado la cuarta parte o sea ${data.aporteSocialInicial} MIL PESOS  ($${data.aporteSocialInicialN}) M/CTE. Que constituye el aporte social mínimo no reducible durante la vida de la Cooperativa.`
  );
  cursorY += 2;
  addJustifiedText(
    `Para asociados que ingresen deberán pagar el ${data.ingresarPago}% del salario mínimo mensual legal vigente, según reglamento del Concejo de Administración.`
  );
  cursorY += 2;
  addJustifiedText(
    `Fíjese el valor del ${data.contribuciónMensual}( % ) de un salario mínimo legal vigente como cuota mensual obligatoria con que cada asociado debe contribuir a la cooperativa que se destinarán para aportes sociales.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 44. Ningún asociado podrá directa o indirectamente tener más del 10% de los aportes sociales de la cooperativa, salvo que se trate de personas jurídicas que no persigan fines de lucro o de las entidades de derecho público, las cuales podrán poseer hasta el 49% de los aportes sociales de la cooperativa.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 45. Cuando haya litigio sobre la propiedad de los certificados de aportación, el Gerente los mantendrá en depósito mientras establece a quien corresponden, previo concepto del Consejo de Administración.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 46. Los certificados de aportación y los demás aportes especiales o extraordinarios, que los asociados tengan incorporados en la cooperativa, no podrán ser embargados.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 47. Los auxilios, subvenciones y destinaciones especiales que se hagan a favor de la cooperativa y de los fondos en particular no podrán ser de propiedad de los asociados sino de la cooperativa y los retornos y excedentes cooperativos que les puedan corresponder, se destinarán a incrementar el fondo de solidaridad.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO IX`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `RESPONSABILIDAD DE LA COOPERATIVA, DE LOS ASOCIADOS Y DE LOS DIRECTIVOS.`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 48. La cooperativa se hace acreedora o deudora ante terceros y ante sus asociados por las operaciones que activa o pasivamente efectúe el consejo de Administración y el gerente, dentro de la órbita de sus atribuciones respectivas y responde económicamente con la totalidad de su patrimonio.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 49. La responsabilidad de los asociados para con la cooperativa y para con los demás acreedores de ésta, se limita hasta la concurrencia del valor de sus aportaciones de capital, por las obligaciones contraídas por la cooperativa antes de su ingreso y las existentes en la fecha de su retiro o exclusión de conformidad con los presentes estatutos.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 50. La responsabilidad de la cooperativa para sus asociados y con los terceros compromete la totalidad del patrimonio social.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 51. En los suministros, créditos y demás relaciones contractuales para la cooperativa, los asociados responderán personal o solidariamente con su codeudor en la forma como se estipule en el reglamento o en el respectivo documento de pago.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 52. Los asociados que se desvinculen de la cooperativa responderán con sus aportes o con estos y la suma adicional establecida, según el caso, de las obligaciones que la cooperativa haya contraído hasta el momento de su desvinculación.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 53. Los miembros del Consejo de Administración, el Gerente, el Revisor Fiscal y demás funcionarios de la cooperativa son responsables de la acción, omisión o extralimitación de sus funciones de conformidad con el derecho común.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 54. La cooperativa, los asociados, los creedores podrán ejercer acción de responsabilidad contra los miembros del Consejo de Administración, gerente, revisor fiscal y demás empleados por sus actos de omisión o extralimitación o abuso de autoridad; con los cuales hayan perjudicado el patrimonio y el prestigio de la cooperativa, con el objeto de exigir la reparación de los perjuicios causados.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 55. Al retiro, muerte, exclusión del asociado y si existieren pérdidas que no alcancen a ser cubiertas por las reservas, la Cooperativa afectará en forma proporcional y hasta su valor total el aporte social por devolver.  Igual situación cuando sea disolución.`
  );
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO X`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `DEVOLUCIÓN DE APORTES DE LOS ASOCIADOS DESVINCULADOS DE LA COOPERATIVA.`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 56. La Administración y vigilancia de la cooperativa, estará a cargo de:`
  );
  addJustifiedText(`1)La Asamblea General.`);
  addJustifiedText(`2)El Consejo de Administración.`);
  addJustifiedText(`3)El Gerente.`);
  addJustifiedText(`4)La Junta de Vigilancia y.`);
  addJustifiedText(`5)El Revisor Fiscal.`);
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 57. La Asamblea general es el órgano máximo de administración de la cooperativa y sus decisiones son obligatorias para todos los asociados, siempre que se haya adoptado de conformidad con las normas legales reglamentarias o estatutarias. La constituya la reunión de asociados hábiles o de los delegados elegidos por estos.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO: Son asociados hábiles, para efectos del presente artículo, los inscritos en registro social que no tengan suspendidos sus derechos y se encuentren al corriente en el cumplimiento de sus obligaciones de acuerdo con los reglamentos que para tal efecto expida el Consejo de administración.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 58. Las reuniones de asamblea general serán ordinarias y extraordinarias. Las ordinarias deberán celebrarse dentro de los tres (3) primeros meses del año calendario para el cumplimiento de sus funciones regulares. Las extraordinarias podrán reunirse en cualquier época del año, con el objeto de tratar asuntos imprevistos o de urgencia que no puedan postergarse hasta la siguiente asamblea general ordinaria.`
  );
  cursorY += 2;
  addJustifiedText(
    `Las asambleas generales extraordinarias sólo podrán tratar los asuntos para los cuales fueron convocados y los que se deriven estrictamente de éstos.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 59. Cuando el total de asociados de la cooperativa excede de ${data.cooperativaExcede}. Cuando gran número de ellos estén domiciliados en diferentes Municipios del País, o cuando su realización resultase desproporcionadamente generosa en consideración a los recursos de la cooperativa la Asamblea general de asociados podrá ser sustituida por una Asamblea general de delegados.`
  );
  cursorY += 2;
  addJustifiedText(
    `Los delegados serán elegidos en un número mínimo de veinte (   ) y para el periodo de ___ (   ) año(s), debiendo el Consejo de Administración reglamentar el procedimiento para su elección, que en todo caso deberá garantizar la adecuada información y participación de los asociados, se elegirá un delegado por cada (     ) asociados.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO: A la Asamblea de delegados le serán aplicables, en lo pendiente las normas relativas a la Asamblea general de Asociados.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 60. Por regla general la asamblea ordinaria o extraordinaria, será convocada por el Consejo de Administración, para fecha, hora, lugar y objetos determinados.`
  );
  cursorY += 2;
  addJustifiedText(
    `La junta de vigilancia, el revisor fiscal, o un 15% mínimo de los asociados podrán solicitar al Consejo de administración, la convocatoria de asamblea general extraordinaria.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 61. Si faltando diez (10) días para vencerse el plazo que tiene el consejo para convocar a la asamblea ordinaria, la junta de vigilancia procederá a efectuar dicha convocatoria dentro los quince (15) días siguientes; sí vencido este término y no lo hiciere el organismo de control., procederá a hacerlo el revisor fiscal o en última instancia el 15% como mínimo de los asociados de la cooperativa teniendo en cuenta los requisitos establecidos en el artículo anterior.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 62. La convocatoria a asamblea se dará a conocer a los asociados hábiles o delegados elegidos con suficiente anticipación y empleando para tal efecto los medios más adecuados, tales como circulares, cuñas radiales o publicación en un periódico regional si es posible. `
  );
  cursorY += 2;
  addJustifiedText(
    `La junta de vigilancia verificará la lista de asociados hábiles e inhábiles y la relación de éstos últimos será publicada para conocimiento de los afectados.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 63. La Asamblea elegirá de su seno sus dignatarios. Actuará como Secretario del mismo de la cooperativa. El orden del día de cada sesión será presentando por la mesa directiva y probado por la Asamblea. `
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 64. Cada asociado tiene derecho a un voto, cualquiera que sea el número de certificados de aportaciones que posea.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 65. La asistencia de la mitad de los asociados hábiles y de los delegados convocados, constituirá quórum para deliberar y adoptar decisiones válidas; si dentro de la hora siguiente a la convocatoria no se hubiera integrado este quórum, la Asamblea podrá deliberar y adoptar decisiones válidas con un número de asociados no interior al diez por ciento (10%) del total de asociados hábiles ni al 50% del número requerido para construir la cooperativa.`
  );
  cursorY += 2;
  addJustifiedText(
    `En las asambleas generales de delegados el quórum mínimo será el 50% de los delegados elegidos y convocados una vez constituidos el quórum este se entenderá desintegrado por el retiro de alguno o algunos de los asistentes, siempre que se mantenga el quórum mínimo del inciso anterior.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO: En las asambleas generales no habrá representaciones en ningún caso y para ningún efecto.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 66. Los miembros del Consejo de Administración, la junta de vigilancia, el Gerente y los empleados de la cooperativa que sean asociados no podrán votar en las asambleas cuando se trate de asuntos que afecten su responsabilidad.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 67. Por regla general, las decisiones de la Asamblea general, se tomarán por mayoría absoluta de los votos de los asistentes. Para las reformas de Estatutos, la fijación de aportes extraordinarios, la amortización de aportes, la transformación, la fusión, la incorporación y la disolución para liquidación, se requerirá el voto favorable de las terceras partes de los asistentes.`
  );
  cursorY += 2;
  addJustifiedText(
    `La elección de cuerpos plurales se hará por el procedimiento que determine la Asamblea general. Cuando se adopte el de listas o planchas, se aplicará el sistema de cociente electoral.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO: Las personas jurídicas asociadas a la cooperativa participaran en las Asambleas de éstas, por intermedio de su representante legal o de la persona que ésta designe.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 68. Son funciones de la Asamblea general las siguientes:`
  );
  addJustifiedText(
    `a) Establecer políticas y directrices generales de la cooperativa para el.  cumplimiento de los motivos sociales.`
  );
  addJustifiedText(`b) Reformar los estatutos.`);
  addJustifiedText(
    `c) Examinar los informes de los órganos de administración y vigilancia.`
  );
  addJustifiedText(
    `d) Aprobar o improbar los estados financieros de fin de ejercicio.`
  );
  addJustifiedText(
    `e) Destinar los excedentes del ejercicio económico conforme a lo previsto en la ley y los estatutos.`
  );
  addJustifiedText(`f) Fijar aportes extraordinarios.`);
  addJustifiedText(
    `g) Elegir el revisor fiscal y su suplente y fijar y remuneración.`
  );
  addJustifiedText(
    `h) Elegir los miembros del Consejo de Administración y de la junta de vigilancia.`
  );
  addJustifiedText(
    `i) Aprobar la transformación, disolución fusión, incorporación de la empresa asociativa, con el voto como mínimo de las dos terceras partes de los asociados hábiles asistentes.`
  );
  addJustifiedText(
    `j) Atender las quejas contra los administradores o empleados a fin de exigirles la responsabilidad consiguiente.`
  );
  addJustifiedText(`k) Crear los comités.`);
  addJustifiedText(`l) Las demás que señale los estatutos y las leyes.`);
  //
  cursorY += 8;
  addCenteredBoldTitle(`EL CONSEJO DE ADMINISTRACIÓN`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 69.  El consejo de administración es el órgano permanente de administración de la cooperativa, subordinado a las directrices y políticas de la asamblea general, cuyos mandatos ejecutará.  El Consejo de Administración estará compuesto por ${data.consejoDeAdministración} miembros principales  elegidos por la Asamblea General, con sus respectivos suplentes numéricos, para períodos de ${data.suplentes} año(s)  siendo opcional la reelección.  La concurrencia de la mayoría de los miembros del consejo de administración constituirá quórum para deliberar y tomar decisiones válidas.`
  );
  cursorY += 2;
  addJustifiedText(`El Consejo se reunirá con los miembros principales. `);
  cursorY += 2;
  addJustifiedText(
    `En los casos de falta temporal o definitiva de un Principal, deberá asistir el respectivo suplente numérico. `
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO 1. Cuando una persona natural actúe en la Asamblea general en representación de una persona Jurídica asociada a la cooperativa y sea elegida como miembro del Consejo de Administración, cumplirá sus funciones en interés de la cooperativa, en ningún caso en el de la entidad representada.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO 2. El Gerente y los miembros de la junta de vigilancia, cuando sean citados tendrán voz, pero no voto en las reuniones del Consejo.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO 3. El Consejo de administración sesionara por lo menos una (1) vez al mes en forma ordinaria y extraordinaria cuando las circunstancias lo exijan, mediante la citación del presidente, de los miembros de la junta de vigilancia o del Gerente.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO 4. Serán condiciones o requisitos para ser elegido miembro del Consejo de Administración:`
  );

  addJustifiedText(
    `a) Ser socio hábil al tenor de los estatutos y de los reglamentos respectivos.`
  );
  addJustifiedText(
    `b) Gozar de buena reputación y no haber sido condenado por delitos comunes.`
  );
  addJustifiedText(
    `c) Acreditar conocimiento de cooperativismo y administración en general, por la participación en cursos o seminarios especializados.`
  );
  addJustifiedText(
    `d) Serán removidos por el incumplimiento de sus funciones.`
  );
  cursorY += 2;
  addJustifiedText(`ARTICULO 70. Las decisiones del Consejo de Administración se tomarán por mayoría de votos. Las resoluciones, acuerdos y decisiones del Consejo serán comunicados a los asociados bien por fijación en sitios visibles o mediante notificación personal. El Secretario de la cooperativa llevará un libro especial de actas y dejará en él constancia de los asuntos tratados en las respectivas sesiones en forma sintética y clara. El Presidente del Consejo de Administración será el encargado de dirigir cada reunión, y a falta de éste el Vicepresidente.
`);
  cursorY += 2;
  addJustifiedText(`ARTICULO 71. Son funciones del Consejo de Administración:`);
  addJustifiedText(
    `a) Formular las políticas de la cooperativa en concordancia a su objeto social y económico, asegurando la coordinación entre los planes y programas y la supervisión de ejecución.`
  );
  addJustifiedText(
    `b) Expedir su propio reglamento, los demás reglamentos de la cooperativa y presentar a la Asamblea el reglamento de ésta para su aprobación.`
  );
  addJustifiedText(
    `c) Establecer la planta personal y el régimen laboral correspondiente.`
  );
  addJustifiedText(
    `d) Nombrar y remover al Gerente y fijarle su remuneración.`
  );
  addJustifiedText(
    `e) Nombrar los miembros de los comités auxiliares de la administración.`
  );
  addJustifiedText(
    `f) Estudiar y aprobar el presupuesto presentado por la Gerencia, velar por su adecuada ejecución y aprobar los estados financieros en primera instancia.`
  );
  addJustifiedText(
    `g) Autorizar previamente los gastos extraordinarios que ocurrieren en cada ejercicio y asignar a los fondos los recursos que estime conveniente.`
  );
  addJustifiedText(
    `h) Aprobar el ingreso y retiro de los asociados, así como decretar la exclusión o imponer las sanciones, establecidas en él articulo treinta y cuatro (34) de los estatutos.`
  );
  addJustifiedText(
    `i) Fijar la cuantía de las finanzas que deben prestar el Gerente, el Tesorero y los demás empleados que a su juicio deban garantizar su manejo, todas ellas con aprobación del SUPERINTENDENCIA DE LA ECONOMÍA SOLIDARIA”.”`
  );
  addJustifiedText(
    `j) Rendir un informe anual a la asamblea General, sobre la gestión realizada en el ejercicio anterior.`
  );
  addJustifiedText(
    `k) Decidir sobre el ejercicio de acciones judiciales y transigir cualquier litigio que tenga la cooperativa o someterla a arbitramento.`
  );
  addJustifiedText(
    `l) Remover al Gerente a los empleados de la cooperativa por faltas comprobadas.`
  );
  addJustifiedText(
    `m) Convocar directamente a la Asamblea General de acuerdo con las normas legales y estatutarias.`
  );
  addJustifiedText(
    `n) Reglamentar los servicios de previsión social que se presenten con el fondo de solidaridad y los especiales que hayan de prestarse con aportes o cuotas decretadas por la Asamblea.`
  );
  addJustifiedText(
    `o) En general todas aquellas funciones que le correspondan como organismo administrador y que no estén asignadas a otros organismos.`
  );
  cursorY += 2;
  addJustifiedText(`PARAGRAFO: El consejo de administración, señalara las asignaturas de los empleados de la cooperativa y deberá hacerlo mediante sueldo fijo y en ningún caso disponer que tal remuneración sea a base de porcentajes.
Si el cargo a desempeñar es ad-harem, en forma gratuita, así se hará constar en el acta de reunión del Consejo que hace la designación.
`);
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 72. Ningún consejero podrá entrar a desempeñar un cargo de administración dentro de la cooperativa, mientras está actuando como tal.`
  );
  cursorY += 2;
  addJustifiedText(
    `Será considerado como dimitente todo miembro del consejo que habiendo sido convocado faltare (4) veces sin causa justificada a las sesiones y el cargo será ocupado por el suplente que corresponda. Si el Consejo de administración quedare desintegrado, la junta de vigilancia convocará a un término no mayor de un (1) mes la Asamblea extraordinaria, para realizar la respectiva elección por el resto del período.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 73. Los miembros del Consejo de Administración, los de la Junta de vigilancia, El Revisor Fiscal, EL Gerente, el Tesorero y en general todos los funcionarios de la cooperativa no podrán estar ligados entre sí por parentesco dentro del cuarto grado de consanguinidad ni segundo de afinidad.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`LA JUNTA DE VIGILANCIA`, 12);
  cursorY += 8;

  addJustifiedText(
    `ARTICULO 74. La junta de vigilancia estará integrada por dos (  ) asociados hábiles con sus respectivos suplentes personales, elegidos por la asamblea general para periodos de un ( ) año(s), pudiendo ser reelegidos o removidos del cargo libremente. Tendrán a su cargo el correcto funcionamiento y la eficiente administración de la cooperativa y serán responsables ante la asamblea general del cumplimiento de los deberes.`
  );
  cursorY += 2;
  addJustifiedText(
    `En caso de conflicto entre el Consejo de administración y la Junta de vigilancia, será convocada inmediatamente la Asamblea General para que conozca del conflicto e imparta su decisión.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO: Son condiciones o requisitos para ser elegidos miembros de la Junta de vigilancia, los siguientes:`
  );
  addJustifiedText(
    `a) Ser socio hábil al tenor de los estatutos y de los reglamentos respectivos.`
  );
  addJustifiedText(
    `b) Gozar de buena reputación y no haber sido condenado por delito común a pena privativa de la libertad.`
  );
  addJustifiedText(
    `c) Acreditar conocimientos de cooperativismo y administración en general.`
  );
  addJustifiedText(`d) Serán removidos por incumplimiento de sus funciones.`);
  cursorY += 2;
  addJustifiedText(`ARTICULO 75. Son funciones de la Junta de vigilancia:`);
  addJustifiedText(
    `1) Velar porque los actos de los órganos de administración se ajusten a las prescripciones legales, estatutarias y reglamentarias y en especial a los principios cooperativos.`
  );
  addJustifiedText(
    `2) Informar a los órganos de Administración al Revisor fiscal sobre las irregularidades que existan en el funcionamiento de la cooperativa y presentar recomendaciones sobre las medidas sobre las medidas que en su concepto deben adoptarse.`
  );
  addJustifiedText(
    `3) Conocer los reclamos que presenten los asociados en relación con la prestación de los servicios, transmitirlos, y solicitar los correctivos por el conducto regular y con la debida oportunidad.`
  );
  addJustifiedText(
    `4) Hacer llamadas de atención a los asociados cuando incumplan los deberes consagrados en la ley, los estatutos y reglamentos.`
  );
  addJustifiedText(
    `5) Solicitar la aplicación de sanciones a los asociados cuando haya lugar a ello y velar porque el órgano competente se ajuste al procedimiento establecido para el efecto.`
  );
  addJustifiedText(
    `6) Verificar la lista de asociados hábiles e inhábiles para poder participar en las asambleas o para poder elegir delegados.`
  );
  addJustifiedText(
    `7) Rendir informes sobre sus actividades a la asamblea general ordinaria.`
  );
  addJustifiedText(
    `8) Las demás que le asigne la ley o los estatutos, siempre y cuando se refieran al control social y no correspondan a funciones propias de la Revisoría Fiscal.`
  );
  cursorY += 2;
  addJustifiedText(
    `El secretario de la cooperativa llevara un libro de actas de la Junta de vigilancia. El Departamento Administrativo Nacional de cooperativas sancionará a los miembros de la Junta de vigilancia que no cumplan las obligaciones a su cargo.`
  );

  cursorY += 8;
  addCenteredBoldTitle(`EL REVISOR FISCAL`, 12);
  cursorY += 8;

  addJustifiedText(
    `ARTICULO 76. La revisión fiscal y contable estará a cargo de un revisor fiscal, elegido por la asamblea general con su suplente respectivo, para período de un (1) año y deberá ser contador público con matrícula vigente y puede ser reelegido o removido del cargo libremente por la Asamblea.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO1: Ningún contador público podrá ser nombrado revisor fiscal en la cooperativa donde sea asociado.`
  );
  cursorY += 2;
  addJustifiedText(`ARTICULO 77. Son funciones del Revisor fiscal:`);
  addJustifiedText(
    `a) Efectuar el arqueo de fondos de la cooperativa cada vez que lo estime conveniente y velar porque todos los libros de la cooperativa estén al día de acuerdo con el plan de contabilidad aprobado por el Departamento Administrativo Nacional de cooperativas.  `
  );
  addJustifiedText(
    `b) Firmar verificando su exactitud todos los balances cuentas y documentos que la administración debe rendir a la asamblea general y remitirlos al Departamento Administrativo nacional de cooperativas para su aprobación.`
  );
  addJustifiedText(
    `c) Supervisar el correcto funcionamiento de la contabilidad.`
  );
  addJustifiedText(`d) Constatar físicamente los inventarios y precios.`);
  addJustifiedText(
    `e) Comprobar por todos los medios posibles la autenticidad de los saldos en los libros auxiliares.`
  );
  addJustifiedText(
    `f) Poner en conocimiento del Departamento nacional de cooperativas las irregularidades que no fueron corregidas oportunamente por los administradores.`
  );
  addJustifiedText(
    `g) Desempeñar las demás funciones propias de su cargo de acuerdo con las normas que regulan el ejercicio de la profesión de contador público.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`EL GERENTE`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 78. El Gerente será el representante legal de la cooperativa y el ejecutor de las decisiones del Consejo de Administración.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 79. El Gerente será elegido para periodos de un (1) año y podrá ser reelegido o removido de su cargo libremente por el consejo de Administración.`
  );
  cursorY += 2;
  addJustifiedText(
    `PARAGRAFO 1: El Gerente no podrá empezar a ejercer el cargo mientras no haya prestado la fianza de manejo fijada por el Consejo de Administración, de los términos de la resolución 1168 de 1983.`
  );
  cursorY += 2;
  addJustifiedText(`PARAGRAFO 2: Para ser gerente se requiere:`);
  addJustifiedText(
    `a) Tener conocimientos, vocación e interés por las actividades de índole cooperativa.`
  );
  addJustifiedText(
    `b) Garantizar honorabilidad o corrección en manejo de fondos o bienes de cooperativas, aptitud e idoneidad.`
  );
  addJustifiedText(
    `c) Tener conocimiento básico sobre mercadeo organización y administración de empresas.`
  );
  addJustifiedText(`d) Gozar de buen crédito social y económico.`);
  cursorY += 2;
  addJustifiedText(`ARTICULO 80. Son atribuciones del Gerente:`);
  addJustifiedText(
    `a) Estudiar y preparar los planes y programas de acuerdo con el objeto económico de la cooperativa, los cuales deben presentarse al Consejo de Administración para su aprobación.`
  );
  addJustifiedText(
    `b) Elaborar y someter al estudio y aprobación del Consejo de Administración, el proyecto de presupuesto anual.`
  );
  addJustifiedText(
    `c) No morar los empleados de la cooperativa, de acuerdo con la planta de personal y régimen laboral interno, que para el efecto establezca el Consejo de Administración.`
  );
  addJustifiedText(
    `d) Hacer cumplir el reglamento interno de trabajo en especial los procedimientos disciplinarios y sanciones.`
  );
  addJustifiedText(
    `e) Rendir informes al Consejo de Administración sobre las actividades de la cooperativa, acompañándolos mensualmente del balance y estado de ingresos y egresos.`
  );
  addJustifiedText(
    `f) Presentar informe anual a la asamblea, sobre la marcha de la cooperativa.`
  );
  addJustifiedText(
    `g) Elaborar y someter al Consejo los reglamentos de la cooperativa.`
  );
  addJustifiedText(
    `h) Intervenir en las diligencias de admisión y retiro de asociados, autenticando los requisitos, los certificados de aportación y los demás documentos.`
  );
  addJustifiedText(
    `i) Proyectar para la aprobación del consejo los contratos y las operaciones en que tengan interés la empresa asociativa.`
  );
  addJustifiedText(
    `j) Ordenar el pago de los gastos ordinarios de la cooperativa y firmar los cheques que giren contra las cuentas bancarias de la misma, junto con el tesorero y firmar los demás documentos.`
  );
  addJustifiedText(
    `k) Supervigilar diariamente el Estado de caja y cuide que se mantengan con las debidas medidas de seguridad los bienes y valores de la cooperativa.`
  );
  addJustifiedText(
    `l) Enviar al Departamento Administrativo Nacional de Cooperativas, los informes financieros y los datos estadísticos que dicho organismo exija.`
  );
  addJustifiedText(`m) Expedir el manual de funciones y procedimientos.`);
  addJustifiedText(
    `n) En general todas las demás funciones que le corresponde como representante legal de la cooperativa y ejecutar todos los actos de la misma`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 81. No podrá ser designado en el cargo de gerente de la cooperativa, quien tenga parentesco dentro del cuarto grado de consanguinidad y segundo de afinidad con los miembros del Consejo de Administración, la junta de vigilancia y el Revisor fiscal.`
  );
  cursorY += 8;
  addCenteredBoldTitle(`OTROS CARGOS ADMINISTRATIVOS`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 82. El Consejo de Administración de la cooperativa designara de común acuerdo con el gerente los cargos del Secretario, contador y Tesorero.`
  );
  cursorY += 2;
  addJustifiedText(`ARTICULO 83. Son funciones del contador:`);
  addJustifiedText(
    `a) Organizar y dirigir la contabilidad conforme a las normas legales y técnicas expedidas por el Departamento Administrativo nacional de cooperativas.`
  );
  addJustifiedText(
    `b) Llevar todos los libros prescritos por la ley debidamente registrados.`
  );
  addJustifiedText(
    `c) Llevar el registro de certificados de aportación con especificación de las sumas de cada asociado.`
  );
  addJustifiedText(
    `d) Mantener debidamente legajados y archivados los comprobantes originales y demás documentos que respaldan los asientos en los libros de contabilidad.`
  );
  addJustifiedText(
    `e) Producir mensualmente el balance para conocimiento del Gerente.`
  );
  addJustifiedText(
    `f) Exigir y explicar según la reglamentación que dicte el Consejo de Administración, los libros y cuentas necesarias para su examen y control.`
  );
  cursorY += 2;
  addJustifiedText(`ARTICULO 84. Son funciones del Tesorero:`);
  addJustifiedText(
    `a) Atender el movimiento de los caudales percibiendo todos los ingresos y efectuando los pagos que ordene la gerencia.`
  );
  addJustifiedText(
    `b) Consignar diariamente en las cuentas bancarias de la cooperativa los fondos recaudados y firmar con el Gerente los cheques que se giren contra dichas cuentas.`
  );
  addJustifiedText(
    `c) Elaborar, legajar y conservar con cuidado los comprobantes de la caja y pesar diariamente relación al Gerente y al contador sobre los ingresos y egresos de la cooperativa.`
  );
  addJustifiedText(
    `d) Facilitar a los miembros de la Junta de vigilancia y a los visitadores del Departamento Nacional de cooperativas, los libros y documentos a su cargo, para efectos de los arqueos necesarios y de diligencia de la visita.`
  );
  addJustifiedText(
    `e) Suministrar a la gerencia y al contador, todos los informes y comprobantes necesarios para los asientos de contabilidad.`
  );
  addJustifiedText(`f) Llevar al día los libros de caja y bancos.`);
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 85. El Secretario, el Contador y el Tesorero, serán nombrados y removidos libremente por el consejo de Administración y no podrán tener parentesco entre sí o con los miembros del Consejo de Administración, la Junta de vigilancia, el revisor, el Gerente dentro del cuarto grado de consanguinidad y segundo de afinidad.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`COMITÉ DE EDUCACIÓN`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 85. La Cooperativa tendrá un comité de Educación integrado por un (1) principal y un (1) suplente, elegidos por el Consejo de Administración para el periodo de un (1) año, sin perjuicio de que no pueden ser reelegidos o removidos libremente por el Consejo.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 87. El Comité de Educación responsable de orientar y coordinar las actividades de educación cooperativa y de elaborar cada año un plan o programa de capacitación cooperativa con su correspondiente presupuesto, en lo cual se deberá incluir la utilización del fondo de educación.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 88. El Comité de Educación estará integrado por dos (  ) socios hábiles, con sus respectivos suplentes personales, designados por el consejo de administración para un período de un año (1) y corresponderá al consejo de administración la reglamentación del mismo.`
  );
  cursorY += 2;
  addJustifiedText(`ARTICULO 89. Son funciones del Comité de Educación:`);
  addJustifiedText(
    `a) Organizar periódicamente campañas de fomento y educación cooperativa para sus socios y para él público en general.`
  );
  addJustifiedText(
    `b) Organizar para las directivas y socios de la cooperativa cursos de capacitación.`
  );
  addJustifiedText(`c) Crear un órgano escrito de difusión cooperativa.`);
  addJustifiedText(`d) Todas aquellas funciones propias de este organismo.`);
  cursorY += 8;
  addCenteredBoldTitle(`COMITE DE RECREACIÓN`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTÍCULO 90. El Comité de recreación estará integrado por un ( ) socio principal y un suplente, designados por el Consejo de Administración, por el término de un año. `
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 91.  Son funciones del Comité de Recreación, fomentar la Recreación entre las familias de los asociados.`
  );
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO XIII`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `BALANCE - FONDOS SOCIALES- DESTINACION DE EXCEDENTES COOPERATIVOS`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 92. Al finalizar el mes de diciembre de cada año, el 31 de diciembre se hará corte de cuentas de cada una de las operaciones sociales.`
  );
  cursorY += 2;
  addJustifiedText(
    ` ARTICULO 93. Todos los libros, documentos y estados financieros se pondrán a disposición de los asociados en las oficinas de la cooperativa durante diez (10) días hábiles antes de la asamblea general para que puedan ser examinados.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 94. El producto del ejercicio social, comprobado con el inventario correspondiente, deducidos los gastos generales, las amortizaciones y las cargas sociales constituyen el excedente líquido obtenido.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 95. Los excedentes se destinarán de la siguiente forma:`
  );
  addJustifiedText(
    `a) Un 20% como mínimo para crear o mantener una reserva de protección de los aportes sociales.`
  );
  addJustifiedText(`b) Un 20% como mínimo para el fondo de Educación. `);
  addJustifiedText(`c) Un 10% para el Fondo de Solidaridad.`);
  cursorY += 2;
  addJustifiedText(
    `El remanente podrá aplicarse en toda o en parte serán quienes lo determinen las disposiciones reglamentarias o la Asamblea General en la siguiente forma:`
  );
  addJustifiedText(
    `1) Destinándolo a la revalorización de los aportes teniendo en cuenta las alteraciones del valor real de acuerdo con la reglamentación.`
  );
  addJustifiedText(`2) Destinándolos a servicios comunes y seguridad social.`);
  addJustifiedText(
    `3) Retornándolos a los asociados en proporción con el uso de los servicios o la participación en el trabajo.`
  );
  addJustifiedText(
    `4) Destinándolos a un fondo para amortización de aportes de los asociados.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 96. La Reserva para protección de aportes como su nombre lo indica tiene como objetivo primordial proteger los aportes que los asociados tengan en la cooperativa contra posibles pérdidas y también tiene como objeto garantizar a la cooperativa la normal realización de sus actividades u operaciones, ponerla en condición de cubrir exigencias imprevistas o necesidades financieras con sus propios medios sin necesidad de recurrir al crédito. La Reserva para protección de aportes, podrá invertirse en certificados de aportación, cédulas, pagarés, depósitos a interés en entidades preferencialmente del sector cooperativo, de financiamiento legalmente reconocidas por el Gobierno.`
  );
  cursorY += 2;
  addJustifiedText(
    `La Reserva para protección de aportes, podrá invertirse en certificados de aportación, cédulas, pagarés, depósitos a interés en entidades preferencialmente del sector cooperativo, de financiamiento legalmente reconocidas por el Gobierno.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 97. El Fondo de Educación deberá aplicarse de conformidad con lo previsto y estipulado en los planes y programas de educación cooperativa, elaborados por el Comité de Educación de acuerdo con lo establecido en el artículo 90 de la ley 79 de 1988.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 98. El fondo de solidaridad tiene por objeto habilitar a la cooperativa para atender obras de carácter social de acuerdo con el reglamento especial que para tal efecto deberá elaborar y aprobar el Consejo de Administración. Tendrá prioridad el aspecto médico, clínico, farmacéutico y en general lo pertinente a la calamidad doméstica.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO XIV`, 12);
  cursorY += 3;
  addCenteredBoldTitle(
    `DE LA FUSION- INCORPORACIÓN- DISOLUCIÓN Y LIQUIDACIÓN.`,
    12
  );
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 99. La cooperativa podrá fusionarse con otras cooperativas, constituyendo una nueva sociedad regida por nuevos estatutos y cuando su objeto social se común o complementario.`
  );
  cursorY += 2;
  addJustifiedText(
    `Así mismo la cooperativa podrá incorporarse a otras u otras del mismo objeto social o complementario adoptando la denominación, de una de ellas y acogiéndose a sus estatutos y amparándose en su Personería Jurídica.`
  );
  cursorY += 2;
  addJustifiedText(
    `La fusión y la incorporación estarán sujeto a lo dispuesto en los artículos 101,102, 103, 104,105 de la ley 79 de 1988.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 100. La cooperativa podrá ser disuelta por acuerdo de la Asamblea general especialmente convocada para el efecto y teniendo en cuenta lo dispuesto en el artículo 67 de los presentes estatutos.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 101. La Cooperativa deberá disolverse por una de las siguientes causas:`
  );
  addJustifiedText(`1) Por acuerdo voluntario de sus asociados.`);
  addJustifiedText(
    `2) Por reducción de los Asociados a menos el número mínimo exigible para su constitución siempre que esta situación se prolongue por más de seis (6) meses.`
  );
  addJustifiedText(
    `3) Por incapacidad o imposibilidad de cumplir el objetivo social para lo cual fue creada.`
  );
  addJustifiedText(`4) Por fusión o incorporación a otra cooperativa.`);
  addJustifiedText(
    `5) Por haberse iniciado contra ella concurso de acreedores.`
  );
  addJustifiedText(
    `6) Porque los medios que emplea para el cumplimiento de sus fines o porque las actividades que desarrolla sean contrarios a la ley, a las buenas costumbres o el espíritu del cooperativismo.`
  );
  cursorY += 2;
  addJustifiedText(
    `ARTICULO 103. El procedimiento para efectuar la disolución y liquidación de la cooperativa se deberá acoger a lo previsto en los artículos 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, de la ley 79 de 1988.`
  );
  //
  cursorY += 8;
  addCenteredBoldTitle(`CAPITULO XV`, 12);
  cursorY += 3;
  addCenteredBoldTitle(`REFORMA DE LOS ESTATUTOS.`, 12);
  cursorY += 8;
  addJustifiedText(
    `ARTICULO 104. Para considerar una reforma de los estatutos se adoptará el siguiente procedimiento:`
  );
  addJustifiedText(
    `a) A través del Consejo de Administración, se fijan las pautas que pueden ser: normativas, objeto del acuerdo de cooperación, sociales, económicas, etc., se nombrará una comisión compuesta por ${data.comisiónCompuesta} asociados dentro de un plazo fijado por el mismo organismo al cabo de los cuales deberá presentar un proyecto de reforma estatutaria que será estudiado por el Consejo de Administración para luego ser presentado en Asamblea Ordinaria o extraordinaria si es el caso.`
  );
  cursorY += 2;
  addJustifiedText(
    `Los presentes estatutos fueron aprobados por unanimidad, a los ${data.dia} días del mes de ${data.mesName} de ${data.año}.`
  );

  cursorY += 5;
  addJustifiedText(
    `________________________                              ________________________`
  );
  addJustifiedText(
    `Presidente Ad-hoc                                                 Secretario Ad-hoc`
  );

  doc.save(`MODELO-GUIA-ESTATUTOS.pdf`);
};

export default PdfActa;
