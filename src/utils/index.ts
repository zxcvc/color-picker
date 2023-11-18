type Point = {
    x:number;
    y:number;
}

function follow_me(el:HTMLElement,{x,y}:Point){
    if(!el) throw new TypeError("el is not defined");
    el.style.transform = `translate(${x}px,${y}px)`
}

function remove_disable_icon(el:HTMLElement){
    el.addEventListener('mousemove',(e)=>{
        e.preventDefault()
    })
}

export {follow_me,remove_disable_icon}