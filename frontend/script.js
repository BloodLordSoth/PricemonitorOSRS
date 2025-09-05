const email = document.getElementById('email').value
const dBones = document.getElementById('dBones')
const scales = document.getElementById('scales')


scales.addEventListener('change', () => {
    scaleamt.style.display = scales.checked ? 'inline-block' : 'none'
})

dBones.addEventListener('change', () => {
    dBoneamt.style.display = dBones.checked ? 'inline-block' : 'none'
})

async function submit(){
    const dboneamt = document.getElementById('dBoneamt').value
    const scaleamt = document.getElementById('scaleamt').value
    const running = document.getElementById('running')
    const arr = []
    const scalearr = []
    

    if (scales.checked){
        arr.push('Zulrah Scales')
        scalearr.push(scaleamt)
    } 

    if (dBones.checked){
        arr.push('dBones')
    }

    const dataObj = {
        email: email,
        scaleprice: scaleamt,
        itemlist: arr,
        dBonePrice: dboneamt
    }

    const res = await fetch('/run', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj)
    })

    if (!res.ok){
        window.alert('There was a server issue')
    }
    
    console.log(`Email: ${email} Watching: ${arr}`)
    running.style.display = 'block'
}