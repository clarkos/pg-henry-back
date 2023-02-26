const { Artist, Category, Location, Product, Photo, CategoryProduct,
User, Customer, Order, OrderItem, MailGen, Review }  = require('../../db.js');

const  setAllDb = async() => {

    // Artistas
    const artists = [
        {
            name: "Symphony Serenade"
        },
        {
            name: "The Music Virtuosos"
        },
        {
            name: "Harmonic Harmony"
        },
        {
            name: "Grand Orchestra"
        },
        {
            name: "The Majestic Ensemble"
        },
        {
            name: "DJ Synapse"
        },
        {
            name: "The Sound Architect"
        },
        {
            name: "Electro Visionary"
        },
        {
            name: "Bass Innovator"
        },
        {
            name: "Rabbit Mechanic"
        },
        {
            name: "Groove Avenue"
        },
        {
            name: "The Jazz Underground"
        },
        {
            name: "The Sound Makers"
        },
        {
            name: "Nightfall Quartet"
        },
        {
            name: "Soulful Rhapsody"
        },
        {
            name: "Starlight Symphony"
        },
        {
            name: "The Pop Sensations"
        },
        {
            name: "Electric Hearts"
        },
        {
            name: "Future Rhythms"
        },
        {
            name: "Dream Pop Collective"
        },
        {
            name: "Argento´s Riffs"
        },
        {
            name: "La Banda Rebelde"
        },
        {
            name: "La Poderosa Social Club"
        },
        {
            name: "Rock del Sur"
        },
        {
            name: "Corazones Salvajes"
        },
        {
            name: "La Orquesta de Juan Dominguez"
        },
        {
            name: "Cuarteto Porteño"
        },
        {
            name: "Corazón Dos por Cuatro"
        },
        {
            name: "Tangos del barrio"
        },
        {
            name: "Vientos de Buenos Aires"
        },
    ];
    
    await Artist.bulkCreate(artists);  


    // Categorias
    const categories = [
        {
            name: "Clásica"
        },
        {
            name: "Electrónica"
        },
        {
            name: "Jazz"
        },
        {
            name: "Pop"
        },
        {
            name: "Rock"
        },
        {
            name: "Tango"
        },
    ];

    await Category.bulkCreate(categories);

    // Lugares
    const locations = [
        {
            name: "Yazz concert club",
            address: 'Av. san Martin 4567'
        }
    ];

    await Location.bulkCreate(locations);

    const products = [
        {
            locationId: 1,
            artistId: 1,
            name: 'Symphony Serenade Return',
            description: 'Bienvenidos al concierto de música clásica del trío Symphony Serenade. Esta noche, tendremos la oportunidad de escuchar algunos de los compositores más famosos de todos los tiempos, como Beethoven, Mozart y Tchaikovsky',
            startDate: '2023-02-20',
            endDate: '2023-02-20',
            startTime: '12:00:00',
            stock: 500,
            price: 1500,
            categories : [
                {
                    id : 1
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/clasica5_hb1l2j.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 2,
            name: 'The Music Virtuosos Show',
            description: 'The Music Virtuosos te invita a una noche de música clásica de alto nivel. Con nuestros solistas de renombre y nuestro director, te llevaremos en un viaje a través de la historia de la música, desde la época barroca hasta la época clásica.',
            startDate: '2023-02-25',
            endDate: '2023-02-25',
            startTime: '22:00:00',
            stock: 550,
            price: 1600,
            categories : [
                {
                    id : 1
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/clasica2_xrsdiu.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 3,
            name: 'Harmonic Harmony Return',
            description: 'Harmonic Harmony te invita a una noche de música en vivo, con obras de los compositores más importantes de la historia. Desde el Concerto para Violín de Bach hasta la Sinfonía No. 9 de Beethoven',
            startDate: '2023-03-04',
            endDate: '2023-03-04',
            startTime: '14:00:00',
            stock: 560,
            price: 2500,
            categories : [
                {
                    id : 1
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/clasica4_tkjmpg.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 4,
            name: 'Grand Orchestra In Concert',
            description: 'Grand Orchestra te invita a una noche única de música clásica. Con nuestro talentoso grupo de músicos y nuestro repertorio de algunos de los compositores más grandes de la historia',
            startDate: '2023-03-05',
            endDate: '2023-03-05',
            startTime: '15:00:00',
            stock: 1200,
            price: 4500,
            categories : [
                {
                    id : 1
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/clasica1_qczq9m.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 5,
            name: 'The Majestic Ensemble Show',
            description: 'The Majestic Ensemble te ofrece una noche de música que nunca olvidarás. Con un programa que incluye algunas de las obras más famosas de la historia, como la Novena Sinfonía de Beethoven y la Sinfonía No. 40 de Mozart',
            startDate: '2023-03-06',
            endDate: '2023-03-06',
            startTime: '16:00:00',
            stock: 1100,
            price: 500,
            categories : [
                {
                    id : 1
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/clasica3_vs5hs3.jpg',
                }
            ]
        },

        // ---------------------------------------
        {
            locationId: 1,
            artistId: 6,
            name: 'DJ Synapse Pool Party',
            description: 'Bienvenidos a una experiencia musical sin igual, donde la electrónica y la pasión por la música se unen para crear algo único y sorprendente. ¡Prepárense para bailar y disfrutar!',
            startDate: '2023-03-07',
            endDate: '2023-03-07',
            startTime: '17:00:00',
            stock: 1150,
            price: 1500,
            categories : [
                {
                    id : 2
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357467/HenryMusic/electronic2_sfqeaj.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 7,
            name: 'The Sound Architect',
            description: 'The Sound Architect nos regala un evento especial para todos los amantes de la música y la energía que se siente en el aire',
            startDate: '2023-03-02',
            endDate: '2023-03-02',
            startTime: '18:00:00',
            stock: 1500,
            price: 3500,
            categories : [
                {
                    id : 2
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357467/HenryMusic/electronic5_zcnhgd.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 8,
            name: 'Electro Visionary Live',
            description: 'Si te encanta la música que hace vibrar el cuerpo y la mente, entonces Electro Visionary es la opción correcta. La banda electrónica es conocida por sus ritmos infecciosos y su capacidad de crear un ambiente de fiesta.',
            startDate: '2023-03-05',
            endDate: '2023-03-06',
            startTime: '12:00:00',
            stock: 1100,
            price: 500,
            categories : [
                {
                    id : 2
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357467/HenryMusic/electronic4_uuwsfq.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 9,
            name: 'Bass Innovator',
            description: 'Ven a descubrir un sonido único y una energía vibrante que solo la música electrónica puede ofrecer. Bass Innovator ha preparado un set lleno de sorpresas y emoción para ti.',
            startDate: '2023-03-16',
            endDate: '2023-03-16',
            startTime: '18:00:00',
            stock: 1200,
            price: 1500,
            categories : [
                {
                    id : 2
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357467/HenryMusic/electronic3_roxdh8.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 10,
            name: 'Rabbit Mechanic Concert',
            description: 'Te invitamos a sumergirte en un mundo de sonidos electrónicos, donde la música te llevará a un viaje sin fin de diversión y alegría. Rabbit Mechanic está lista para hacer que este momento sea inolvidable.',
            startDate: '2023-03-20',
            endDate: '2023-03-10',
            startTime: '19:00:00',
            stock: 1700,
            price: 3400,
            categories : [
                {
                    id : 2
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357471/HenryMusic/electronic1_jw5wod.jpg',
                }
            ]
        },

        // -----
        {
            locationId: 1,
            artistId: 11,
            name: 'Groove Avenue Concert',
            description: '¡Bienvenidos al concierto de música en vivo! Prepárense para experimentar la magia de la improvisación en su máxima expresión.',
            startDate: '2023-03-11',
            endDate: '2023-03-11',
            startTime: '19:30:00',
            stock: 1700,
            price: 3400,
            categories : [
                {
                    id : 3
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357467/HenryMusic/jazz1_eoncho.jpg',
                }
            ]
        },

        {
            locationId: 1,
            artistId: 12,
            name: 'The Jazz Underground',
            description: 'La música es un arte que evoca emociones y sentimientos, y en este concierto, tendrás la oportunidad de experimentar la libertad y la creatividad que se encuentra en la improvisación.',
            startDate: '2023-03-09',
            endDate: '2023-03-09',
            startTime: '13:00:00',
            stock: 1600,
            price: 3100,
            categories : [
                {
                    id : 3
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357468/HenryMusic/jazz5_mhmzfr.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 13,
            name: 'The Sound Makers Return',
            description: 'Si eres un apasionado de la música, no te pierdas esta oportunidad única de escuchar a los músicos más talentosos e innovadores del momento, donde la improvisación juega un papel fundamental en su arte.',
            startDate: '2023-03-18',
            endDate: '2023-03-13',
            startTime: '11:00:00',
            stock: 1500,
            price: 1400,
            categories : [
                {
                    id : 3
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357468/HenryMusic/jazz4_lgzane.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 14,
            name: 'Nightfall Quartet Concert',
            description: 'La música es un idioma universal, y en este concierto, tendrás la oportunidad de conectarte con la música de una manera totalmente nueva. La improvisación será la guía en un viaje musical único e inolvidable.',
            startDate: '2023-03-14',
            endDate: '2023-03-14',
            startTime: '15:30:00',
            stock: 1650,
            price: 2400,
            categories : [
                {
                    id : 3
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357468/HenryMusic/jazz3_tmp3cp.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 15,
            name: 'Soulful Rhapsody Return',
            description: 'La música es una forma de comunicación sin barreras, y en este concierto, la orquesta Soulful Rhapsody te invita a unirte a ellos en una aventura musical llena de creatividad, libertad y, sobre todo, improvisación',
            startDate: '2023-03-26',
            endDate: '2023-03-16',
            startTime: '19:00:00',
            stock: 1700,
            price: 3400,
            categories : [
                {
                    id : 3
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357467/HenryMusic/jazz2_kg1hgm.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 16,
            name: 'Starlight Symphony Nigth',
            description: 'No te pierdas la oportunidad de sumergirte en un universo musical que combina ritmos pegajosos con letras profundas y emotivas. ¡Te esperamos!',
            startDate: '2023-03-16',
            endDate: '2023-03-16',
            startTime: '13:00:00',
            stock: 600,
            price: 3000,
            categories : [
                {
                    id : 4
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357469/HenryMusic/pop3_kiqog4.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 17,
            name: 'Festival The Pop Sensations',
            description: 'Este es el momento perfecto para disfrutar de una performance musical que te dejará sin aliento y con ganas de más.',
            startDate: '2023-03-17',
            endDate: '2023-03-07',
            startTime: '21:00:00',
            stock: 650,
            price: 3000,
            categories : [
                {
                    id : 4
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357469/HenryMusic/pop4_fkv2zb.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 18,
            name: 'Lo mejor de Electric Hearts',
            description: 'Si eres amante de la música y estás buscando una velada llena de emoción, ¡no te pierdas este concierto!',
            startDate: '2023-03-18',
            endDate: '2023-03-18',
            startTime: '20:00:00',
            stock: 500,
            price: 2000,
            categories : [
                {
                    id : 4
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357468/HenryMusic/pop1_nph4yy.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 19,
            name: 'Future Rhythms en Vivo',
            description: '¡Bienvenidos a este evento musical lleno de diversión y alegría! Una banda de música pop que hará vibrar el escenario con sus éxitos y ritmos contagiosos.',
            startDate: '2023-03-19',
            endDate: '2023-03-19',
            startTime: '21:30:00',
            stock: 600,
            price: 2000,
            categories : [
                {
                    id : 4
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357468/HenryMusic/pop2_eoqp55.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 20,
            name: 'Dream Pop Collective Return',
            description: '¡La música pop llega a la ciudad! Dream Pop Collective es una banda de éxitos que promete hacer que te sientas vivo y te diviertas como nunca antes.',
            startDate: '2023-03-20',
            endDate: '2023-03-20',
            startTime: '13:00:00',
            stock: 650,
            price: 2500,
            categories : [
                {
                    id : 4
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357469/HenryMusic/pop5_cdjwqs.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 21,
            name: 'La pesada de Argento´s Riffs',
            description: '¡¡Bienvenidos a este increíble evento musical! Este es el momento perfecto para escuchar algunas de las mejores canciones rockeras.',
            startDate: '2023-03-20',
            endDate: '2023-03-20',
            startTime: '20:00:00',
            stock: 650,
            price: 2500,
            categories : [
                {
                    id : 5
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/rock5_ryj8ap.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 22,
            name: 'La Banda Rebelde Regresa',
            description: '¡Bienvenidos al evento musical del año! Esta tarde tendremos el honor de escuchar a una de las bandas de rock más influyentes de todos los tiempos.',
            startDate: '2023-03-21',
            endDate: '2023-03-21',
            startTime: '22:00:00',
            stock: 650,
            price: 2500,
            categories : [
                {
                    id : 5
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357469/HenryMusic/rock2_n3f4zk.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 23,
            name: 'Gira de La Poderosa Social Club',
            description: '¿Estás buscando una forma de liberar toda tu energía? ¡Entonces estás en el lugar correcto!',
            startDate: '2023-03-22',
            endDate: '2023-03-22',
            startTime: '21:00:00',
            stock: 650,
            price: 2500,
            categories : [
                {
                    id : 5
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/rock3_j7ysr1.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 24,
            name: 'Rock del Sur',
            description: '¡Preparen sus oídos para el sonido más poderoso de la ciudad! La banda de rock que todos conocemos y amamos estará aquí para deleitarnos con sus mejores canciones.',
            startDate: '2023-03-23',
            endDate: '2023-03-23',
            startTime: '22:00:00',
            stock: 650,
            price: 2000,
            categories : [
                {
                    id : 5
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/rock5_ryj8ap.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 25,
            name: 'Corazones Salvajes - Gira costera',
            description: '¿Eres fanático del rock y la música en vivo? ¡Entonces tienes que estar aquí hoy! Corazones Salvajes, la banda de rock más esperada de la temporad.',
            startDate: '2023-03-15',
            endDate: '2023-03-25',
            startTime: '22:00:00',
            stock: 750,
            price: 1500,
            categories : [
                {
                    id : 5
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357469/HenryMusic/rock1_xgtawl.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 26,
            name: 'Clásicos de La Orquesta de Juan Dominguez',
            description: 'Bienvenidos a todos a este concierto de la Orquesta de Juan Dominguez, una orquesta de tango liderada por el talentoso Juan Dominguez',
            startDate: '2023-03-25',
            endDate: '2023-03-25',
            startTime: '19:00:00',
            stock: 750,
            price: 1500,
            categories : [
                {
                    id : 6
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/tango1_eeqzqj.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 27,
            name: 'Cuarteto Porteño y su repertorio',
            description: 'El "Cuarteto Porteñouna" invita a disfrutar de una noche de tango inolvidable. Con más de 20 años de experiencia, estos cuatro músicos han llevado su arte por todo el mundo, deleitando a su público con su virtuosismo y pasión.',
            startDate: '2023-03-14',
            endDate: '2023-03-26',
            startTime: '22:00:00',
            stock: 750,
            price: 1500,
            categories : [
                {
                    id : 6
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/tango4_hcqzdr.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 28,
            name: 'Noche de Corazón Dos por Cuatro',
            description: 'Bienvenidos a una noche de tango para bailar con el Cuarteto "Corazón Dos por Cuatro". Este cuarteto está formado por cuatro músicos talentosos: Angelino Ureña-Mascaró, Leandro Jerez García, Maxi Conesa y Pancho Coloma.',
            startDate: '2023-03-27',
            endDate: '2023-03-27',
            startTime: '22:00:00',
            stock: 550,
            price: 2000,
            categories : [
                {
                    id : 6
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/tango3_aeunlw.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 29,
            name: 'El ritmo de Tangos del Barrio',
            description: 'Bienvenidos a una noche de tango y amistad con el cuarteto "Tangos del barrio". Con la magia de las cuerdas y la pasión en sus voces.',
            startDate: '2023-03-28',
            endDate: '2023-03-28',
            startTime: '19:00:00',
            stock: 500,
            price: 3000,
            categories : [
                {
                    id : 6
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/tango2_owi9bo.jpg',
                }
            ]
        },
        {
            locationId: 1,
            artistId: 30,
            name: 'Sacando viruta con Vientos de Buenos Aires',
            description: '¡Bienvenidos a una noche de tango inolvidable con el ensamble "Vientos de Buenos Aires"! Este grupo de músicos talentosos se unen para traernos la verdadera esencia del tango argentino.',
            startDate: '2023-03-22',
            endDate: '2023-03-20',
            startTime: '22:00:00',
            stock: 750,
            price: 1500,
            categories : [
                {
                    id : 6
                },
            ],

            photo : [
                {
                    path: 'https://res.cloudinary.com/dfuozesaq/image/upload/v1675357470/HenryMusic/tango5_ncm2lw.jpg',
                }
            ]
        },
        

    ];

    for (const product of products) {
        c = await Product.create(product);

        for (const category of product.categories) {
            await CategoryProduct.create({categoryId: category.id, productId: c.id})
        }

        for (const photo of product.photo) {
            p = await Photo.create({productId: c.id, path: photo.path})
        }
    }    

    const users = [
        {
            userName: "goya0310@gmail.com",
            role: "Admin"
        },
        {
            userName: "nicolasbonder@gmail.com",
            role: "Admin"
        },
        {
            userName: "diegollaya@gmail.com",
            role: "Admin"
        },
        {
            userName: "federico.rissone@gmail.com",
            role: "Admin"
        },
        {
            userName: "frissone@villaconstitucion.gov.ar",
            role: "User"
        },
        {
            userName: "juanignaciomascarenhas@gmail.com",
            role: "Admin"
        },
        {
            userName: "angelzabaleta08@gmail.com",
            role: "Admin"
        },
        {
            userName: "angelzabaleta08@hotmail.com",
            role: "Admin"
        },
        {
            userName: "franprueba@gmail.com",
            role: "Admin"
        },
        {
            userName: "bercinigena@gmail.com",
            role: "User"
        },
        {
            userName: "diegoleonardoformoso@gmail.com",
            role: "Admin"
        },
        {
            userName: "silvestro.franco19@gmail",
            role: "Admin"
        }
    ]

    await User.bulkCreate(users);  

    const customers = [
        {
            userId: 1,
            name: "Pedro Miranda",
            address: "Gallo 176 8A",
            city: "CABA",
            state: "CABA",
            zip: "1782",
            email: "goya0310@gmail.com",
            telephone: "1199881188",
            document: 22222222,
            birthDate: "1972-01-01"
        },
        {
            userId: 2,
            name: "Nicolas Bonder",
            address: "Rivadavia 12324",
            city: "CHACO",
            state: "CHACO",
            zip: "8971",
            email: "nicolasbonder@gmail.com",
            telephone: "+54 11 6543-2211",
            document: 1111111,
            birthDate: "1990-06-15"
        },
        {
            userId: 3,
            name: "Diego Llaya",
            address: "San Martin 891",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "diegollaya@gmail.com",
            telephone: "11-9-8892-1111",
            document: 1111112,
            birthDate: "1986-03-05"
        },
        {
            userId: 4,
            name: "Federico Rissone",
            address: "14 de Febrero 3245",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "federico.rissone@gmail.com",
            telephone: "11-9-8892-1111",
            document: 1111113,
            birthDate: "1999-06-05"
        },
        {
            userId: 5,
            name: "Bruno Sontag",
            address: "Ridavadia 3985",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "frissone@villaconstitucion.gov.ar",
            telephone: "11-9-8892-1111",
            document: 1111114,
            birthDate: "1999-06-23"
        },
        {
            userId: 6,
            name: "Juan Ignacio Mascarenhas",
            address: "Jazmin 2323",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "juanignaciomascarenhas@gmail.com",
            telephone: "11-9-8892-1111",
            document: 1111115,
            birthDate: "1993-02-15"
        },
        {
            userId: 7,
            name: "Angel Zabaleta",
            address: "Soler 4545",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "angelzabaleta08@gmail.com",
            telephone: "11-9-8892-1111",
            document: 1111116,
            birthDate: "1963-01-17"
        },
        {
            userId: 8,
            name: "Ezequiel Fernandez",
            address: "Belgrano 3434",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "angelzabaleta08@hotmail.com",
            telephone: "11-9-8892-1111",
            document: 1111117,
            birthDate: "1953-11-17"
        },
        {
            userId: 9,
            name: "Lucas Fernandez",
            address: "Pasteur 9898",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "franprueba@gmail.com",
            telephone: "11-9-8892-1111",
            document: 1111118,
            birthDate: "1978-12-04"
        },
        {
            userId: 10,
            name: "Genaro Bercini",
            address: "Domingo 1249",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "bercinigena@gmail.com",
            telephone: "11-9-8892-1111",
            document: 1111119,
            birthDate: "1997-11-24"
        },
        {
            userId: 11,
            name: "Diego Formoso",
            address: "Peron 5454",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "diegoleonardoformoso@gmail.com",
            telephone: "11-9-8892-1111",
            document: 2111111,
            birthDate: "1957-12-24"
        },
        {
            userId: 12,
            name: "Franco Silvestro",
            address: "Garmendia 8585",
            city: "Mar del Plata",
            state: "BUENOS AIRES",
            zip: "9911",
            email: "silvestro.franco19@gmail",
            telephone: "11-9-8892-1111",
            document: 2111112,
            birthDate: "1977-04-24"
        }
    ];

    await Customer.bulkCreate(customers);

    const orders = [
        {
            customerId: 1,
            orderDate: "2023-01-15",
            totalAmount: 3000,
            status: "Completed"
        },
        {
            customerId: 1,
            orderDate: "2023-02-01",
            totalAmount: 1500,
            status: "Canceled"
        },
        {
            customerId: 2,
            orderDate: "2022-12-23",
            totalAmount: 4000,
            status: "Completed"
        },
        {
            customerId: 2,
            orderDate: "2022-12-27",
            totalAmount: 2500,
            status: "Canceled"
        },
        {
            customerId: 2,
            orderDate: "2023-01-15",
            totalAmount: 6000,
            status: "Completed"
        },
        {
            customerId: 3,
            orderDate: "2023-02-02",
            totalAmount: 1500,
            status: "Canceled"
        },
    ];

    await Order.bulkCreate(orders);

    const ordersItems = [
        {
            orderId: 1,
            productId: 1,
            quantity: 2,
            unitPrice: 1500,
            totalAmount: 3000
        },

        {
            orderId: 2,
            productId: 10,
            quantity: 2,
            unitPrice: 500,
            totalAmount: 1000
        },
        {
            orderId: 2,
            productId: 5,
            quantity: 1,
            unitPrice: 250,
            totalAmount: 250
        },
        {
            orderId: 2,
            productId: 15,
            quantity: 1,
            unitPrice: 250,
            totalAmount: 250
        },

        {
            orderId: 3,
            productId: 17,
            quantity: 2,
            unitPrice: 1000,
            totalAmount: 2000
        },
        {
            orderId: 3,
            productId: 20,
            quantity: 1,
            unitPrice: 2000,
            totalAmount: 2000
        },

        {
            orderId: 4,
            productId: 20,
            quantity: 1,
            unitPrice: 1500,
            totalAmount: 1500
        },
        {
            orderId: 4,
            productId: 1,
            quantity: 1,
            unitPrice: 1000,
            totalAmount: 1000
        },

        {
            orderId: 5,
            productId: 15,
            quantity: 6,
            unitPrice: 1000,
            totalAmount: 6000
        },
        
        {
            orderId: 6,
            productId: 15,
            quantity: 3,
            unitPrice: 500,
            totalAmount: 1500
        },
    ];

    OrderItem.bulkCreate(ordersItems);

    const reviews = [
        {
            productId: 1,
            userId: 1,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 3,
            status: "Active",
        },
        {
            productId: 1,
            userId: 5,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 2,
            status: "Active",
            createdAt: "2023-02-20 18:30:52.418-03",
            updatedAt: "2023-02-20 18:30:52.418-03",
        },
        {
            productId: 1,
            userId: 3,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 5,
            status: "Active",
            createdAt: "2023-02-22 23:30:52.418-03",
            updatedAt: "2023-02-22 23:30:52.418-03",
        },
        {
            productId: 1,
            userId: 8,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 1,
            status: "Active",
        },
        {
            productId: 1,
            userId: 10,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 4,
            status: "Active",
        },
        {
            productId: 1,
            userId: 6,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 5,
            status: "Active",
        },
        {
            productId: 2,
            userId: 1,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 4,
            status: "Active",
        },
        {
            productId: 2,
            userId: 5,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 5,
            status: "Active",
        },
        {
            productId: 2,
            userId: 3,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 5,
            status: "Active",
        },
        {
            productId: 2,
            userId: 8,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 4,
            status: "Active",
        },
        {
            productId: 2,
            userId: 10,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 4,
            status: "Active",
        },
        {
            productId: 2,
            userId: 6,
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            stars: 5,
            status: "Active",
        },

    ]

    await Review.bulkCreate(reviews);

    MailGen.create({
        productName: 'YAZZ',
        productLink: 'https://pg-front-henry.vercel.app',
        productCopyright: 'Copyright © 2023 YAZZ. Todos los derechos reservados.',
        greeting: 'Hola',
        signature: 'Saludos cordiales'
    });

}

module.exports = { setAllDb };
