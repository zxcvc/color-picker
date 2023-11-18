import { defineComponent, shallowRef, watch } from "vue";
import './HEX.scss'

export default defineComponent({
    name:"HEX",
    props:{
        modelValue:{
            required:false,
            type:String
        }
    },
    emits:{
        "update:modelValue":null
    },

    setup(props,ctx){
        const hex = shallowRef(props.modelValue||"#FFFFFF")
        watch(()=>hex.value,(newvalue)=>{
            ctx.emit('update:modelValue',newvalue)
        })

        watch(()=>props.modelValue,()=>{
            hex.value = props.modelValue || "#FFFFFF"
        })

        function input(e:Event){
            ctx.emit('update:modelValue',(e.target as HTMLInputElement).value)
        }

        return ()=>(
            <div class="hex">
                <input type="text" value={hex.value} onInput={input}  />
                <p>HEX</p>
            </div>
        )
    }
})