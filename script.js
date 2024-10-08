const addform = document.getElementById("form-1");
const category = document.getElementById("category");
const description = document.getElementById("note");
const amount = document.getElementById("amount");
const all = document.getElementById("all");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const add = document.getElementById("add");
const finance = document.getElementById("finance");
const msg = document.getElementById("msg");
const s_income = document.getElementById("s_income");
const s_expense = document.getElementById("s_expense");
const s_balance = document.getElementById("s_balance");

function formValidate() {
  if (amount.value < 0) {
    alert("Input Fields Cannot Be Empty😒");
  }else{
    getData();
    
  add.setAttribute("data-modal-target","crud-modal");
  add.setAttribute("data-modal-toggle","crud-modal");
  add.click();
  (() => {
    // add.setAttribute("data-modal-target", "");
    // add.setAttribute("data-modal-toggle", "");
  })();
}
  //resetForm();
};

addform.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log("super da kana");
  
  formValidate();
});

let data = [{}];

const getData= () =>{

    data.push({
      category:category.value,
      description:description.value,
      amount:amount.value
    })

    localStorage.setItem("data",JSON.stringify(data));

    //console.log(data);

    createFinance();
}

const createFinance = (clicked='all') => {
    finance.innerHTML = "";
const bb = [];
const cc = [];
    data.map((ele, y)=>{
      if(ele.category === 'income'){
        bb.push(parseInt(ele.amount))
      }else if(ele.category === 'expense'){
        cc.push(parseInt(ele.amount))
      }

      if(ele.category === clicked){
        return(
         
            finance.innerHTML += `
            <tr id=${y} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${ele.category}</th>
              <td class="px-6 py-4">${ele.description}</td>
              <td class="px-6 py-4">&#X20B9; ${ele.amount}</td>
              <td class="px-6 py-4">  
              <span onclick="editFinance(this);" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="material-symbols-outlined cursor-pointer m-2 text-green-500">
edit_note
</span>           
               <span onclick="deleteFinance(this); createFinance()" class="material-symbols-outlined cursor-pointer m-2 text-red-600">
delete_forever
</span>
               </td>
          </tr>     `
          
        );
      }else if(clicked === 'all'){
        return(
         
            finance.innerHTML += `
            <tr id=${y} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${ele.category}</th>
              <td class="px-6 py-4">${ele.description}</td>
              <td class="px-6 py-4">${ele.amount}</td>
              <td class="px-6 py-4">  
              <span onclick="editFinance(this);" data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="material-symbols-outlined cursor-pointer m-2 text-green-500">
edit_note
</span>           
               <span onclick="deleteFinance(this); createFinance()" class="material-symbols-outlined cursor-pointer m-2 text-red-600">
delete_forever
</span>
               </td>
          </tr>     `
          
        );
      }
  });

  let sum = 0;
  let c_sum = 0;
  let c_bal = 0;
  bb.forEach(x => {
     sum += x;
  });
  cc.forEach(y => {
    c_sum += y;
 });
  c_bal = sum - c_sum;
  s_income.innerHTML=`Income: &#X20B9; ${sum}`;
  s_expense.innerHTML=`Expense: &#X20B9; ${c_sum}`;
  s_balance.innerHTML=`Balance: &#X20B9; ${c_bal}`;
    resetForm();
};

const resetForm =() =>{
  category.value = "";
  description.value ="";
  amount.value = "";
};
(()=>{
data = JSON.parse(localStorage.getItem("data")) || [];
//console.log("reset",data);
createFinance();

}) ();


const editFinance = (e) =>{
  let result = e.parentElement.parentElement;
   category.value = result.children[0].innerHTML;
   description.value = result.children[1].innerHTML;
   amount.value = result.children[2].innerHTML;

// const varid = e.parentElement.parentElement.id;
//   console.log(data[varid]);
//    data.push({
//     category:category.value,
//     description:description.value,
//     amount:amount.value
//   })
if(e===true){
deleteFinance(e);
}

   
}

// delete function for created TODO's

const deleteFinance = (e)=>{
e.parentElement.parentElement.remove();
data.splice(e.parentElement.parentElement.id,1);
localStorage.setItem("data",JSON.stringify(data));
//console.log(data);
}