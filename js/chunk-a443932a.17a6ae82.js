(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a443932a"],{"00c7":function(e,a,t){"use strict";var c=t("7a23"),s=function(e){return Object(c["pushScopeId"])("data-v-09c3f980"),e=e(),Object(c["popScopeId"])(),e},o={class:"subscribe"},i={class:"container"},n={class:"row p-3"},b={class:"col-md-6 col-lg-4"},d={class:"py-5"},r=s((function(){return Object(c["createElementVNode"])("label",{for:"email",class:"h2 mb-3 text-white"},"訂閱優惠訊息",-1)})),l=s((function(){return Object(c["createElementVNode"])("p",{class:"fs-6 mb-3 text-white"},"立刻訂閱，取得折扣優惠碼",-1)})),m={class:"input-group mb-3"},u=["disabled"],v=Object(c["createTextVNode"])(" 訂閱 "),p={key:0,class:"spinner-border spinner-border-sm text-light",role:"status"},f=s((function(){return Object(c["createElementVNode"])("span",{class:"visually-hidden"},"Loading...",-1)})),h=[f];function g(e,a,t,s,f,g){var j=Object(c["resolveComponent"])("Field"),O=Object(c["resolveComponent"])("ErrorMessage"),w=Object(c["resolveComponent"])("Form");return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",o,[Object(c["createElementVNode"])("div",i,[Object(c["createElementVNode"])("div",n,[Object(c["createElementVNode"])("div",b,[Object(c["createElementVNode"])("div",d,[Object(c["createVNode"])(w,{ref:"form",class:"",onSubmit:g.subscribe},{default:Object(c["withCtx"])((function(e){var t=e.errors;return[r,l,Object(c["createElementVNode"])("div",m,[Object(c["createVNode"])(j,{id:"email",name:"email",type:"email",class:Object(c["normalizeClass"])(["form-control",{"is-invalid":t["email"]}]),placeholder:"馬上輸入信箱取得優惠",modelValue:f.form.email,"onUpdate:modelValue":a[0]||(a[0]=function(e){return f.form.email=e}),rules:"email|required"},null,8,["class","modelValue"]),Object(c["createElementVNode"])("button",{class:"btn btn-primary",type:"submit",disabled:f.isLoading},[v,f.isLoading?(Object(c["openBlock"])(),Object(c["createElementBlock"])("div",p,h)):Object(c["createCommentVNode"])("",!0)],8,u),Object(c["createVNode"])(O,{name:"email",class:"invalid-feedback fs-5"})])]})),_:1},8,["onSubmit"])])])])])])}var j=t("6be2"),O={data:function(){return{form:{email:""},couponCode:"YAMADA_59186",isLoading:!1}},methods:{subscribe:function(){this.isLoading=!0,setTimeout(this.subscribeCallback,1e3)},subscribeCallback:function(){var e=this;this.isLoading=!1,this.$swal({position:"center",icon:"success",title:"已獲得優惠券",html:"優惠碼：".concat(this.couponCode),confirmButtonText:"複製並前往購物",confirmButtonColor:"#77352B",showCancelButton:!0,cancelButtonText:"取消",cancelButtonColor:"#E0AB92",reverseButtons:!0,showClass:{popup:"animate__animated animate__fadeInDown"},hideClass:{popup:"animate__animated animate__fadeOutUp"}}).then((function(a){a.isConfirmed&&(e.email="",e.copyCoupon(),j["a"].emit("push-message",{style:"success",title:"已複製優惠碼"}),e.$router.push("/products"))}))},copyCoupon:function(){navigator.clipboard.writeText(this.couponCode)}}},w=(t("3bb0"),t("6b0d")),_=t.n(w);const V=_()(O,[["render",g],["__scopeId","data-v-09c3f980"]]);a["a"]=V},"1adb":function(e,a,t){"use strict";t.r(a);var c=t("7a23"),s=t("cb71"),o=t.n(s),i=t("be46"),n=t.n(i),b=t("7ed0"),d=t.n(b),r=Object(c["createStaticVNode"])('<div class="banner position-relative mb-4" data-v-57ebba4c><div class="container position-absolute top-50 start-50 translate-middle text-center" data-v-57ebba4c><h1 class="text-white" data-v-57ebba4c>關於我們</h1><h2 class="h4 text-white" data-v-57ebba4c>やまだ日本料理帶您品嚐壽司的美味</h2></div></div><section class="container mb-4" data-v-57ebba4c><div class="row align-items-center gy-3 gy-md-0" data-v-57ebba4c><div class="col-md-7" data-v-57ebba4c><div class="img__wrap" data-v-57ebba4c><img src="'+o.a+'" class="img__1" alt="經營理念" data-v-57ebba4c></div></div><div class="col-md-5" data-v-57ebba4c><h2 class="h2 mb-3 border-bottom" data-v-57ebba4c>經營理念</h2><p class="text-muted m-0" data-v-57ebba4c> やまだ日本料理致力帶給人們了解、品嘗最道地的日本料理，不僅是在食材的挑選嚴謹，每位師傅對料理的執著與熱誠是我們最自豪、驕傲的。 我們希望抱著期待的心情而前來的顧客們，可以帶著滿意愉悅的心情回去。 </p></div></div></section><section class="bg-secondary py-4 mb-4" data-v-57ebba4c><div class="container" data-v-57ebba4c><div class="row align-items-center flex-md-row-reverse gy-3 gy-md-0" data-v-57ebba4c><div class="col-md-7" data-v-57ebba4c><div class="img__wrap" data-v-57ebba4c><img src="'+n.a+'" alt="草創時期" data-v-57ebba4c></div></div><div class="col-md-5" data-v-57ebba4c><h2 class="h2 mb-3 border-bottom border-primary" data-v-57ebba4c>草創時期</h2><p class="m-0" data-v-57ebba4c> やまだ日本料理創辦於1992年，起初以賣天婦羅、炸串為主，店面坐落於大阪通天閣的熱鬧商圈，僅僅8坪大的空間， 員工僅有 2 人，及店長與副店長，相依為命、患難與共。由於當時日本經濟泡沫化的影響，經營並非順遂。 但是我們相信「民以食為天」，吃飽是最重要的；而做料理最重要的就是－「心」，只要用心一定能有所成長。 </p></div></div></div></section><section class="container mb-5" data-v-57ebba4c><div class="row align-items-center gy-3 gy-md-0" data-v-57ebba4c><div class="col-md-7" data-v-57ebba4c><div class="img__wrap" data-v-57ebba4c><img src="'+d.a+'" alt="創辦人" data-v-57ebba4c></div></div><div class="col-md-5" data-v-57ebba4c><h2 class="h2 mb-3 border-bottom" data-v-57ebba4c>創辦人</h2><p class="text-muted m-0" data-v-57ebba4c> 創辦人やまだ先生，本身是台灣人，餐飲背景出生。因為非常憧憬日本的道地文化、美食，年僅 22 歲便決心前往日本拜師學藝，在歷練的過程中切身體悟到日本人的職人精神，細心、嚴謹，就算一件看似簡單的事情，也會盡力做到最好。 讓やまだ先生敬佩不已。在經營事業有成後，決定回台灣發展，將最道地的日本料理帶給大家。 </p></div></div></section>',4);function l(e,a,t,s,o,i){var n=Object(c["resolveComponent"])("SubscribeView");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[r,Object(c["createVNode"])(n)],64)}var m=t("00c7"),u={components:{SubscribeView:m["a"]}},v=(t("cb5b"),t("6b0d")),p=t.n(v);const f=p()(u,[["render",l],["__scopeId","data-v-57ebba4c"]]);a["default"]=f},"36d6":function(e,a,t){},"3bb0":function(e,a,t){"use strict";t("e028")},"7ed0":function(e,a,t){e.exports=t.p+"img/about-2.5ea40a94.jpg"},be46:function(e,a,t){e.exports=t.p+"img/about-5.82a59546.jpg"},cb5b:function(e,a,t){"use strict";t("36d6")},cb71:function(e,a,t){e.exports=t.p+"img/about-1.25cdab94.jpg"},e028:function(e,a,t){}}]);
//# sourceMappingURL=chunk-a443932a.17a6ae82.js.map