import { defineComponent, ref, watchEffect, onMounted, onBeforeUnmount, shallowRef, watch, toRaw} from "vue";
import { useMouseInElement, useMousePressed } from "@vueuse/core";
import hex_to_rgb from 'hex-rgb'
import rgb_to_hex from 'rgb-hex'
import { follow_me, remove_disable_icon } from "../../utils";
import "./index.scss";
import HEX from './HEX'
import RGB from './RGB'
export default defineComponent({
    name:"ColorPanel",
    props:{
        hex:{
            required:false,
            type:String,
            default:"#FFFFFF"
        },
        rgba:{
            required:false,
            type:Array,
            default:()=>[255,255,255,1]
        }
    },
    emits:{
        "update:hex":null,
        "update:rgba":null,
    },
    setup(props,ctx) {
        const content_el = ref<null | HTMLDivElement>(null);
        const point_el = ref<null | HTMLSpanElement>(null);
        onMounted(() => {
            if(point_el.value){
                remove_disable_icon(point_el.value);
            }
            const { x, y, isOutside } = useMouseInElement(content_el);
            const { pressed } = useMousePressed();
            const offset_x = (point_el.value?.clientWidth ?? 0) / 2 + 10;
            const offset_y = (point_el.value?.clientHeight ?? 0) / 2 + 10;
            const stop = watchEffect(() => {
                if (!point_el.value || isOutside.value || !pressed.value) return;
                follow_me(point_el.value, { x: x.value - offset_x, y: y.value - offset_y });
            });
            onBeforeUnmount(stop);
        });

        const hex = shallowRef(props.hex)
        const rgba = shallowRef(props.rgba)

        // watchEffect(()=>{
        //     ctx.emit("update:hex",hex.value)
        //     ctx.emit("update:rgba",rgba.value)
        // })

        // watch(hex,(newvalue)=>{
        //     rgba.value = hex_to_rgb(newvalue,{format:'array'})
        //     console.log(rgba.value)
        // })
        // watch(()=>rgba.value as [number,number,number,number],(newvalue:[number,number,number,number])=>{
        //     hex.value = '#'+rgb_to_hex(...newvalue)
        // })

        function hex_change(value:string){
            const len = [7,9]
            if(!len.includes(value.length)) return
            const _rgba = hex_to_rgb(value,{format:'array'})
            toRaw(rgba).value  = _rgba
            ctx.emit("update:hex",value)
        }

        function rgba_change(value:[number,number,number,number]){
            const _hex = '#'+rgb_to_hex(...value)
            toRaw(hex).value = _hex
            ctx.emit("update:rgba",value)
        }
        
        return () => (
            <div class="container">
                <div class="color-board" ref={content_el}>
                    <div class="point" ref={point_el} draggable="true"></div>
                    <div class="color-panel color-panel-1"></div>
                    <div class="color-panel color-panel-2"></div>
                </div>

                <div class="color-bar">
                    <div class="long-bar">
                        <div class="bar-1"></div>
                        <div class="bar-2"></div>
                    </div>

                    <div class="color-rect"></div>
                </div>

                <div class="color-value">
                    <div class="input-item">
                        <HEX modelValue={hex.value} onUpdate:modelValue={hex_change}></HEX>
                    </div>
                    <div class="input-item">
                        <RGB modelValue={rgba.value} onUpdate:modelValue={rgba_change}></RGB>
                    </div>
                </div>
            </div>
        );
    },
});
