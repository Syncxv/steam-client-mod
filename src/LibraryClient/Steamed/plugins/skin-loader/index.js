const { Plugin } = require('steamed/entities');
const createElement = require('../../../../modules/util/createElement');

module.exports = class SkinLoader extends Plugin {
    manifest = { name: 'bruh', description: 'i dont know', author: 'Aria' };
    startPlugin() {
        this.loadStylesheet(`.smartscrollcontainer_Body_g6Mwh.libraryhome_InnerContainer_2AUVZ {
            display: flex;
            flex-direction: column-reverse;
        }
        
        .libraryhome_LibraryHome_3Sb2o > div {
            display: flex;
            flex-direction: column-reverse !important;
        }
        
        .boxcarousel_BoxCarousel_3fiHs.libraryhomerecentgames_RecentGames_1RLny {
            height: 100vh !important;
        }`);
    }
};
