export enum CONCEPT_TYPES {
  general = '',
  nutrition = 'Nutrición',
  training = 'Entrenamiento',
}

export const CONCEPTS = [
  {
    name: 'Abducción',
    description:
      'Movimiento por el cual un miembro se aleja del plano medio que divide imaginariamente el cuerpo en dos partes simétricas, generalmente se aplica al alejamiento de un brazo del tronco o una pierna de la otra.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Aducción',
    description:
      'Movimiento por el cual se acerca un miembro al plano medio que divide imaginariamente el cuerpo en dos partes simétricas, generalmente se aplica al acercamiento de un brazo al tronco una pierna a la otra.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Agonista',
    description: 'Músculo: el que realiza un movimiento.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Antagonista',
    description: 'Músculo: el opuesto al que realiza el movimiento.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Zona anterior',
    description: 'Delante, ventral.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Apnea',
    description: 'Falta o suspensión de la respiración.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Articulación',
    description: 'Unión de un hueso con otro, generalmente móvil.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Atrofia',
    description:
      'Disminución en el tamaño de uno o varios tejidos de los que forman un órgano, con la consiguiente minoración del volumen, peso y actividad funcional, a causa de escasez o retardo en el proceso nutritivo. Es consecuencia directa de la disminución o inactividad física de un músculo en concreto.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Biomecánica',
    description:
      'Ciencia que estudia la aplicación de la mecánica a los seres vivos.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Centro de gravedad',
    description:
      'Punto imaginario que representa el centro del peso del cuerpo o de un objeto, alrededor del cual todas las partes se equilibran.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Cifosis',
    description: 'Curva de convexidad posterior, natural en la zona dorsal.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Cuadrupedia',
    description:
      'Posición en la que se apoyan en el suelo las manos y los pies y/o rodillas.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Curl',
    description:
      'Acercamiento en flexión de un miembro con articulación en bisagra, utilizado generalmente para denominar la flexión de brazo y la de pierna.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Dirección',
    description:
      'Línea formada por un punto en movimiento independientemente de su sentido ',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Zona Distal',
    description: 'Alejado del tronco, del origen.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Ejercicio',
    description:
      'Cualquier acto motor voluntario y destinado al trabajo muscular. Un ejercicio se compone, en este caso, de una o varias series.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Espiración',
    description: 'Expeler el aire aspirado, soplar.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Extensión',
    description: 'Desplegar una articulación antes flexionada.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Fallo muscular',
    description:
      'Llevar una serie hasta el punto de máximo agotamiento muscular local, con incapacidad para completar una repetición más de forma correcta y completa.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Fase concéntrica/positiva',
    description: 'Movimiento de contracción en acortamiento muscular.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Fase excéntrica/negativa',
    description: 'La contraria a la concéntrica o positiva.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Fibra muscular',
    description: 'Célula contráctil del músculo.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Flexibilidad',
    description: 'Cualidad de flexible, con capacidad para doblarse.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Flexión',
    description:
      'Acción y efecto de doblar el cuerpo o algún miembro. Desde la posición anatómica es el acercamiento de las partes anteriores del cuerpo, excepto en la pierna que es acercamiento posterior.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Fuerza',
    description:
      'Vigor, robustez y capacidad para mover un peso o resistencia. Fuerza= masa x aceleración.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Fuerza máxima',
    description: 'Fuerza total para una sola repetición.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Fuerza resistencia',
    description: 'Fuerza prolongada en el tiempo.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Grasas(G)',
    description:
      'Nutriente esencial para el organismo. Cada gramo de grasa es de aproximadamente 9Kcal',
    type: CONCEPT_TYPES.nutrition,
  },
  {
    name: 'Hidratos de carbono (HC)',
    description:
      'Los hidratos de carbono son el principal aporte energético que utiliza el cuerpo, cada gramo de H.C. Es de aproximadamente 4Kcal.',
    type: CONCEPT_TYPES.nutrition,
  },
  {
    name: 'Hiperextensión',
    description: 'Extensión más allá de la posición anatómica.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Hipertrofia',
    description:
      'Aumento del volumen de un órgano, como el aumento del tamaño muscular.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Plano horizontal ',
    description:
      'Plano paralelo al suelo que divide el cuerpo en posición anatómica en secciones superior e inferior.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'ID',
    description: 'Tiempo de descanso entre series',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'IMC',
    description: 'Indice de masa corporal',
    type: CONCEPT_TYPES.nutrition,
  },
  {
    name: 'Intensidad',
    description:
      'Porcentaje de trabajo en relación con la fuerza máxima aplicada a un esfuerzo muscular concreto. También cualquier variable que dificulte cuantitativamente un ejercicio.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Inspiración',
    description: 'Atraer el aire exterior a los pulmones, aspirar.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Isométrico',
    description:
      'Contracción muscular que deja la articulación fijada, inmóvil, aunque con aumento de tono.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Kcal',
    description:
      'Kcal (Kilocaloria) es una unidad de energía. Esta se utiliza para medir la cantidad de energía que requiere nuestro cuerpo, y para determinar la cantidad de energía de los alimentos',
    type: CONCEPT_TYPES.nutrition,
  },
  {
    name: 'Zona lateral',
    description: 'Alejado del plano medio-sagital.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Plano longitudinal',
    description:
      'Perpendicular al suelo, es decir, el que divide al cuerpo en una zona anterior y posterior.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Lordosis',
    description:
      'Curva de concavidad posterior, natural en las zonas lumbar y cervical.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Mancuerna',
    description:
      'Cada una de las dos barras metálicas con discos en los extremos (u otro tipo de lastre) generalmente para utilizar con una sola mano, haltera.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Masa',
    description:
      'Magnitud física que expresa la cantidad de materia que contiene un cuerpo. Su unidad en el Sistema Internacional es el kilogramo (kg). Suele confundirse con peso, aunque en la vida diaria esté permitida esta licencia.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Mecánica',
    description:
      'Ciencia que estudia el equilibrio y movimiento de los cuerpos sometidos a fuerzas.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Zona medial ',
    description: 'Cercano al plano medio-sagital.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Mesociclo',
    description:
      'Son estructuras temporales intermedias de entrenamiento que tienen como finalidad lograr objetivos parciales del proceso global de entrenamiento.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Microciclo',
    description:
      'Es el conjunto de todas las sesiones de entrenamiento hasta que el ciclo de las sesiones vuelva a comenzar',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Movilidad articular',
    description:
      'Rango de movimiento limitado por los choques óseos o musculares.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Multipower',
    description:
      'Aparato versátil con barra de cargas laterales guiadas, generalmente con discos o placas como lastre.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Posición anatómica',
    description:
      'De pie, cabeza erguida, piernas ligeramente separadas, brazos a los lados y manos en supinación (mostrando las palmas).',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Posición neutra',
    description:
      'Entre la pronación y la supinación. De pie es la que se adopta de forma natural, con la palma de las manos enfrentadas a los muslos.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Zona posterior',
    description: 'Detrás, dorsal.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Press',
    description: 'Empuje o extensión.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Pronación',
    description:
      'Movimiento del antebrazo que hace girar la mano de fuera a dentro presentando el dorso de ella, como cuando se dispone a tomar un objeto de una mesa.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Proteína(P)',
    description:
      'Nutriente esencial para el organismo. Las proteínas son moléculas que desempeñan muchas funciones y son la base de las estructuras de nuestro cuerpo. También tienen un aporte energético, cada gramo de proteína tiene aproximadamente 4Kcal',
    type: CONCEPT_TYPES.nutrition,
  },
  {
    name: 'Zona proximal ',
    description: 'Cercano al tronco, al origen.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Reflejo',
    description: 'Movimiento involuntario de respuesta a un estímulo.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Repeticiones',
    description:
      'Numero de veces seguidas que se repite el movimiento del ejercicio',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'RIR',
    description:
      'El RIR o repeticiones en recamara, es lo que se utiliza para determinar las repeticiones que faltan para llegar al fallo muscular, por ejemplo: 12 repeticiones a un RIR3, quiere decir que cuando hagamos las 12 repeticiones, como máximo podremos hacer 15 repeticiones, es decir tenemos 3 restantes en recámara. ',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Rotación',
    description: 'Giro',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'RPE',
    description:
      'El rpe es el esfuerzo percibido. Es una puntuación numérica subjetiva del esfuerzo durante la serie. A mayor esfuerzo mayor puntuación. 0-1 muy fácil 2-3 fácil 4-5 medianamente fácil 6-7algo difícil 8-9 difícil 10 muy difícil',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Plano sagital ',
    description:
      'Perpendicular al longitudinal y transversal, es decir, el que divide al cuerpo en dos mitades casi simétricas de izquierda-derecha.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Sentido',
    description:
      'Orientación hacia la que se mueve un punto, en una dirección hay dos sentidos opuestos ',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Series',
    description: 'Agrupación de repeticiones',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Sesión de entrenamiento',
    description: 'Conjunto de ejercicios realizados o a realizar en un día',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Músculo sinergista',
    description:
      'El que se une al movimiento de otro/s músculo/s para realizar una misma acción.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Superserie',
    description:
      'Serie compuesta de dos ejercicios, o de uno solo con distinto peso en algunas repeticiones.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Supinación',
    description:
      'Movimiento del antebrazo que hace girar la mano de dentro a fuera, presentando la palma, como cuando se lleva un alimento de la mesa a la boca.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Plano transversal',
    description:
      'Perpendicular al longitudinal, es decir, el que divide al cuerpo en una zona superior e inferior.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Ventral',
    description: 'Anterior, frontal.',
    type: CONCEPT_TYPES.training,
  },
  {
    name: 'Barra Z',
    description:
      'Barra anatómicamente acodada (angulosa) para facilitar un agarre cómodo con las manos.',
    type: CONCEPT_TYPES.training,
  },
];

export const CONCEPT_VALUES = Object.values(CONCEPTS);
