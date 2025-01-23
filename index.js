import{S as p,i as y}from"./assets/vendor-5ObWk2rO.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const g="48383034-506c7f8ffe99ad1c3f13eb63b",L="https://pixabay.com/api/?",b=document.getElementById("search-form"),n=document.querySelector(".gallery"),c=document.querySelector(".loader"),a=new URLSearchParams({key:g,q:"",image_type:"photo",orientation:"horizontal",safesearch:"true"});function w(){c.style.display="block"}function S(){c.style.display="none"}document.querySelector("form").addEventListener("submit",l=>{l.preventDefault(),n.innerHTML="",a.set("q",l.currentTarget.elements.query.value.trim());const o=`${L}${a.toString()}`;w(),fetch(o).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()}).then(r=>{if(r.hits.length<=0)throw new Error("Sorry, there are no images matching your search query. Please try again!");const s=r.hits.map(({webformatURL:t,largeImageURL:i,tags:u,likes:f,views:d,comments:h,downloads:m})=>`<li class= "gallery-list">
                <div class="gallery-div">
                   <a class= "gallery-link" href="${i}">
                     <img src="${t}"  alt="${u}" class="gallery-image"/>
                   </a>
                </div>
                <ul class="card-info">
                <li class="info-item">
                   <h3>Likes</h3>
                   <p>${f}</p>
                </li>
                <li class="info-item">
                  <h3>Views</h3>
                  <p>${d}</p>
                </li>
                <li class="info-item">
                  <h3>Comments</h3>
                  <p>${h}</p>
                </li>
                <li class="info-item">
                   <h3>Downloads</h3>
                   <p>${m}</p>
                </li>
                </ul>
                </li>`).join("");n.innerHTML=s,new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}).catch(r=>{y.error({message:`${r.message}`,position:"topRight"})}).finally(()=>{S(),b.reset()})});
//# sourceMappingURL=index.js.map
