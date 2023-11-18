import { defineComponent, reactive, shallowReactive, watchEffect,watch } from "vue";
import './RGB.scss'

export default defineComponent({
    name:'RGB',

    props:{
        modelValue:{
            required:false,
            type:Array
        }
    },
    emits:{
        'update:modelValue':null
    },


    setup(props,ctx){
        const default_value = [255,255,255,255]
        const rgba = shallowReactive<Array<number>>(props.modelValue || default_value)

        watch(()=>rgba,(newvalue,oldvalue)=>{
            if(newvalue.some(item=>item === void 0 || item === '')){
                ctx.emit('update:modelValue',oldvalue)
                return
            }
            if(newvalue.some((item:number)=>item < 0 || item > 255)) {
                return
            }
            ctx.emit('update:modelValue',rgba.map((value,index)=>{
                return Number(value)
            }))
        },{
            deep:true
        })

        watch(()=>props.modelValue,(newvalue)=>{
            if(!newvalue){
                rgba[0] = 255
                rgba[1] = 255
                rgba[2] = 255
                rgba[3] = 1
            }else{
                rgba[0] = newvalue[0]
                rgba[1] = newvalue[1]
                rgba[2] = newvalue[2]
                rgba[3] = newvalue[3]
            }
        })

        return ()=>(
            <div class="rgb">
                <div class="item">
                    <input v-model={rgba[0]} type="text" />
                    <p>R</p>
                </div>
                <div class="item">
                    <input v-model={rgba[1]} type="text" />
                    <p>G</p>
                </div>
                <div  class="item">
                    <input v-model={rgba[2]} type="text" />
                    <p>B</p>
                </div>
                <div class="item">
                    <input  v-model={rgba[3]} type="text" />
                    <p>A</p>
                </div>
            </div>
        )
    }
})