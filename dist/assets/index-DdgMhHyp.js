(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(n){if(n.ep)return;n.ep=!0;const l=s(n);fetch(n.href,l)}})();let A={datetime(e,t,s){var a=s.columns.filter((n,l)=>n.formatDateTime==!0);a.forEach((n,l)=>{var i=n.offset,d=0;d=s.columns.findIndex((w,f)=>w.data==n.data);try{var o=t[n.data];o=Date.parse(o);var u=new Date(o);u.setTime(u.getTime()+(8+i)*60*60*1e3);var h=u.toGMTString().split(",")[1].split(" ").splice(0,4).join(" "),g=u.toLocaleTimeString();$("td:eq("+d+")",e).html('<span class="text-muted fw-bold">'+h+`</span>

          <small class="fw-bold text-primary">
              `+g+`          
          </small>
             `)}catch(w){console.log(w)}})},custom(e,t,s){var a=s.columns.filter((n,l)=>n.customized==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((d,o)=>d.data==n.data&&d.xdata==n.xdata);try{$("td:eq("+i+")",e).html(n.xdata.formatFn(t,parseInt(e.getAttribute("aria-index"))))}catch(d){console.log(d)}})},img(e,t,s){var a=s.columns.filter((n,l)=>n.showImg==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((o,u)=>o.data==n.data);try{var d;d=`

        <div style="

background-size: contain !important; background-image: url('`+t[n.data]+`') !important; 
        height: 80px;width: 80px;
background-position: center;
background-repeat: no-repeat;
" class="text-center 
        bg-white d-flex align-items-center justify-content-center text-white">
        </div>`,$("td:eq("+i+")",e).html(d)}catch{}})},progress(e,t,s){var a=s.columns.filter((n,l)=>n.showProgress==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((w,f)=>w.data==n.data);try{var d=t[n.data],o=n.progress,u=[],h=1/o.length*100,g=o.findIndex((w,f)=>w==d);o.forEach((w,f)=>{if(g>=f)var v='<div class="progress-bar bg-warning " role="progressbar" style="width: '+h+`%;" ></div>
              `;else var v='<div class="progress-bar " role="progressbar" style="width: '+h+`%;" ></div>
              `;u.push(v)}),p=`
          <small>`+d+`</small>
          <div class="progress gap-1">
          `+u.join("")+`
          </div>
        `,$("td:eq("+i+")",e).html(p)}catch{}})},subtitle(e,t,s){var a=s.columns.filter((n,l)=>n.showSubtitle==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((h,g)=>h.data==n.data);var d=0;d=s.columns.findIndex((h,g)=>h.data==n.subtitle);try{var o=t[n.data],u=t[n.subtitle];s.columns[i].showChild&&(o=t[n.xdata.child][n.xdata.data]),s.columns[i].formatFloat&&(o=currencyFormat(o)),s.columns[d].formatFloat&&(u=currencyFormat(u)),s.columns[d].showBoolean&&(t[n.subtitle]==!0?u='<i class="text-success fa fa-check"></i>':u='<i class="text-danger fa fa-times"></i>'),$("td:eq("+i+")",e).html('<span class="pe-2">'+o+`</span>
          <small class="text-muted text-truncate" style="max-width: 24vw;display: block;">`+u+"</small>")}catch{}})},bool(e,t,s){var a=s.columns.filter((n,l)=>n.showBoolean==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((o,u)=>o.data==n.data);try{var d;t[n.data]==!0?d='<i class="text-success fa fa-check"></i>':d='<i class="text-danger fa fa-times"></i>',$("td:eq("+i+")",e).html(d)}catch{}})},json(e,t,s){var a=s.columns.filter((n,l)=>n.showJson==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((d,o)=>d.data==n.data);try{$("td:eq("+i+")",e).html(`<div aria-data='' class="jsv`+s.makeid.id+'" id="'+n.data+t.id+'"></div>')}catch{}})},child(e,t,s){var a=s.columns.filter((n,l)=>n.showChild==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((o,u)=>o.data==n.data&&o.xdata==n.xdata);try{if($("td:eq("+i+")",e).html(t[n.xdata.child][n.xdata.data]),n.xdata.showImg)try{if(console.log("attemp to show img..."),t[n.xdata.child][0]!=null){var d;d=`
              <div style="background-size: cover !important; background-image: url('`+t[n.xdata.child][0][n.xdata.data]+`') !important; 
              height: 80px;width: 80px" class="rounded-circle text-center 
              bg-primary d-flex align-items-center justify-content-center text-white">
              </div>`,$("td:eq("+i+")",e).html(d)}}catch{}n.xdata.formatFloat&&$("td:eq("+i+")",e).html(currencyFormatdtdata[n.xdata.child][n.xdata.data])}catch{}})},float(e,t,s){var a=s.columns.filter((n,l)=>n.formatFloat==!0);a.forEach((n,l)=>{var i=0;i=s.columns.findIndex((d,o)=>d.data==n.data);try{$("td:eq("+i+")",e).html(currencyFormat(t[n.data]))}catch{}})},dataFormatter(e,t){var s=null,a=["formatFloat","showBoolean","formatDateTime","showImg","showChild"],n=-1,l=Object.keys(t);switch(a.forEach((g,w)=>{l.indexOf(g)>0&&(n=w)}),console.log(a[n]),a[n]){case"formatFloat":s=this.currencyFormat(e[t.data]);break;case"showImg":try{console.log("simmg"),s=`
        <div style="background-size: cover !important; background-image: url('`+e[t.data]+`') !important; 
        height: 80px;width: 80px" class="rounded-circle text-center 
        bg-primary d-flex align-items-center justify-content-center text-white">
        </div>`}catch(g){console.log(g)}break;case"showChild":try{if(s=e[t.xdata.child][t.xdata.data],t.xdata.showImg)try{console.log("attemp to show img..."),e[t.xdata.child][0]!=null&&(s=`
                <div style="background-size: cover !important; background-image: url('`+e[t.xdata.child][0][t.xdata.data]+`') !important; 
                height: 80px;width: 80px" class="rounded-circle text-center 
                bg-primary d-flex align-items-center justify-content-center text-white">
                </div>`)}catch{}t.xdata.formatFloat&&(s=currencyFormat(e[t.xdata.child][t.xdata.data]))}catch{}break;case"showBoolean":try{var i;e[t.data]==!0?i='<i class="text-success fa fa-check"></i>':i='<i class="text-danger fa fa-times"></i>',s=i}catch{}break;case"formatDateTime":var d=e[t.data];d=Date.parse(d);var o=new Date(d);o.setTime(o.getTime()+8*60*60*1e3);var u=o.toGMTString().split(",")[1].split(" ").splice(0,4).join(" "),h=o.toLocaleTimeString();s='<span class="text-muted fw-bold">'+u+`</span>

              <small class="fw-bold text-primary">
                  `+h+`          
              </small>
                 `;break;default:s=e[t.data]}return s==null&&(s=e[t.data]),s},formatDate(){$(" .format-int, .format-integer").each((e,t)=>{var s="";$(t).html().split(" ").includes("DR")&&(s="DR"),$(t).html().split(" ").includes("CR")&&(s="CR");var a=$(t).html();if(parseFloat(a)>0){var n='<span class="text-end" >'+s+this.currencyFormat(parseFloat(a)).replace(".00","")+"</span>";$(t).html(n)}else parseFloat(a)==0?$(t).html("0.00"):$(t).html(a)}),$(".format_float, .format-float").each((e,t)=>{var s="";$(t).html().split(" ").includes("DR")&&(s="DR"),$(t).html().split(" ").includes("CR")&&(s="CR"),$(t).html().includes("-")&&(s="-");var a=$(t).html().replace("-","");if(parseFloat(a)>0){var n='<span class="text-end" >'+s+this.currencyFormat(parseFloat(a))+" </span>";$(t).html(n)}else parseFloat(a)==0?$(t).html("0.00"):$(t).html(a)}),$(".format_date").each((e,t)=>{var s=$(t).html();if(Date.parse(s)>0){var a=new Date(s),n;a.getDate().toString().length>1?n=a.getDate():n="0"+a.getDate();var l;(a.getMonth()+1).toString().length>1?l=a.getMonth()+1:l="0"+(a.getMonth()+1),$(t).html("<b>"+n+"-"+l+"-"+a.getFullYear()+"</b>")}else $(t).html(s)}),$(".format_datetime").each((e,t)=>{var s;$(t).attr("aria-offset")!=null&&parseInt($(t).attr("aria-offset"));var a=$(t).html();a=Date.parse($(t).html().replace(" ",""));var n=new Date(a);n.setTime(n.getTime()+8*60*60*1e3);try{s=n.toGMTString().split(",")[1].split(" ").splice(1,3).join(" ")}catch(i){console.log(i)}var l=n.toLocaleTimeString();$(t).html(""+s+" "+l)}),$(".is_posted").each((e,t)=>{var s=$(t).html();s=="true"&&$(t).html(`
                <i class="text-success fa fa-check"></i>
                `),s=="false"&&$(t).html(`
                <i class="text-danger fa fa-exclamation-circle"></i>
                `)})},currencyFormat(e){return e==null?"0.00":e.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")},capitalize(e){return e.replace(/^\w/,t=>t.toUpperCase())}},_={user:{},ranks:[],restoreUser(){this.ranks=r.api("get_ranks",{}),this.user=JSON.parse(localStorage.getItem("user")),this.user!=null&&($("[aria-label='login']").addClass("d-none"),$("[aria-label='logout']").removeClass("d-none")),$("form#register")&&this.user!=null&&($("input[name='user[sales_person_id]']").val(this.user.id),$("input[name='user[username]']").val(""))},override(e){r.form($(e).closest("form"),"override",t=>{_.user=t,_.save(t),$("[aria-label='login']").addClass("d-none"),$("[aria-label='logout']").removeClass("d-none"),window.location="/home"})},extendUser(){r.api("extend_user",{token:this.user.token},null,e=>{console.log(e),e.status=="ok"&&(_.user=e.res,_.save(e.res))})},save(e){localStorage.setItem("user",JSON.stringify(e))},merchantCheckout(e){$(e).closest("form"),r.chosen_country_id_!=null&&$("input[name='user[country_id]']").val(r.chosen_country_id_.id),r.validateForm("form",()=>{console.info("validating form..."),r.form($(e).closest("form"),"merchant_checkout",t=>{console.info("after redeem form..."),console.log(t),t!=null?(console.log("e user"),console.log(t.user),m.emptyCart_(!0),r.navigateTo(t.payment_url)):(m.emptyCart_(!0),r.navigateTo("/profile"))})})},redeem(e){$(e).closest("form"),r.chosen_country_id_!=null&&$("input[name='user[country_id]']").val(r.chosen_country_id_.id),r.validateForm("form",()=>{console.info("validating form..."),r.form($(e).closest("form"),"redeem",t=>{console.info("after redeem form..."),console.log(t),t!=null?(console.log("e user"),console.log(t.user),m.emptyCart_(),r.navigateTo(t.payment_url)):(m.emptyCart_(),r.navigateTo("/profile"))})})},upgrade(e){$(e).closest("form"),$("form#register")&&(this.user!=null&&$("input[name='user[sales_person_id]']").val(this.user.id),r.chosen_country_id_!=null&&$("input[name='user[country_id]']").val(r.chosen_country_id_.id)),r.validateForm("form",()=>{console.info("validating form..."),r.form($(e).closest("form"),"upgrade",t=>{console.info("after upgrade form..."),console.log(t),t!=null?t.billplz_code!=null?(m.emptyCart_(),window.location=t.payment_url):($("input[name='user[instalment]']").val()==null&&r.notify("Please relogin to update rank."),m.emptyCart_(),m.components.userProfile(),r.navigateTo(t.payment_url)):(m.emptyCart_(),r.navigateTo("/profile"))})})},linkRegister(e){$("form#register")&&(this.user!=null&&$("input[name='user[sales_person_id]']").val(this.user.id),$("input[name='user[share_code]']").val(pageParams.share_code),r.chosen_country_id_!=null&&(console.log(r.chosen_country_id_),$("input[name='user[country_id]']").val(r.chosen_country_id_.id))),r.validateForm("form",()=>{console.log("validating form..."),r.form($(e).closest("form"),"link_register",t=>{console.log("after register form..."),console.log(t),t!=null?(m.emptyCart_(),_.user=t,_.save(t),$("[aria-label='login']").addClass("d-none"),$("[aria-label='logout']").removeClass("d-none"),r.navigateTo("/home")):(m.emptyCart_(),r.navigateTo("/login"))})})},register(e){$("form#register")&&(this.user!=null&&$("input[name='user[sales_person_id]']").val(this.user.id),r.chosen_country_id_!=null&&(console.log(r.chosen_country_id_),$("input[name='user[country_id]']").val(r.chosen_country_id_.id))),r.validateForm("form",()=>{console.log("validating form..."),r.form($(e).closest("form"),"register",t=>{console.log("after register form..."),console.log(t),t!=null?(m.emptyCart_(),window.stockistTarget=null,t.billplz_code!=null?window.location=t.payment_url:r.navigateTo(t.payment_url)):(m.emptyCart_(),r.navigateTo("/register"))})})},logout(){console.log("logging out..."),localStorage.removeItem("user"),$("[aria-label='login']").removeClass("d-none"),$("[aria-label='logout']").addClass("d-none"),r.notify("Log out!"),document.cookie="_commerce_front_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",setTimeout(()=>{location="/login"},1e3)},updateUser(e){_.user=e,_.save(e)},login(e){$(e).closest("form"),r.form($(e).closest("form"),"login",t=>{_.user=t,_.save(t),$("[aria-label='login']").addClass("d-none"),$("[aria-label='logout']").removeClass("d-none"),r.navigateTo("/home")})}};window.memberApp=_;class O{constructor(t){var s={moduleName:"User",link:"users",tableSelector:"#users",data:{},allData:[],buttons:[],tableButtons:[],table:null,columns:[],customCols:null,aliasName:null,onDrawFn:null,makeid:{},xcard:null},a=Object.keys(s);a.forEach((i,d)=>{this[i]=s[i]}),a.forEach((i,d)=>{t[i]!=null&&(this[i]=t[i])}),this.data;var n=this;function l(i){$(i.tableSelector).closest(".dataTables_wrapper").find(".grid_view .xc").each((d,o)=>{var u=o.data;if(console.log("xcard.."),i.xcard!=null){var h=i.xcard(u);$(o).prepend(h)}else{var g=[];i.columns.forEach((f,v)=>{var x=`
              <div class="d-flex flex-column pb-2" role="grid_data" aria-label="`+f.label+`">
                <label class="fw-light font-sm text-secondary">`+f.label+`</label>
                <div>`+this.dataFormatter(u,f)+`</div>
              </div>`;g.push(x)});var w=document.createElement("div");w.className=" card p-2",w.innerHTML=g.join(""),$(o).prepend(w)}})}this.load=function(i,d){i!=null?(this.tableSelector="#"+i,this.makeid={id:i,dom:d},r.Page.createTable(i,d)):r.Page.createTable(this.makeid.id,this.makeid.dom),r.populateTable(this),this.table.on("draw",()=>{var o=`
          <li>
            <a class="dropdown-item" href="javascript:void(0);" onclick="toggleView('`+this.tableSelector+`')">
              <i class="me-3 fa fa-th-large"></i>Grid View
            </a>
          </li>
        `,u=`
          <div class="d-flex align-items-center">
            <div class="btn btn-sm btn-outline-primary me-3" href="javascript:void(0);" data-href="" data-module="add_new" data-ref="">
              <i class="me-3 fa fa-plus"></i>New
            </div>
            <div class="dropdown morphing scale-left ">
              <a href="#" class="more-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-ellipsis-h"></i>
              </a>
              <ul class="dropdown-menu dropdown-animation dropdown-menu-end shadow border-0">
                ${o}
              </ul>
            </div>
          </div>
        `;$(this.tableSelector+"_wrapper .dataTables_filter").before(u),r.populateGridView(n),l(n)})},this.dataFormatter=function(i,d){const o=i[d.data];if(!o)return"-";switch(d.type){case"date":return new Date(o).toLocaleDateString();case"datetime":return new Date(o).toLocaleString();case"currency":return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(o);case"boolean":return o?"Yes":"No";case"image":return`<img src="${o}" alt="" style="max-width: 50px; max-height: 50px;">`;default:return o}},this.refresh=function(){this.table&&this.table.ajax.reload()},this.addRow=function(i){this.allData.push(i),this.table&&this.table.row.add(i).draw()},this.updateRow=function(i,d){this.allData[i]=d,this.table&&this.table.row(i).data(d).draw()},this.deleteRow=function(i){this.allData.splice(i,1),this.table&&this.table.row(i).remove().draw()}}}let m={cart_:[],mcart_:[],region:"MY",selectedInstalment:null,emptyCart_(e){const t=e?"mcart":"cart",s=e?"first_mcart_country_id":"first_cart_country_id";e?this.mcart_=[]:this.cart_=[],localStorage.setItem(t,JSON.stringify([])),localStorage.removeItem(s),m[s]=null},restoreCart(e){const t=e?"mcart":"cart",s=e?"first_mcart_country_id":"first_cart_country_id",a=localStorage.getItem(t);a!=null&&(e?(this.mcart_=JSON.parse(a),m.first_mcart_country_id=localStorage.getItem(s)):(this.cart_=JSON.parse(a),m.first_cart_country_id=localStorage.getItem(s)))},filterItemsByName(e){var s=this.cart_.filter((a,n)=>a.name.includes(e));return console.log(s),s},hasCartItems(e){return(e?this.mcart_:this.cart_).length},addItem_(e,t){console.info(e);const s=t?this.mcart_:this.cart_,a=s.findIndex(l=>l.id===e.id);e.is_instalment&&(e.payInstalment||(instalment_name=e.name,product_instalment_id=e.id,e=e.first_payment_product,e.selectedInstalmentId=product_instalment_id,e.selectedInstalment={id:product_instalment_id,name:instalment_name})),a>=0?s[a].qty+=1:(e.qty=1,s.unshift(e));const n=t?"mcart":"cart";localStorage.setItem(n,JSON.stringify(s))},addItemById_(e,t){const s=t?"mcart":"cart",a=t?this.mcart_:this.cart_,n=a.findIndex(i=>i.id==parseInt(e));if(n>=0){var l=a[n];r.notify("item "+l.name+" added !",{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),l.qty+=1}localStorage.setItem(s,JSON.stringify(a))},minusItem_(e,t){const s=t?"mcart":"cart",a=t?this.mcart_:this.cart_,n=a.findIndex(i=>i.id==parseInt(e));if(n>=0){var l=a[n];r.notify("item "+l.name+" deducted !",{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),l.qty-=1,l.qty==0&&this.removeItem_(e,t)}localStorage.setItem(s,JSON.stringify(a))},removeItem_(e,t){const s=t?"mcart":"cart",a=t?this.mcart_:this.cart_,n=a.findIndex(i=>i.id==parseInt(e));var l=a[n];r.notify("item "+l.name+" removed !",{delay:2e3,type:"warning",placement:{from:"top",align:"center"}}),a.splice(n,1),localStorage.setItem(s,JSON.stringify(a)),m.cart_.length==0&&(m.first_cart_country_id=null)},toastChanges(){$("input[name='user[share_code]']").length>0||r.toast({content:'<div class=""><ul class="">'+$(".ac").html()+"</ul></div>"})},total_(e){e?this.mcart_:this.cart_;var t=this.cart.map((s,a)=>s.price).reduce((s,a)=>s+a);return t},render(){var e=["merchantProducts","merchantproduct","merchantProfile","merchant","recruit","topup","country","light","primaryBuy","secondaryBuy","assetTranches","userProfile","wallet","crypto_wallet","crypto_wallet_balance","announcement","products","product","bonusLimit","rewardList","rewardSummary","mcart","cart","cartItems","salesItems","upgradeTarget","upgradeTargetMerchant","sponsorTarget","stockistTarget","choosePayment"];e.forEach((t,s)=>{if($(t).length>0)try{this.components[t]()}catch(a){console.error(a)}})},components:{crypto_wallet_balance(){$("crypto_wallet_balance").each((e,t)=>{$(t).customHtml(`
                <div class="card">
                  <div class="card-body d-flex flex-column gap-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <h5 class="card-title m-0">Crypto Wallet</h5>
                      <button class="btn btn-sm btn-outline-primary" id="refresh-cw">Refresh</button>
                    </div>
                    <div id="cw-address" class="text-truncate text-secondary">Loading...</div>
                    <div class="d-flex align-items-end gap-2">
                      <div class="display-6" id="cw-balance">-</div>
                      <small class="text-muted" id="cw-symbol">tokens</small>
                    </div>
                  </div>
                </div>
              `);function s(){var a=r.api("crypto_wallet_balance",{token:r.user&&r.user.token});if(a&&a.status=="error"){$("#cw-address").html(a.reason||"Error"),$("#cw-balance").html("-");return}a&&($("#cw-address").html(a.address),$("#cw-balance").html(a.formatted),$("#cw-symbol").html("tokens"))}s(),$(document).off("click","#refresh-cw").on("click","#refresh-cw",function(){s()})})},merchantproduct(){$("merchantproduct").customHtml(`
        <div class="text-center mt-4">
          <div class="spinner-border loading2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          
      <div class="loading2 d-none" id="mpcontent" />
      `),r.api("get_mproduct",{id:pageParams.id},null,e=>{$("title").html(e.name);function t(){var a=m.mcart_.filter((n,l)=>n.merchant_id==e.merchant_id);a.length>0?(m.addItem_(e,!0),m.components.updateMCart(),r.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):m.mcart_.length==0?(m.addItem_(e,!0),m.components.updateMCart(),r.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):alert("cant add due to different merchants, empty it first.")}$(".spinner-border.loading2").parent().remove(),$(".loading2").removeClass("d-none");var s;if(e.img_url!=null)try{s=e.img_url}catch{s="/images/placeholder.png"}$("#mpcontent").customHtml(`

      <div class="d-flex flex-column justify-content-center align-items-center ">
        <h2 id="ptitle">
        </h2>
            <div  class="d-flex justify-content-center p-4 " 
                style="
                  position: relative; 
                  width: 320px;
                  height: 340px;">
            <div class="rounded py-2" style="
                  height: 340px;
                  width: 88%;
                  filter: blur(4px);
                  position: absolute;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: cover;
                  background-image: url('`+s+`');
                  top: 30px;
                  left: 20px;
                  ">
            </div>
            <div class="rounded py-2" style="
                  height: 340px;
                  width:  100%;
                  z-index: 1;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover; 
                  background-image: url('`+s+`');
                  ">
            </div>
          </div>
        <div style="margin-top: 50px;">`+e.description+`</div>
        <div class="font-sm fw-light text-secondary text-center "><span class="format-float">`+e.retail_price+` </span> RP</div>
        <div class="btn btn-outline-primary mt-4" mproduct-id="`+e.id+`">Add</div>
      </div>

      `),$("#ptitle").html(e.name),$("[mproduct-id='"+e.id+"']")[0].onclick=t})},merchantProducts(){let e;function t(){return phxApp.user==null?"b.is_approved=true|b.country_id="+r.chosen_country_id_.id:"b.is_approved=true|b.country_id="+phxApp.user.country_id}function s(i,d,o,u,h){var g=`
                    <div  class="position-relative m-2 d-flex flex-column gap-2" `+i+`>
                      <div  class="d-flex justify-content-center mb-4 py-4 background-p" 
                            style="
                              cursor: pointer;   
                              position: relative; "
                             >
                        <div class="rounded py-2 background-p" style="
                          
                              width: 80%;
                              filter: blur(4px);
                              position: absolute;
                              background-repeat: no-repeat;
                              background-position: center;
                              background-size: cover;
                              background-image: url('`+d+`');
                              
                              ">
                        </div>
                        <div class="rounded py-2 foreground-p" style="
                             
                              width:  100%;
                              z-index: 1;
                              background-position: center;
                              background-repeat: no-repeat;
                              background-size: cover; 
                              background-image: url('`+d+`');
                              ">
                        </div>
                      </div>
                      <div class="d-flex position-absolute" style="left: 10px; top: 12px;z-index: 10;">
                        <div class="bg-primary badge">`+o.name+`</div>
                      </div>
                      <div class="d-flex flex-column justify-content-center gap-2 mt-4">
                        <div class="font-sm fw-bold text-center">`+u.name+`</div>
                         <div class="d-flex flex-column justify-content-center ">
                            <div class="font-sm fw-light text-secondary text-center "><span class="format-float">`+u.retail_price+`</span> RP</div>
                         </div>
                         `+h+`
                      </div>
                    </div>
                    `;return g}function a(i){var d="v2";return i=="Thailand"&&(d="th"),i=="Vietnam"&&(d="vn"),i=="China"&&(d="cn"),d}var n=[];if(r.countries_.forEach((i,d)=>{n.push(`
                <button type="button" aria-name="`+i.name+'" aria-country="'+i.id+'" class="btn btn-primary ">'+i.name+" "+(i.alias||"")+`</button>
              `)}),r.chosen_country_id_==null&&pageParams.share_code==null&&(r.modal({selector:"#mySubModal",content:`
                    <center>
                      <div class="btn-group-vertical">
                      `+n.join("")+`
                      </div>
                    </center>
                  `,header:"Choose region",autoClose:!1}),$("[aria-country]").unbind(),$("[aria-country]").click(function(){var i=$(this).attr("aria-country"),d=$(this).attr("aria-name");r.chosen_country_id_=i,r.notify("Chosen region: "+d),localStorage.setItem("region",d),setTimeout(()=>{$("#chosen-region").html(d)},1e3),localStorage.region!=null&&(langPrefix=a(d)),translationRes=r.api("translation",{lang:langPrefix}),$("#mySubModal").modal("hide"),m.components.country(),r.navigateTo("/home")})),pageParams.share_code!=null&&r.api("get_share_link_by_code",{code:pageParams.share_code},null,i=>{e=r.countries_.filter((o,u)=>o.id==i.user.country_id)[0],console.info(e),r.chosen_country_id_=i.user.country_id,i.user.country_id;var d=e.name;r.notify("Chosen region: "+e.name),localStorage.setItem("region",e.name),setTimeout(()=>{$("#chosen-region").html(d)},1e3),localStorage.region!=null&&(langPrefix=a(d)),translationRes=r.api("translation",{lang:langPrefix}),m.components.country(),$(".sponsor-name").customHtml("_sponsor: "+i.user.username+" _position: "+i.position),$(".sponsor-bank").html(`

                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Bank Details</span>
                              <span class=" my-4 me-4 d-flex justify-content-end align-items-end gap-1 flex-column">
                                <div>`+i.user.bank_name+`</div>
                                <div>`+i.user.bank_account_holder+`</div>
                                <div>`+i.user.bank_account_no+`</div>
                              </span>
                            </div>

                              `)}),r.chosen_country_id_!=null){let i=function(d){var o=$(d).attr("mproduct-id");r.api("get_mproduct",{id:o},()=>{},u=>{var h=m.mcart_.filter((g,w)=>g.merchant_id==u.merchant_id);if(h.length>0)try{m.addItem_(u,!0),m.components.updateMCart(),m.components.cartItems(),r.notify("Added "+u.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})}catch(g){console.error(g)}else m.mcart_.length==0?(m.addItem_(u,!0),m.components.updateMCart(),m.components.cartItems(),r.notify("Added "+u.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):alert("cant add due to different merchants, empty it first.")})};var l=i;$("merchantProducts").each((d,o)=>{$(o).customHtml(`
                  <div class="text-center mt-4">
                    <div class="spinner-border loading" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                    

                  <div class="row gx-0 d-none loading">
                    <div class="col-12 col-lg-10 offset-lg-1">
                      <div id="mproduct_tab1"></div>
                    </div>
                  </div>
                `).then(()=>{var u=null,h="mproducts",g=new O({onDrawFn:()=>{$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none"),setTimeout(()=>{$("[mproduct-id]").each((w,f)=>{f.onclick=()=>{i(f)}}),A.formatDate()},1200)},xcard:w=>{var f=w,v="",x="/images/placeholder.png",k=`onclick="phxApp.navigateTo('/merchant_products/`+f.id+"/"+f.name+`')"`;if($(o).attr("direct")!=null&&(k="",v='<div class="btn btn-outline-primary mt-4" mproduct-id="'+f.id+'">Add</div>'),f.img_url!=null)try{x=f.img_url}catch{x="/images/placeholder.png"}var P=f.merchant;return s(k,x,P,f,v)},data:{sorts:[[1,"asc"]],additional_join_statements:[{merchant:"merchant"}],additional_search_queries:[t()],preloads:["merchant"],grid_class:"col-4 col-lg-3",dom:`

                                                    <"row px-4"
                                                      <"col-lg-6 col-12"i>
                                                      <"col-12 col-lg-6">
                                                    >
                                                    <"row grid_view ">
                                                    <"list_view d-none"t>
                                                    <"row transform-75 px-4"
                                                      <"col-lg-6 col-12">
                                                      <"col-lg-6 col-12"p>
                                                    >

                                                `},columns:[{label:"id",data:"id"},{label:"Action",data:"id"}],moduleName:"MerchantProduct",link:"MerchantProduct",customCols:u,buttons:[],tableSelector:"#"+h});g.load(h,"#mproduct_tab1")})})}},merchantProfile(){$("merchantProfile").html(`
      <form class="with_mod row" module="Merchant" id="Merchant">
      </form>
      `);var e=r.user.merchant;r.user.merchant==null&&(e={id:"0",user_id:phxApp.user.id});var t=new O({columns:[{label:"Action",data:"id"}],moduleName:"MerchantCategory",link:"MerchantCategory",buttons:[],tableSelector:"#bc2c"}),s=r.populateTableData(t,100,()=>{});try{console.info(s.allData)}catch(a){console.error(a)}phxApp.createForm(e,null,[{name:"General",list:["id","user_id","name",{label:"merchant_category_id",alt_name:"Business Category",alt_class:"col-12",selection:t.allData},{alt_name:"Merchant Logo",label:"img_url",upload:!0},{label:"description",binary:!0,alt_class:"col-12"},{label:"commission_perc",alt_name:"Percentage Contribution",selection:[{id:.05,name:"5%"},{id:.1,name:"10%"},{id:.15,name:"15%"},{id:.2,name:"20%"},{id:.22,name:"25%"},{id:.3,name:"30%"},{id:.35,name:"35%"},{id:.4,name:"40%"},{id:.45,name:"45%"},{id:.5,name:"50%"}]}]},{name:"CompanyDetails",list:[{label:"company_address",alt_name:"Address",alt_class:"col-12",binary:!0},{label:"company_email",alt_name:"Email",alt_class:"col-12"},{label:"company_phone",alt_name:"Phone",alt_class:"col-12"},{label:"company_reg_no",alt_name:"Reg No",alt_class:"col-12"},{label:"company_ssm_image_url",alt_name:"SSM Image",alt_class:"col-12",upload:!0}]},{name:"BankDetails",list:[{label:"bank_name",alt_name:"Bank Name",alt_class:"col-12"},{label:"bank_account_holder",alt_name:"Bank Account Holder",alt_class:"col-12"},{label:"bank_account_no",alt_name:"Account Number",alt_class:"col-12"}]}],a=>{console.info(a),_.extendUser(),phxApp.navigateTo("/merchant_profile")})},merchant(){var e=' <div class="btn btn-primary btn-lg merchant-apply mb-4 disabled">Apply</div>';r.user.merchant!=null&&(r.user.merchant.is_approved==!1?e=' <div class="btn btn-primary btn-lg merchant-apply ">Pending Approval</div>':r.navigateTo("/merchant_profile"));function t(){console.log("agree"),$(".merchant-apply ").toggleClass("disabled")}window.agree=t,$("merchant").html(`
        <h2 class="mt-2">Merchant Application</h2> 
        <div class="px-4 m-4">
          Terms and condition
        </div>
        <center class="w-100 d-lg-none d-block">
          <iframe class="my-4" style="width:100%; height: 600px;"  src="https://docs.google.com/document/d/e/2PACX-1vShkzZ2LaszYkpcKw82giaYPqzRhB8odK54rkrJLwc6YMiUNp7HLaHYFTYN0hNPngJvJ_XR36_T8b5Z/pub?embedded=true"></iframe>
        </center>
        
        <center class="w-100 d-lg-block d-none">
          <iframe class="my-4" style="width: 60%; height: 600px;"  src="https://docs.google.com/document/d/e/2PACX-1vShkzZ2LaszYkpcKw82giaYPqzRhB8odK54rkrJLwc6YMiUNp7HLaHYFTYN0hNPngJvJ_XR36_T8b5Z/pub?embedded=true"></iframe>
        </center>
        <center>

        <div class="form-check m-4">
          <input class="form-check-input" onchange="agree()" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
          I agree to above terms and condition
          </label>
        </div>

        </center>
        <div>
         `+e+`
        </div>

      `),$(".merchant-apply").on("click",()=>{r.post("apply_merchant",{id:r.user.id},null,()=>{r.navigateTo("/merchant_profile")})})},recruit(){$("recruit").each((e,t)=>{console.log(t);var s=$(t).attr("merchant");console.log(s==""),s==""?$(t).customHtml(`

          <div class="">
              <label class="my-2">Position</label>
              <select class="form-control" name="mposition">
                <option>auto</option>
              <option>left</option>
                <option>right</option>
              </select>
              <div class="mt-4 btn btn-primary generate-mlink">Generate</div>
          </div>



          `):$(t).customHtml(`

          <div class="">
              <label class="my-2">Position</label>
              <select class="form-control" name="position">
                <option>auto</option>
                <option>left</option>
                <option>right</option>
              </select>
              <div class="mt-4 btn btn-primary generate-link">Generate</div>
          </div>



          `),$(".generate-mlink").click(()=>{r.api("get_merchant_share_link",{username:r.user.username,position:$("select[name='mposition']").val()},null,a=>{r.modal({autoClose:!1,header:"Share Link",selector:"#mySubModal",content:`

                <label class="my-2">Generated</label>
                <input class="form-control" name="link"></input>
                <div class="mt-4 btn btn-primary copy-link">Copy</div>




              `}),$("input[name='link']").val(a.link),$(".copy-link").click(()=>{try{navigator.clipboard.writeText(a.link),console.log("Content copied to clipboard"),r.notify("Copied!")}catch{r.notify("Cant copy",{type:"danger"})}})})}),$(".generate-link").click(()=>{r.api("get_share_link",{username:r.user.username,position:$("select[name='position']").val()},null,a=>{r.modal({autoClose:!1,header:"Share Link",selector:"#mySubModal",content:`

                <label class="my-2">Generated</label>
                <input class="form-control" name="link"></input>
                <div class="mt-4 btn btn-primary copy-link">Copy</div>




              `}),$("input[name='link']").val(a.link),$(".copy-link").click(()=>{try{navigator.clipboard.writeText(a.link),console.log("Content copied to clipboard"),r.notify("Copied!")}catch{r.notify("Cant copy",{type:"danger"})}})})})})},choosePayment(){var e=phxApp.api("razer_list",{}),t=Object.keys(e),s=[];t.forEach((a,n)=>{var l=[];e[a].forEach((i,d)=>{var o=`

          <div class="py-1 col-6 col-lg-4 use-channel" aria-channel-label='`+i.channel_map.direct.request+`' >
            <img class="w-100 m-2 m-lg-0" src="`+i.logo_url_120x43+`"></img>
          </div>
          `;i.currency.includes("MYR")&&i.status==1&&i.channel_map.direct.request!=""&&l.push(o)}),s.push(`

          <div class="row mt-2 pb-1 border-success border-bottom">
         
          `+l.join("")+`
          </div>


          `)}),$("choosePayment").html(`
        <div class="my-4 d-flex justify-content-between">
          <div  class="btn btn-primary" onclick="$('#myPaymentModal').modal('show')">
            Choose Payment
          </div>
          <div class="" id="chosen-payment">
          </div>
        </div>
        <div class="modal" id="myPaymentModal">
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Choose Payment</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div class="modal-body">
             

                      <section class="ps-0 p-4 razer-display">
                        <h4>Pay with</h4>
                      `+s.join("")+`
                      </section>
             
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
      `),$(".use-channel").click(function(){var a=$(this).attr("aria-channel-label");$(".use-channel").removeClass("border border-primary rounded"),$(this).addClass("border border-primary rounded"),console.info("use channel: "+a),$("input[name='user[payment][channel]']").val(a);var n=$(this).html();$("#chosen-payment").html(n),$("#myPaymentModal").modal("hide")})},crypto_wallet(){$("crypto_wallet").each((e,t)=>{var s=phxApp.api("crypto_wallet",{token:phxApp.user.token});console.log(s),$("crypto_wallet").html(`
                <div class="d-flex flex-column flex-lg-row align-items-center flex gap-2">
       
                    <h5 class="">Crypto</h5>
                    
                      <span>`+s.address+`</span>

                      <div
                     class="btn btn-primary"
                     onclick="phxApp.copyToClipboard('`+s.address+`')">
                      Copy
                     </div>
               
                </div>
              `)})},topup(){function e(l){var i,d=phxApp.rowData(l);console.log(d),d.payment!=null?d.payment.payment_method=="nowpayments"?(i="",d.is_approved==!1&&(i=`<p>You will be redirected to pay this topup.</p>
            <a target="_blank" href="`+d.payment.payment_url+`" class="btn btn-primary">Pay
            </a>`),phxApp.modal({autoClose:!1,selector:"#mySubModal",header:"NowPayments",content:`

            `+i+`
            <div class="btn btn-primary check">Recheck
            </div>

            `}),$(".check").click(()=>{phxApp.api("check_bill",{id:d.payment.billplz_code})})):phxApp.modal({selector:"#mySubModal",header:"Details",content:`

          <div class="btn btn-primary delete">Delete Request
            </div>


            `}):phxApp.modal({selector:"#mySubModal",header:"Details",content:`

            <p>`+d.remarks+`</p>

            `}),$(".delete").unbind(),$(".delete").click(()=>{phxApp.api("delete_topup_request",{id:d.id},null,o=>{$("#mySubModal").modal("hide"),o.status=="error"?o.reason!=""&&phxApp.notify("Not Deleted! Reason: "+o.reason,{type:"danger"}):(phxApp.notify("Deleted!"),phxApp.navigateTo("/topup_register_point"))})})}$("topup").customHtml(`    
                <div class="card-body ">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3>Topup Transaction</h3>
                    <div class="btn btn-primary " id="new_topup">
                        <span class="d-flex align-items-center"><i class="fa fa-plus me-1"></i>Topup</span></div>
                    </div>
                    <div class="" id="tab2"></div>
                </div>
                    `),window.selectedBank=l=>{$("input[name='WalletTopup[bank]']").val(l)};var t=[];$("#new_topup").click(()=>{phxApp.modal({selector:"#mySubModal",autoClose:!1,header:"New Register Point Topup",content:`
                        <div class="row ">
                            <form class="col-12 offset-lg-1 col-lg-10 with_mod row p-4" module="WalletTopup" 
                            id="WalletTopup">
                            

                            </form>

                        </div>
                    `}),phxApp.createForm({id:"0",user_id:phxApp.user.id,payment_method:"nowpayments"},null,["id",{label:"amount",alt_name:"Amount (USDT-POLYGON)",alt_class:"col-12"},{label:"remarks",alt_name:"Description",alt_class:"col-12"},{label:"payment-placeholder",alt_name:"Choose Payment",alt_class:"col-12",placeholder:`


              <div id="payment-placeholder">
                <section class="py-4 razer-display">
                  <h3>Choose 1 of these methods</h3>
                `+t.join("")+`
                </section>
                <section class="d-none upload-display">
                  <div class="px-4 pt-4">
                    Kindly deposit to either 1 of these account.
                  </div>
                  <div class="p-4 fs-5">
                    USDT POLYGON<br>
                    
                    <span>
                      <div>  </div>
                      <div style="width: 70vw;text-overflow: ellipsis;overflow: hidden;">0x3675cF9333f00188A99791be2fD612353bC54da8 <div class="btn btn-primary" onclick="phxApp.copyToClipboard('0x3675cF9333f00188A99791be2fD612353bC54da8');selectedBank('PBB')">Copy</div></div>
                    </span><br>
                  </div>
                </section>
                <div class="btn-group" role="group" aria-label="PaymentGroup">
                  <input type="radio" class="btn-check show-upload" name="btnradio" id="btnradio1z" autocomplete="off" >
                  <label class="btn btn-outline-primary" for="btnradio1z">Upload Bank In Slip</label>

                  <input type="radio" class="btn-check show-razer" name="btnradio" id="btnradio2z" autocomplete="off" checked="">
                  <label class="btn btn-outline-primary" for="btnradio2z">NowPayments</label>
       
                </div>

              </div>

          `},{label:"payment_method",selection:[{id:"nowpayments",name:"NowPayments"},{id:"bank in slip",name:"BANK IN SLIP"}],alt_class:"d-none"},{label:"img_url",upload:!0,alt_class:"d-none upload-display"},{label:"bank",data:"bank",hidden:!0},"user_id"],l=>{console.info(l),l.payment_method=="nowpayments"?window.open(l.payment_url,"_blank"):phxApp.navigateTo("/topup_register_point")}),$(document).on("click",".show-upload",()=>{$(".upload-display").removeClass("d-none"),$(".razer-display").addClass("d-none"),$("select[name='WalletTopup[payment_method]']").val("bank in slip")}),$(document).on("click",".show-razer",()=>{$(".upload-display").addClass("d-none"),$(".razer-display").removeClass("d-none"),$("select[name='WalletTopup[payment_method]']").val("nowpayments")})});var s=null,a=phxApp.makeid(4),n=new O({onDrawFn:()=>{setTimeout(()=>{phxApp.formatDate()},200)},xcard:l=>{console.log(l);var i=l;i.amount<0;var d='<span class="badge bg-warning">PENDING</span>';i.is_approved&&(d='<span class="badge bg-success">APPROVED</span>');var o=`
       

        <div class="row border-1 border-top py-2">
          <div class="col-6 text-start text-sm">`+d+`</div>
         <div class="col-6 text-end text-sm">Amount (RP)</div>
        </div>
        <div class="row">
          <div class="col-6 text-start text-sm format_datetime">`+i.inserted_at+`</div>
     
         <div class="col-6 text-end "> <span class='format-integer'>`+i.amount+`</span></div>
        </div>

        `;return o},data:{grid_class:"col-12 ",dom:`
       <"row px-4 px-lg-0" 
        <"col-12 col-lg-6 "l>
        <"col-12 col-lg-6 text-lg-end "i>
      >
      <"row grid_view d-block d-lg-none">
      <"list_view d-none d-lg-block"t>
      <"row transform-75 px-4"
          <"col-lg-6 col-12">
          <"col-lg-6 col-12"p>
        >
    `,preloads:["user","payment"],additional_join_statements:[{user:"user"}],additional_search_queries:["a.user_id="+phxApp.user.id]},columns:[{label:"id",data:"id"},{label:"Date",data:"inserted_at",formatDateTime:!0,offset:0},{customized:!0,label:"Approved?",data:"is_approved",xdata:{formatFn:(l,i)=>(l.is_approved?html='<div  ><i class="fa fa-check text-success"></i><span  class="ms-2">Approved</span></div>':html='<div  ><i class="fa fa-hourglass text-warning"></i><span class="ms-2">Pending</span></div>',html)}},{label:"Payment",data:"id",showChild:!0,xdata:{child:"payment",data:"payment_method"}},{label:"Amount",data:"amount",className:"format-float"},{label:"Action",data:"id",className:""}],moduleName:"WalletTopup",link:"WalletTopup",customCols:s,buttons:[{name:"Details",iconName:"fa fa-info",color:"btn-sm btn-outline-warning",onClickFunction:e,fnParams:{}}],tableSelector:"#"+a});n.load(a,"#tab2")},country(){if(localStorage.getItem("region")!=null){var e=r.countries_.filter((s,a)=>s.name==localStorage.getItem("region"))[0];r.chosen_country_id_=e,$("country").customHtml(`


      <li class="nav-item">
        <a class="nav-link choose-region" href="javascript:void(0);" > <i class="fa fa-globe"></i>`+localStorage.getItem("region")+`</a>
      </li>

    `)}else $("country").customHtml(`


      <li class="nav-item">
        <a class="nav-link choose-region" href="javascript:void(0);" > <i class="fa fa-globe"></i> MY</a>
      </li>

    `);var t=[];r.countries_.forEach((s,a)=>{t.push(`
          <button type="button" aria-name="`+s.name+'" aria-country="'+s.id+'" class="btn btn-primary ">'+s.name+`</button>
        `)}),$(".choose-region").click(()=>{m.emptyCart_(),r.modal({selector:"#mySubModal",content:`
        <center>
          <div class="btn-group-vertical">
          `+t.join("")+`
          </div>
        </center>
      `,header:"Choose region",autoClose:!1}),$("[aria-country]").unbind(),$("[aria-country]").click(function(){var s=$(this).attr("aria-country"),a=$(this).attr("aria-name");r.chosen_country_id_=s,r.notify("Chosen region: "+a),localStorage.setItem("region",a),setTimeout(()=>{$("#chosen-region").html(a)},1e3),$("#mySubModal").modal("hide");try{let i=function(d){var o="v2";return d=="Thailand"&&(o="th"),d=="Vietnam"&&(o="vn"),d=="China"&&(o="cn"),o};var l=i,n="v2";localStorage.region!=null&&(n=i(localStorage.region)),translationRes=r.api("translation",{lang:n})}catch(i){console.error("Error fetching translation:",i)}m.components.country(),m.components.products(),$("[name='user[pick_up_point_id]']").length>0&&m.components.cartItems()})})},upgradeTarget(){var e=null,t;$("upgradeTarget").attr("instalment")!=null&&(console.log("ok"),m.emptyCart_()),window.upgradeTarget==null&&(window.upgradeTarget=_.user.username),$("input[name='user[upgrade]']").val(window.upgradeTarget),$("upgradeTarget").customHtml('<span>for: <span id="upgradeTarget">'+window.upgradeTarget+'</span> <a class="ms-4" href="javascript:void(0);" aria-upgrade=true> <i class="fa fa-edit"></i> Change</a> </span>'),$("[aria-upgrade]").click(()=>{r.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" type="text" name='upgrade[username]'></input>
              <div class="form-text text-muted pv-info"></div>

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Upgrade User"}),$(".checkUser").click(()=>{r.api("get_accumulated_sales",{show_instalment:!0,parent_id:_.user.id,show_rank:!0,username:$("[name='upgrade[username]']").val()},()=>{window.upgradeTarget=_.user.username,$("input[name='user[upgrade]']").val(window.upgradeTarget),$(".selectUser").addClass("disabled")},s=>{r.notify("User verified!"),$(".selectUser").removeClass("disabled"),$(".pv-info").customHtml("Accumulated sales PV: "+s[0]+" | Rank: "+s[1]),s[2].is_direct_downline?$(".to-upgrade").removeClass("disabled"):(r.notify("User not direct downline!",{type:"warning"}),$("label[for='btnradio3']").click(),$(".to-upgrade").addClass("disabled"),s[4].outstanding_instalments!=null&&s[4].outstanding_instalments.product.can_pay_by_drp&&$(".to-upgrade").removeClass("disabled")),console.info(s[4].outstanding_instalments);try{s[4].outstanding_instalments!=null&&($("input[name='user[shipping][fullname]']").val(s[4].outstanding_instalments.user.fullname),$("input[name='user[shipping][phone]']").val(s[4].outstanding_instalments.user.phone),$("input[name='user[instalment]']").val("Month no: "+s[4].outstanding_instalments.month_no+"/"+s[4].outstanding_instalments.instalment.no_of_months),t=s[4].outstanding_instalments.product,e=s[4].outstanding_instalments.member_instalment_product.product)}catch(a){console.error(a)}})}),$(".selectUser").click(()=>{$("input[name='user[upgrade]']").val($("[name='upgrade[username]']").val()),r.notify("User selected!"),$("#mySubModal").modal("hide"),window.upgradeTarget=$("[name='upgrade[username]']").val(),$("#upgradeTarget").html($("[name='upgrade[username]']").val()),t!=null&&(r.addItem(t.id),e!=null&&r.addItem(e.id)),m.components.cartItems(),console.info("need to check if member is direct sponsor")})})},upgradeTargetMerchant(){var e=null,t;$("upgradeTarget").attr("instalment")!=null&&(console.log("ok"),m.emptyCart_()),window.upgradeTarget==null&&(window.upgradeTarget=_.user.username),$("input[name='user[upgrade]']").val(window.upgradeTarget),$("upgradeTargetMerchant").customHtml('<span>for: <span id="upgradeTarget">'+window.upgradeTarget+'</span> <a class="ms-4" href="javascript:void(0);" aria-upgrade=true> <i class="fa fa-edit"></i> Change</a> </span>'),$("[aria-upgrade]").click(()=>{r.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" type="text" name='upgrade[username]'></input>
              <div class="form-text text-muted pv-info"></div>

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Upgrade User"}),$(".checkUser").click(()=>{r.api("get_accumulated_sales_merchant",{show_instalment:!0,parent_id:_.user.id,show_rank:!0,username:$("[name='upgrade[username]']").val()},()=>{window.upgradeTarget=_.user.username,$("input[name='user[upgrade]']").val(window.upgradeTarget),$(".selectUser").addClass("disabled")},s=>{r.notify("User verified!"),$(".selectUser").removeClass("disabled"),$(".pv-info").customHtml("Accumulated sales PV: "+s[0]+" | Rank: "+s[1]),s[2].is_direct_downline?$(".to-upgrade").removeClass("disabled"):(r.notify("User not direct downline!",{type:"warning"}),$("label[for='btnradio3']").click(),$(".to-upgrade").addClass("disabled"),s[4].outstanding_instalments!=null&&s[4].outstanding_instalments.product.can_pay_by_drp&&$(".to-upgrade").removeClass("disabled")),console.info(s[4].outstanding_instalments);try{s[4].outstanding_instalments!=null&&($("input[name='user[shipping][fullname]']").val(s[4].outstanding_instalments.user.fullname),$("input[name='user[shipping][phone]']").val(s[4].outstanding_instalments.user.phone),$("input[name='user[instalment]']").val("Month no: "+s[4].outstanding_instalments.month_no+"/"+s[4].outstanding_instalments.instalment.no_of_months),t=s[4].outstanding_instalments.product,e=s[4].outstanding_instalments.member_instalment_product.product)}catch(a){console.error(a)}})}),$(".selectUser").click(()=>{$("input[name='user[upgrade]']").val($("[name='upgrade[username]']").val()),r.notify("User selected!"),$("#mySubModal").modal("hide"),window.upgradeTarget=$("[name='upgrade[username]']").val(),$("#upgradeTarget").html($("[name='upgrade[username]']").val()),t!=null&&(r.addItem(t.id),e!=null&&r.addItem(e.id)),m.components.cartItems(),console.info("need to check if member is direct sponsor")})})},sponsorTarget(){window.sponsorTarget==null&&(window.sponsorTarget=_.user.username),$("input[name='user[sponsor]']").val(""),$("sponsorTarget").customHtml('<span>for: <span id="sponsorTarget">'+window.sponsorTarget+`</span>
     <a class="ms-4" href="javascript:void(0);" aria-sponsor=true> <i class="fa fa-edit"></i> Change</a> </span>`),$("[aria-sponsor]").click(()=>{r.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" value="`+_.user.username+`" type="text" name='sponsor[username]'></input>
            

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Sponsor User"}),$(".checkUser").click(()=>{r.api("get_accumulated_sales",{parent_id:_.user.id,show_rank:!0,username:$("[name='sponsor[username]']").val()},()=>{window.sponsorTarget=_.user.username,$("input[name='user[sponsor]']").val(window.sponsorTarget),$(".selectUser").addClass("disabled")},e=>{$(".selectUser").removeClass("disabled"),$(".pv-info").customHtml("Accumulated sales PV: "+e[0]+" | Rank: "+e[1]),e[2].is_direct_downline?$(".to-upgrade").removeClass("disabled"):($("label[for='btnradio3']").click(),$(".to-upgrade").addClass("disabled")),e[3].is_downline||$("input[name='sponsor[username]']").val()==_.user.username?r.notify("User verified!"):(r.notify("Not downline!",{type:"warning"}),$(".selectUser").addClass("disabled"))})}),$(".selectUser").click(()=>{$("input[name='user[sponsor]']").val($("[name='sponsor[username]']").val()),$("input[name='view[sponsor]']").val($("[name='sponsor[username]']").val()),r.notify("User selected!"),$("#mySubModal").modal("hide"),window.sponsorTarget=$("[name='sponsor[username]']").val(),$("#sponsorTarget").html($("[name='sponsor[username]']").val()),m.components.cartItems(),console.info("need to check if member is direct sponsor")})})},stockistTarget(){window.stockistTarget==null&&(window.stockistTarget=_.user.username),$("input[name='user[stockist_user_id]']").val(""),$("stockistTarget").customHtml('<span>for: <span id="stockistTarget">'+window.stockistTarget+`</span>
     <a class="ms-4" href="javascript:void(0);" aria-stockist=true> <i class="fa fa-edit"></i> Change</a> </span>`),$("[aria-stockist]").click(()=>{r.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" value="`+_.user.username+`" type="text" name='sponsor[username]'></input>
            

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Stockist User"}),$(".checkUser").click(()=>{r.api("get_stockist",{parent_id:_.user.id,show_rank:!0,username:$("[name='sponsor[username]']").val()},()=>{window.stockistTarget=_.user.username,$("input[name='user[stockist_user_id]']").val(null),$(".selectUser").addClass("disabled")},e=>{$(".selectUser").removeClass("disabled"),e[1].is_stockist?(window.stockistTargetData=e[2],$("input[name='user[stockist_user_id]']").val(window.stockistTargetData.id),r.notify("User verified!")):(r.notify("Not stockist!",{type:"warning"}),$(".selectUser").addClass("disabled"))})}),$(".selectUser").click(()=>{$("input[name='user[stockist]']").val($("[name='sponsor[username]']").val()),$("input[name='view[stockist]']").val($("[name='sponsor[username]']").val()),r.notify("User selected!"),$("#mySubModal").modal("hide"),window.stockistTarget=$("[name='sponsor[username]']").val(),$("#stockistTarget").html($("[name='sponsor[username]']").val()),m.components.cartItems()})})},salesItems(){var e=r.api("get_sale",{id:pageParams.id});e.status=="pending_payment"&&e.payment!=null,$("title").html("Order ID: "+e.id),window.sale=e;var t,s,a=[],n=0,l=0;n=e.sales_items.map((b,C)=>b.qty*b.item_pv).reduce((b,C)=>b+C,0),l=e.sales_items.map((b,C)=>b.qty*b.item_price).reduce((b,C)=>b+C,0),e.sales_items.map((b,C)=>b.qty).reduce((b,C)=>b+C,0);var i=e.shipping_fee||0,d=this.evalRank(l);try{t=JSON.parse(e.registration_details)}catch(b){console.error(b)}var o=!1;t.scope=="merchant_checkout"&&(n=e.total_point_value,o=!0),e.sales_items.forEach((b,C)=>{var I="/images/placeholder.png";if(b.img_url!=null)try{I=b.img_url}catch{I="/images/placeholder.png"}var S='  <span class="font-sm text-info "><span class="format-integer">'+b.item_pv*b.qty+"</span> PV</span>";o&&(S=""),a.push(`

          <div class="d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center justify-content-between gap-2">
              <div class="d-flex justify-content-center align-items-center " style="
                                cursor: pointer;   
                                position: relative; 
                                height: 60px;">
                <div class="rounded py-2" style="
                                height: 50px;
                                width: 72%;
                                filter: blur(4px);
                                position: absolute;
                                background-repeat: no-repeat;
                                background-position: center;
                                background-size: cover;
                                background-image: url('`+I+`');
                                bottom: 6px;
                                left: 16px;
                                ">
                </div>
                <div class="rounded py-2" style="
                                height: 50px;
                                width:  60px;
                                z-index: 1;
                                background-position: center;
                                background-repeat: no-repeat;
                                background-size: cover; 
                                background-image: url('`+I+`');
                                ">
                </div>
              </div>
              <div class="d-flex flex-column">
                <span>`+b.item_name+" <small>(x"+b.qty+`)</small></span>
                <div>`+b.remarks+`</div>
              </div>
            </div>
            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
              <div class="d-flex flex-column align-items-end">
                <span class="font-sm ">RP <span class="format-float">`+(b.item_price*b.qty).toFixed(2)+`</span></span>
              `+S+`
              </div>
             
            </div>
          </div>

        
          `)});var u="Total PV";o&&(u="RP Received");var h=`

             <div class="d-flex justify-content-between align-items-center">
                <span class="fs-4">Subtotal</span>
                <span class=" me-4">RP <span class="format-float">`+l+`</span></span>
              </div>
             <div class="d-flex justify-content-between align-items-center">
                <span class="fs-4">Shipping</span>
                <span class=" me-4">RP <span class="format-float">`+i+`</span></span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fs-5">`+u+`</span>
                <span class="text-info me-4"><span class="format-integer">`+n+` PV</span></span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-secondary">Eligible Rank</span>
                <span class="text-info me-4"><span class="format-integer">`+d+`</span></span>
              </div>

    `;try{s=t.user.shipping,console.log("shippnig..."),console.info(s),payment=e.payment}catch(b){console.error(b)}var g={};if(e.payment!=null){e.payment.payment_url!=null&&(h=`

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Subtotal</span>
                  <span class=" ">RP <span class="format-float">`+l+`</span></span>
                </div>
               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Shipping</span>
                  <span class=" me-4">RP <span class="format-float">`+i+`</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">`+u+`</span>
                  <span class="text-info "><span class="format-integer">`+n+` PV</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info "><span class="format-integer">`+d+`</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Paid with</span>
                  <span class="text-primary "><span class="">`+payment.payment_method.split("_").map((b,C)=>A.capitalize(b)).join(" ")+`</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Payment Link</span>
                  <span class="text-primary "><a target="_blank" href="`+payment.payment_url+'" class="">'+payment.payment_url+`</a></span>
                </div>

      `);try{if(console.info(e.payment),e.payment.webhook_details!=null){e.payment.webhook_details.split("|").map((b,C)=>{data=b.split(": ");var I=data[0].replace(" ","_");console.log(I),g[I]=parseFloat(data[1])}),console.info(g),drp_amount=0;var w="DRP";o&&(w="Merchant Point"),(g.drp_paid!=null||g.mp_paid!=null)&&(drp_amount=g.drp_paid,o&&(drp_amount=g.mp_paid)),g.pp_paid!=null&&(n=0);var f=n-drp_amount,v=l+i-drp_amount-(g.rp_paid||0),x=` <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info "><span class="format-integer">`+d+`</span></span>
                </div>`;o&&(x="",f=n,v=l+i),h=`

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Subtotal</span>
                  <span class=" ">RP <span class="format-float">`+l+`</span></span>
                </div>
               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Shipping + Tax</span>
                  <span class=" ">RP <span class="format-float">`+i+`</span></span>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">`+w+`</span>
                  <span class=" ">- RP <span class="format-float">`+drp_amount+`</span></span>
                </div>

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Grand Total </span>
                  <span class=" ">RP <span class="format-float">`+(l+i)+`</span></span>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">`+u+`</span>
                  <span class="text-info "><span class="format-integer">`+f+` PV</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Grand Total  After Payment</span>
                  <span class=" ">RP <span class="format-float">`+v+` </span></span>
                </div>

               `+x+`
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Paid with</span>
                  <span class="text-primary "><span class="">`+payment.payment_method.split("_").map((b,C)=>A.capitalize(b)).join(" ")+`</span></span>
                        </div>

              `}}catch(b){console.error(b)}}var k="      ";try{s!=null?k=`
        <span class="text-secondary">Deliver To:</span> 
                         <span>`+s.line1+", "+s.line2+`</span>
                         <span>`+s.city+" "+s.postcode+", "+s.state+` </span>

    `:s={phone:null,fullname:null},e.pick_up_point!=null&&(k=`           <span class="text-secondary">Pick Up Point: </span>
                      <span>`+e.pick_up_point.name+` </span>
                    <span>`+e.pick_up_point.address+` </span>

        `)}catch(b){console.error(b)}console.info(k);var P='    <a class="btn btn-primary" href="/pdf?id='+e.id+'" target="_blank">Print</a>';e.payment==null&&e.status=="pending_payment"&&(P='<div class="btn btn-success approve-sale" aria-id="'+e.id+'">Approve</div>'),e.merchant_id!=null&&(P='   <a class="btn btn-primary" href="/pdf?type=merchant&id='+e.id+'" target="_blank">Print</a>  <a class="d-none mdo btn btn-primary" href="/pdf?type=merchant_do&id='+e.id+'" target="_blank">Print DO</a>'),console.info(e),$("salesItems").customHtml(`
      <div class="d-flex align-items-center justify-content-between gap-2">
        <h2>Sales Details</h2><small class="badge bg-primary">`+e.status+`</small>
      </div>
              <div class="d-flex flex-column mb-4 ">
                 <span class="text-secondary">Sold To:</span> 
                 <span>`+(t.user.fullname||r.user.fullname)+", "+(t.user.phone||r.user.phone)+`</span>
                 
              </div>
              <div class="d-flex flex-column mb-4 ">
                 <span class="text-secondary">Recipient:</span> 
                 <span>`+(s.fullname||r.user.fullname)+", "+(s.phone||r.user.phone)+`</span>
                 
              </div>


              <div class="d-flex flex-column mb-4 ">
               
                  `+k+`
              </div>

                 <span class="text-secondary">Items:</span>
              <div class="d-flex flex-column gap-2">`+a.join("")+`
              `+h+`
              </div>
              <div class="my-4">
            `+P+`
              </div>

      `),$(".approve-sale").click(function(){var b=$(this).attr("aria-id");r.modal({selector:"#mySubModal",content:`<div>

          <p>Approve this sale ?</p>

          <div class="btn btn-outline-primary confirm-approve">Approve</div>

          </div>`,header:"Confirmation",autoClose:!1}),$(".confirm-approve").click(()=>{r.api("manual_approve_bank_in",{id:b})},null,()=>{r.navigateTo(location.pathname)})}),A.formatDate()},evalStates(){$("select[name='user[shipping][state]']").customHtml("<option></option>");var e=r.countries_.filter((s,a)=>s.name=="Malaysia")[0];try{if(e.id==r.chosen_country_id_.id){$("[name='user[pick_up_point_id]']").val()==null?$(".ss1").customHtml(`
                                    <select class="form-select" required id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                    </select>
                                    <label class="ms-2" for="floatingInput">State</label>
                                `):$(".ss1").customHtml(`
                                        <select class="form-select"  id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                        </select>
                                        <label class="ms-2" for="floatingInput">State</label>
                                    `);var t=[["jhr","Johor"],["kdh","Kedah"],["ktn","Kelantan"],["mlk","Melaka"],["nsn","Negeri Sembilan"],["phg","Pahang"],["prk","Perak"],["pls","Perlis"],["png","Pulau Pinang"],["sgr","Selangor"],["trg","Terengganu"],["kul","Kuala Lumpur"],["pjy","Putra Jaya"],["srw","Sarawak"],["sbh","Sabah"],["lbn","Labuan"]];t.forEach((s,a)=>{window.selectedState==s[1]?$("select[name='user[shipping][state]']").append(`
                                        <option selected value="`+s[1]+'">'+s[1]+"</option>"):$("select[name='user[shipping][state]']").append(`
                                        <option value="`+s[1]+'">'+s[1]+"</option>")}),$("select[name='user[shipping][state]']").change(()=>{window.selectedState=$("select[name='user[shipping][state]']").val(),m.components.updateCart(),m.components.cartItems()})}else $("[name='user[pick_up_point_id]']").val()==null?$(".ss1").customHtml(`
                                    <input class="form-control" required id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                    </input>
                                    <label class="ms-2" for="floatingInput">State</label>
                                `):$(".ss1").customHtml(`
                                    <input class="form-control"  id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                    </input>
                                    <label class="ms-2" for="floatingInput">State</label>
                                `)}catch(s){console.error(s)}},evalShipping(e){var t=m.cart_.map((s,a)=>s.qty*s.base_shipping_fee).reduce((s,a)=>s+a,0);return $("[name='user[pick_up_point_id]']").val()!=""&&(t=0),t},evalShippingLegacy(e){var t=$("cartItems").attr("merchant")=="",s=0,a=r.countries_.filter((l,i)=>l.name=="Malaysia")[0],n=r.countries_.filter((l,i)=>l.name=="Singapore")[0];return a.id==r.chosen_country_id_.id?$("[name='user[pick_up_point_id]']").val()!=""?s=0:["Sabah","Sarawak","Labuan"].includes(window.selectedState)?s=Math.ceil(e/200)*4:t?s=Math.ceil(e/200)*2:e>=100?s=0:s=2:(s=e*.1,n.id==r.chosen_country_id_.id&&(s=e*.05,t&&(s=e*.1))),s},evalShippingAddresses(){try{r.api("list_pick_up_point_by_country",{country_id:r.chosen_country_id_.id},null,e=>{if(r.pick_up_points=e,$("[name='user[pick_up_point_id]']").length>0&&$("[name='user[pick_up_point_id]']").val()!=""){var t=$("[name='user[pick_up_point_id]']").val(),s=r.pick_up_points.filter((n,l)=>n.id==t)[0];try{$("[name='user[shipping][state]']").removeAttr("required"),console.log("attr removed"),$(".self-pickup-form").customHtml(`
                 <div class="d-flex flex-column">
                    <span>`+s.name+`</span>
                    <span class="text-secondary">`+s.address+`</span>
                    <span class="mt-4">
                    </span>
                  </div>

          `)}catch{$(".shipping-form").removeClass("d-none"),$(".self-pickup-form").addClass("d-none"),r.notify("No pick up points in this region",{type:"danger"})}}var a=[];e.forEach((n,l)=>{a.push(`
            <div class="card my-2" style="cursor: pointer;">
              <div class="card-body">
                <div class="d-flex flex-column">
                  <span>`+n.name+`</span>
                  <span class="text-secondary">`+n.address+`</span>
                  <span class="mt-4">
                    <div class="btn btn-primary" aria-address="`+n.id+`">Choose</div>
                  </span>
                </div>
              </div>
            </div>
          `)}),$(".self-pickup").unbind(),$(".self-pickup").click(()=>{window.selectedState=null,$(".shipping-form").addClass("d-none"),$(".self-pickup-form").removeClass("d-none"),r.modal({autoClose:!1,selector:"#mySubModal",content:`
          <div class="d-flex flex-column">
            `+a.join("")+`
          </div>
          `,header:"Pick Up Points"}),$("[aria-address]").click(function(){var n=$(this).attr("aria-address"),l=r.pick_up_points.filter((i,d)=>i.id==n)[0];try{$("[name='user[shipping][state]']").removeAttr("required"),console.log("attr removed"),$(".self-pickup-form").customHtml(`
                 <div class="d-flex flex-column">
                    <span>`+l.name+`</span>
                    <span class="text-secondary">`+l.address+`</span>
                    <span class="mt-4">
                    </span>
                  </div>

          `)}catch{$(".shipping-form").removeClass("d-none"),$(".self-pickup-form").addClass("d-none"),r.notify("No pick up points in this region",{type:"danger"})}$("[name='user[pick_up_point_id]']").val(n),$("#mySubModal").modal("hide"),$("[name='user[shipping][state]']").val(null),m.components.cartItems()})})}),pageParams.share_code!=null||r.api("list_user_sales_addresses_by_username",{username:r.user.username},null,e=>{if(r.addresses=e,e.length>0&&window.choosenAddress!=null){var t=e.filter((a,n)=>a.id==window.choosenAddress)[0];$("[name='user[shipping][phone]']").val(t.phone),$("[name='user[shipping][fullname]']").val(t.fullname),$("[name='user[shipping][line1]']").val(t.line1),$("[name='user[shipping][line2]']").val(t.line2),$("[name='user[shipping][city]']").val(t.city),$("[name='user[shipping][postcode]']").val(t.postcode),setTimeout(()=>{$("[name='user[shipping][state]']").val(t.state)},500)}$(".change-address").unbind();var s=[];e.forEach((a,n)=>{s.push(`
            <div class="card my-2" style="cursor: pointer;">
              <div class="card-body">
                <div class="d-flex flex-column">
                  <span>`+a.fullname+`</span>
                  <span class="text-secondary">`+a.line1+", "+a.line2+`</span>
                  <span class="mt-4">
                    <div class="btn btn-primary" aria-address="`+a.id+`">Choose</div>
                  </span>
                </div>
              </div>
            </div>
          `)}),$(".change-address").click(()=>{$("[name='user[pick_up_point_id]']").val(""),$(".shipping-form").removeClass("d-none"),$(".self-pickup-form").addClass("d-none"),$("[name='user[shipping][state]']").attr("required"),console.log("attr add"),r.modal({autoClose:!1,selector:"#mySubModal",content:`
                                            <div class="d-flex flex-column">
                                                `+s.join("")+`
                                            </div>
                                            `,header:"Change address"}),$("[aria-address]").click(function(){var a=$(this).attr("aria-address");window.choosenAddress=a;var n=r.addresses.filter((l,i)=>l.id==a)[0];$("[name='user[shipping][phone]']").val(n.phone),$("[name='user[shipping][fullname]']").val(n.fullname),$("[name='user[shipping][line1]']").val(n.line1),$("[name='user[shipping][line2]']").val(n.line2),$("[name='user[shipping][city]']").val(n.city),$("[name='user[shipping][postcode]']").val(n.postcode),setTimeout(()=>{$("[name='user[shipping][state]']").val(n.state)},500),$("#mySubModal").modal("hide"),m.components.cartItems()})})})}catch(e){console.error(e)}},cartItems(){var e,t=$("cartItems").attr("merchant")=="";const s=t?m.mcart_:m.cart_;var a,n=!1,l=2,i=[],d=0,o=0;d=s.map((y,T)=>y.qty*y.point_value).reduce((y,T)=>y+T,0),o=s.map((y,T)=>y.qty*y.retail_price).reduce((y,T)=>y+T,0),t&&(d=o),s.map((y,T)=>y.qty).reduce((y,T)=>y+T,0),this.evalShippingAddresses(),this.evalStates(),$("cartItems").attr("upgrade")!=null?(window.upgradeTarget!=null?(e=r.api("get_accumulated_sales",{username:window.upgradeTarget}),o=o,a=this.evalRank(o+e)):(o=o,a=this.evalRank(o+_.user.rank.retail_price)),$(".only-downline").click(()=>{r.notify("Only available for direct recruited downline.")})):a=this.evalRank(o),l=this.evalShipping(o),s.forEach((y,T)=>{var M='<span class="font-sm text-info "><span class="format-integer">'+y.point_value*y.qty+"</span> PV</span>";t&&(M="");var j="/images/placeholder.png";if(y.img_url!=null)try{j=y.img_url}catch{j="/images/placeholder.png"}var E="";if(s==m.cart&&parseInt(localStorage.first_cart_country_id)!=r.chosen_country_id_.id)E="border border-danger",i.push(`

                                    <div class="d-flex align-items-center justify-content-between gap-2 `+E+` rounded p-2 me-3">
                                    
                                        <div class="d-flex align-items-center justify-content-between gap-2">
                                        <div class="d-flex justify-content-center align-items-center " style="
                                                            cursor: pointer;   
                                                            position: relative; 
                                                            height: 60px;">
                                            <div class="rounded py-2" style="
                                                            height: 50px;
                                                            width: 72%;
                                                            filter: blur(4px);
                                                            position: absolute;
                                                            background-repeat: no-repeat;
                                                            background-position: center;
                                                            background-size: cover;
                                                            background-image: url('`+j+`');
                                                            bottom: 6px;
                                                            left: 16px;
                                                            ">
                                            </div>
                                            <div class="rounded py-2" style="
                                                            height: 50px;
                                                            width:  60px;
                                                            z-index: 1;
                                                            background-position: center;
                                                            background-repeat: no-repeat;
                                                            background-size: cover; 
                                                            background-image: url('`+j+`');
                                                            ">
                                            </div>
                                        </div>
                                        <span>`+y.name+" <small>(x"+y.qty+`)</small> <br><small> <i class="fa fa-exclamation-triangle text-danger "></i>Product not available for this region</small></span>
                                        </div>
                                        <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
                                        
                                        <div class="text-center">
                                            <div class="btn btn-sm" delete-product-id="`+y.id+`"><i class="text-danger fa fa-times"></i></div>
                                        </div>
                                        </div>
                                    </div>

                                    
                                    `);else{y.override_pv&&(n=!0);var D='RP <span class="format-float">'+(y.retail_price*y.qty).toFixed(2);showRP==!1&&(D='MYR <span class="format-float">'+(y.retail_price*y.qty*r.chosen_country_id_.conversion).toFixed(2));var R="",N="";if(y.selectedInstalmentId!=null){var F=y.selectedInstalment;try{N='<div class="text-sm text-secondary">'+F.name+"</div>",R='<input type="hidden"  name="user[products]['+T+'][remarks]" value="instalment_product_id:'+y.selectedInstalmentId+'">'}catch(U){console.error(U)}}try{if($("input[name='user[instalment]']").val()!=null){var H=$("input[name='user[instalment]']").val();N=H}}catch(U){console.error(U)}i.push(`

            <div class="d-flex align-items-center justify-content-between gap-2 `+E+` rounded p-2 me-3">
            <input type="hidden"  name="user[products][`+T+'][item_name]" value="'+y.name+`">
            <input type="hidden"  name="user[products][`+T+'][item_price]" value="'+y.retail_price+`">
            <input type="hidden"  name="user[products][`+T+'][item_pv]" value="'+y.point_value+`">
            <input type="hidden"  name="user[products][`+T+'][img_url]" value="'+y.img_url+`">
            <input type="hidden"  name="user[products][`+T+'][qty]" value="'+y.qty+`">
            `+R+`
              <div class="d-flex align-items-center justify-content-between gap-2">
                <div class="d-flex justify-content-center align-items-center " style="
                                  cursor: pointer;   
                                  position: relative; 
                                  height: 60px;">
                  <div class="rounded py-2" style="
                                  height: 50px;
                                 width: 72%;
                                  filter: blur(4px);
                                  position: absolute;
                                  background-repeat: no-repeat;
                                  background-position: center;
                                  background-size: cover;
                                  background-image: url('`+j+`');
                                  bottom: 6px;
                                  left: 16px;
                                  ">
                  </div>
                  <div class="rounded py-2" style="
                                  height: 50px;
                                  width:  60px;
                                  z-index: 1;
                                  background-position: center;
                                  background-repeat: no-repeat;
                                  background-size: cover; 
                                  background-image: url('`+j+`');
                                  ">
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <span>`+y.name+" <small>(x"+y.qty+`)</small></span>
                  `+N+`
                </div>
              </div>
              <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <div class="d-flex flex-column align-items-end">
                  <span class="font-sm ">`+D+`</span></span>
                  `+M+`
                </div>
                <div class="text-center">
                  <div class="btn btn-sm" add-product-id="`+y.id+`"><i class="text-info fa fa-plus"></i></div>
                  <div class="btn btn-sm" minus-product-id="`+y.id+`"><i class="text-danger fa fa-minus"></i></div>
                  <div class="btn btn-sm" delete-product-id="`+y.id+`"><i class="text-danger fa fa-times"></i></div>
                </div>
              </div>
            </div>

          
            `)}});var u=!1;try{$("input[name='user[instalment]']").val()!=null&&(u=!0)}catch(y){console.error(y)}try{$("input[name='user[stockist_user_id]']").val()!=null&&(l=0)}catch(y){console.error(y)}u&&(l=0),console.log("merchant?"),console.log(t),t&&(l=o*.025,l=0);var h="RP",g=o+l,w=l,f=`

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info me-4"><span class="format-integer">`+a+`</span></span>
                </div>

  `,v=`

    Total PV

  `,x='RP <span class="format-float">'+o;t&&(f="",v="RP received"),showRP||(x='MYR <span class="format-float">'+o*r.chosen_country_id_.conversion,w=l*r.chosen_country_id_.conversion,g=(o+l)*r.chosen_country_id_.conversion,h="MYR"),$("cartItems").customHtml(`

                <div class="d-flex flex-column gap-1">`+i.join("")+`
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Subtotal</span>
                    <span class=" me-4">`+x+`</span></span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Shipping_Tax</span>
                    <span class=" me-4">`+h+' <span class="format-float">'+w+`</span></span>
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">Grand Total</span>
                    <span class=" me-4">`+h+' <span class="format-float fs-4">'+g+`</span></span>
                  </div>
                <div class="d-flex justify-content-between align-items-center pv_label d-none">
                  <span class="fs-5">`+v+`</span>
                  <span class="text-info me-4"><span class="format-integer">`+d+` PV</span></span>
                </div>
                `+f+`

              </div>



      `);var k=_.user,P=[];k!=null&&(k.wallets==null?(P=r.api("user_wallet",{token:k.token}),k.wallets=P):P=k.wallets);function b(){P.length==0||$("wallet").each((y,T)=>{var M=P.filter((D,R)=>D.wallet_type=="direct_recruitment");if(t&&(M=P.filter((D,R)=>D.wallet_type=="merchant")),M.length>0){var j=M[0];if(t)$("#drp_payment").attr("max",o*.2),$("#drp_payment").attr("min",0),$("#drp_payment").attr("step",.01),$("#drp_payment").attr("value",o*.2);else if(n){console.info("here ovier");var E=s.map((D,R)=>D.qty*D.retail_price*D.override_perc).reduce((D,R)=>D+R,0);$("#drp_payment").attr("min",Math.round(E)),$("#drp_payment").attr("value",Math.round(E))}else $("#drp_payment").attr("max",j.total),$("#drp_payment").attr("min",Math.round(o*.5)),$("#drp_payment").attr("value",Math.round(o*.5))}})}$("input[name='user[payment][method]']").unbind(),$("input[name='user[payment][method]']").on("change",()=>{$("#coupon-detail").addClass("d-none"),$("input[name='user[payment][method]']").each((y,T)=>{$(T)[0].checked==!0&&(["register_point","merchant_point"].includes($(T).val())?($("#coupon-detail").removeClass("d-none"),C()):($("#drp_payment").removeAttr("max"),$("#drp_payment").removeAttr("min"),$("#drp_payment").removeAttr("value"),t?m.components.updateMCart():m.components.updateCart(),m.components.cartItems()))})});function C(){b();var y=0,T=2,M=0,j=0;if($("#drp_payment").length>0)try{y=parseFloat($("#drp_payment").val())}catch{y=$("#drp_payment").val()}T=m.components.evalShipping(o),u&&(T=0),M=o+T-y,j=d-y,t&&(T=o*.025,T=0,M=o+T,console.log("w"),j=o-y+T);var E=`


                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">DRP</span>
                    <span class=" me-4">- RP <span class="format-float">`+y+`</span></span>
                  </div>
      `;t&&(E=`


                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">MP</span>
                    <span class=" me-4">- RP <span class="format-float">`+y+`</span></span>
                  </div>
        `),$("cartItems").customHtml(`

                <div class="d-flex flex-column gap-1">`+i.join("")+`
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Subtotal</span>
                    <span class=" me-4">RP <span class="format-float">`+o+`</span></span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Shipping_Tax</span>
                    <span class=" me-4">RP <span class="format-float">`+T+`</span></span>
                  </div>
                  `+E+`
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">Grand Total</span>
                    <span class=" me-4">RP <span class="format-float fs-4">`+M+`</span></span>
                  </div>

                  <div class="d-flex justify-content-between align-items-center pv_label d-none">
                    <span class="fs-5">`+v+`</span>
                    <span class="text-info me-4"><span class="format-integer">`+j+` PV</span></span>
                  </div>
                 `+f+`
                </div>


        `),t&&$("cartItems").customHtml(`

                          <div class="d-flex flex-column gap-1">`+i.join("")+`
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Subtotal</span>
                              <span class=" me-4">RP <span class="format-float">`+o+`</span></span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Shipping_Tax</span>
                              <span class=" me-4">RP <span class="format-float">`+T+`</span></span>
                            </div>
                            `+E+`
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fs-4">Grand Total</span>
                              <span class=" me-4">RP <span class="format-float fs-4">`+j+`</span></span>
                            </div>

                            <div class="d-flex justify-content-between align-items-center pv_label d-none">
                              <span class="fs-5">`+v+`</span>
                              <span class="text-info me-4"><span class="format-integer">`+j+` PV</span></span>
                            </div>
                           `+f+`
                          </div>


                  `),A.formatDate(),$("[add-product-id]").each((D,R)=>{var N=$(R).attr("add-product-id");function F(){m.addItemById_(N,t),t?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(R)[0].onclick=F}),$("[minus-product-id]").each((D,R)=>{var N=$(R).attr("minus-product-id");function F(){m.minusItem_(N,t),t?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(R)[0].onclick=F}),$("[delete-product-id]").each((D,R)=>{var N=$(R).attr("delete-product-id");function F(){m.removeItem_(N,t),t?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(R)[0].onclick=F})}function I(y){$("#drp_payment").removeAttr("max"),$("#drp_payment").removeAttr("min"),$("#drp_payment").removeAttr("value"),C()}var S=document.getElementById("drp_payment");S!=null&&(S.removeEventListener("change",I),S.addEventListener("change",I)),$("[add-product-id]").each((y,T)=>{var M=$(T).attr("add-product-id");function j(){m.addItemById_(M,t),t?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(T)[0].onclick=j}),$("[minus-product-id]").each((y,T)=>{var M=$(T).attr("minus-product-id");function j(){m.minusItem_(M,t),t?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(T)[0].onclick=j}),$("[delete-product-id]").each((y,T)=>{var M=$(T).attr("delete-product-id");function j(){m.removeItem_(M,t),t?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(T)[0].onclick=j}),$("input[name='user[payment][method]']").each((y,T)=>{$(T)[0].checked==!0&&(["register_point","merchant_point"].includes($(T).val())?($("#coupon-detail").removeClass("d-none"),C()):($("#drp_payment").removeAttr("max"),$("#drp_payment").removeAttr("min"),$("#drp_payment").removeAttr("value")))}),A.formatDate()},evalRank(e){var t="n/a",s,a=[];return _.ranks.map((n,l)=>{a.push(n)}),a.sort((n,l)=>l.retail_price-n.retail_price),s=a.filter((n,l)=>n.retail_price<=e)[0],s&&(t=s.name,$("input[name='user[rank_id]']").length>0&&$("input[name='user[rank_id]']").val(s.id)),t},updateCart(){var e,t=0,s=[],a=0;a=m.cart_.map((u,h)=>u.qty*u.retail_price).reduce((u,h)=>u+h,0),t=m.cart_.map((u,h)=>u.qty).reduce((u,h)=>u+h,0),$(".bc").html(t),m.cart_.forEach((u,h)=>{var g='<div class="font-sm">RP <span class="font-sm format-float">'+(u.retail_price*u.qty).toFixed(2)+"</span></div>";showRP||(g='<div class="font-sm">MYR <span class="font-sm format-float">'+(u.retail_price*u.qty*r.chosen_country_id_.conversion).toFixed(2)+"</span></div>"),s.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>`+u.name+" <small>(x"+u.qty+`)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              `+g+`

              <div class="d-lg-block d-none">
                <div class="btn btn-sm" minus-product-id="`+u.id+`"><i class="text-danger fa fa-minus"></i></div>
                <div class="btn btn-sm" delete-product-id="`+u.id+`"><i class="text-danger fa fa-times"></i></div>
              </div>
              

            </div>
          </div>

        </a></li>

          `)}),s.length==0&&s.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `);var n,l=[],i=[];_.ranks.map((u,h)=>{i.push(u)}),i.sort((u,h)=>u.retail_price-h.retail_price),i.map((u,h)=>{l.push(`
        <div class="col ">
          <div class="d-flex flex-column">
            <span>`+u.name+`</span>
            <span class="format-float">`+u.retail_price+`</span>
            
          </div>
        </div>`)}),$("cartItems").attr("upgrade")!=null?(window.upgradeTarget!=null?(e=r.api("get_accumulated_sales",{username:window.upgradeTarget}),a=a,console.log(a),n=this.evalRank(a+e)):(a=a,console.log(a),n=this.evalRank(a+_.user.rank.retail_price)),$(".only-downline").click(()=>{r.notify("Only available for direct recruited downline.")})):(a=a,console.log(a),n=this.evalRank(a));var d=_.ranks.sort((u,h)=>u.retail_price-h.retail_price).findIndex(u=>u.name===n);console.log(d);var o=(d+1)*25;$(".ac").each((u,h)=>{var g=s.join("")+`
              <li id="divider">
                <hr class="dropdown-divider">
              </li>
             <li>                  

             <a class="dropdown-item navi" href="/upgrade">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Checkout</span>
                      <span class="format-float">`+a+`</span>
                    </div>
                 

                    <div class="d-flex justify-content-between align-items-center">
                      <small>Eligible</small>
                      <small class="text-info">`+n+`</small>
                    </div>

                    <div class="progress my-2" style="height: 4px;">
                      <div class="progress-bar bg-success" role="progressbar" style="width: `+o+'%;" aria-valuenow="'+o+`" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="row text-sm">
                      `+l.join("")+`
                    </div>

                  
                  </div>
                </a>
              </li>`;$(h).html(g)}),$("[minus-product-id]").each((u,h)=>{var g=$(h).attr("minus-product-id");function w(){m.minusItem_(g),m.components.updateCart(),m.toastChanges()}$(h)[0].onclick=w}),$("[delete-product-id]").each((u,h)=>{var g=$(h).attr("delete-product-id");function w(){m.removeItem_(g),m.components.updateCart(),m.toastChanges()}$(h)[0].onclick=w}),A.formatDate()},updateMCart(){var e=0,t=[],s=0;s=m.mcart_.map((a,n)=>a.qty*a.retail_price).reduce((a,n)=>a+n,0),e=m.mcart_.map((a,n)=>a.qty).reduce((a,n)=>a+n,0),$(".mbc").html(e),m.mcart_.forEach((a,n)=>{t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>`+a.name+" <br><small>(x"+a.qty+`)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              <span class="font-sm format-float">`+(a.retail_price*a.qty).toFixed(2)+`</span>

           
              

            </div>
          </div>

        </a></li>

          `)}),t.length==0&&t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `),$(".mac").each((a,n)=>{var l=t.join("")+`
              <li id="divider">
                <hr class="dropdown-divider">
              </li>
             <li>                  

             <a class="dropdown-item navi" href="/merchant_checkout">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Checkout</span>
                      <span class="format-float">`+s+`</span>
                    </div>
              
                  </div>
                </a>
              </li>`;$(n).html(l)}),$("[minus-product-id]").each((a,n)=>{var l=$(n).attr("minus-product-id");function i(){m.minusItem_(l,!0),m.components.updateMCart(),m.toastChanges()}$(n)[0].onclick=i}),$("[delete-product-id]").each((a,n)=>{var l=$(n).attr("delete-product-id");function i(){m.removeItem_(l,!0),m.components.updateMCart(),m.toastChanges()}$(n)[0].onclick=i}),A.formatDate()},cart(){var e=0,t=[],s=0;s=m.cart_.map((d,o)=>d.qty*d.retail_price).reduce((d,o)=>d+o,0),e=m.cart_.map((d,o)=>d.qty).reduce((d,o)=>d+o,0),console.log("subtotal",s),console.log("count",e),m.cart_.forEach((d,o)=>{var u='<div class="font-sm">RP <span class="font-sm format-float">'+(d.retail_price*d.qty).toFixed(2)+"</span></div>";showRP||(u='<div class="font-sm">MYR <span class="font-sm format-float">'+(d.retail_price*d.qty*r.chosen_country_id_.conversion).toFixed(2)+"</span></div>"),t.push(`

                <li><a class="dropdown-item" href="javascript:void(0);">
                <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
                    <span>`+d.name+" <small>(x"+d.qty+`)</small></span>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                    `+u+`


                    <div class="d-lg-block d-none">
                        <div class="btn btn-sm" minus-product-id="`+d.id+`"><i class="text-danger fa fa-minus"></i></div>
                        <div class="btn btn-sm" delete-product-id="`+d.id+`"><i class="text-danger fa fa-times"></i></div>
                    </div>

                    </div>
                </div>

                </a></li>

                `)}),t.length==0&&t.push(`

                <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

                `);var a=[],n=[];_.ranks.map((d,o)=>{n.push(d)}),n.sort((d,o)=>d.retail_price-o.retail_price),n.map((d,o)=>{a.push(`
                <div class="col ">
                <div class="d-flex flex-column">
                    <span>`+d.name+`</span>
                    <span class="format-float">`+d.retail_price+`</span>
                    
                </div>
                </div>`)}),$("cartItems").attr("upgrade")!=null&&(s=s+_.user.rank.retail_price);var l=this.evalRank(s),i=s/(_.ranks.length>0?_.ranks[0].retail_price:1)*100;$("cart").each((d,o)=>{var u="dropstart";$(o).attr("dropup")!=null&&(u="dropup"),$(o).customHtml(`
                            <div class="`+u+`  ">
                                <div class="mx-3 py-2 btn btn-outline-light text-white rounded-xl position-relative"  data-bs-toggle="dropdown" aria-expanded="false">
                                <div style="top: 4px !important;" class="badge bg-warning position-absolute top-0 start-100 translate-middle bc">`+e+`</div>
                                <i class="fa fa-shopping-cart"></i>
                                </div>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start ac">
                                `+t.join("")+`
                                <li id="divider">
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item navi" href="/upgrade">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex justify-content-between align-items-center">
                                        <span>Checkout</span>
                                        <span class="format-float">`+s+`</span>
                                        </div>
                                    

                                        <div class="d-flex justify-content-between align-items-center">
                                        <small>Eligible</small>
                                        <small class="text-info">`+l+`</small>
                                        </div>

                                        <div class="progress my-2" style="height: 4px;">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: `+i+'%;" aria-valuenow="'+i+`" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div class="row text-sm">
                                        `+a.join("")+`
                                        </div>

                                    
                                    </div>
                                    </a>
                                </li>

                                </ul>
                            </div>
                        `)}),$("[minus-product-id]").each((d,o)=>{var u=$(o).attr("minus-product-id");function h(){m.minusItem_(u),m.components.updateCart()}$(o)[0].onclick=h}),$("[delete-product-id]").each((d,o)=>{var u=$(o).attr("delete-product-id");function h(){m.removeItem_(u),m.components.updateCart()}$(o)[0].onclick=h}),A.formatDate()},mcart(){var e=0,t=[],s=0;s=m.mcart_.map((a,n)=>a.qty*a.retail_price).reduce((a,n)=>a+n,0),e=m.mcart_.map((a,n)=>a.qty).reduce((a,n)=>a+n,0),m.mcart_.forEach((a,n)=>{t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>`+a.name+"<br><small>(x"+a.qty+`)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              <span class="font-sm format-float">`+(a.retail_price*a.qty).toFixed(2)+`</span>


            </div>
          </div>

        </a></li>

          `)}),t.length==0&&t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `),$("mcart").each((a,n)=>{var l="dropstart";$(n).attr("dropup")!=null&&(l="dropup"),$(n).customHtml(`
          <div class="`+l+`  ">
            <div class="mx-3 py-2 btn btn-outline-danger rounded-xl position-relative"  data-bs-toggle="dropdown" aria-expanded="false">
              <div style="top: 4px !important;" class="badge bg-warning position-absolute top-0 start-100 translate-middle mbc">`+e+`</div>
              <i class="fa fa-shopping-cart"></i>
            </div>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start mac">
              `+t.join("")+`
              <li id="divider">
                <hr class="dropdown-divider">
              </li>
              <li>
                <a class="dropdown-item navi" href="/merchant_checkout">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Checkout</span>
                      <span class="format-float">`+s+`</span>
                    </div>
                  </div>
                </a>
              </li>

            </ul>
          </div>
      `)}),$("[minus-product-id]").each((a,n)=>{var l=$(n).attr("minus-product-id");function i(){m.minusItem_(l,!0),m.components.updateMCart()}$(n)[0].onclick=i}),$("[delete-product-id]").each((a,n)=>{var l=$(n).attr("delete-product-id");function i(){m.removeItem_(l,!0),m.components.updateMCart()}$(n)[0].onclick=i}),A.formatDate()},light(){$("light").customHtml(`
            <div class=" py-2 btn btn-outline-success rounded-xl position-relative light"  >
              <i class="fa fa-lightbulb far"></i>
            </div>
      `),$(".light").unbind(),$(".light").on("click",()=>{$("html").attr("data-bs-theme")=="light"?(localStorage.setItem("data-bs-theme","dark"),$("html").attr("data-bs-theme","dark")):(localStorage.setItem("data-bs-theme","light"),$("html").attr("data-bs-theme","light"))})},product(){$("product").customHtml(`
        <div class="text-center mt-4">
          <div class="spinner-border loading2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          
      <div class="loading2 d-none" id="pcontent" />
      `),r.api("get_product",{id:pageParams.id},null,e=>{$("title").html(e.name);function t(){m.first_cart_country_id==null&&m.cart_.length==0&&(m.first_cart_country_id=r.chosen_country_id_.id,console.log("first country id is "+r.chosen_country_id_.id),localStorage.setItem("first_cart_country_id",r.chosen_country_id_.id)),console.info(check),e.countries.map((i,d)=>i.id).includes(parseInt(m.first_cart_country_id))?(m.addItem_(e),m.components.updateCart(),r.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),r.toast({content:'<div class=""><ul class="">'+$(".ac").html()+"</ul></div>"})):m.first_cart_country_id==null?(m.addItem_(e),m.components.updateCart(),r.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),r.toast({content:'<div class=""><ul class="">'+$(".ac").html()+"</ul></div>"})):r.notify("Not Added ! Please choose your region products.",{delay:2e3,type:"danger",placement:{from:"top",align:"center"}})}$(".spinner-border.loading2").parent().remove(),$(".loading2").removeClass("d-none");var s;if(e.img_url!=null)try{s=e.img_url}catch{s="/images/placeholder.png"}var a='<div class="font-sm fw-light text-secondary text-center ">RP <span class="format-float">'+e.retail_price+"</span></div>";includeShippingTax&&(a='<div class="font-sm fw-light text-secondary text-center "><span class="format-float">'+(e.retail_price+e.base_shipping_fee)+" </span> RP</div>"),showRP||(a='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+e.retail_price*r.chosen_country_id_.conversion+"</span></div>",includeShippingTax&&(a='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+e.retail_price*r.chosen_country_id_.conversion*1.1+"</span></div>",r.chosen_country_id_.name=="Singapore"&&(a='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+e.retail_price*r.chosen_country_id_.conversion*1.05+"</span></div>")));var n='<div class="btn btn-outline-primary mt-4" product-id="'+e.id+'">Add</div>';if(e.instalment_packages.length>0){var l=[];e.instalment_packages.forEach((i,d)=>{c=`
            <div class=" col-12 col-lg-8 offset-lg-2 ">
              <div class="card m-4 p-4 ">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="fs-4">`+i.name+`</div>
                  <span class="d-flex flex-column">
                    <div class="text-secondary">`+i.retail_price+` RP</div>
                    <div>`+i.point_value+` PV</div> 
                  </span>
                  <span><div class="btn btn-outline-primary" product-id="`+i.id+`">Choose</div></span>
                </div>
              </div>
            </div>

          `,l.push(c)}),n='<div class="row w-100">'+l.join("")+"</div>"}$("#pcontent").customHtml(`

      <div class="d-flex flex-column justify-content-center align-items-center ">
        <h2 id="ptitle">
        </h2>
            <div  class="d-flex justify-content-center p-4 " 
                style="
                  position: relative; 
                  width: 320px;
                  height: 340px;">
            <div class="rounded py-2" style="
                  height: 340px;
                  width: 88%;
                  filter: blur(4px);
                  position: absolute;
                  background-repeat: no-repeat;
                  background-position: center;
                  background-size: cover;
                  background-image: url('`+s+`');
                  top: 30px;
                  left: 20px;
                  ">
            </div>
            <div class="rounded py-2" style="
                  height: 340px;
                  width:  100%;
                  z-index: 1;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover; 
                  background-image: url('`+s+`');
                  ">
            </div>
          </div>
        <div style="margin-top: 50px;">`+e.desc+`</div>
        `+a+`
        <div class="font-sm fw-light text-info text-center pv_label d-none">PV <span class="format-float">`+e.point_value+`</span></div>
        `+n+`
      </div>

      `),$("#ptitle").html(e.name);try{$("[product-id='"+e.id+"']")[0].onclick=t}catch{}})},products(){function e(a){var n="v2";return a=="Thailand"&&(n="th"),a=="Vietnam"&&(n="vn"),a=="China"&&(n="cn"),n}if(r.chosen_country_id_==null){var t=[];r.countries_.forEach((a,n)=>{t.push(`
                                <button type="button" aria-name="`+a.name+'" aria-country="'+a.id+'" class="btn btn-primary ">'+a.name+" "+(a.alias||"")+`</button>
                                `)}),r.modal({selector:"#mySubModal",content:`
                            <center>
                            <div class="btn-group-vertical">
                            `+t.join("")+`
                            </div>
                            </center>
                        `,header:"Choose region",autoClose:!1}),$("[aria-country]").unbind(),$("[aria-country]").click(function(){var a,n=$(this).attr("aria-country"),l=$(this).attr("aria-name");r.chosen_country_id_=n,r.notify("Chosen region: "+l),localStorage.setItem("region",l),setTimeout(()=>{$("#chosen-region").html(l)},1e3),localStorage.region!=null&&(a=e(l)),r.api("translation",{lang:a}),$("#mySubModal").modal("hide"),m.components.country(),pageParams.share_code!=null?r.api("get_share_link_by_code",{code:pageParams.share_code},null,i=>{m.components.cartItems(),r.navigateTo(location.pathname),$(".sponsor-name").customHtml("_sponsor: "+i.user.username+" _position: "+i.position),$(".sponsor-bank").html(`

                                <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold">Bank Details</span>
                                <span class=" my-4 me-4 d-flex justify-content-end align-items-end gap-1 flex-column">
                                    <div>`+i.user.bank_name+`</div>
                                    <div>`+i.user.bank_account_holder+`</div>
                                    <div>`+i.user.bank_account_no+`</div>
                                </span>
                                </div>

                                `)}):r.navigateTo("/home")})}if(r.chosen_country_id_!=null){let a=function(n){var l=$(n).attr("product-id"),i=r.api("get_product",{id:l});try{m.first_cart_country_id==null&&m.cart_.length==0&&(m.first_cart_country_id=r.chosen_country_id_.id,console.log("first country id is "+r.chosen_country_id_.id),localStorage.setItem("first_cart_country_id",r.chosen_country_id_.id)),i.countries.map((d,o)=>d.id).includes(parseInt(m.first_cart_country_id))?(m.selectedInstalment=i,m.addItem_(i),m.components.updateCart(),m.components.cartItems(),r.notify("Added "+i.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):m.first_cart_country_id==null?(m.selectedInstalment=i,m.addItem_(i),m.components.updateCart(),m.components.cartItems(),r.notify("Added "+i.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):r.notify("Not Added ! Please choose your region products.",{delay:2e3,type:"danger",placement:{from:"top",align:"center"}})}catch(d){console.error(d)}};var s=a;$("products").each((n,l)=>{$(l).customHtml(`
                        <div class="text-center mt-4">
                            <div class="spinner-border loading" role="status">
                            <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                            

                        <div class="row gx-0 d-none loading">
                            <div class="col-12 col-lg-10 offset-lg-1">
                            <div id="product_tab1"></div>
                            </div>
                        </div>
                        `).then(()=>{console.log("products loading?");var i=null,d="products",o=new O({onDrawFn:()=>{setTimeout(()=>{$("[product-id]").each((u,h)=>{h.onclick=()=>{a(h)}}),A.formatDate(),$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none")},800)},xcard:u=>{var h=u.product,g="",w="/images/placeholder.png",f=`onclick="phxApp.navigateTo('/products/`+h.id+"/"+h.name+`')"`;if($(l).attr("direct")!=null&&(f="",g='<div class="btn btn-outline-primary mt-4" product-id="'+h.id+'">Add</div>'),h.img_url!=null)try{w=h.img_url}catch{w="/images/placeholder.png"}var v='<div class=" text-primary text-center ">RP <span class="format-float">'+h.retail_price+"</span></div>";includeShippingTax&&(v='<div class="text-white text-center "><span class="format-float">'+(h.retail_price+h.base_shipping_fee)+"</span> RP</div>"),showRP||(v='<div class="font-sm fw-light text-white text-center ">MYR <span class="format-float">'+h.retail_price*r.chosen_country_id_.conversion+"</span></div>",includeShippingTax&&(v='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+h.retail_price*r.chosen_country_id_.conversion*1.1+"</span></div>",r.chosen_country_id_.name=="Singapore"&&(v='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+h.retail_price*r.chosen_country_id_.conversion*1.05+"</span></div>")));var x=`
                                                            <div  class="m-2 d-flex flex-column gap-2" `+f+`>
                                                                <div  class="d-flex justify-content-center mb-4 py-4 background-p" 
                                                                    style="
                                                                        cursor: pointer;   
                                                                        position: relative; "
                                                                    >
                                                                <div class="rounded py-2 background-p" style="
                                                                    
                                                                        width: 80%;
                                                                        filter: blur(4px);
                                                                        position: absolute;
                                                                        background-repeat: no-repeat;
                                                                        background-position: center;
                                                                        background-size: cover;
                                                                        background-image: url('`+w+`');
                                                                        
                                                                        ">
                                                                </div>
                                                                <div class="rounded py-2 foreground-p" style="
                                                                    
                                                                        width:  100%;
                                                                        z-index: 1;
                                                                        background-position: center;
                                                                        background-repeat: no-repeat;
                                                                        background-size: contain; 
                                                                        background-image: url('`+w+`');
                                                                        ">
                                                                </div>
                                                                </div>
                                                                <div class="d-flex flex-column justify-content-center gap-2 mt-4">
                                                                <div class="font-sm fw-bold text-center">`+h.name+`</div>
                                                                <div class="d-flex flex-column justify-content-center ">
                                                                    `+v+`
                                                                    <div class="font-sm fw-light text-info text-center pv_label d-none">PV <span class="format-float">`+h.point_value+`</span></div>
                                                                </div>
                                                                `+g+`

                                                            
                                                                </div>
                                                            </div>
                                                            `;return x},data:{pageLength:12,sorts:[[2,"desc"]],additional_join_statements:[{product:"product"}],additional_search_queries:["b.is_instalment=false"],country_id:r.chosen_country_id_.id,preloads:["product"],grid_class:"col-6 col-lg-3",dom:`

                                                    <"row px-4"
                                                    <"col-lg-6 col-12"i>
                                                    <"col-12 col-lg-6">
                                                    >
                                                    <"row grid_view ">
                                                    <"list_view d-none"t>
                                                    <"row transform-75 px-4"
                                                    <"col-lg-6 col-12">
                                                    <"col-lg-6 col-12"p>
                                                    >

                                                `},columns:[{label:"id",data:"id"},{label:"product_id",data:"product_id"},{label:"Action",data:"id"}],moduleName:"ProductCountry",link:"ProductCountry",customCols:i,buttons:[],tableSelector:"#"+d});o.load(d,"#product_tab1")})})}},announcement(){try{$(".anc").slick("destroy")}catch{}$("announcement").customHtml(`
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      `),r.api("announcements",{},null,e=>{$("announcement").customHtml(""),e.forEach((t,s)=>{function a(){r.modal({selector:"#mySubModal",content:t.content,autoClose:!1,header:t.title})}var n=t.img_url,l=`
          <div class="d-flex flex-column align-items-center" >

            <div class="d-flex justify-content-center " style="cursor: pointer;   
            position: relative; height: 240px;" announcement-id="`+t.id+`">
              <div class="sub rounded py-2" style="
               
                  position: absolute;
                  filter: blur(10px); 
                              background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain; 
                  background-image: url('`+n+`');
                 ">
              </div>
              <div class="su rounded py-2" style="
            
           

                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover; 
                  background-image: url('`+n+`');
                  z-index: 1;
                  top: 16px;
                  position: absolute;">
              </div>
            </div>
            <span class="mt-3">`+t.title+`</span>
            <small>`+t.subtitle+`</small>
            
          </div>

        `;$("announcement").append(l),$("[announcement-id='"+t.id+"']")[0].onclick=a})}),$(".anc").slick()},bonusLimit(){r.api("get_bonus_limit",{token:_.user.token},null,e=>{var t=Number(e.limit)||0,s=Number(e.accumulated)||0,a=Math.max(0,t-s),n=t>0?Math.min(100,Math.round(s/t*100)):0;$("bonusLimit").customHtml(`
                <div class="d-flex flex-column gap-2">
                  <span> Remaining bonus: <span class="">`+a+`</span> BP</span>
                  <div class="progress" role="progressbar" aria-valuenow="`+n+`" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: `+n+`%;"></div>
                  </div>
                  <span>Please repurchase package, to increase earning limit.</span>
                </div>
              `)})},rewardList(){$("rewardList").each((e,t)=>{$(t).customHtml(`
        <div class="text-center mt-4">
          <div class="spinner-border loading" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          

        <div class="row gx-0 d-none loading">
          <div class="col-12">
            <div id="tab`+e+`">No rewards</div>
          </div>
        </div>
      `);var s=$(t).attr("prev")!=null;console.log(s),r.api("get_reward_summary",{user_id:_.user.id,is_prev:s},null,a=>{$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none");var n=["sharing bonus","team bonus","matching bonus","elite leader","travel fund","repurchase bonus","drp sales level bonus","stockist register bonus","merchant sales level bonus","biz incentive bonus","matching biz incentive bonus"],l=[];n.forEach((i,d)=>{a.forEach((o,u)=>{i==o.name&&l.push(`

                                  <div class="my-2 d-flex align-items-center justify-content-between">

                                    <span class="fs-5">
                                      `+A.capitalize(o.name)+`
                                    </span>
                                    <span class="d-flex justify-content-between gap-2 align-items-center">
                                      <span class="format-float">
                                        `+o.sum+`
                                      </span>
                                      <a href="/reward_details/`+o.name+"/"+o.period[0]+"/"+o.period[1]+`" class="navi btn btn-primary btn-sm">
                                      <i class="fa fa-info"></i>
                                      </a>
                                    </span>
                                  </div>


                              `)})}),$("#tab"+e).customHtml(""+l.join("")),phxApp.formatDate()})})},rewardSummary(){$("rewardSummary").each((e,t)=>{$(t).customHtml(`
                    <div class="text-center mt-4">
                      <div class="spinner-border loading" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                      

                    <div class="row gx-0 d-none loading">
                      <div class="col-12">
                        <div id="tabw`+e+`">No rewards</div>
                      </div>
                    </div>
                  `);var s=!1;console.log(s),r.api("get_reward_summary_by_years",{user_id:_.user.id},null,a=>{var n=[];$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none"),console.log("testst");var l=Object.keys(a.years);l.forEach((i,d)=>{n.push(`

                                  <div class="my-2 d-flex align-items-center justify-content-between">

                                    <span class="fs-5">
                                      `+i+`
                                    </span>
                                    <span class="d-flex justify-content-between gap-2 align-items-center">
                                      <div>
                                      <span class="format-float">
                                        `+a.years[i][0].sum+` 
                                      </span>
                                      BP
                                        </div>
                                        <a class="btn btn-primary btn-sm" target="_blank" href="/pdf?type=commission&id=`+_.user.id+"&year="+i+`">
                                        Download
                                      </a>
                                    </span>
                                  </div>


                              `)}),console.info(n),$("#tabw"+e).customHtml(""+n.join("")),phxApp.formatDate()})})},wallet(){if(_.user!=null){var e=_.user,t=r.api("user_wallet",{token:e.token});t.length==0?$("wallet").parent().customHtml('<div class="p-4">Wallet info expired</div>'):$("wallet").each((s,a)=>{var n=t.filter((o,u)=>o.wallet_type==$(a).attr("aria-data"));if(n.length>0){var l=n[0],i=$(a).attr("aria-data").split("_").map((o,u)=>A.capitalize(o)).join(" "),d=i.split(" ").map((o,u)=>o.split("")[0].toUpperCase()).join("")+"P";$(a).customHtml(`
            <a href="/wallets/`+l.id+`" class="navi" >

            <div class=" card mb-3 mb-lg-0">
 
              <div class="card-body p-1 py-2 " style="width: 220px;">
                <div class="d-flex gap-1 align-items-center">
                  <div wallet-id="`+l.id+`" class="d-none d-lg-block mx-2 py-2 btn btn-outline-success rounded-xl">
                    <i class=" fa fa-dollar-sign "></i>
                  </div>
                  <div class="ps-2 ps-lg-0">
                    <span class="text-sm text-secondary text-truncate">`+i+", <b>"+d+`</b></span>
                    <div class="d-flex align-items-center gap-2">
                      <div class="fs-4 format-int" style="">`+l.total+`</div>
                      <small>pts</small>
                    </div>
                  </div>
                </div>
              </div>

        
            </div>
            </a>

        `)}}),A.formatDate()}},primaryBuy(){function e(s){if(!s||!s.lines){$("#quote-summary").html("No quote yet."),$("#quote-lines").html("");return}if($("#quote-summary").html(`Filled Qty: <b>${s.filled_qty}</b> • Total Cost: <b>${s.total_cost}</b>`),s.lines.length===0){$("#quote-lines").html("");return}var a=s.lines.map(n=>`
              <tr>
                <td>#${n.seq}</td>
                <td class="text-end">${n.qty}</td>
                <td class="text-end">${n.unit_price}</td>
              </tr>
            `).join("");$("#quote-lines").html(`
              <div class="table-responsive">
                <table class="table table-sm">
                  <thead>
                    <tr><th>Tranche</th><th class="text-end">Qty</th><th class="text-end">Unit Price</th></tr>
                  </thead>
                  <tbody>${a}</tbody>
                </table>
              </div>
            `)}$(document).on("click","#btn-quote",function(){var s=parseInt($("#asset_id").val()||"0"),a=$("#qty").val()||"0";r.api("primary_buy_quote",{asset_id:s,qty:a},null,function(n){e(n)})});let t="";$(document).on("click","#btn-execute",function(){var s=parseInt($("#asset_id").val()||"0"),a=$("#qty").val()||"0",n=crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);r.post("primary_buy_execute",{token:r.user&&r.user.token,asset_id:s,qty:a,idempotency_key:n},null,function(l){$("#result-card").removeClass("d-none"),l.status==="ok"?$("#result-summary").html(`Order #${l.order_id} • Filled: ${l.filled_qty} • Paid: ${l.total_cost} • Status: ${l.status2}`):$("#result-summary").html(`<span class="text-danger">${l.reason||"Error"}</span>`)})}),r.api("list_assets",{token:r.user&&r.user.token},null,function(s){t=s.map(a=>`<option value="${a.id}">${a.name}</option>`).join("")}),$("primaryBuy").customHtml(`
                            <div class="card">
                                <div class="card-body">
                                    <div class="row g-2">
                                        <div class="col-12">
                                            <label class="form-label">Asset ID</label>
                                            <select class="form-control" id="asset_id">
                                                <option value="0">Select Asset</option>
                                                `+t+`
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label">Quantity</label>
                                            <input type="number" class="form-control" id="qty" placeholder="100000" />
                                        </div>
                                        <div class="col-12 d-flex gap-2">
                                            <button id="btn-quote" class="btn btn-outline-primary">Quote</button>
                                            <button id="btn-execute" class="btn btn-primary">Buy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card mt-4">
                                <div class="card-body">
                                    <h5 class="card-title">Quote</h5>
                                    <div id="quote-summary" class="text-secondary">No quote yet.</div>
                                    <div id="quote-lines" class="mt-3"></div>
                                </div>
                            </div>

                            <div class="card d-none mt-4" id="result-card">
                                <div class="card-body">
                                    <h5 class="card-title">Result</h5>
                                    <div id="result-summary"></div>
                                </div>
                            </div>
        `)},secondaryBuy(){function e(l){if(!l){$("#market-depth").html("Loading market data...");return}let i=l.sell_orders.map(o=>{let u="";return r.user&&r.user.id&&r.user.id==o.user.id&&(u=`<div class="btn btn-sm btn-danger cancel-order" id="cancel-sell-${o.id}" style="padding: 4px 12px !important;">Cancel</div>`),`
            <tr>
              <td class="text-end">${o.quantity}</td>
              <td class="text-end text-danger">${o.price_per_unit}</td>
              <td class="text-end">${o.user.username}</td>
              <td>

                ${u}
              </td>
            </tr>
          `}).join(""),d=l.buy_orders.map(o=>`
            <tr>
              <td class="text-end">${o.quantity}</td>
              <td class="text-end text-success">${o.price_per_unit}</td>
              <td class="text-end">${o.user.username}</td>
              <td></td>
            </tr>
          `).join("");$("#market-depth").html(`
            <div class="row">
              <div class="col-12 col-lg-6">
                <h6 class="text-danger">Sell Orders</h6>
                <div class="table-responsive">
                  <table class="table table-sm table-striped">
                    <thead>
                      <tr><th class="text-end">Qty</th><th class="text-end">Price</th><th class="text-end">User</th><td></td></tr>
                    </thead>
                    <tbody>${i||'<tr><td colspan="4" class="text-center text-muted">No sell orders</td></tr>'}</tbody>
                  </table>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <h6 class="text-success">Buy Orders</h6>
                <div class="table-responsive">
                  <table class="table table-sm table-striped">
                    <thead>
                      <tr><th class="text-end">Qty</th><th class="text-end">Price</th><th class="text-end">User</th><td></td></tr>
                    </thead>
                    <tbody>${d||'<tr><td colspan="4" class="text-center text-muted">No buy orders</td></tr>'}</tbody>
                  </table>
                </div>
              </div>
            </div>
          `)}function t(l){r.post("cancel_order",{token:r.user&&r.user.token,order_id:l,user_id:r.user&&r.user.id},null,function(i){i.status==="ok"?($("#mySubModal").modal("hide"),$("#cancel-sell-"+l).remove(),r.notify("Sell order cancelled successfully")):r.notify("Failed to cancel sell order",{type:"danger"})})}$(document).on("click",".cancel-order",function(){var l=$(this).attr("id").split("-")[2];r.modal({selector:"#mySubModal",content:`
              <center>
              <p>Cancel this order?</p>
                <div class="btn-group-vertical">
                    <button class="btn btn-danger" id="btn-cancel-sell-${l}">Cancel</button>
                </div>
              </center>
            `,header:"Cancel Order",autoClose:!1}),$(document).on("click","#btn-cancel-sell-"+l,function(){t(l)})});function s(l){if(!l||l.length===0){$("#recent-trades").html('<div class="text-center text-muted">No recent trades</div>');return}let i=l.map(d=>`
            <tr>
              <td>${new Date(d.trade_date).toLocaleString()}</td>
              <td class="text-end">${d.quantity}</td>
              <td class="text-end">${d.price_per_unit}</td>
              <td class="text-end">${d.total_amount}</td>
              <td class="text-end">${d.buyer.username}</td>
              <td class="text-end">${d.seller.username}</td>
            </tr>
          `).join("");$("#recent-trades").html(`
            <div class="table-responsive">
              <table class="table table-sm table-striped">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th class="text-end">Qty</th>
                    <th class="text-end">Price</th>
                    <th class="text-end">Total</th>
                    <th class="text-end">Buyer</th>
                    <th class="text-end">Seller</th>
                  </tr>
                </thead>
                <tbody>${i}</tbody>
              </table>
            </div>
          `)}function a(){var l=parseInt($("#sm_asset_id").val()||"0");l>0?(r.api("get_market_depth",{asset_id:l},null,function(i){e(i)}),r.api("get_recent_trades",{asset_id:l},null,function(i){s(i)})):($("#market-depth").html(""),$("#recent-trades").html(""))}$(document).on("change","#sm_asset_id",function(){var l=parseInt($(this).val()||"0");l>0?(r.api("get_market_depth",{asset_id:l},null,function(i){e(i)}),r.api("get_recent_trades",{asset_id:l},null,function(i){s(i)})):($("#market-depth").html(""),$("#recent-trades").html(""))}),$(document).on("click","#btn-create-sell",function(){var l=parseInt($("#sm_asset_id").val()||"0"),i=parseFloat($("#sm_sell_qty").val()||"0"),d=parseFloat($("#sm_sell_price").val()||"0");if(l===0||i<=0||d<=0){alert("Please fill in all fields with valid values");return}r.api("create_sell_order",{token:r.user&&r.user.token,asset_id:l,quantity:i,price_per_unit:d},null,function(o){o.status==="ok"?(r.notify("Sell order created successfully! Order ID: "+o.res.id),$("#sm_asset_id").trigger("change"),$("#sm_sell_qty, #sm_sell_price").val("")):$("#sell-result").html(`<div class="alert alert-danger">Error: ${o.reason||"Failed to create sell order"}</div>`)})}),$(document).on("click","#btn-create-buy",function(){var l=parseInt($("#sm_asset_id").val()||"0"),i=parseFloat($("#sm_buy_qty").val()||"0"),d=parseFloat($("#sm_buy_price").val()||"0");if(l===0||i<=0||d<=0){alert("Please fill in all fields with valid values");return}r.api("create_buy_order",{token:r.user&&r.user.token,asset_id:l,quantity:i,price_per_unit:d},null,function(o){o.status==="ok"?($("#buy-result").html(`<div class="alert alert-success">Buy order created successfully! Order ID: ${o.order_id}</div>`),$("#sm_asset_id").trigger("change"),$("#sm_buy_qty, #sm_buy_price").val("")):$("#buy-result").html(`<div class="alert alert-danger">Error: ${o.reason||"Failed to create buy order"}</div>`)})});let n="";r.api("list_assets",{token:r.user&&r.user.token},null,function(l){n=l.map(i=>`<option value="${i.id}">${i.name}</option>`).join("")}),$("secondaryBuy").customHtml(`
          <div class="row">
            <div class="col-12">
              <div class="card mb-3">
                <div class="card-header">
                  <h5 class="card-title mb-0">Secondary Market</h5>
                  <small class="text-muted">Trade your staked assets with other users</small>
                </div>
                <div class="card-body">
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="form-label">Select Asset</label>
                      <select class="form-select" id="sm_asset_id">
                        <option value="0">Choose an asset to trade</option>
                        ${n}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-6">
              <div class="card mb-3">
                <div class="card-header">
                  <h6 class="card-title mb-0 text-danger">Create Sell Order</h6>
                  <small class="text-muted">Sell your active tokens for cash</small>
                </div>
                <div class="card-body">
                  <div class="row g-2">
                    <div class="col-12">
                      <label class="form-label">Quantity</label>
                      <input type="number" class="form-control" id="sm_sell_qty" placeholder="Enter quantity" step="0.01" />
                    </div>
                    <div class="col-12">
                      <label class="form-label">Price per Unit</label>
                      <input type="number" class="form-control" id="sm_sell_price" placeholder="Enter price per unit" step="0.01" />
                    </div>
                    <div class="col-12">
                      <button id="btn-create-sell" class="btn btn-danger w-100">Create Sell Order</button>
                    </div>
                  </div>
                  <div id="sell-result" class="mt-2"></div>
                </div>
              </div>
            </div>
            
            <div class="col-12 col-lg-6">
              <div class="card mb-3">
                <div class="card-header">
                  <h6 class="card-title mb-0 text-success">Create Buy Order</h6>
                  <small class="text-muted">Buy active tokens with cash</small>
                </div>
                <div class="card-body">
                  <div class="row g-2">
                    <div class="col-12">
                      <label class="form-label">Quantity</label>
                      <input type="number" class="form-control" id="sm_buy_qty" placeholder="Enter quantity" step="0.01" />
                    </div>
                    <div class="col-12">
                      <label class="form-label">Price per Unit</label>
                      <input type="number" class="form-control" id="sm_buy_price" placeholder="Enter price per unit" step="0.01" />
                    </div>
                    <div class="col-12">
                      <button id="btn-create-buy" class="btn btn-success w-100">Create Buy Order</button>
                    </div>
                  </div>
                  <div id="buy-result" class="mt-2"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card mb-3">
                <div class="card-header">
                  <h6 class="card-title mb-0">Market Depth</h6>
                  <small class="text-muted">Current buy and sell orders</small>
                </div>
                <div class="card-body">
                  <div id="market-depth" class="text-center text-muted">Select an asset to view market depth</div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h6 class="card-title mb-0">Recent Trades</h6>
                  <small class="text-muted">Latest completed trades</small>
                </div>
                <div class="card-body">
                  <div id="recent-trades" class="text-center text-muted">Select an asset to view recent trades</div>
                </div>
              </div>
            </div>
          </div>
        `),$("select#sm_asset_id").val(1),a()},assetTranches(){$("assetTranches").customHtml(`
            <div class="row">
              <div class="col-12">
                <div class="card mb-3">
                  <div class="card-body">
                    <div id="asset-tranches" class="text-center text-muted">Loading asset tranches...</div>
                  </div>
                </div>
              </div>
            </div>
          `),r.api("secondary_qty_by_price_with_tranche",{token:r.user&&r.user.token},null,function(e){let t=[];e.forEach(s=>{t.push(`
                    <tr>
                        <td>#${s.seq}</td>
                        <td>${s.unit_price}</td>
                           <td>${s.total_quantity}</td>
                        <td>${s.total_quantity-s.total_traded}</td>
                     
                        <td>${s.company_traded}</td>
                        <td>${s.member_traded}</td>
                     
                        
                        
                    </tr>
                `)}),$("assetTranches").customHtml(`
            <div class="row">
                <div class="col-12">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="card-title mb-0">Asset Tranches</h6>
                            <small class="text-muted">Current tranches</small>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead class="table-light">
                                        <tr>
                                            <th scope="col">Tranche</th>
                                             <th scope="col">Unit Price</th>
                                            <th scope="col">Total Quantity</th>
                                            <th scope="col">Balance</th>
                                            <th scope="col">Company Traded</th>
                                            <th scope="col">Members Traded</th>
                                            
                                            
                                           
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        `+t.join("")+`
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)})},userProfile(){var e=_.user;if(e){var t=["Bronze","Silver","Gold","Diamond","Shopper"],s=["Bronze","Silver","Gold","Diamond","Shopper"],a=e.rank!=null?e.rank.name:e.rank_name,n=t[s.indexOf(a)];r.chosen_country_id_.name=="China"&&(n=a);var l=e!=null?'Welcome! <a href="/profile" class="navi">'+e.fullname+" ("+n+")</a>":'<a href="/login" class="navi">Login</a>';$("userProfile").customHtml(`
          
            `+l+`
         
      `)}else $("userProfile").customHtml(`
          
          <a href="/login" class="navi">Login</a>
         
      `)}}};window.commerceApp=m;const B="nph_api.damienslab.com",L="https://";let r={endpoint:L+B,Page:{createTable(e,t){var s=`
            <div class="table-responsive">
                <table class="table"  style="width: 100%;" id="`+e+`">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
    `;$(t).append(s)}},chosen_country_id_:null,countries_:[],route_names:[{html:"landing.html",title:"Home",route:"/home",public:!0}],render(e){m.components[e]()},rowData(e){var t=e.dataSource;window.currentSelector=t.tableSelector;var s=t.table;s.row(e.row);var a=s.data()[e.index];return a},override(e){_.override(e)},updateUser(e){_.updateUser(e)},login(e){_.login(e)},logout(){_.logout()},user:null,addItem(e){var t=r.api("get_product",{id:e});t.payInstalment=!0,m.addItem_(t),m.components.updateCart(),m.components.cartItems()},filterItemsByName(e){return m.filterItemsByName(e)},hasCartItems(){return console.log("checking..."),console.log(m.hasCartItems()),m.hasCartItems()>0},merchantCheckout(e){_.merchantCheckout(e)},redeem(e){_.redeem(e)},upgrade(e){_.upgrade(e)},linkRegister(e){_.linkRegister(e)},register(e){_.register(e)},formatDate(){A.formatDate()},ping(){console.log("tell ping o")},reinit(){$(".dataTable").each((e,t)=>{if(t.offsetParent!=null){var s=window.phoenixModels.filter((a,n)=>a.tableSelector=="#"+t.id)[0];s.reload()}})},evalTitle(e){if(localStorage.getItem("default-lang")=="cn")switch(e.replace(" ","")){case"Home":e="首页";break;case"Profile":e="个人";break;case"Upgrade":e="升级";break;case"Restocks":e="朴货";break;case"Registrations":e="审核";break;case"Sales":e="业绩";break;case"Commissions":e="佣金";break;default:e=e}return e},async navigateTo(e,t){e==null&&(e=window.location.pathname);var s=e.split("/").filter((f,v)=>f!=""),a=this.route_names.filter((f,v)=>{var x=f.route.split("/").filter((k,P)=>k!="");return x[x.length-1].includes(":")?x.length==s.length:x.length==s.length&&x[x.length-1]==s[x.length-1]}),n=a.filter((f,v)=>{var x=f.route.split("/").filter((k,P)=>k!="");return x[0]==s[0]});if(this.hide(),_.restoreUser(),n.length>0){var l={};if(n.forEach((f,v)=>{f.route.split("/").forEach((x,k)=>{x.includes(":")&&(l[x.replace(":","")]=s[k-1])})}),console.info(n),!n[0].public)if(await _.restoreUser(),console.log("resting?",n[0].route),_.user!=null){if(n[0].route=="/share_link"&&_.user.rank.name=="Shopper"){r.toast({content:"Please upgrade package to access this page",header:"Unauthorized",type:"danger"}),r.navigateTo("/");return}}else{r.navigateTo("/logout");return}window.pageParams=l;var i="";if(t==null?i="":i=t,window.back)window.back=!1;else{var d={route:e,fn:"phxApp.navigateTo('"+e+"', '"+i+"')",params:l};window.stateObj=d,window.matchTitle=n[0].title,window.matchRoute=e,Object.keys(l).includes("title")?(history.pushState(d,evalTitle(l.title),e),$("title").html(this.evalTitle(l.title))):(history.pushState(d,this.evalTitle(n[0].title),e),$("title").html(this.evalTitle(n[0].title)))}var o=this.html("blog_nav.html"),u=this.html("footer_modals.html"),h=this.html(n[0].html),g=`
      <div class="page-content pb-0">
        `+h+`
      </div>
        `+u+`
          `,w=Object.keys(n[0]);if(w.includes("skipNav"))$("#content").html(g),this.navigateCallback();else{if(w.includes("customNav"))var o=this.html(n[0].customNav);$("#content").html(o),$("#content").append(g),this.navigateCallback()}return n[0]}else{console.info(a);var o=this.html("blog_nav.html"),u=this.html("footer_modals.html"),h=this.html("landing.html"),g=`
      <div class="page-content pb-0">
        `+h+`
      </div>        `+u;$("#content").html(o),$("#content").append(g),this.navigateCallback()}},modal(e){var t={selector:"#myModal",body:".modal-body",title:".modal-title",foot:".modal-footer",header:"Modal Header",content:"Here is content for modal body",footer:"",drawFn:()=>{},autoClose:!0},s=Object.keys(t);s.forEach((a,n)=>{this[a]=t[a]}),s.forEach((a,n)=>{e[a]!=null&&(this[a]=e[a])}),$(this.selector).find(this.title).customHtml(this.header),$(this.selector).find(this.body).customHtml(this.content),$(this.selector).find(this.foot).customHtml(this.footer),$(this.selector).modal("show"),this.drawFn(),this.autoClose&&setTimeout(()=>{$(this.selector).modal("hide")},5e3)},toast(e){var t={selector:"#notification-1",body:".toast-body",title:".tbody",foot:".modal-footer",header:"Modal Header",content:"Here is content for modal body",footer:"",drawFn:()=>{},autoClose:!0},s=Object.keys(t);s.forEach((a,n)=>{this[a]=t[a]}),s.forEach((a,n)=>{e[a]!=null&&(this[a]=e[a])}),$(this.selector).find(this.title).customHtml(this.header),$(this.selector).find(this.body).customHtml(this.content),$(this.selector).toast("show"),this.drawFn(),this.autoClose},notify(e,t){t==null&&(t={});var s={delay:2e3,type:"info"},i=Object.keys(s);i.forEach((d,o)=>{this[d]=s[d]}),i.forEach((d,o)=>{t[d]!=null&&(this[d]=t[d])});var a={},n={};typeof e=="object"?n=e:n={message:e};var l={message:"Your text here",title:"System Message:",icon:"fa fa-exclamation-circle"},i=Object.keys(l);i.forEach((d,o)=>{a[d]=l[d]}),i.forEach((d,o)=>{n[d]!=null&&(a[d]=n[d])});try{typeof $.notify=="function"?(console.log(t),$.notify(a,t)):this.toast({content:a.message,header:a.title})}catch{this.toast({content:a.message,header:a.title})}},reflect(e){var t={};return e.forEach((s,a)=>{console.log(a);var n={};if(a.includes("[")){console.log("has child");var l=a.split("[")[0],i=a.split("[")[1].split("]")[0];n[i]=s,t[l]={...t[l],...n}}else{if(!Reflect.has(t,a)){t[a]=s;return}Array.isArray(t[a])||(t[a]=[t[a]]),t[a].push(s)}}),t},validateForm(e,t){var s=$(e).find("[name]").filter((n,l)=>($(l).removeClass("is-invalid"),l.checkValidity()==!1));if(s.length>0){var a=[];s.map((n,l)=>{$(l).addClass("is-invalid");var i=$(l).closest(".input-style").find("label div").html();i==null&&(i=$(l).attr("name")),a.push(i)}),r.notify("This input: "+a.join(", ")+" is not valid!",{type:"danger"})}else t()},form(e,t,s,a,n){r.show();var l="",i=new FormData($(e)[0]);if(i.append("scope",t),n!=null){var d=Object.keys(n);d.forEach((u,h)=>{i.append(u,n[u])})}t=="login"&&(l="/login");var o=this.csrf_();$.ajax({url:this.endpoint+"/svt_api/webhook"+l,dataType:"json",headers:{"phx-request":"true",Authorization:"Basic "+(r.user!=null?r.user.token:null),"x-csrf-token":o},method:"POST",enctype:"multipart/form-data",processData:!1,contentType:!1,data:i}).done(function(u){if(r.hide(),u.status=="ok"){r.notify("Added!",{type:"success"});try{u.res!=null&&s(u.res)}catch{}}else u.reason!=null?r.notify("Not added! "+u.reason,{type:"danger"}):r.notify("Not added!",{type:"danger"})}).fail(function(u){u.status==403&&_.logout(),r.notify("Not added!",{type:"danger"})})},html(e){$(".modal-body").each((l,i)=>{$(i).html("")});var t="v2";function s(l){var i="v2";return l=="Thailand"&&(i="th"),l=="Vietnam"&&(i="vn"),l=="China"&&(i="cn"),i}localStorage.region!=null&&(t=s(localStorage.region)),t="v2";var a="",n="/html/"+t+"/"+e;return console.log("url",n),$.ajax({async:!1,method:"get",url:n}).done(l=>{a=l}),a},token:null,csrf_(e){if(this.token==null)this.token=$("input[name='_csrf_token_ori']").val();else if(e)this.token=$("input[name='_csrf_token_ori']").val();else return this.token},api(e,t,s,a){var n="",l=this.csrf_();return $.ajax({async:!1,method:"get",headers:{"phx-request":"true",Authorization:"Basic "+(r.user!=null?r.user.token:null),"X-CSRF-Token":l},url:this.endpoint+"/svt_api/webhook?scope="+e,data:t}).done(i=>{console.log(i),a!=null&&a(i),n=i}).fail(function(i){i.status==403&&_.logout();try{r.notify("Not Added! reason: "+i.responseJSON.reason,{type:"danger"})}catch{r.notify("Ops, somethings' not right!",{type:"danger"})}r.show(),setTimeout(()=>{s!=null&&s(),r.hide()},500)}),n},post(e,t,s,a){var n="",l=$("input[name='_csrf_token_ori']").val(),i={...t,_csrf_token:l};return console.log(i),$.ajax({async:!1,method:"post",headers:{"phx-request":"true",Authorization:"Basic "+(r.user!=null?r.user.token:null),"X-CSRF-Token":l},url:this.endpoint+"/svt_api/webhook?scope="+e,data:i}).done(d=>{a!=null&&a(d),n=d}).fail(function(d){d.status==403,r.notify("Ops, somethings' not right!",{type:"danger"}),setTimeout(()=>{s!=null&&s(),r.hide()},500)}),n},evaluateLang(){},toTop(){$("body")[0].scrollIntoView()},async putToken(){this.csrf_(!0),$("input#need-token")&&$("input[name='_csrf_token']").val($("input[name='_csrf_token_ori']").val())},evalCart(){window.location.pathname.includes("merchant")&&($(".showMcart").toggleClass("d-none"),$(".showCart").toggleClass("d-none"))},async navigateCallback(){_.restoreUser(),m.restoreCart(),m.restoreCart(!0),this.user=_.user,this.user!=null&&(this.user.wallets=null);try{m.render()}catch{}this.evaluateLang(),this.toTop(),this.hide(),this.putToken(),this.evalCart()},show(){console.log("drop shadow.."),$(".wrapper-ring").show(),setTimeout(()=>{$(".wrapper-ring").hide()},1e3)},hide(){console.log("hide shadow..");try{$(".wrapper-ring").hide()}catch{}},repopulateFormInput(e,t){console.log(e);var s=$(t).find("[name]");$(s).each(function(a,n){var l=$(n).attr("aria-label");l==null&&(l=$(n).attr("name"));var i=$(n).attr("aria-value"),d=l.split("[")[0],o=l.replace("[","").replace("]","").replace(d,"");if($(n).prop("localName")=="select")console.log("is select"),l.includes("[")?$(n).val(e[d][o]):$(n).val(e[l]);else if(i!=null)$(n).val(i);else if($(n).hasClass("code"))try{$(n).val(e[l]);var u=document.createElement("input");u.setAttribute("type","hidden"),u.setAttribute("name",$(n).attr("name")),$(n).after(u);var h=ace.edit($("textarea")[0],{mode:"ace/mode/html",selectionStyle:"text"});h.resize(),window.editor=h,h.session.setUseWrapMode(!0),h.session.on("change",function(k){$(u).val(window.editor.getValue()),console.log("ace here")})}catch(k){console.log(k),$(n).val(e[l])}else if($(n).attr("type")=="checkbox")if(console.log("got data?"),console.log(e[l]),$(n).hasClass("many_2_many")){var g=parseInt(n.name.split("][")[1].split("]")[0]);try{var w=e[l].filter((k,P)=>k.id==g);w.length>0&&$(n).prop("checked",e[l])}catch(k){console.log(k),$(n).prop("checked",!1)}}else $(n).prop("checked",e[l]);else if(e!=null)if(console.log(l),console.log("name: "+l+", data: "+e[l]),l.includes("."))try{var f=$(n).closest("form").attr("id"),v=l.split(".");v.length==2&&($(n).val(e[v[0]][v[1]]),$(n).parent().append(`<input type='hidden' value="`+e[v[0]].id+'" name="'+f+"["+v[0]+'][id]"></input>')),v.length==3&&($(n).val(e[v[0]][v[1]][v[2]]),$(n).parent().append(`<input type='hidden' value="`+e[v[0]].id+'" name="'+f+"["+v[0]+'][id]"></input>')),v.length==1&&($(n).val(e[v[0]]),$(n).parent().append(`<input type='hidden' value="`+e[v[0]].id+'" name="'+f+"["+v[0]+'][id]"></input>'))}catch(k){console.log(k),$(n).val(e[l])}else if(l.includes("["))try{$(n).val(e[d][o])}catch(k){console.log(k),$(n).val(e[l])}else if(l=="_csrf_token"){var x=$("input[name='_csrf_token_ori']").val();$(n).val(x)}else try{$(n).val(e[l])}catch(k){console.log(k),console.log("missing dom?")}else console.log("name: "+l+", data: ?")})},generateInputs(e,t,s,a){var n="",l="",i="col-12 col-lg-6",o=t.charAt(0).toUpperCase()+t.slice(1);typeof a=="object"&&(a.alt_name!=null&&(o=a.alt_name),a.alt_class!=null&&(i=a.alt_class));var d=Object.keys(l),o=d.reduce((v,x)=>{var k=new RegExp(x,"g");return v.replace(k,l[x])},o);switch(e[t]){case"string":n='<div class="'+i+`">
                      <div class="ps-0 py-0 text-secondary">`+o+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control-plaintext">
                        </div>
                      </div>
                    </div>`;break;case"boolean":n=`<div class="row d-flex align-items-center ">
                      <label class="offset-lg-1 col-sm-3 col-form-label text-start label-checkbox">`+o+`</label>
                      <div class="col-sm-6 checkbox-radios">
                        <div class="form-check">
                          <label class="form-check-label">
                            <input class="form-check-input" type="checkbox" aria-label="`+t+'" name="'+s+"["+t+']" value=""> This '+t+`
                            <span class="form-check-sign">
                              <span class="check"></span>
                            </span>
                          </label>
                        </div>
                        
                      </div>
                    </div>`;break;case"integer":t.includes("id")||t=="id "?n='<input  aria-label="'+t+'" name="'+s+"["+t+']" type="hidden" class="form-control" value="0">':n='<div class="'+i+`">
                      <div class="ps-1 py-2">`+o+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="number" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control">
                        </div>
                      </div>
                    </div>`;break;case"date":n='<div class="'+i+`">
                      <div class="ps-1 py-2">`+o+`</div>
                      <div class="col-sm-12">
                        <div class="form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datepicker">
                        </div>
                      </div>
                    </div>`;break;case"naive_datetime":n='<div class="'+i+`">
                      <div class="ps-1 py-2">`+o+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datetimepicker">
                        </div>
                      </div>
                    </div>`;break;default:t=="id"||t.includes("_id")?n='<input  aria-label="'+t+'" name="'+s+"["+t+']" type="hidden" class="form-control" value="0">':n='<div class="'+i+`">
                      <div class="ps-0 py-0 text-secondary">`+o+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control-plaintext">
                        </div>
                      </div>
                    </div>`}if(typeof a=="object"){var u=[];if(a.selection!=null){var h="",g="";a.live_search!=null&&a.live_search&&(h='data-live-search="true"'),a.multiple!=null&&a.multiple&&(g="multiple"),$(a.selection).each(function(v,x){var k,P;typeof x=="object"?(k=x.name,P=x.id):(k=x,P=x),u.push('<option value="'+P+'">'+k+"</option>")}),n='<div class="'+i+`">
                      <div class="ps-1 py-2">`+o+`</div>
                      <div class="col-sm-12">
                        <div class="form-group">
                         <select `+g+" "+h+'aria-label="'+t+'" name="'+s+"["+t+`]" class="form-control selectpicker" >
                         `+u.join("")+`
                         </select>
                        </div>
                      </div>
                    </div>`}if(a.binary&&(n='<div class="'+i+`">
                      <div class="ps-1 py-2">`+o+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <textarea rows=12 cols=12 aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control"></textarea>
                        </div>
                      </div>
                    </div>`),a.placeholder&&(n='<div class="'+i+`">
                      `+a.placeholder+`
                    </div>`),a.code&&(n=`<div class="row">
                      <label class="col-sm-3 col-form-label text-end">`+o+`</label>
                      <div class="col-sm-9">
                        <div class="form-group bmd-form-group">
                          <textarea rows=4 cols=12 aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control code"></textarea>
                        </div>
                      </div>
                    </div>`),a.checkboxes!=null){var w=[];a.checkboxes.sort(function(v,x){return v.name.localeCompare(x.name)}),$(a.checkboxes).each((v,x)=>{var k=`
                    <div class="form-check">
                      <label class="text-capitalize">
                        <input aria-label="`+t+'" class="form-check-input many_2_many" type="checkbox" name="'+s+"["+t+"]["+x.id+']"  value="true"> '+x.name+`
                        <span class="form-check-sign">
                          <span class="check"></span>
                        </span>
                      </label>
                    </div>`;w.push(k)}),n=`<div class="row">
                      <label class="col-sm-2 col-form-label text-end">`+o+`</label>
                      <div class="col-sm-8">
                        <div class="form-group bmd-form-group">
                          `+w.join("")+`
                        </div>
                      </div>
                    </div>`}if(a.upload&&(n='<div class="'+i+`">
                      <div class="pb-1 pt-1 ps-1 text-start">`+o+`</div>
                      <div class="col-sm-12">
                        
                        <img style="display: none;" id="myImg" src="#" alt="your image" width=300>
                          <input style="padding-top: 2vh;" type="file" aria-label="`+t+'" name="'+s+"["+t+`]" class="">
                        
                      </div>
                    </div>`),a.editor&&(n='<div class="'+i+`">
              <div class="form-group bmd-form-group">
              <label class="bmd-label-floating my-2">`+o+`</label>
                  <textarea id="editor1" rows=10 cols=12 aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control" ></textarea>
              </div>
          </div>`),a.datetime&&(n=`<div class="row">
                      <label class="offset-lg-1 col-sm-3 col-form-label text-start">`+o+`</label>
                      <div class="col-sm-6">
                        <div class="form-group bmd-form-group">
                          <input type="datetime-local" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datepicker">
                        </div>
                      </div>
                    </div>`),a.date&&(n=`<div class="row">
                      <label class="offset-lg-1 col-sm-3 col-form-label text-start">`+o+`</label>
                      <div class="col-sm-6">
                        <div class="form-group bmd-form-group">
                          <input type="date" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datepicker">
                        </div>
                      </div>
                    </div>`),a.alias){var f=t.split(".");console.log("not sure if onclick"),a.onClickFn!=null?(f.length==2&&(n='<div class="'+i+`">
                        <div class="pb-1 pt-1 ps-1 text-start">`+o+`</div>
                        <div class="row gx-0">
                          <div class="col-10">
                            <div class="form-group bmd-form-group">
                              <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control">
                            </div>
                          </div>
                          <div class="col-2">
                            <div class="btn btn-outline-primary" onclick="`+a.onClickFn+`">Change</div>
                          </div>
                        </div>
                      </div>`),f.length==3&&(n='<div class="'+i+`">
                        <div class="pb-1 pt-1 ps-1 text-start">`+o+`</div>
                        <div class="row">
                          <div class="col-10">
                            <div class="form-group bmd-form-group">
                              <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+"]["+f[2]+`]" class="form-control">
                            </div>
                          </div>
                          <div class="col-2">
                            <div class="btn btn-outline-primary" onclick="`+a.onClickFn+`">Change</div>
                          </div>
                        </div>
                      </div>`)):(f.length==2&&(n='<div class="'+i+`">
                              <div class="pb-1 pt-1 ps-1 text-start">`+o+`</div>
                              <div class="row">
                                <div class="col-12">
                                  <div class="form-group bmd-form-group">
                                    <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control">
                                  </div>
                                </div>
                               
                              </div>
                            </div>`,a.binary&&(n='<div class="'+i+`">
                                        <div class="ps-1 py-2">`+o+`</div>
                                        <div class="col-sm-12">
                                          <div class="form-group bmd-form-group">
                                            <textarea rows=4 cols=12 aria-label="`+t+'"  name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control"></textarea>
                                          </div>
                                        </div>
                                      </div>`),a.editor&&(n='<div class="'+i+`">
                                        <div class="ps-1 py-2">`+o+`</div>
                                        <div class="col-sm-12">
                                          <div class="form-group bmd-form-group">
                                            <textarea id="editor1" rows=10 cols=12 aria-label="`+t+'"  name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control"></textarea>
                                          </div>
                                        </div>
                                      </div>`)),f.length==3&&(n='<div class="'+i+`">
                              <div class="pb-1 pt-1 ps-1 text-start">`+o+`</div>
                              <div class="row">
                                <div class="col-12">
                                  <div class="form-group bmd-form-group">
                                    <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+"]["+f[2]+`]" class="form-control">
                                  </div>
                                </div>
                               
                              </div>
                            </div>`))}if(a.hidden)if(t.includes(".")){var f=t.split(".");n='<input type="hidden" aria-label="'+t+'" name="'+s+"["+f[0]+"]["+f[1]+']"  aria-value="'+a.data+'">'}else console.log("qv",a.data),n='<input type="hidden" aria-label="'+t+'" name="'+s+"["+t+']"  aria-value="'+a.data+'">';a.required&&(n=n.replaceAll("input type","input required type"))}return n},appendInputs(e,t,s,a){$(t).each(function(n,l){var i;typeof l=="object"?i=l.label:i=l;var d="";if(d=r.generateInputs(s,i,a,l),typeof l=="object"&&!l.binary){if(l.sub!=null){var o=l.sub.moduleName,u=l.sub.link,h=l.sub.customCols;$.ajax({headers:{"phx-request":"true"},url:this.endpoint+"/svt_api/webhook?scope=gen_inputs",dataType:"json",async:!1,data:{module:o}}).done(function(g){var w=Object.keys(g);h!=null&&h.length>0&&(w=h);var f=[];$(w).each((v,x)=>{var k;typeof x=="object"?k=x.label:k=x;var P="";P=r.generateInputs(g,k,u,x),f.push(P)}),d=d+'<div class="row subform" style="display: none;"><div class="offset-1 col-sm-9">'+f.join("")+"</div></div>"}).fail(function(g){g.status==403&&_.logout(),r.notify("Not Added!",{type:"danger"})})}}$(e).append(d)})},form_new(e,t,s,a,n){console.log(t);var l=window.phoenixModels.filter((o,u)=>o.tableSelector==e)[0],i="#mySubModal";t.modalSelector!=null&&(i=t.modalSelector),s==null&&(s=l.customCols);var d='<form style="" class="with_mod" id="'+l.link+'"  module="'+l.moduleName+`">
      </form>`;$(i).find(".modal-title").html("Create  New "+l.moduleName),$(i).find(".modal-body").html(d),r.createForm({id:0,...t},l.table,s,a,n),$(i).modal("show")},createForm(e,t,s,a,n){$(".with_mod").each(function(l,i){$(i).html("");var d=$(this).attr("module"),o=$(this).attr("id");$.ajax({async:!1,headers:{"phx-request":"true"},url:phxApp.endpoint+"/svt_api/webhook?scope=gen_inputs",dataType:"json",data:{module:d}}).then((u,h,g)=>{var w=Object.keys(u);s!=null?typeof s[0]=="object"&&s[0]!==null?(console.log("has multi list,"+s.length),$(i).customHtml(`<input type="hidden" name="_csrf_token"  value="">
                            <div class="row">
                              <div class="col-12 col-lg-4">
                                <ul class="nav nav-pills flex-column form_nav">
                                 
                               
                                </ul>

                              </div>
                              <div class="col-12 col-lg-8 p-4 pt-lg-0 px-lg-4 " id="form_panels">

                              </div>
                            </div>

                        `),$(s).each((b,C)=>{b==0?$(i).find(".form_nav").customAppend(`
                                   <li class="nav-item">
                                      <a class="active nav-link fnc" aria-index="`+b+'" href="javascript:void(0);"  >'+C.name+`</a>
                                    </li>
                          `):$(i).find(".form_nav").customAppend(`
                                   <li class="nav-item">
                                      <a class="nav-link fnc" aria-index="`+b+'" href="javascript:void(0);"  >'+C.name+`</a>
                                    </li>
                          `),$(i).find(".fnc").each((I,S)=>{S.onclick=()=>{var y=$(S).attr("aria-index");$(".form_nav .nav-link").removeClass("active"),$(".nav-link[aria-index='"+y+"']").toggleClass("active"),$(".fp").addClass("d-none"),$("#panel_"+y).toggleClass("d-none")}}),b==0?$(i).find("#form_panels").customAppend('<div class="fp row" id="panel_'+b+'"></div>'):$(i).find("#form_panels").customAppend('<div class="fp row d-none"  id="panel_'+b+'"></div>'),$(i).find("#panel_"+b).customAppend('<div class="col-lg-12"><b class="pb-4">'+C.name+"</b></div>"),r.appendInputs($(i).find("#panel_"+b),C.list,u,o)})):(w=s,$(i).append('<input type="hidden" name="_csrf_token"  value="">'),r.appendInputs(i,w,u,o),console.log(w.join("','"))):(w=w.filter((b,C)=>b!="inserted_at"),w=w.filter((b,C)=>b!="updated_at"),r.appendInputs(i,w,u,o),console.log(w.join("','"))),$($(i).find("select")).on("change",function(){var b=$(this).val(),C=$($(this).closest(".subform")).length;console.log(b),C==0&&(b==0?$(".subform").fadeIn():$(".subform").hide())});function f(){$("#myModal .modal-dialog").hasClass("modal-lg")&&$("#myModal .modal-dialog").toggleClass("modal-lg");var b=new FormData($(i).closest("form")[0]);$(i).find("input[type='checkbox']").each((I,S)=>{$(S).val($(S).prop("checked")),b.append(o+"["+$(S).attr("aria-label")+"]",$(S).prop("checked"))}),$(i).find("textarea").each((I,S)=>{b.append(o+"["+$(S).attr("aria-label")+"]",$(S).val())});var C=$(".with_mod").closest("form").find("input").filter((I,S)=>(console.log("checking vaidity"),console.log(S),S.checkValidity()==!1));console.log(C),C.length>0?C.map((I,S)=>{r.notify("This input: "+$(S).attr("placeholder")+" is not valid!",{type:"danger"})}):(r.csrf_(!0),$.ajax({url:phxApp.endpoint+"/svt_api/"+o,dataType:"json",headers:{Authorization:"Basic "+(r.user!=null?r.user.token:null)},method:"POST",enctype:"multipart/form-data",processData:!1,contentType:!1,data:b}).done(function(I){if(r.notify("Added!",{type:"success"}),$("#mySubModal").modal("hide"),$("#sideModal").modal("hide"),t!=null){console.log("redrawing table.. "+window.currentSelector),console.log(o),console.log(window.currentSelector);var S=window.phoenixModels.filter((y,T)=>y.moduleName==o&&y.tableSelector==window.currentSelector);S.forEach((y,T)=>{try{window.prev_page=y.table.page(),y.reload()}catch{console.log("cant find the table")}})}a!=null&&(e.xparams!=null?a(e.xparams):a(I))}).fail(function(I){I.status==403&&_.logout();try{console.log(I.responseJSON.status),r.notify("Not Added! reason: "+I.responseJSON.status,{type:"danger"})}catch{r.notify("Not Added!",{type:"danger"})}}))}var v=document.createElement("div");v.className="row";var x=document.createElement("div");x.className="pt-4 col-lg-12",v.append(x);try{var k=CKEDITOR.replace("editor1",{height:500,on:{instanceReady:function(){this.document.appendStyleSheet("/css/bootstrap.min.css")}}});CKEDITOR.config.allowedContent=!0,CKEDITOR.config.removeButtons="Image",CKEDITOR.instances.editor1.on("change",function(){var b=CKEDITOR.instances.editor1.getData();$(CKEDITOR.instances.editor1.element.$).val(b)}),k.addCommand("mySimpleCommand",{exec:function(b){try{callStoredMedia(CKEDITOR.instances.editor1)}catch{}}}),k.ui.addButton("SuperButton",{label:"Click me",command:"mySimpleCommand",toolbar:"insert",icon:"/images/image-solid.svg"})}catch{console.log("no editor")}var P=r.formButton({iconName:"check",color:"primary subm",name:"Submit"},{},f);x.append(P),$(i).find(".subm").length==0&&$(i).append(v),console.info(e),r.repopulateFormInput(e,i)}).fail(function(u){u.status==403&&_.logout(),console.log(u.responseJSON.status),r.notify("Not Added!",{type:"danger"})})}),n!=null&&n()},submitFormData(e,t,s,a){$("#myModal .modal-dialog").hasClass("modal-lg")&&$("#myModal .modal-dialog").toggleClass("modal-lg");var n=t,l=$(e)[0],i=new FormData(l);$(l).find("input[type='checkbox']").each((d,o)=>{$(o).val($(o).prop("checked")),i.append(n+"["+$(o).attr("aria-label")+"]",$(o).prop("checked"))}),console.log(i),$.ajax({url:this.endpoint+"/api/"+n,dataType:"json",method:"POST",headers:{Authorization:"Basic "+(r.user!=null?r.user.token:null)},enctype:"multipart/form-data",processData:!1,contentType:!1,data:i,xhr:function(){$("#helper").fadeIn();var d=$.ajaxSettings.xhr();return d.upload.onprogress=function(o){var u=Math.round(o.loaded/o.total*100);$("[role='progressbar']").css("width",u+"%"),$("#helper").text(u+"%")},d},error:function(d){console.error("Error has occurred while uploading the media file.")}}).done(function(d){r.notify("Added!",{type:"success"});try{r.reinit(),$("#myModal").modal("hide")}catch{}try{s!=null&&s(a)}catch{}r.hide()}).fail(function(d){d.status==403&&_.logout();try{console.log(d.responseJSON.status),r.notify("Not Added! reason: "+d.responseJSON.status,{type:"danger"})}catch{r.notify("Not Added! reason: 404",{type:"danger"})}})},formButton(e,t,s){var a={iconName:"fa fa-check",color:"btn btn-primary",onClickFunction:null,fnParams:null,name:"Submit",tooltipText:"Hints"},n=Object.keys(a);n.forEach((u,h)=>{this[u]=a[u]}),n.forEach((u,h)=>{e[u]!=null&&(this[u]=e[u])});var l=document.createElement("button");l.setAttribute("type","button"),l.setAttribute("data-bs-toggle","tooltip"),l.setAttribute("data-bs-original-title",""),l.setAttribute("data-bs-placement","left"),l.setAttribute("class","btn btn-"+this.color+" btn-sm"),l.setAttribute("title",this.tooltipText);var i=document.createElement("i");i.className=this.iconName,l.append(i);var d=document.createElement("span");this.name==null?this.name="":d.setAttribute("style","padding: 0 10px;"),d.innerHTML=this.name,l.append(d);var o=document.createElement("div");if(o.className="ripple-container",l.append(o),l.style="margin-left: 10px;",s!=null){try{l.id=this.fnParams.dtdata.id}catch{console.log("dont hav id in fnParams")}l.onclick=function(){$($(l).closest("tr")).attr("aria-index")==null?t.index=parseInt($($(l).closest("div")).attr("aria-index")):t.index=parseInt($($(l).closest("tr")).attr("aria-index")),t.row=$(l).closest("tr"),t.tbody=$(l).closest("tbody"),s(t)}}return l},groupedFormButton(e,t,s,a){var n=r.makeid(6),l=document.createElement("div");l.setAttribute("class","btn-group"),l.setAttribute("role","group"),l.setAttribute("aria-label","Button group with nested dropdown"),l.setAttribute("style","margin-left: 10px;");var i=document.createElement("button");i.setAttribute("type","button"),i.setAttribute("class","manage btn btn-sm btn-"+t),i.innerHTML=e,l.append(i);var d=document.createElement("div");d.setAttribute("class","btn-group"),d.setAttribute("role","group");var o=document.createElement("button");o.setAttribute("id",n),o.setAttribute("type","button"),o.setAttribute("class","btn btn-sm btn-"+t+" dropdown-toggle"),o.setAttribute("data-bs-toggle","dropdown"),o.setAttribute("aria-haspopup","true"),o.setAttribute("aria-expanded","false"),d.append(o);var u=document.createElement("div");return u.setAttribute("class","dropdown-menu"),u.setAttribute("aria-labelledby",n),$(s).each((h,g)=>{g.fnParams!=null?g.fnParams.dataSource=a.dataSource:g.fnParams=a;var w=r.childGroupedFormButton(g.name,g.onClickFunction,g.fnParams);u.append(w)}),d.append(u),l.append(d),l},childGroupedFormButton(e,t,s){var a=document.createElement("a");if(a.setAttribute("class","dropdown-item"),a.setAttribute("href","javascript:void(0);"),a.innerHTML=e,t!=null){try{a.id=s.dtdata.id}catch{}a.onclick=function(){s.index=parseInt($($(a).closest("tr")).attr("aria-index")),s.index>-1||(s.index=parseInt($($(a).closest(".card-footer")).attr("aria-index"))),s.row=$(a).closest("tr"),t(s)}}return a},makeid(e){for(var t="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a=s.length,n=0;n<e;n++)t+=s.charAt(Math.floor(Math.random()*a));return t},appendDtButtons(e,t,s){$(e).closest(t).find(".module_buttons").customHtml(`
                <button type="submit" onclick="toggleView('`+e+`')" class="btn btn-fill btn-round btn-primary" data-href="" data-module="" data-ref="">
                <i class="fa fa-th-large"></i></button>
                <button type="submit" onclick="phxApp.reinit()" class="btn btn-fill btn-round btn-primary" data-href="" data-module="" data-ref="">
                <i class="fa fa-circle-notch
      "></i></button>
                <button type="submit" class="btn btn-fill btn-round btn-primary"  data-href="" data-module="add_new" data-ref=""><i class="fa fa-plus"></i></button>
                `);var a=$(e).closest(t).find(".module_buttons button[data-module='add_new']");try{a[0].onclick=function(){window.currentSelector=e,console.log("sub sub table data"),console.log(s),form_new(e,s)}}catch{}},appendRowDtButtons(e,t){$(e.buttons).each((s,a)=>{if(a.buttonType!=null)if(a.buttonType=="grouped"){console.log("creating grouped...button..."),a.fnParams.dataSource=e,a.fnParams.aParams=e.data;var n=r.groupedFormButton(a.name,a.color,a.buttonList,a.fnParams);$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").removeClass("d-none"),$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").append(n)}else{a.fnParams.dataSource=e,a.fnParams.aParams=e.data;var n=r.formButton({iconName:a.iconName,color:a.color,name:a.name},a.fnParams,a.onClickFunction);$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").removeClass("d-none"),$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").append(n)}else{console.log("appending gd buttons : "+s),a.fnParams.dataSource=e,a.fnParams.aParams=e.data;var n=r.formButton({iconName:a.iconName,color:a.color,name:a.name,tooltipText:a.tooltipText},a.fnParams,a.onClickFunction);$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").removeClass("d-none"),$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").append(n)}})},getTableData(e,t,s){var a=100;t!=null&&(a=t);var n=Object.keys(e.data),l=[];$(n).each((i,d)=>{l.push("&"+d+"="+e.data[d])}),$.ajax({async:!1,url:this.endpoint+"/api/"+e.link+"?foo=bar"+l.join(""),data:{draw:"1",order:{0:{column:"0",dir:"desc"}},columns:{0:{data:"id"}},length:a,start:0}}).done(function(i){$(i.data).each((d,o)=>{var u=$(e.allData).filter(function(h,g){return g.id==o.id});u.length==0&&e.allData.push(o)}),s!=null&&s()}).fail(function(i){i.status==403&&_.logout(),r.notify("Not Added!",{type:"danger"})})},copyToClipboard(e){navigator.clipboard.writeText(e).then(()=>{console.log("Text copied to clipboard:",e),alert("Text copied to clipboard!")}).catch(t=>{console.error("Could not copy text: ",t),alert("Could not copy text: "+t)})},populateTableData(e,t,s){this.getTableData(e,t,s)},populateGridView(e){console.log("populateGridView",e);var t="col-12 col-lg-3 xc";try{e.data.grid_class!=null&&(t=e.data.grid_class+" xc")}catch{}$(e.tableSelector).closest(".dataTables_wrapper").find(".grid_view").html("<div></div>");var s=[];for(e.table.data().length,a=0,n=e.table.data().length;a<n;a++)e.table.data()[a].index=a,s.push(e.table.data()[a]);var a,n,l=12,i=[];for(a=0,n=s.length;a<n;a+=l)i.push(s.slice(a,a+l));i.forEach((d,o)=>{var u=document.createElement("div");u.setAttribute("class","row gx-0 "),d.forEach((h,g)=>{var w=h,f=document.createElement("div");f.setAttribute("class",t);var v=document.createElement("div");v.setAttribute("id",w.id),v.className="card-footer gd d-none",f.data=h,f.data.dataSource=e,w.index!=null&&v.setAttribute("aria-index",w.index),f.appendChild(v),u.appendChild(f)}),$(e.tableSelector).closest(".dataTables_wrapper").find(".grid_view").append(u)}),$(e.tableSelector).closest(".table-responsive").find(" .gd").each((d,o)=>{var u=$(o).attr("aria-index");console.log("there is index... d"+d),r.appendRowDtButtons(e,u)})},populateTable(e){var t=[[0,"desc"]],s=phxApp.endpoint+"/svt_api/";e.data.host!=null&&(s=e.data.host+"/svt_api/");var a=10,n=`

    <"row align-items-center"
      <"col-lg-4"l>
      <"gap-2 col-lg-8 text-center 
        module_buttons 
        d-flex justify-content-lg-end 
        justify-content-center py-2 py-lg-0">
    >
    <"row grid_view d-block d-lg-none">
    <"list_view d-lg-block d-none"t>
    <"row transform-75 p-4"
      <"col-lg-6"i><"col-lg-6"p>
    >

    `;e.data.dom!=null&&(n=e.data.dom),e.data.sorts!=null&&(t=e.data.sorts),e.data.pageLength!=null&&(a=e.data.pageLength);var l=document.createElement("tr"),i=document.createElement("tr");$(e.columns).each(function(f,v){var x=document.createElement("td");x.innerHTML=v.label,l.append(x)}),$(e.columns).each(function(f,v){var x=document.createElement("td");i.append(x)}),console.info(t),$(e.tableSelector).find("thead").append(l),$(e.tableSelector).find("tfoot").html(i),console.log(e.data);var d=Object.keys(e.data),o=[];$(d).each((f,v)=>{["modalSelector","sorts","dom","footerFn","rowFn","preloads","grid_class"].includes(v)||o.push("&"+v+"="+e.data[v]),["preloads"].includes(v)&&o.push("&"+v+"="+JSON.stringify(e.data[v])),["additional_join_statements"].includes(v)&&o.push("&"+v+"="+JSON.stringify(e.data[v]))});var u=e.tableSelector,h=$(u).DataTable({pageLength:a,processing:!0,responsive:!0,serverSide:!0,ajax:{url:s+e.link+"?foo=bar"+o.join("")},columns:e.columns,lengthMenu:[8,10,12,25,50,100],rowCallback:function(f,v,x){console.log("dt rowcallback index "+x);var k=$(e.allData).filter(function(b,C){return C.id==v.id});k.length==0&&e.allData.push(v),$(f).addClass("d-none"),$(f).attr("aria-index",x);var P=$(f).find("td").length-1;f.dataset.dtdata=JSON.stringify(v),A.datetime(f,v,e),A.img(f,v,e),A.bool(f,v,e),A.float(f,v,e),A.child(f,v,e),A.json(f,v,e),A.subtitle(f,v,e),A.progress(f,v,e),A.custom(f,v,e),$("td:eq("+P+")",f).attr("class","td-actions text-end"),$("td:eq("+P+")",f).html(""),$(e.buttons).each((b,C)=>{if(C.buttonType!=null)if(C.buttonType=="grouped"){console.log("creating grouped...button..."),C.fnParams.dataSource=e,C.fnParams.aParams=e.data;var I=r.groupedFormButton(C.name,C.color,C.buttonList,C.fnParams);$("td:eq("+P+")",f).append(I)}else{C.fnParams.dataSource=e,C.fnParams.aParams=e.data;var I=r.formButton({iconName:C.iconName,color:C.color,name:C.name},C.fnParams,C.onClickFunction);$("td:eq("+P+")",f).append(I)}else{C.fnParams.dataSource=e,C.fnParams.aParams=e.data;var I=r.formButton({iconName:C.iconName,color:C.color,name:C.name,tooltipText:C.tooltipText},C.fnParams,C.onClickFunction);$("td:eq("+P+")",f).append(I)}}),e.data.rowFn!=null&&e.data.rowFn(f,v,x)},footerCallback:function(f,v,x,k,P){e.data!=null&&e.data.footerFn!=null&&e.data.footerFn(f,v,x,k,P)},order:t,dom:n,autoWidth:!1});e.table=h,h.on("preXhr",()=>{console.log("fetching...")}),h.on("draw",()=>{$(".jsv"+e.makeid.id).closest("tr").each((f,v)=>{var x=e.columns.filter((k,P)=>k.showJson==!0);x.forEach((k,P)=>{$($(v).find(".jsv"+e.makeid.id)[P]).jsonViewer(h.data()[f][k.data],{collapsed:!0})})}),$(".table tbody tr").each((f,v)=>{setTimeout(()=>{$(v).removeClass("d-none")},10*f+1)}),console.log("table draw"),typeof e.onDrawFn=="function"&&e.onDrawFn()}),h.on("xhr",()=>{console.log("fetched")});var g=window.phoenixModels.findIndex((f,v)=>f.tableSelector=="#subSubTable");g!=-1&&window.phoenixModels.splice(g,1);var w=window.phoenixModels.filter((f,v)=>f.moduleName==e.moduleName&&f.tableSelector==e.tableSelector);if(w.length==0)window.phoenixModels.push(e);else{console.info("the dt already exist, consider reinsert?");var g=window.phoenixModels.findIndex((v,x)=>v.moduleName==e.moduleName&&v.tableSelector==e.tableSelector);g!=-1&&(window.phoenixModels.splice(g,1),window.phoenixModels.push(e))}return h},editData(e){console.log("editing data...");var t=e.dataSource;window.currentSelector=t.tableSelector;var s=t.table,a=s.row(e.row),n=s.data()[e.index],l;e.link!=null?l=e.link:l=t.link;var i="#sideModal";$(i).length==0&&(i="#mySubModal"),t.data.modalSelector!=null&&(i=t.data.modalSelector);function d(){console.log(n);var o='<form style="margin-top: 0px;" class="with_mod" id="'+l+'"  module="'+t.moduleName+'"></form>';$(i).find(".modal-title").html("Edit "+t.moduleName),$(i).find(".modal-body").html(o),$(i).modal("show"),r.createForm(n,s,e.customCols,e.postFn),e.drawFn!=null&&e.drawFn()}a.child.isShown()?(a.child.hide(),d()):(s.rows().every(function(o,u,h){this.child.hide()}),d())},deleteData(e){console.log("editing data...");var t=e.dataSource;window.currentSelector=t.tableSelector;var s=t.table;s.row(e.row);var a=s.data()[e.index];$("#myModal").find(".modal-title").html("Confirm delete this data?");var n=r.formButton("fa fa-check","outline-danger"),l=this.csrf_();n.onclick=function(){console.log(t),$("#myModal").modal("hide"),$.ajax({url:this.endpoint+"/api/"+t.link+"/"+a.id,dataType:"json",headers:{Authorization:"Basic "+(r.user!=null?r.user.token:null),"x-csrf-token":l},method:"DELETE"}).done(function(d){if($("#myModal").modal("hide"),r.notify("Deleted!",{type:"info"}),s!=null){console.log("redrawing table.. "+window.currentSelector),console.log(t.link),console.log(window.currentSelector);var o=window.phoenixModels.filter((u,h)=>u.moduleName==t.link&&u.tableSelector==window.currentSelector);o.forEach((u,h)=>{try{window.prev_page=u.table.page(),u.reload()}catch{console.log("cant find the table")}})}}).fail(function(d){console.log(d.responseJSON.status),r.notify("Not Added! reason: "+d.responseJSON.status,{type:"warning"})})};var i=document.createElement("center");i.append(n),$("#myModal").find(".modal-body").html(i),$("#myModal").modal("show")}};window.phxApp=r;class q{constructor(){this.init()}init(){$("html").attr("data-bs-theme",localStorage.getItem("data-bs-theme")||"light"),window.showRP=!0,window.includeShippingTax=!0,window.toggleMcart=!1,this.initializeApps(),m.restoreCart(),m.restoreCart(!0),$(document).on("click","a.navi",function(t){r.show(),t.preventDefault(),setTimeout(()=>{$(this).attr("href").includes("#")||r.navigateTo($(this).attr("href"))},200)}),window.addEventListener("popstate",t=>{try{history.state!=null?(window.back=!0,window.parsePage=!0,r.navigateTo(history.state.route)):(r.notify("Can't go back"),r.navigateTo("/home"))}catch(s){console.log("Navigation error:",s)}},!0),this.initializeTranslation(),this.loadCountries(),this.addRoutes(),r.navigateTo()}initializeApps(){window.phoenixModel=O,window.phoenixModels=[],window.phxApp=r,window.location.hostname==="localhost"&&(window.commerceApp=m,window.memberApp=_)}initializeTranslation(){let t="v2",s="";function a(n){return n==="Thailand"?"th":n==="Vietnam"?"vn":n==="China"?"cn":"v2"}try{localStorage.region!=null&&(t=a(localStorage.region)),s=r.api("translation",{lang:t})}catch(n){console.error("Error fetching translation:",n)}$.fn.extend({customHtml:async function(n){console.log("customHtml parsing..");var l=Object.keys(s),i=l.reduce((d,o)=>{var u=new RegExp(o,"g");return d.replace(u,s[o])},n);return this.html(i)},customAppend:async function(n){var l=Object.keys(s),i=l.reduce((d,o)=>{var u=new RegExp(o,"g");return d.replace(u,s[o])},n);return this.append(i)}})}loadCountries(){r.api("countries",{},null,t=>{window.countries=t,r.countries_=t})}addRoutes(){[{html:"primary_buy.html",title:"Primary Buy ",route:"/primary_buy"},{html:"secondary_buy.html",title:"Secondary Buy ",route:"/secondary_buy"},{html:"ledger_entries.html",title:"Ledger Entries ",route:"/ledger_entries"},{html:"shipping_management.html",title:"Shipping Management ",route:"/shipping_management"},{html:"override.html",title:"Override Login ",route:"/admin_override",public:!0,skipNav:!0},{html:"commissions.html",title:"Commissions ",route:"/commissions"},{html:"merchant_withdrawal.html",title:"Merchant Withdrawal ",route:"/merchant_withdrawals"},{html:"merchant_application.html",title:"Merchant Application ",route:"/merchant_application"},{html:"merchant_profile.html",title:"Merchant Profile ",route:"/merchant_profile"},{html:"merchant_checkout_register.html",title:"Merchant Checkout ",route:"/merchant_checkout_register"},{html:"merchant_checkout.html",title:"Merchant Checkout ",route:"/merchant_checkout"},{html:"merchant_checkout_bd.html",title:"Merchant Checkout Back Date",route:"/merchant_checkout_bd"},{html:"merchant_purchases.html",title:"Merchant Purchases",route:"/merchant_purchases"},{html:"merchant_sales.html",title:"Merchant Sales",route:"/merchant_sales"},{html:"merchant_mall.html",title:"Merchant Mall",route:"/merchant_mall"},{html:"merchant_products.html",title:"Merchant Products",route:"/merchant_products"},{html:"mproduct.html",title:"Merchant Product",route:"/merchant_products/:id/:name"},{html:"refund_policy.html",title:"Refund Policy ",route:"/refund_policy",public:!0,skipNav:!0},{html:"terms_condition.html",title:"Terms Condition ",route:"/terms_condition",public:!0,skipNav:!0},{html:"merchant_code_register.html",title:"Register ",route:"/merchant_code_register/:share_code",public:!0,skipNav:!0},{html:"code_register.html",title:"Register ",route:"/code_register/:share_code",public:!0,skipNav:!0},{html:"share_link.html",title:"Share Link ",route:"/share_link"},{html:"register_wallet.html",title:"Register Wallet ",route:"/register_wallet"},{html:"bonus_wallet.html",title:"Bonus Wallet ",route:"/bonus_wallet"},{html:"new_topup.html",title:"Register Point Topup ",route:"/topup_register_point"},{html:"upgrade.html",title:"Upgrade ",route:"/upgrade"},{html:"redeem.html",title:"Redeem ",route:"/redeem"},{html:"withdrawal.html",title:"Withdrawal ",route:"/withdrawals"},{html:"reward_details.html",title:"Reward Details ",route:"/reward_details/:name/:month/:year"},{html:"sales_detail.html",title:"Sales Details",route:"/sales/:id"},{html:"sales.html",title:"Sales History",route:"/sales"},{html:"pay_instalment.html",title:"Pay Instalment",route:"/pay_instalment"},{html:"instalment_payments.html",title:"Instalment Payments",route:"/instalment_payments"},{html:"wallet_transaction.html",title:"Transactions ",route:"/wallets/:id"},{html:"product.html",title:"Product",route:"/products/:id/:name"},{html:"topup_card_register.html",title:"Topup Card Register",route:"/topup_card_register"},{html:"register.html",title:"Register",route:"/register"},{html:"logout.html",title:"Logout",route:"/logout",public:!0},{html:"thank_you.html",title:"Login",route:"/thank_you",public:!0},{html:"login.html",title:"Login",route:"/login",public:!0},{html:"profile.html",title:"Profile",route:"/profile"},{html:"placement.html",title:"Placement",route:"/placement"},{html:"placement_full.html",title:"Placement(Full)",route:"/placement_full"},{html:"referal.html",title:"Referal",route:"/referal"},{html:"gs_summary.html",title:"Group Sales",route:"/group_sales"}].forEach((s,a)=>{r.route_names.push(s)})}}document.addEventListener("DOMContentLoaded",()=>{new q});
