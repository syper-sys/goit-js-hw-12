import{S as u,a as f,i as l}from"./assets/vendor-DZWlGVzj.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();let i;function m(e){return`
        <li class="gallery-item">
            <a href="${e.largeImageURL}" class="gallery-link">
                <img src="${e.webformatURL}" alt="${e.tags}" class="gallery-image" loading="lazy" />
            </a>
            <ul class="gallery-info">
                <li class="gallery-info-item"><p>Likes</p><span>${e.likes}</span></li>
                <li class="gallery-info-item"><p>Views</p><span>${e.views}</span></li>
                <li class="gallery-info-item"><p>Comments</p><span>${e.comments}</span></li>
                <li class="gallery-info-item"><p>Downloads</p><span>${e.downloads}</span></li>
            </ul>
        </li>
    `}function d(e){return e.map(m).join("")}function g(){return i||(i=new u(".gallery-link",{captionsData:"alt",captionDelay:250})),i}function p(e){const o=document.querySelector(".gallery");if(!o)return;o.innerHTML=d(e),g().refresh()}function y(){const e=document.querySelector(".gallery");e&&(e.innerHTML=""),i&&i.refresh()}function h(){const e=document.querySelector(".loader");e&&e.classList.remove("is-hidden")}function L(){const e=document.querySelector(".loader");e&&e.classList.add("is-hidden")}const b=f.create({baseURL:"https://pixabay.com/api/"}),w=e=>b.get("",{params:{key:"55965686-0954e8ecbc9e6337c09710879",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(o=>o.data),c=document.querySelector(".form");document.querySelector(".loader");c.addEventListener("submit",e=>{var a;e.preventDefault();const n=(a=new FormData(c).get("search-text"))==null?void 0:a.trim();if(!n){l.warning({title:"Warning",message:"Please enter a search term!"});return}y(),h(),w(n).then(r=>{if(r.hits.length===0){l.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}p(r.hits)}).catch(r=>{console.error(r),l.error({title:"Error",message:"Something went wrong while loading images."})}).finally(()=>{L()})});
//# sourceMappingURL=index.js.map
