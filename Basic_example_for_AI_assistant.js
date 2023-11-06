let data;
const url = "https://api.escuelajs.co/api/v1/products"

api.axios.get(url)
  .then(res=>data = res.data)

intent("Show me the product menu",p =>{
    p.play({command:"getMenu",data:data})
    p.play("ok bro")
})
intent("Sort by $(ORDER_BY name|price|category|ID|categoryID )",p =>{
    
    const orderValue = p.ORDER_BY.value
    let orderedMenu = data
    switch(orderValue){
        case "name": 
            orderedMenu = data.sort((p1,p2)=>p1.title.localeCompare(p2.title))
            break;
        case "category": 
            orderedMenu = data.sort((p1,p2)=>p1.category.name.localeCompare(p2.category.name))
            break;
        case "price": 
            orderedMenu = data.sort((p1,p2)=>p1.price - p2.price)
            break;
        case "price": 
            orderedMenu = data.sort((p1,p2)=>p1.id - p2.id)
            break;
            case "price": 
            orderedMenu = data.sort((p1,p2)=>p1?.category?.categoryId - p2?.category?.categoryId)
            break;
            
    }
    p.play({command:"getMenu",data:orderedMenu})
    p.play(`Order by ${orderValue}`)
})
intent(`Add product number $(ITEM 1|2|3|4|5|6|7|8|9|10})`,"Add product number $(UNAVAILABLE* .*) to card",p=>{
    if(p.UNAVAILABLE){
        p.play("That item is unavailable")
    }else{
        const itemIndex = p.ITEM.value
        const addToCard = data.find(item=>(
        item.id == itemIndex
        ))
        p.play({command:"showCard",data:addToCard})
         p.play(`Product number ${p.ITEM.value} added succesfully`)
    }
   
    
})
intent("Open my Card", p =>{
    p.play({command:"openCard",data:true})
    p.play("Opening card")
})
intent("Close my Card", p =>{
    p.play({command:"closeCard",data:false})
    p.play("Closing card")
})