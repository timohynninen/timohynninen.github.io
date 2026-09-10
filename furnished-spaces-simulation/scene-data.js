export const scenes = [
  {
    id: 'iltapaivan-vaihto',
    title: 'Kohtaamo 3 – iltapäivän vaihto',
    subtitle: 'Saapuminen, tarjoilu ja materiaalitoimitus osuvat samaan hetkeen.',
    texture: './assets/kohtaamo3-panorama.png',
    initialView: { yaw: 112, pitch: -2, fov: 72 },
    introduction: 'Tutki koko tila ennen kuin paljastat kohteita. Etsi päätöksenteon kannalta merkityksellisiä suhteita, ei vain yksittäisiä esineitä.',
    tasks: [
      'Etsi kohta, jossa pysähtyminen ja saapuva käyttäjävirta kasaantuvat.',
      'Etsi kaluste, joka heikentää seuraavan suunnan ennakointia.',
      'Etsi vaihtoehtoinen kulku, joka säilyttää käyttäjän tavoitteen.'
    ],
    hotspots: [
      {
        id: 'lahtotilanne',
        type: 'visible',
        yaw: 134,
        pitch: 1,
        label: 'Saapuminen',
        title: 'Reitti alkaa ennen ensimmäistä askelta',
        text: 'Sisäänkäynnillä käyttäjä etsii aloituspistettä, seuraavaa suuntaa ja tietoa samanaikaisesta toiminnasta.',
        reflection: 'Mitä saapuva käyttäjä voi havaita tästä kohdasta ilman ennakkotietoa?'
      },
      {
        id: 'kasaantuminen',
        type: 'hidden',
        task: 'Etsi kohta, jossa pysähtyminen ja saapuva käyttäjävirta kasaantuvat.',
        yaw: 112,
        pitch: -7,
        label: 'Kasaantuminen',
        title: 'Kahvipiste ja saapuminen osuvat samaan kohtaan',
        text: 'Kahvin hakeminen on suunniteltu pysähtyminen, mutta samalla hetkellä saapuva ryhmä tarvitsee tilaa ensimmäiselle reittivalinnalle.',
        reflection: 'Mikä havaittava määrä tai tapahtuma tekisi tilanteesta reitin vaihtamisen arvoisen?'
      },
      {
        id: 'sermin-katve',
        type: 'hidden',
        task: 'Etsi kaluste, joka heikentää seuraavan suunnan ennakointia.',
        yaw: -56,
        pitch: -1,
        label: 'Näkökatve',
        title: 'Sermi tukee yhtä toimintaa ja peittää toista',
        text: 'Korkea sermi rajaa työskentelyä, mutta sisäänkäynniltä se voi katkaista näkymän seuraavaan päätöspisteeseen ja materiaalikärryn lähestymiseen.',
        reflection: 'Mitä hyötyä sermistä pitää säilyttää, jos sen asentoa muutetaan?'
      },
      {
        id: 'vaihtoehtoinen-kulku',
        type: 'hidden',
        task: 'Etsi vaihtoehtoinen kulku, joka säilyttää käyttäjän tavoitteen.',
        yaw: 10,
        pitch: -6,
        label: 'Vaihtoehtoinen reitti',
        title: 'Pidempi sivureitti voi vähentää kohtaamisia',
        text: 'Sermin oikealta puolelta avautuva kulku jatkuu samoille työskentelyalueille mutta ohittaa sisääntulon ja tarjoilun yhteisen päätöspisteen.',
        reflection: 'Mitä lisämatkaa, opastusta tai vaikutusta rauhalliseen oleskelualueeseen vaihtoehto tuottaa?'
      }
    ]
  }
];
