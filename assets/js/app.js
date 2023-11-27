// let products = document.querySelector(".products-con");

// let currentPage = 1;
// let itemsPerPage = 10;

// fetch('https://dummyjson.com/products')
// .then(res => res.json())
// .then(data => {



//     let obj = '';
//     setTimeout(()=>{
//         data.products.map((product)=>{

            
//                 obj += `

//                 <div class="product">
//                 <img class="w-100" src=${product.images[0]} alt="">
//                 <div class="des">
//                   <span class="brand-name">${product.brand}</span>
//                   <h3 class="title m-0">${product.title}</h3>
//                   <div class="star">
//                     <i class="fa-solid fa-star"></i>
//                     <i class="fa-solid fa-star"></i>
//                     <i class="fa-solid fa-star"></i>
//                     <i class="fa-solid fa-star"></i>
//                   </div>
//                   <div class="d-flex justify-content-between align-items-center">
//                   <del class="price">$${product.price}</del>
//                   <p class="new-price m-0">${product.discountPercentage}</p>
//                     <a href="#">
//                       <i class="fa-solid fa-shopping-cart"></i>
//                     </a>
//                   </div>
//                 </div>
//               </div>
                
                
//                 ` 
    
        
            
//         })

//         products.innerHTML = obj;

//     },2000)
    
// })



let productsContainer = document.querySelector(".products-con");
let currentPage = 1;
let itemsPerPage = 10;

function displayProducts(page, data) {
    let startIdx = (page - 1) * itemsPerPage;
    let endIdx = startIdx + itemsPerPage;
    let obj = '';

    for (let i = startIdx; i < endIdx && i < data.products.length; i++) {
        let product = data.products[i];
        obj += `
            <div class="product">
                <img class="w-100" src=${product.images[0]} alt="">
                <div class="des">
                    <span class="brand-name">${product.brand}</span>
                    <h3 class="title m-0">${product.title}</h3>
                    <div class="star">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <del class="price">$${product.price}</del>
                        <p class="new-price m-0">${product.discountPercentage}</p>
                        <a href="#">
                            <i class="fa-solid fa-shopping-cart"></i>
                        </a>
                    </div>
                </div>
            </div>`;
    }

    productsContainer.innerHTML = obj;
}

function updatePagination(currentPage, totalPages) {
    let paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = '';

    // Add Previous button
    paginationContainer.innerHTML += `<button  onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;

    // Add numbered buttons
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `<button onclick="changePage(${i})" ${i === currentPage ? 'class="active"' : ''}>${i}</button>`;
    }

    // Add Next button
    paginationContainer.innerHTML += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>`;
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    displayProducts(currentPage, productsData);
    updatePagination(currentPage, totalPageCount);
}

let productsData; // Declare a variable to store the fetched data
let totalPageCount;

fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        productsData = data;
        totalPageCount = Math.ceil(data.products.length / itemsPerPage);
        displayProducts(currentPage, data);
        updatePagination(currentPage, totalPageCount);
    });
