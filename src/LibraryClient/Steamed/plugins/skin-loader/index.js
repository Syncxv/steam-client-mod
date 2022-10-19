const { Plugin } = require('steamed/entities');
const createElement = require('../../../../modules/util/createElement');

export class SkinLoader extends Plugin {
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
        }
        
        .boxcarousel_BoxCarouselContents_3CJct.boxcarousel_MaskRight_1urF0 {
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(3, 1fr);
        }
        
        .libraryhomerecentgames_RecentGame_1esfE:nth-child(1) {
            grid-column: span 2;
        }

        .appportrait_LibraryItemBox_WYgDg.appportrait_Portrait_1Pf6J.appportrait_InRecentGames_biTV-.Panel.Focusable {
            border-radius: 17px;
        }
        
        .libraryassetimage_Container_1R9r2.libraryassetimage_GreyBackground_2E7G8.libraryassetimage_PortraitImage_3Ehhd.appportrait_PortraitImage_2IYf7.appportrait_Capsule_13w3S.appportrait_CapsuleVisible_3QIfJ > img.libraryassetimage_Image_24_Au.libraryassetimage_Visibility_3d_bT.libraryassetimage_Visible_yDr03 {
            --size: 27%;
            width: var(--size);
            height: var(--size);
            aspect-ratio: 9 / 16;
            padding: 2rem;
            border-radius: 42px;
        }`);
    }
}
