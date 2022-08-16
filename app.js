

let title;
title = document.getElementById("title");

let price =document.getElementById('price');
let taxes  =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount  =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category  =document.getElementById('category');
let submit =document.getElementById('submit');
let refresh=document.getElementById('refresh');
let missing=document.getElementById('missing');
let deleteAll=document.getElementById('deleteAll');
let search=document.getElementById('search');
const fromDb = undefined;
let mood='create';
let tmb;

//total price 

function getTotal(){ 
      if(price.value!=''){
            
        
    let result=(+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background='green';
    } 
}  

//creat any number of products
let dataProducts =undefined||[] ||null  ;
if(localStorage.product!=null){
    dataProducts=JSON.parse(localStorage.product);
}

if(localStorage.product==null){
    let dataProducts=[] ;
    
}


submit.onclick=function creat(){
    if(title.value!=''&&price.value!=''&&category.value!='' ){ 
    let product={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount: discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value
    }
    //count   how many products ??
    if(mood==='create'){ 
        if(product.count>1){  
            for(let i=1;i<=product.count;i++){
                dataProducts.push(product);
            }
        }
        else{  
            dataProducts.push(product);}
    }
    else{
        dataProducts[tmb]=product;
        mood='create';
        submit.innerHTML='create';
        count.style.display='block';

    }
    localStorage.setItem('product',JSON.stringify(dataProducts));
    clear();
    missing.innerHTML='';
    total.style.background='red';
    read();
    
}
    else{
        missing.innerHTML="complete the missing data";
    }
}

//refresh all inputs and show all products

refresh.onclick =function refresh() {
    clear();
missing.innerHTML='';

total.style.background='red';
read();
count.style.display='block';
search.value='';

}

//clear
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}


//read and show products
function read(){
    getTotal();  
let table='';
for(let i=1;i<dataProducts.length;i++){
    table+=` 
    <tr> 
    <th>${ i }</th>
    <th>${dataProducts[i].title}</th>
    <th>${dataProducts[i].price}</th>
    <th>${dataProducts[i].taxes}</th>
    <th>${dataProducts[i].ads}</th>
    <th>${dataProducts[i].discount}</th>
    <th>${dataProducts[i].total}</th>
    <th>${dataProducts[i]. category} </th>
    <th><button onclick="update(${i})" id="update">update</button>

    </th>
    <th><button onclick="deleteItem( ${i} )" id="delete">delete</button></th>
</tr> 
`
document.getElementById('tbody').innerHTML=table;
}
if(dataProducts.length>0){
    
    deleteAll.innerHTML= `<button onclick="deleteData()" >delete all products (${dataProducts.length-1})</button>` 

}
else {
    deleteAll.innerHTML='';
    document.getElementById('tbody').innerHTML="cannot find products";
}
}

//delete one product by click delete btn

function deleteItem(i){
    dataProducts.splice(i,1);
    localStorage.product=JSON.stringify(dataProducts);
    read();
}

//delete all products by click delete all btn

function deleteData(){
    localStorage.clear();
    dataProducts.splice(0);
    document.getElementById('tbody').style.display='none';
    document.getElementById('deleteAll').innerHTML='';
}

//update one product by update btn
function update(i){
    console.log(i);
    title.value=dataProducts[i].title;
    price.value=dataProducts[i].price;
    ads.value=dataProducts[i].ads;
    taxes.value=dataProducts[i].taxes;
    discount.value=dataProducts[i].discount;
    category.value=dataProducts[i].category;
    getTotal();
    count.style.display="none";
    submit.innerHTML=` update ( product- ${i} ) `;
    mood='update';
    tmb=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

//searching by title or category

let searchMood;

function getSearchMood(id){
   
    if(id=='byTitle'){
        searchMood='title'; 
    }
    else{
        searchMood='cat'
    }
    console.log(searchMood);
    search.focus();
    search.value='';
    read();
}

function searchData(value){
    let table='';
    if(searchMood=='title'){
        for(let i=0;i<dataProducts.length;i++){
            if(dataProducts[i].title.includes(value)){
                table+=`
                    <tr> 
                        <th>${ i }</th>
                        <th>${dataProducts[i].title}</th>
                        <th>${dataProducts[i].price}</th>
                        <th>${dataProducts[i].taxes}</th>
                        <th>${dataProducts[i].ads}</th>
                        <th>${dataProducts[i].discount}</th>
                        <th>${dataProducts[i].total}</th>
                        <th>${dataProducts[i]. category} </th>
                        <th><button onclick="update(${i})" id="update">update</button>

                        </th>
                        <th><button onclick="deleteItem( ${i} )" id="delete">delete</button></th>
                    </tr> 
                `
            }
        }

    }
    else{
        for(let i=0;i<dataProducts.length;i++){
            if(dataProducts[i].category.includes(value)){
                table+=`
                    <tr> 
                        <th>${ i }</th>
                        <th>${dataProducts[i].title}</th>
                        <th>${dataProducts[i].price}</th>
                        <th>${dataProducts[i].taxes}</th>
                        <th>${dataProducts[i].ads}</th>
                        <th>${dataProducts[i].discount}</th>
                        <th>${dataProducts[i].total}</th>
                        <th>${dataProducts[i]. category} </th>
                        <th><button onclick="update(${i})" id="update">update</button>

                        </th>
                        <th><button onclick="deleteItem( ${i} )" id="delete">delete</button></th>
                    </tr> 
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML=table;

}




read();


