import Vue from "vue";
import VueX from "vuex";

Vue.use(VueX);

export default new VueX.Store({
  state: {
    musics: [
      {
        id: 1,
        title: "Hail to the King",
        artist: 1,
        url: require("../../public/assets/musics/hail.mp3"),
        cover: require("../../public/assets/musics/hail.jpg"),
        isPlaying: true,
        isFav: true,
      },
      {
        id: 2,
        title: "Nightmare",
        artist: 1,
        url: require("../../public/assets/musics/nightmare.mp3"),
        cover: require("../../public/assets/musics/nightmare.jpg"),
        isFav: false,
      },
      {
        id: 3,
        title: "A Little Piece of Heaven",
        artist: 1,
        url: require("../../public/assets/musics/heaven.mp3"),
        cover: require("../../public/assets/musics/heaven.jpg"),
        isFav: false,
      },
      {
        id: 4,
        title: "The Trooper",
        artist: 2,
        url: require("../../public/assets/musics/trooper.mp3"),
        cover: require("../../public/assets/musics/trooper.jpg"),
        isFav: false,
      },
      {
        id: 5,
        title: "Ghost Love Score - Live at Wacken",
        artist: 3,
        url: require("../../public/assets/musics/ghost.mp3"),
        cover: require("../../public/assets/musics/ghost.jpg"),
        isFav: false,
      },
      {
        id: 6,
        title: "Blue Orchid",
        artist: 4,
        url: require("../../public/assets/musics/orchid.mp3"),
        cover: require("../../public/assets/musics/orchid.jpg"),
        isFav: false,
      },
      {
        id: 7,
        title: "In the end",
        artist: 5,
        url: require("../../public/assets/musics/end.mp3"),
        cover: require("../../public/assets/musics/end.jpg"),
        isFav: false,
      },
    ],
    artists: [
      {
        id: 1,
        name: "Avenged Sevenfold",
        informations: [
          "Avenged Sevenfold (A7X) est un groupe de heavy metal américain, originaire de Huntington Beach, en Californie.",
          "Le groupe a longtemps été un pilier de la scène underground californienne avant d'évoluer vers une musique plus mélodique qui a permis au groupe de connaître le succès avec l'album City of Evil et l'album homonyme Avenged Sevenfold.",
          "Fondé par M. Shadows, Zacky Vengeance, The Rev et Matt Wendt à la fin des années 1990, la composition actuelle du groupe est : M. Shadows au chant, Synyster Gates à la guitare solo, Zacky Vengeance à la guitare rythmique, Johnny Christ à la basse et Brooks Wackerman à la batterie. ",
          "Le groupe émerge dans un son metalcore lors des deux premiers albums Sounding the Seventh Trumpet (2001) et Waking the Fallen (2003) et participant ainsi à la popularisation de ce genre, puis évolue vers un son plus hard rock et heavy metal avec City of Evil (2005) et Avenged Sevenfold (2007). Nightmare apparaît après la mort de The Rev en 2010.",
        ],
        url: require("../../public/assets/artists/a7x.jpg"),
      },
      {
        id: 2,
        name: "Iron Maiden",
        informations: [
          "Iron Maiden est un groupe de heavy metal britannique, originaire de Londres.",
          "Le groupe est formé en décembre 1975 par le bassiste Steve Harris, rejoint très rapidement par Dave Murray. Il a été parmi les pionniers de la new wave of British heavy metal (« la nouvelle vague de heavy metal britannique »). ",
          "Iron Maiden représente l'un des plus grands succès commerciaux du heavy metal et a vendu près de 100 millions d'albums. ",
          "Leur sens de la mélodie et une certaine complexité les rapprochent du metal progressif.Leur longévité, leurs compositions puissantes et mélodiques, la diversité de leur discographie et surtout leur qualité de précurseurs du genre en ont fait l'un des groupes phares de la scène heavy metal. Le nom du groupe se réfère à un instrument de torture inventé à la fin du XVIIIe siècle, la vierge de fer. Leur mascotte, Eddie, est issue de l'imagination du dessinateur Derek Riggs. ",
        ],
        url: require("../../public/assets/artists/iron.jpg"),
      },
      {
        id: 3,
        name: "Nightwish",
        informations: [
          "Nightwish est un groupe de metal symphonique finlandais originaire de Kitee, dans la région de la Carélie du Nord. ",
          "Formé en 1996, il est considéré comme l'un des représentants du genre et comme l'un des groupes responsables du gain de popularité que connaît le metal symphonique à la fin des années 1990.",
          "Bien que le groupe soit devenu célèbre dans son pays natal dès la sortie de son premier single, The Carpenter (1997), sa renommée internationale ne débute qu'avec la sortie des albums Oceanborn (1998) et Wishmaster (2000). La chanson Sleeping Sun (composée en 1999) est le premier des singles du groupe à paraître au-delà des frontières de la Finlande, lui permettant ainsi de se faire connaître à travers toute l'Europe.",
          "En octobre 2005, les membres du groupe décident de se séparer de leur chanteuse, Tarja Turunen, qui est officiellement remplacée en mai 2007 par la chanteuse suédoise du groupe Alyson Avenue, Anette Olzon.",
          "Cette dernière quitte à son tour le groupe en pleine tournée, en octobre 2012, après avoir enregistré les albums Dark Passion Play (2007) et Imaginaerum (2011).La chanteuse Floor Jansen, du groupe néerlandais ReVamp, ex-chanteuse d’After Forever, remplace Anette Olzon pour la fin de la tournée de l’album Imaginaerum. En octobre 2013, les membres du groupe annoncent que Floor Jansen et Troy Donockley deviennent tous deux membres permanents. Leur album suivant, Endless Forms Most Beautiful, sort en mars 2015. ",
        ],
        url: require("../../public/assets/artists/nightwish.jpg"),
      },
      {
        id: 4,
        name: "The Whites Stripes",
        informations: [
          "The White Stripes est un groupe de rock américain, originaire de Détroit, dans le Michigan.",
          "Il est formé en 1997 et composé de Jack White (John Anthony Gillis) au chant, à la guitare, au piano et à l'écriture et de Meg White (Megan Martha White) à la batterie, au chant et au piano. ",
          "Le groupe se sépare le 2 février 2011. S'affichant comme frère et sœur (mais en réalité ex-époux, mariés en 1996, puis divorcés quatre ans plus tard, en 2000), Jack White et Meg White (batterie et chant), sortent leur premier album The White Stripes en 1999. ",
        ],
        url: require("../../public/assets/artists/whites.jpg"),
      },
      {
        id: 5,
        name: "Linkin Park",
        informations: [
          "Linkin Park est un groupe de rock/metal américain, originaire d'Agoura Hills, en Californie.",
          "Il est formé en 1996, et actuellement mené par Mike Shinoda (chant, rap, guitare rythmique et clavier), Brad Delson (guitare solo), Dave Farrell (guitare basse), Rob Bourdon (batterie) et Joe Hahn (platines, effets et mixage).",
          "Il est propulsé sur le devant de la scène mondiale dès la sortie de son premier album Hybrid Theory, en 2000. Écoulé à plus de 24 millions d'exemplaires et certifié disque de diamant par la RIAA, celui-ci fait partie des albums les plus vendus du XXIe siècle, et reste sa meilleure performance commerciale à ce jour.",
          "En 2003, la sortie de l’album Meteora, suivi du DVD Live in Texas, consolide leur place de groupe phare. Estimant avoir exploré toutes les directions qu'offraient le nu metal et le rapcore, le groupe décide de se tourner vers d'autres genres dans son album suivant, Minutes to Midnight (2007), qui prend la tête des ventes dans 32 pays et se classe meilleure entrée de l'année aux États-Unis. ",
        ],
        url: require("../../public/assets/artists/linkin.jpg"),
      },
    ],
  },
  mutations: {},
  actions: {},
  getters: {
    getArtistById: (state) => (artistId) => {
      return state.artists.find((x) => x.id === parseInt(artistId));
    },
    getMusicByArtistId: (state) => (artistId) => {
      return state.musics.filter((x) => x.artist === parseInt(artistId));
    },
  },
});
