import{S as g,i as y}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const L="48383034-506c7f8ffe99ad1c3f13eb63b",b="https://pixabay.com/api/?",n=document.getElementById("search-form"),c=document.querySelector(".gallery"),l=document.querySelector(".loader"),u=new URLSearchParams({key:L,q:"",image_type:"photo",orientation:"horizontal",safesearch:"true"});n.addEventListener("submit",a=>{a.preventDefault(),l.classList.add("loader"),u.set("q",a.currentTarget.elements.query.value.trim());const o=`${b}${u.toString()}`;fetch(o).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length<=0)throw new Error("Sorry, there are no images matching your search query. Please try again!");const i=r.hits.map(({webformatURL:t,largeImageURL:s,tags:f,likes:d,views:m,comments:h,downloads:p})=>`<li class= "gallery-list">
                <div class="gallery-div">
                   <a class= "gallery-link" href="${s}">
                     <img src="${t}"  alt="${f}" class="gallery-image"/>
                   </a>
                </div>
                <ul class="card-info">
                <li class="info-item">
                   <h3>Likes</h3>
                   <p>${d}</p>
                </li>
                <li class="info-item">
                  <h3>Views</h3>
                  <p>${m}</p>
                </li>
                <li class="info-item">
                  <h3>Comments</h3>
                  <p>${h}</p>
                </li>
                <li class="info-item">
                   <h3>Downloads</h3>
                   <p>${p}</p>
                </li>
                </ul>
                </li>`).join("");c.innerHTML=i,l.classList.remove("loader"),new g(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}).catch(r=>{y.error({message:`${r}`,position:"topRight"}),c.innerHTML="",l.classList.remove("loader")}),n.reset()});
//# sourceMappingURL=index.js.map
