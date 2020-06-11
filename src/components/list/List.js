import {Lightning} from "wpe-lightning-sdk";
import Item from "../item";

export default class List extends Lightning.Component {
    static _template() {

        return {
            Items: {
                y: 120, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Focus: {
                w : 250,
                h : 360,
                y : 115,
                x:-35,
                zIndex: 2,
                texture: lng.Tools.getRoundRect(220, 345, 10, 6, 0xff03b3e4, true, 0x0000ffff),
                colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4,
            },
            Metadata: {
                /**
                 * @todo: Your goal is to add a component that have multiple text labels,
                 * 1 for the Title of the selected asset and 1 for the genre.
                 */
            }
        }
    }

    _init() {
        this._index = 0;
    }

    _focus(){
      this.tag("Focus").setSmooth("alpha",  1);
    }

    _active() {
      this.setIndex(0)
    }

    _unfocus() {
      this.tag("Focus").setSmooth("alpha",  0);
    }

    _handleLeft(){
        this.setIndex(Math.max(0, --this._index));
    }

    _handleRight(){
        this.setIndex(Math.min(++this._index, this.items.length - 1));
    }

    /**
     * @todo:
     * Implement working setIndex method
     * that stores index and position movie component to focus
     * on selected item
     */
    setIndex(idx){
        // store new index
        this._index = idx;

        // update position
        this.tag("Items").setSmooth("x",  idx * -220 );
        this.fireAncestors('$onItemSelected',this.activeItem._item);
    }

    set label(v) {
        // @todo: update list title
    }

    set movies(v) {
        // we add an array of object with type: Item
        this.tag("Items").children = v.map((movie, index)=>{
            return {
                type: Item,
                item: movie,
                x: index * (Item.width + Item.offset)
            };
        });
    }

    get items() {
        return this.tag("Items").children;
    }

    get activeItem() {
        return this.items[this._index];
    }

    _getFocused() {
        return this.activeItem;
    }
}
