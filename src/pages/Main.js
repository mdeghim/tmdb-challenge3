import {Lightning, Router, Utils} from 'wpe-lightning-sdk';
import {List} from "../components";
import {getImgUrl} from "../lib/tools";
export default class Main extends Lightning.Component{
    static _template() {
        const timingFunction = 'cubic-bezier(0.20, 1.00, 0.80, 1.00)';
        return {
            List: {
                x: 100, y: 560, zIndex: 3,
                type: List
            },
            Background: {
                alpha : 1,
                w: 1920, h: 1080, colorBottom: 0xff000000, scale: 1.2,
                transitions: {
                    scale: {duration: 1, timingFunction},
                    x:{duration:3, delay:1.2, timingFunction:'ease-in'}
                }
            },
        };
    }

    _init() {
        this._index = 0;
    }

    set data(v){
        this.tag("List").movies = v;
    }

    /**
     * @todo: add set movies() that will be called by the data-provider
     * inside set movies create new List child and call it's movies setter
     * and hand over the movies
     */

    _focus() {
        this.patch({
            Lists: {
                smooth: {y: [560, {duration: .2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]}
            }
        });
    }

    _unfocus() {
        this.patch({
            Lists: {
                smooth: {y: [600, {duration: .4}]}
            }
        });
    }

    _getFocused() {
        return this.tag("List");
    }

    _handleUp(){
        Router.focusWidget("menu")
    }

    $onItemSelected(i) {
      console.log(i);
      const image = getImgUrl(i._backdrop_path, 500);
      this.patch({
          Background: {
              src: image
          }
      });
      this.tag("Background").on("txLoaded", ()=> {
          console.log("loaded");
          this.patch({
              Background:{smooth:{scale:1}}
          })
      });
    }

}
