(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();let I={datetime(e,t,s){var n=s.columns.filter((a,r)=>a.formatDateTime==!0);n.forEach((a,r)=>{var i=a.offset,o=0;o=s.columns.findIndex((_,f)=>_.data==a.data);try{var d=t[a.data];d=Date.parse(d);var u=new Date(d);u.setTime(u.getTime()+(8+i)*60*60*1e3);var h=u.toGMTString().split(",")[1].split(" ").splice(0,4).join(" "),b=u.toLocaleTimeString();$("td:eq("+o+")",e).html('<span class="text-muted fw-bold">'+h+`</span>

          <small class="fw-bold text-primary">
              `+b+`          
          </small>
             `)}catch(_){console.log(_)}})},custom(e,t,s){var n=s.columns.filter((a,r)=>a.customized==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((o,d)=>o.data==a.data&&o.xdata==a.xdata);try{$("td:eq("+i+")",e).html(a.xdata.formatFn(t,parseInt(e.getAttribute("aria-index"))))}catch(o){console.log(o)}})},img(e,t,s){var n=s.columns.filter((a,r)=>a.showImg==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((d,u)=>d.data==a.data);try{var o;o=`

        <div style="

background-size: contain !important; background-image: url('`+t[a.data]+`') !important; 
        height: 80px;width: 80px;
background-position: center;
background-repeat: no-repeat;
" class="text-center 
        bg-white d-flex align-items-center justify-content-center text-white">
        </div>`,$("td:eq("+i+")",e).html(o)}catch{}})},progress(e,t,s){var n=s.columns.filter((a,r)=>a.showProgress==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((_,f)=>_.data==a.data);try{var o=t[a.data],d=a.progress,u=[],h=1/d.length*100,b=d.findIndex((_,f)=>_==o);d.forEach((_,f)=>{if(b>=f)var g='<div class="progress-bar bg-warning " role="progressbar" style="width: '+h+`%;" ></div>
              `;else var g='<div class="progress-bar " role="progressbar" style="width: '+h+`%;" ></div>
              `;u.push(g)}),p=`
          <small>`+o+`</small>
          <div class="progress gap-1">
          `+u.join("")+`
          </div>
        `,$("td:eq("+i+")",e).html(p)}catch{}})},subtitle(e,t,s){var n=s.columns.filter((a,r)=>a.showSubtitle==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((h,b)=>h.data==a.data);var o=0;o=s.columns.findIndex((h,b)=>h.data==a.subtitle);try{var d=t[a.data],u=t[a.subtitle];s.columns[i].showChild&&(d=t[a.xdata.child][a.xdata.data]),s.columns[i].formatFloat&&(d=currencyFormat(d)),s.columns[o].formatFloat&&(u=currencyFormat(u)),s.columns[o].showBoolean&&(t[a.subtitle]==!0?u='<i class="text-success fa fa-check"></i>':u='<i class="text-danger fa fa-times"></i>'),$("td:eq("+i+")",e).html('<span class="pe-2">'+d+`</span>
          <small class="text-muted text-truncate" style="max-width: 24vw;display: block;">`+u+"</small>")}catch{}})},bool(e,t,s){var n=s.columns.filter((a,r)=>a.showBoolean==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((d,u)=>d.data==a.data);try{var o;t[a.data]==!0?o='<i class="text-success fa fa-check"></i>':o='<i class="text-danger fa fa-times"></i>',$("td:eq("+i+")",e).html(o)}catch{}})},json(e,t,s){var n=s.columns.filter((a,r)=>a.showJson==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((o,d)=>o.data==a.data);try{$("td:eq("+i+")",e).html(`<div aria-data='' class="jsv`+s.makeid.id+'" id="'+a.data+t.id+'"></div>')}catch{}})},child(e,t,s){var n=s.columns.filter((a,r)=>a.showChild==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((d,u)=>d.data==a.data&&d.xdata==a.xdata);try{if($("td:eq("+i+")",e).html(t[a.xdata.child][a.xdata.data]),a.xdata.showImg)try{if(console.log("attemp to show img..."),t[a.xdata.child][0]!=null){var o;o=`
              <div style="background-size: cover !important; background-image: url('`+t[a.xdata.child][0][a.xdata.data]+`') !important; 
              height: 80px;width: 80px" class="rounded-circle text-center 
              bg-primary d-flex align-items-center justify-content-center text-white">
              </div>`,$("td:eq("+i+")",e).html(o)}}catch{}a.xdata.formatFloat&&$("td:eq("+i+")",e).html(currencyFormatdtdata[a.xdata.child][a.xdata.data])}catch{}})},float(e,t,s){var n=s.columns.filter((a,r)=>a.formatFloat==!0);n.forEach((a,r)=>{var i=0;i=s.columns.findIndex((o,d)=>o.data==a.data);try{$("td:eq("+i+")",e).html(currencyFormat(t[a.data]))}catch{}})},dataFormatter(e,t){var s=null,n=["formatFloat","showBoolean","formatDateTime","showImg","showChild"],a=-1,r=Object.keys(t);switch(n.forEach((b,_)=>{r.indexOf(b)>0&&(a=_)}),console.log(n[a]),n[a]){case"formatFloat":s=this.currencyFormat(e[t.data]);break;case"showImg":try{console.log("simmg"),s=`
        <div style="background-size: cover !important; background-image: url('`+e[t.data]+`') !important; 
        height: 80px;width: 80px" class="rounded-circle text-center 
        bg-primary d-flex align-items-center justify-content-center text-white">
        </div>`}catch(b){console.log(b)}break;case"showChild":try{if(s=e[t.xdata.child][t.xdata.data],t.xdata.showImg)try{console.log("attemp to show img..."),e[t.xdata.child][0]!=null&&(s=`
                <div style="background-size: cover !important; background-image: url('`+e[t.xdata.child][0][t.xdata.data]+`') !important; 
                height: 80px;width: 80px" class="rounded-circle text-center 
                bg-primary d-flex align-items-center justify-content-center text-white">
                </div>`)}catch{}t.xdata.formatFloat&&(s=currencyFormat(e[t.xdata.child][t.xdata.data]))}catch{}break;case"showBoolean":try{var i;e[t.data]==!0?i='<i class="text-success fa fa-check"></i>':i='<i class="text-danger fa fa-times"></i>',s=i}catch{}break;case"formatDateTime":var o=e[t.data];o=Date.parse(o);var d=new Date(o);d.setTime(d.getTime()+8*60*60*1e3);var u=d.toGMTString().split(",")[1].split(" ").splice(0,4).join(" "),h=d.toLocaleTimeString();s='<span class="text-muted fw-bold">'+u+`</span>

              <small class="fw-bold text-primary">
                  `+h+`          
              </small>
                 `;break;default:s=e[t.data]}return s==null&&(s=e[t.data]),s},formatDate(){$(" .format-int, .format-integer").each((e,t)=>{var s="";$(t).html().split(" ").includes("DR")&&(s="DR"),$(t).html().split(" ").includes("CR")&&(s="CR");var n=$(t).html();if(parseFloat(n)>0){var a='<span class="text-end" >'+s+this.currencyFormat(parseFloat(n)).replace(".00","")+"</span>";$(t).html(a)}else parseFloat(n)==0?$(t).html("0.00"):$(t).html(n)}),$(".format_float, .format-float").each((e,t)=>{var s="";$(t).html().split(" ").includes("DR")&&(s="DR"),$(t).html().split(" ").includes("CR")&&(s="CR"),$(t).html().includes("-")&&(s="-");var n=$(t).html().replace("-","");if(parseFloat(n)>0){var a='<span class="text-end" >'+s+this.currencyFormat(parseFloat(n))+" </span>";$(t).html(a)}else parseFloat(n)==0?$(t).html("0.00"):$(t).html(n)}),$(".format_date").each((e,t)=>{var s=$(t).html();if(Date.parse(s)>0){var n=new Date(s),a;n.getDate().toString().length>1?a=n.getDate():a="0"+n.getDate();var r;(n.getMonth()+1).toString().length>1?r=n.getMonth()+1:r="0"+(n.getMonth()+1),$(t).html("<b>"+a+"-"+r+"-"+n.getFullYear()+"</b>")}else $(t).html(s)}),$(".format_datetime").each((e,t)=>{var s;$(t).attr("aria-offset")!=null&&parseInt($(t).attr("aria-offset"));var n=$(t).html();n=Date.parse($(t).html().replace(" ",""));var a=new Date(n);a.setTime(a.getTime()+8*60*60*1e3);try{s=a.toGMTString().split(",")[1].split(" ").splice(1,3).join(" ")}catch(i){console.log(i)}var r=a.toLocaleTimeString();$(t).html(""+s+" "+r)}),$(".is_posted").each((e,t)=>{var s=$(t).html();s=="true"&&$(t).html(`
                <i class="text-success fa fa-check"></i>
                `),s=="false"&&$(t).html(`
                <i class="text-danger fa fa-exclamation-circle"></i>
                `)})},currencyFormat(e){return e==null?"0.00":e.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")},capitalize(e){return e.replace(/^\w/,t=>t.toUpperCase())}},w={user:{},ranks:[],restoreUser(){this.ranks=l.api("get_ranks",{}),this.user=JSON.parse(localStorage.getItem("user")),this.user!=null&&($("[aria-label='login']").addClass("d-none"),$("[aria-label='logout']").removeClass("d-none")),$("form#register")&&this.user!=null&&($("input[name='user[sales_person_id]']").val(this.user.id),$("input[name='user[username]']").val(""))},override(e){l.form($(e).closest("form"),"override",t=>{w.user=t,w.save(t),$("[aria-label='login']").addClass("d-none"),$("[aria-label='logout']").removeClass("d-none"),window.location="/home"})},extendUser(){l.api("extend_user",{token:this.user.token},null,e=>{console.log(e),e.status=="ok"&&(w.user=e.res,w.save(e.res))})},save(e){localStorage.setItem("user",JSON.stringify(e))},merchantCheckout(e){$(e).closest("form"),l.chosen_country_id_!=null&&$("input[name='user[country_id]']").val(l.chosen_country_id_.id),l.validateForm("form",()=>{console.info("validating form..."),l.form($(e).closest("form"),"merchant_checkout",t=>{console.info("after redeem form..."),console.log(t),t!=null?(console.log("e user"),console.log(t.user),m.emptyCart_(!0),l.navigateTo(t.payment_url)):(m.emptyCart_(!0),l.navigateTo("/profile"))})})},redeem(e){$(e).closest("form"),l.chosen_country_id_!=null&&$("input[name='user[country_id]']").val(l.chosen_country_id_.id),l.validateForm("form",()=>{console.info("validating form..."),l.form($(e).closest("form"),"redeem",t=>{console.info("after redeem form..."),console.log(t),t!=null?(console.log("e user"),console.log(t.user),m.emptyCart_(),l.navigateTo(t.payment_url)):(m.emptyCart_(),l.navigateTo("/profile"))})})},upgrade(e){$(e).closest("form"),$("form#register")&&(this.user!=null&&$("input[name='user[sales_person_id]']").val(this.user.id),l.chosen_country_id_!=null&&$("input[name='user[country_id]']").val(l.chosen_country_id_.id)),l.validateForm("form",()=>{console.info("validating form..."),l.form($(e).closest("form"),"upgrade",t=>{console.info("after upgrade form..."),console.log(t),t!=null?t.billplz_code!=null?(m.emptyCart_(),window.location=t.payment_url):($("input[name='user[instalment]']").val()==null&&l.notify("Please relogin to update rank."),m.emptyCart_(),m.components.userProfile(),l.navigateTo(t.payment_url)):(m.emptyCart_(),l.navigateTo("/profile"))})})},linkRegister(e){$("form#register")&&(this.user!=null&&$("input[name='user[sales_person_id]']").val(this.user.id),$("input[name='user[share_code]']").val(pageParams.share_code),l.chosen_country_id_!=null&&(console.log(l.chosen_country_id_),$("input[name='user[country_id]']").val(l.chosen_country_id_.id))),l.validateForm("form",()=>{console.log("validating form..."),l.form($(e).closest("form"),"link_register",t=>{if(console.log("after register form..."),console.log(t),t!=null){if(m.emptyCart_(),t.payment_method=="fpx"){let n=function(a,r){var i=$("<form>",{method:"POST",action:a});$.each(r,function(o,d){$("<input>",{type:"hidden",name:o,value:d}).appendTo(i)}),i.appendTo("body").submit()};var s=n;n(t.payment_url,JSON.parse(t.webhook_details))}}else m.emptyCart_(),l.navigateTo("/login")})})},register(e){$("form#register")&&(this.user!=null&&$("input[name='user[sales_person_id]']").val(this.user.id),l.chosen_country_id_!=null&&(console.log(l.chosen_country_id_),$("input[name='user[country_id]']").val(l.chosen_country_id_.id))),l.validateForm("form",()=>{console.log("validating form..."),l.form($(e).closest("form"),"register",t=>{console.log("after register form..."),console.log(t),t!=null?(m.emptyCart_(),window.stockistTarget=null,t.billplz_code!=null?window.location=t.payment_url:l.navigateTo(t.payment_url)):(m.emptyCart_(),l.navigateTo("/register"))})})},logout(){console.log("logging out..."),localStorage.removeItem("user"),$("[aria-label='login']").removeClass("d-none"),$("[aria-label='logout']").addClass("d-none"),l.notify("Log out!"),document.cookie="_commerce_front_key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",setTimeout(()=>{location="/login"},1e3)},updateUser(e){w.user=e,w.save(e)},login(e){$(e).closest("form"),l.form($(e).closest("form"),"login",t=>{w.user=t,w.save(t),$("[aria-label='login']").addClass("d-none"),$("[aria-label='logout']").removeClass("d-none"),l.navigateTo("/home")})}};window.memberApp=w;class F{constructor(t){var s={moduleName:"User",link:"users",tableSelector:"#users",data:{},allData:[],buttons:[],tableButtons:[],table:null,columns:[],customCols:null,aliasName:null,onDrawFn:null,makeid:{},xcard:null},n=Object.keys(s);n.forEach((i,o)=>{this[i]=s[i]}),n.forEach((i,o)=>{t[i]!=null&&(this[i]=t[i])}),this.data;var a=this;function r(i){$(i.tableSelector).closest(".dataTables_wrapper").find(".grid_view .xc").each((o,d)=>{var u=d.data;if(console.log("xcard.."),i.xcard!=null){var h=i.xcard(u);$(d).prepend(h)}else{var b=[];i.columns.forEach((f,g)=>{var y=`
              <div class="d-flex flex-column pb-2" role="grid_data" aria-label="`+f.label+`">
                <label class="fw-light font-sm text-secondary">`+f.label+`</label>
                <div>`+this.dataFormatter(u,f)+`</div>
              </div>`;b.push(y)});var _=document.createElement("div");_.className=" card p-2",_.innerHTML=b.join(""),$(d).prepend(_)}})}this.load=function(i,o){i!=null?(this.tableSelector="#"+i,this.makeid={id:i,dom:o},l.Page.createTable(i,o)):l.Page.createTable(this.makeid.id,this.makeid.dom),l.populateTable(this),this.table.on("draw",()=>{var d=`
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
                ${d}
              </ul>
            </div>
          </div>
        `;$(this.tableSelector+"_wrapper .dataTables_filter").before(u),l.populateGridView(a),r(a)})},this.dataFormatter=function(i,o){const d=i[o.data];if(!d)return"-";switch(o.type){case"date":return new Date(d).toLocaleDateString();case"datetime":return new Date(d).toLocaleString();case"currency":return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(d);case"boolean":return d?"Yes":"No";case"image":return`<img src="${d}" alt="" style="max-width: 50px; max-height: 50px;">`;default:return d}},this.refresh=function(){this.table&&this.table.ajax.reload()},this.addRow=function(i){this.allData.push(i),this.table&&this.table.row.add(i).draw()},this.updateRow=function(i,o){this.allData[i]=o,this.table&&this.table.row(i).data(o).draw()},this.deleteRow=function(i){this.allData.splice(i,1),this.table&&this.table.row(i).remove().draw()}}}let m={cart_:[],mcart_:[],region:"MY",selectedInstalment:null,emptyCart_(e){const t=e?"mcart":"cart",s=e?"first_mcart_country_id":"first_cart_country_id";e?this.mcart_=[]:this.cart_=[],localStorage.setItem(t,JSON.stringify([])),localStorage.removeItem(s),m[s]=null},restoreCart(e){const t=e?"mcart":"cart",s=e?"first_mcart_country_id":"first_cart_country_id",n=localStorage.getItem(t);n!=null&&(e?(this.mcart_=JSON.parse(n),m.first_mcart_country_id=localStorage.getItem(s)):(this.cart_=JSON.parse(n),m.first_cart_country_id=localStorage.getItem(s)))},filterItemsByName(e){var s=this.cart_.filter((n,a)=>n.name.includes(e));return console.log(s),s},hasCartItems(e){return(e?this.mcart_:this.cart_).length},addItem_(e,t){console.info(e);const s=t?this.mcart_:this.cart_,n=s.findIndex(r=>r.id===e.id);e.is_instalment&&(e.payInstalment||(instalment_name=e.name,product_instalment_id=e.id,e=e.first_payment_product,e.selectedInstalmentId=product_instalment_id,e.selectedInstalment={id:product_instalment_id,name:instalment_name})),n>=0?s[n].qty+=1:(e.qty=1,s.unshift(e));const a=t?"mcart":"cart";localStorage.setItem(a,JSON.stringify(s))},addItemById_(e,t){const s=t?"mcart":"cart",n=t?this.mcart_:this.cart_,a=n.findIndex(i=>i.id==parseInt(e));if(a>=0){var r=n[a];l.notify("item "+r.name+" added !",{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),r.qty+=1}localStorage.setItem(s,JSON.stringify(n))},minusItem_(e,t){const s=t?"mcart":"cart",n=t?this.mcart_:this.cart_,a=n.findIndex(i=>i.id==parseInt(e));if(a>=0){var r=n[a];l.notify("item "+r.name+" deducted !",{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),r.qty-=1,r.qty==0&&this.removeItem_(e,t)}localStorage.setItem(s,JSON.stringify(n))},removeItem_(e,t){const s=t?"mcart":"cart",n=t?this.mcart_:this.cart_,a=n.findIndex(i=>i.id==parseInt(e));var r=n[a];l.notify("item "+r.name+" removed !",{delay:2e3,type:"warning",placement:{from:"top",align:"center"}}),n.splice(a,1),localStorage.setItem(s,JSON.stringify(n)),m.cart_.length==0&&(m.first_cart_country_id=null)},toastChanges(){$("input[name='user[share_code]']").length>0||l.toast({content:'<div class=""><ul class="">'+$(".ac").html()+"</ul></div>"})},total_(e){e?this.mcart_:this.cart_;var t=this.cart.map((s,n)=>s.price).reduce((s,n)=>s+n);return t},render(){var e=["merchantProducts","merchantproduct","merchantProfile","merchant","recruit","topup","country","light","userProfile","wallet","announcement","products","product","rewardList","rewardSummary","mcart","cart","cartItems","salesItems","upgradeTarget","upgradeTargetMerchant","sponsorTarget","stockistTarget","choosePayment"];e.forEach((t,s)=>{if($(t).length>0)try{this.components[t]()}catch(n){console.error(n)}})},components:{merchantproduct(){$("merchantproduct").customHtml(`
        <div class="text-center mt-4">
          <div class="spinner-border loading2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          
      <div class="loading2 d-none" id="mpcontent" />
      `),l.api("get_mproduct",{id:pageParams.id},null,e=>{$("title").html(e.name);function t(){var n=m.mcart_.filter((a,r)=>a.merchant_id==e.merchant_id);n.length>0?(m.addItem_(e,!0),m.components.updateMCart(),l.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):m.mcart_.length==0?(m.addItem_(e,!0),m.components.updateMCart(),l.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):alert("cant add due to different merchants, empty it first.")}$(".spinner-border.loading2").parent().remove(),$(".loading2").removeClass("d-none");var s;if(e.img_url!=null)try{s=e.img_url}catch{s="/images/placeholder.png"}$("#mpcontent").customHtml(`

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

      `),$("#ptitle").html(e.name),$("[mproduct-id='"+e.id+"']")[0].onclick=t})},merchantProducts(){let e;function t(){return phxApp.user==null?"b.is_approved=true|b.country_id="+l.chosen_country_id_.id:"b.is_approved=true|b.country_id="+phxApp.user.country_id}function s(i,o,d,u,h){var b=`
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
                              background-image: url('`+o+`');
                              
                              ">
                        </div>
                        <div class="rounded py-2 foreground-p" style="
                             
                              width:  100%;
                              z-index: 1;
                              background-position: center;
                              background-repeat: no-repeat;
                              background-size: cover; 
                              background-image: url('`+o+`');
                              ">
                        </div>
                      </div>
                      <div class="d-flex position-absolute" style="left: 10px; top: 12px;z-index: 10;">
                        <div class="bg-primary badge">`+d.name+`</div>
                      </div>
                      <div class="d-flex flex-column justify-content-center gap-2 mt-4">
                        <div class="font-sm fw-bold text-center">`+u.name+`</div>
                         <div class="d-flex flex-column justify-content-center ">
                            <div class="font-sm fw-light text-secondary text-center "><span class="format-float">`+u.retail_price+`</span> RP</div>
                         </div>
                         `+h+`
                      </div>
                    </div>
                    `;return b}function n(i){var o="v2";return i=="Thailand"&&(o="th"),i=="Vietnam"&&(o="vn"),i=="China"&&(o="cn"),o}var a=[];if(l.countries_.forEach((i,o)=>{a.push(`
                <button type="button" aria-name="`+i.name+'" aria-country="'+i.id+'" class="btn btn-primary ">'+i.name+" "+(i.alias||"")+`</button>
              `)}),l.chosen_country_id_==null&&pageParams.share_code==null&&(l.modal({selector:"#mySubModal",content:`
                    <center>
                      <div class="btn-group-vertical">
                      `+a.join("")+`
                      </div>
                    </center>
                  `,header:"Choose region",autoClose:!1}),$("[aria-country]").unbind(),$("[aria-country]").click(function(){var i=$(this).attr("aria-country"),o=$(this).attr("aria-name");l.chosen_country_id_=i,l.notify("Chosen region: "+o),localStorage.setItem("region",o),setTimeout(()=>{$("#chosen-region").html(o)},1e3),localStorage.region!=null&&(langPrefix=n(o)),translationRes=l.api("translation",{lang:langPrefix}),$("#mySubModal").modal("hide"),m.components.country(),l.navigateTo("/home")})),pageParams.share_code!=null&&l.api("get_share_link_by_code",{code:pageParams.share_code},null,i=>{e=l.countries_.filter((d,u)=>d.id==i.user.country_id)[0],console.info(e),l.chosen_country_id_=i.user.country_id,i.user.country_id;var o=e.name;l.notify("Chosen region: "+e.name),localStorage.setItem("region",e.name),setTimeout(()=>{$("#chosen-region").html(o)},1e3),localStorage.region!=null&&(langPrefix=n(o)),translationRes=l.api("translation",{lang:langPrefix}),m.components.country(),$(".sponsor-name").customHtml("_sponsor: "+i.user.username+" _position: "+i.position),$(".sponsor-bank").html(`

                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Bank Details</span>
                              <span class=" my-4 me-4 d-flex justify-content-end align-items-end gap-1 flex-column">
                                <div>`+i.user.bank_name+`</div>
                                <div>`+i.user.bank_account_holder+`</div>
                                <div>`+i.user.bank_account_no+`</div>
                              </span>
                            </div>

                              `)}),l.chosen_country_id_!=null){let i=function(o){var d=$(o).attr("mproduct-id");l.api("get_mproduct",{id:d},()=>{},u=>{var h=m.mcart_.filter((b,_)=>b.merchant_id==u.merchant_id);if(h.length>0)try{m.addItem_(u,!0),m.components.updateMCart(),m.components.cartItems(),l.notify("Added "+u.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})}catch(b){console.error(b)}else m.mcart_.length==0?(m.addItem_(u,!0),m.components.updateMCart(),m.components.cartItems(),l.notify("Added "+u.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):alert("cant add due to different merchants, empty it first.")})};var r=i;$("merchantProducts").each((o,d)=>{$(d).customHtml(`
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
                `).then(()=>{var u=null,h="mproducts",b=new F({onDrawFn:()=>{$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none"),setTimeout(()=>{$("[mproduct-id]").each((_,f)=>{f.onclick=()=>{i(f)}}),I.formatDate()},1200)},xcard:_=>{var f=_,g="",y="/images/placeholder.png",k=`onclick="phxApp.navigateTo('/merchant_products/`+f.id+"/"+f.name+`')"`;if($(d).attr("direct")!=null&&(k="",g='<div class="btn btn-outline-primary mt-4" mproduct-id="'+f.id+'">Add</div>'),f.img_url!=null)try{y=f.img_url}catch{y="/images/placeholder.png"}var x=f.merchant;return s(k,y,x,f,g)},data:{sorts:[[1,"asc"]],additional_join_statements:[{merchant:"merchant"}],additional_search_queries:[t()],preloads:["merchant"],grid_class:"col-4 col-lg-3",dom:`

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

                                                `},columns:[{label:"id",data:"id"},{label:"Action",data:"id"}],moduleName:"MerchantProduct",link:"MerchantProduct",customCols:u,buttons:[],tableSelector:"#"+h});b.load(h,"#mproduct_tab1")})})}},merchantProfile(){$("merchantProfile").html(`
      <form class="with_mod row" module="Merchant" id="Merchant">
      </form>
      `);var e=l.user.merchant;l.user.merchant==null&&(e={id:"0",user_id:phxApp.user.id});var t=new F({columns:[{label:"Action",data:"id"}],moduleName:"MerchantCategory",link:"MerchantCategory",buttons:[],tableSelector:"#bc2c"}),s=l.populateTableData(t,100,()=>{});try{console.info(s.allData)}catch(n){console.error(n)}phxApp.createForm(e,null,[{name:"General",list:["id","user_id","name",{label:"merchant_category_id",alt_name:"Business Category",alt_class:"col-12",selection:t.allData},{alt_name:"Merchant Logo",label:"img_url",upload:!0},{label:"description",binary:!0,alt_class:"col-12"},{label:"commission_perc",alt_name:"Percentage Contribution",selection:[{id:.05,name:"5%"},{id:.1,name:"10%"},{id:.15,name:"15%"},{id:.2,name:"20%"},{id:.22,name:"25%"},{id:.3,name:"30%"},{id:.35,name:"35%"},{id:.4,name:"40%"},{id:.45,name:"45%"},{id:.5,name:"50%"}]}]},{name:"CompanyDetails",list:[{label:"company_address",alt_name:"Address",alt_class:"col-12",binary:!0},{label:"company_email",alt_name:"Email",alt_class:"col-12"},{label:"company_phone",alt_name:"Phone",alt_class:"col-12"},{label:"company_reg_no",alt_name:"Reg No",alt_class:"col-12"},{label:"company_ssm_image_url",alt_name:"SSM Image",alt_class:"col-12",upload:!0}]},{name:"BankDetails",list:[{label:"bank_name",alt_name:"Bank Name",alt_class:"col-12"},{label:"bank_account_holder",alt_name:"Bank Account Holder",alt_class:"col-12"},{label:"bank_account_no",alt_name:"Account Number",alt_class:"col-12"}]}],n=>{console.info(n),w.extendUser(),phxApp.navigateTo("/merchant_profile")})},merchant(){var e=' <div class="btn btn-primary btn-lg merchant-apply mb-4 disabled">Apply</div>';l.user.merchant!=null&&(l.user.merchant.is_approved==!1?e=' <div class="btn btn-primary btn-lg merchant-apply ">Pending Approval</div>':l.navigateTo("/merchant_profile"));function t(){console.log("agree"),$(".merchant-apply ").toggleClass("disabled")}window.agree=t,$("merchant").html(`
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

      `),$(".merchant-apply").on("click",()=>{l.post("apply_merchant",{id:l.user.id},null,()=>{l.navigateTo("/merchant_profile")})})},recruit(){$("recruit").each((e,t)=>{console.log(t);var s=$(t).attr("merchant");console.log(s==""),s==""?$(t).customHtml(`

          <div class="">
              <label class="my-2">Position</label>
              <select class="form-control" name="mposition">
                <option>left</option>
                <option>right</option>
              </select>
              <div class="mt-4 btn btn-primary generate-mlink">Generate</div>
          </div>



          `):$(t).customHtml(`

          <div class="">
              <label class="my-2">Position</label>
              <select class="form-control" name="position">
                <option>left</option>
                <option>right</option>
              </select>
              <div class="mt-4 btn btn-primary generate-link">Generate</div>
          </div>



          `),$(".generate-mlink").click(()=>{l.api("get_merchant_share_link",{username:l.user.username,position:$("select[name='mposition']").val()},null,n=>{l.modal({autoClose:!1,header:"Share Link",selector:"#mySubModal",content:`

                <label class="my-2">Generated</label>
                <input class="form-control" name="link"></input>
                <div class="mt-4 btn btn-primary copy-link">Copy</div>




              `}),$("input[name='link']").val(n.link),$(".copy-link").click(()=>{try{navigator.clipboard.writeText(n.link),console.log("Content copied to clipboard"),l.notify("Copied!")}catch{l.notify("Cant copy",{type:"danger"})}})})}),$(".generate-link").click(()=>{l.api("get_share_link",{username:l.user.username,position:$("select[name='position']").val()},null,n=>{l.modal({autoClose:!1,header:"Share Link",selector:"#mySubModal",content:`

                <label class="my-2">Generated</label>
                <input class="form-control" name="link"></input>
                <div class="mt-4 btn btn-primary copy-link">Copy</div>




              `}),$("input[name='link']").val(n.link),$(".copy-link").click(()=>{try{navigator.clipboard.writeText(n.link),console.log("Content copied to clipboard"),l.notify("Copied!")}catch{l.notify("Cant copy",{type:"danger"})}})})})})},choosePayment(){var e=phxApp.api("razer_list",{}),t=Object.keys(e),s=[];t.forEach((n,a)=>{var r=[];e[n].forEach((i,o)=>{var d=`

          <div class="py-1 col-6 col-lg-4 use-channel" aria-channel-label='`+i.channel_map.direct.request+`' >
            <img class="w-100 m-2 m-lg-0" src="`+i.logo_url_120x43+`"></img>
          </div>
          `;i.currency.includes("MYR")&&i.status==1&&i.channel_map.direct.request!=""&&r.push(d)}),s.push(`

          <div class="row mt-2 pb-1 border-success border-bottom">
         
          `+r.join("")+`
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
      `),$(".use-channel").click(function(){var n=$(this).attr("aria-channel-label");$(".use-channel").removeClass("border border-primary rounded"),$(this).addClass("border border-primary rounded"),console.info("use channel: "+n),$("input[name='user[payment][channel]']").val(n);var a=$(this).html();$("#chosen-payment").html(a),$("#myPaymentModal").modal("hide")})},topup(){function e(o){var d=phxApp.rowData(o);console.log(d),d.payment!=null?d.payment.payment_method=="fpx"?(msg="",d.is_approved==!1&&(msg=`<p>You will be redirected to pay this topup.</p>
            <a target="_blank" href="`+d.payment.payment_url+`" class="btn btn-primary">Pay
            </a>`),phxApp.modal({autoClose:!1,selector:"#mySubModal",header:"FPX",content:`

            `+msg+`
            <div class="btn btn-primary check">Recheck
            </div>

            `}),$(".check").click(()=>{phxApp.api("check_bill",{id:d.payment.billplz_code})})):phxApp.modal({selector:"#mySubModal",header:"Details",content:`

          <div class="btn btn-primary delete">Delete Request
            </div>


            `}):phxApp.modal({selector:"#mySubModal",header:"Details",content:`

            <p>`+d.remarks+`</p>

            `}),$(".delete").unbind(),$(".delete").click(()=>{phxApp.api("delete_topup_request",{id:d.id},null,u=>{$("#mySubModal").modal("hide"),u.status=="error"?u.reason!=""&&phxApp.notify("Not Deleted! Reason: "+u.reason,{type:"danger"}):(phxApp.notify("Deleted!"),phxApp.navigateTo("/topup_register_point"))})})}$("topup").customHtml(`    
      <div class="card-body ">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3>Topup Transaction</h3>
          <div class="btn btn-primary " id="new_topup">
            <span class="d-flex align-items-center"><i class="fa fa-plus me-1"></i>Topup</span></div>
        </div>
        <div class="" id="tab2"></div>
      </div>
        `),window.selectedBank=o=>{$("input[name='WalletTopup[bank]']").val(o)};var t=phxApp.api("razer_list",{}),s=Object.keys(t),n=[];s.forEach((o,d)=>{var u=[];t[o].forEach((h,b)=>{var _=`

          <div class="py-1 col-6 col-lg-4 use-channel" aria-channel-label='`+h.channel_map.direct.request+`' >
            <img class="w-100 m-2 m-lg-0" src="`+h.logo_url_120x43+`"></img>
          </div>
          `;h.currency.includes("MYR")&&h.status==1&&h.channel_map.direct.request!=""&&u.push(_)}),n.push(`

          <div class="row mt-2 pb-1 border-success border-bottom">
         
          `+u.join("")+`
          </div>


          `)}),$("#new_topup").click(()=>{phxApp.modal({selector:"#mySubModal",autoClose:!1,header:"New Register Point Topup",content:`
          <div class="row ">
            <form class="col-12 offset-lg-1 col-lg-10 with_mod row p-4" module="WalletTopup" id="WalletTopup">
             

            </form>

          </div>
      `}),phxApp.createForm({id:"0",user_id:phxApp.user.id},null,["id",{label:"amount",alt_name:"Amount (RP)",alt_class:"col-12"},{label:"remarks",alt_name:"Description",alt_class:"col-12"},{label:"payment-placeholder",alt_name:"Choose Payment",alt_class:"col-12",placeholder:`


              <div id="payment-placeholder">
                <section class="p-4 razer-display">
                  <h3>Choose 1 channel</h3>
                `+n.join("")+`
                </section>
                <section class="d-none upload-display">
                  <div class="px-4 pt-4">
                    Kindly bank in to either 1 of these account.
                  </div>
                  <div class="p-4 fs-5">
                    HAHO LIFE SDN. BHD.<br>
                    <span>
                      <div> MBB </div>
                      <div>5642 4949 7131  <div class="btn btn-primary" onclick="phxApp.copyToClipboard('564249497131');selectedBank('MBB')">Copy</div></div>
                    </span><br>
                    <span>
                      <div> CIMB </div>
                      <div>8011 2277 45 <div class="btn btn-primary" onclick="phxApp.copyToClipboard('8011227745');selectedBank('CIMB')">Copy</div></div>
                    </span><br>
                    <span>
                      <div> PUBLIC BANK </div>
                      <div>3237 7779 07 <div class="btn btn-primary" onclick="phxApp.copyToClipboard('3237777907');selectedBank('PBB')">Copy</div></div>
                    </span><br>
                  </div>
                </section>
                <div class="btn-group" role="group" aria-label="PaymentGroup">
                  <input type="radio" class="btn-check show-upload" name="btnradio" id="btnradio1z" autocomplete="off" >
                  <label class="btn btn-outline-primary" for="btnradio1z">Upload Bank In Slip</label>

                  <input type="radio" class="btn-check show-razer" name="btnradio" id="btnradio2z" autocomplete="off" checked="">
                  <label class="btn btn-outline-primary" for="btnradio2z">Online Banking/CC</label>
       
                </div>

              </div>

          `},{label:"payment_method",selection:[{id:"fpx",name:"FPX"},{id:"bank in slip",name:"BANK IN SLIP"}],alt_class:"d-none"},{label:"img_url",upload:!0,alt_class:"d-none upload-display"},{label:"bank",data:"bank",hidden:!0},"user_id"],o=>{if(console.info(o),o.payment_method=="fpx"){let u=function(h,b){var _=$("<form>",{method:"POST",action:h});$.each(b,function(f,g){$("<input>",{type:"hidden",name:f,value:g}).appendTo(_)}),_.appendTo("body").submit()};var d=u;u(o.payment.payment_url,JSON.parse(o.payment.webhook_details))}else phxApp.navigateTo("/topup_register_point")}),$(".show-upload").click(()=>{$(".upload-display").removeClass("d-none"),$(".razer-display").addClass("d-none"),$("select[name='WalletTopup[payment_method]']").val("bank in slip")}),$(".show-razer").click(()=>{$(".upload-display").addClass("d-none"),$(".razer-display").removeClass("d-none"),$("select[name='WalletTopup[payment_method]']").val("fpx")}),$("input[name='WalletTopup[amount]']").on("change",()=>{var o=$("input[name='WalletTopup[amount]']").val();$("input[name='WalletTopup[remarks]']").val("MYR "+o*5)}),$(".use-channel").click(function(){var o=$(this).attr("aria-channel-label");$(".use-channel").removeClass("border border-primary rounded"),$(this).addClass("border border-primary rounded"),console.info("use channel: "+o),$("input[name='WalletTopup[bank]']").val(o)})});var a=null,r=phxApp.makeid(4),i=new F({onDrawFn:()=>{setTimeout(()=>{phxApp.formatDate()},200)},xcard:o=>{console.log(o);var d=o;d.amount<0;var u='<span class="badge bg-warning">PENDING</span>';d.is_approved&&(u='<span class="badge bg-success">APPROVED</span>');var h=`
       

        <div class="row border-1 border-top py-2">
          <div class="col-6 text-start text-sm">`+u+`</div>
         <div class="col-6 text-end text-sm">Amount (RP)</div>
        </div>
        <div class="row">
          <div class="col-6 text-start text-sm format_datetime">`+d.inserted_at+`</div>
     
         <div class="col-6 text-end "> <span class='format-integer'>`+d.amount+`</span></div>
        </div>

        `;return h},data:{grid_class:"col-12 ",dom:`
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
    `,preloads:["user","payment"],additional_join_statements:[{user:"user"}],additional_search_queries:["a.user_id="+phxApp.user.id]},columns:[{label:"id",data:"id"},{label:"Date",data:"inserted_at",formatDateTime:!0,offset:0},{customized:!0,label:"Approved?",data:"is_approved",xdata:{formatFn:(o,d)=>(o.is_approved?html='<div  ><i class="fa fa-check text-success"></i><span  class="ms-2">Approved</span></div>':html='<div  ><i class="fa fa-hourglass text-warning"></i><span class="ms-2">Pending</span></div>',html)}},{label:"Payment",data:"id",showChild:!0,xdata:{child:"payment",data:"payment_method"}},{label:"Amount",data:"amount",className:"format-float"},{label:"Action",data:"id",className:""}],moduleName:"WalletTopup",link:"WalletTopup",customCols:a,buttons:[{name:"Details",iconName:"fa fa-info",color:"btn-sm btn-outline-warning",onClickFunction:e,fnParams:{}}],tableSelector:"#"+r});i.load(r,"#tab2")},country(){if(localStorage.getItem("region")!=null){var e=l.countries_.filter((s,n)=>s.name==localStorage.getItem("region"))[0];l.chosen_country_id_=e,$("country").customHtml(`


      <li class="nav-item">
        <a class="nav-link choose-region" href="javascript:void(0);" > <i class="fa fa-globe"></i>`+localStorage.getItem("region")+`</a>
      </li>

    `)}else $("country").customHtml(`


      <li class="nav-item">
        <a class="nav-link choose-region" href="javascript:void(0);" > <i class="fa fa-globe"></i> MY</a>
      </li>

    `);var t=[];l.countries_.forEach((s,n)=>{t.push(`
          <button type="button" aria-name="`+s.name+'" aria-country="'+s.id+'" class="btn btn-primary ">'+s.name+`</button>
        `)}),$(".choose-region").click(()=>{m.emptyCart_(),l.modal({selector:"#mySubModal",content:`
        <center>
          <div class="btn-group-vertical">
          `+t.join("")+`
          </div>
        </center>
      `,header:"Choose region",autoClose:!1}),$("[aria-country]").unbind(),$("[aria-country]").click(function(){var s=$(this).attr("aria-country"),n=$(this).attr("aria-name");l.chosen_country_id_=s,l.notify("Chosen region: "+n),localStorage.setItem("region",n),setTimeout(()=>{$("#chosen-region").html(n)},1e3),$("#mySubModal").modal("hide");try{let i=function(o){var d="v2";return o=="Thailand"&&(d="th"),o=="Vietnam"&&(d="vn"),o=="China"&&(d="cn"),d};var r=i,a="v2";localStorage.region!=null&&(a=i(localStorage.region)),translationRes=l.api("translation",{lang:a})}catch(i){console.error("Error fetching translation:",i)}m.components.country(),m.components.products(),$("[name='user[pick_up_point_id]']").length>0&&m.components.cartItems()})})},upgradeTarget(){var e=null,t;$("upgradeTarget").attr("instalment")!=null&&(console.log("ok"),m.emptyCart_()),window.upgradeTarget==null&&(window.upgradeTarget=w.user.username),$("input[name='user[upgrade]']").val(window.upgradeTarget),$("upgradeTarget").customHtml('<span>for: <span id="upgradeTarget">'+window.upgradeTarget+'</span> <a class="ms-4" href="javascript:void(0);" aria-upgrade=true> <i class="fa fa-edit"></i> Change</a> </span>'),$("[aria-upgrade]").click(()=>{l.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" type="text" name='upgrade[username]'></input>
              <div class="form-text text-muted pv-info"></div>

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Upgrade User"}),$(".checkUser").click(()=>{l.api("get_accumulated_sales",{show_instalment:!0,parent_id:w.user.id,show_rank:!0,username:$("[name='upgrade[username]']").val()},()=>{window.upgradeTarget=w.user.username,$("input[name='user[upgrade]']").val(window.upgradeTarget),$(".selectUser").addClass("disabled")},s=>{l.notify("User verified!"),$(".selectUser").removeClass("disabled"),$(".pv-info").customHtml("Accumulated sales PV: "+s[0]+" | Rank: "+s[1]),s[2].is_direct_downline?$(".to-upgrade").removeClass("disabled"):(l.notify("User not direct downline!",{type:"warning"}),$("label[for='btnradio3']").click(),$(".to-upgrade").addClass("disabled"),s[4].outstanding_instalments!=null&&s[4].outstanding_instalments.product.can_pay_by_drp&&$(".to-upgrade").removeClass("disabled")),console.info(s[4].outstanding_instalments);try{s[4].outstanding_instalments!=null&&($("input[name='user[shipping][fullname]']").val(s[4].outstanding_instalments.user.fullname),$("input[name='user[shipping][phone]']").val(s[4].outstanding_instalments.user.phone),$("input[name='user[instalment]']").val("Month no: "+s[4].outstanding_instalments.month_no+"/"+s[4].outstanding_instalments.instalment.no_of_months),t=s[4].outstanding_instalments.product,e=s[4].outstanding_instalments.member_instalment_product.product)}catch(n){console.error(n)}})}),$(".selectUser").click(()=>{$("input[name='user[upgrade]']").val($("[name='upgrade[username]']").val()),l.notify("User selected!"),$("#mySubModal").modal("hide"),window.upgradeTarget=$("[name='upgrade[username]']").val(),$("#upgradeTarget").html($("[name='upgrade[username]']").val()),t!=null&&(l.addItem(t.id),e!=null&&l.addItem(e.id)),m.components.cartItems(),console.info("need to check if member is direct sponsor")})})},upgradeTargetMerchant(){var e=null,t;$("upgradeTarget").attr("instalment")!=null&&(console.log("ok"),m.emptyCart_()),window.upgradeTarget==null&&(window.upgradeTarget=w.user.username),$("input[name='user[upgrade]']").val(window.upgradeTarget),$("upgradeTargetMerchant").customHtml('<span>for: <span id="upgradeTarget">'+window.upgradeTarget+'</span> <a class="ms-4" href="javascript:void(0);" aria-upgrade=true> <i class="fa fa-edit"></i> Change</a> </span>'),$("[aria-upgrade]").click(()=>{l.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" type="text" name='upgrade[username]'></input>
              <div class="form-text text-muted pv-info"></div>

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Upgrade User"}),$(".checkUser").click(()=>{l.api("get_accumulated_sales_merchant",{show_instalment:!0,parent_id:w.user.id,show_rank:!0,username:$("[name='upgrade[username]']").val()},()=>{window.upgradeTarget=w.user.username,$("input[name='user[upgrade]']").val(window.upgradeTarget),$(".selectUser").addClass("disabled")},s=>{l.notify("User verified!"),$(".selectUser").removeClass("disabled"),$(".pv-info").customHtml("Accumulated sales PV: "+s[0]+" | Rank: "+s[1]),s[2].is_direct_downline?$(".to-upgrade").removeClass("disabled"):(l.notify("User not direct downline!",{type:"warning"}),$("label[for='btnradio3']").click(),$(".to-upgrade").addClass("disabled"),s[4].outstanding_instalments!=null&&s[4].outstanding_instalments.product.can_pay_by_drp&&$(".to-upgrade").removeClass("disabled")),console.info(s[4].outstanding_instalments);try{s[4].outstanding_instalments!=null&&($("input[name='user[shipping][fullname]']").val(s[4].outstanding_instalments.user.fullname),$("input[name='user[shipping][phone]']").val(s[4].outstanding_instalments.user.phone),$("input[name='user[instalment]']").val("Month no: "+s[4].outstanding_instalments.month_no+"/"+s[4].outstanding_instalments.instalment.no_of_months),t=s[4].outstanding_instalments.product,e=s[4].outstanding_instalments.member_instalment_product.product)}catch(n){console.error(n)}})}),$(".selectUser").click(()=>{$("input[name='user[upgrade]']").val($("[name='upgrade[username]']").val()),l.notify("User selected!"),$("#mySubModal").modal("hide"),window.upgradeTarget=$("[name='upgrade[username]']").val(),$("#upgradeTarget").html($("[name='upgrade[username]']").val()),t!=null&&(l.addItem(t.id),e!=null&&l.addItem(e.id)),m.components.cartItems(),console.info("need to check if member is direct sponsor")})})},sponsorTarget(){window.sponsorTarget==null&&(window.sponsorTarget=w.user.username),$("input[name='user[sponsor]']").val(""),$("sponsorTarget").customHtml('<span>for: <span id="sponsorTarget">'+window.sponsorTarget+`</span>
     <a class="ms-4" href="javascript:void(0);" aria-sponsor=true> <i class="fa fa-edit"></i> Change</a> </span>`),$("[aria-sponsor]").click(()=>{l.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" value="`+w.user.username+`" type="text" name='sponsor[username]'></input>
            

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Sponsor User"}),$(".checkUser").click(()=>{l.api("get_accumulated_sales",{parent_id:w.user.id,show_rank:!0,username:$("[name='sponsor[username]']").val()},()=>{window.sponsorTarget=w.user.username,$("input[name='user[sponsor]']").val(window.sponsorTarget),$(".selectUser").addClass("disabled")},e=>{$(".selectUser").removeClass("disabled"),$(".pv-info").customHtml("Accumulated sales PV: "+e[0]+" | Rank: "+e[1]),e[2].is_direct_downline?$(".to-upgrade").removeClass("disabled"):($("label[for='btnradio3']").click(),$(".to-upgrade").addClass("disabled")),e[3].is_downline||$("input[name='sponsor[username]']").val()==w.user.username?l.notify("User verified!"):(l.notify("Not downline!",{type:"warning"}),$(".selectUser").addClass("disabled"))})}),$(".selectUser").click(()=>{$("input[name='user[sponsor]']").val($("[name='sponsor[username]']").val()),$("input[name='view[sponsor]']").val($("[name='sponsor[username]']").val()),l.notify("User selected!"),$("#mySubModal").modal("hide"),window.sponsorTarget=$("[name='sponsor[username]']").val(),$("#sponsorTarget").html($("[name='sponsor[username]']").val()),m.components.cartItems(),console.info("need to check if member is direct sponsor")})})},stockistTarget(){window.stockistTarget==null&&(window.stockistTarget=w.user.username),$("input[name='user[stockist_user_id]']").val(""),$("stockistTarget").customHtml('<span>for: <span id="stockistTarget">'+window.stockistTarget+`</span>
     <a class="ms-4" href="javascript:void(0);" aria-stockist=true> <i class="fa fa-edit"></i> Change</a> </span>`),$("[aria-stockist]").click(()=>{l.modal({selector:"#mySubModal",autoClose:!1,content:`
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" value="`+w.user.username+`" type="text" name='sponsor[username]'></input>
            

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,header:"Change Stockist User"}),$(".checkUser").click(()=>{l.api("get_stockist",{parent_id:w.user.id,show_rank:!0,username:$("[name='sponsor[username]']").val()},()=>{window.stockistTarget=w.user.username,$("input[name='user[stockist_user_id]']").val(null),$(".selectUser").addClass("disabled")},e=>{$(".selectUser").removeClass("disabled"),e[1].is_stockist?(window.stockistTargetData=e[2],$("input[name='user[stockist_user_id]']").val(window.stockistTargetData.id),l.notify("User verified!")):(l.notify("Not stockist!",{type:"warning"}),$(".selectUser").addClass("disabled"))})}),$(".selectUser").click(()=>{$("input[name='user[stockist]']").val($("[name='sponsor[username]']").val()),$("input[name='view[stockist]']").val($("[name='sponsor[username]']").val()),l.notify("User selected!"),$("#mySubModal").modal("hide"),window.stockistTarget=$("[name='sponsor[username]']").val(),$("#stockistTarget").html($("[name='sponsor[username]']").val()),m.components.cartItems()})})},salesItems(){var e=l.api("get_sale",{id:pageParams.id});if(e.status=="pending_payment"&&e.payment!=null){var t=l.api("check_bill",{id:e.payment.billplz_code});t.paid==!0&&l.notify("Payment updated!")}$("title").html("Order ID: "+e.id),window.sale=e;var s=[],n=0,a=0;n=e.sales_items.map((x,P)=>x.qty*x.item_pv).reduce((x,P)=>x+P,0),a=e.sales_items.map((x,P)=>x.qty*x.item_price).reduce((x,P)=>x+P,0),e.sales_items.map((x,P)=>x.qty).reduce((x,P)=>x+P,0);var r=e.shipping_fee||0,i=this.evalRank(a);try{reg_dets=JSON.parse(e.registration_details)}catch(x){console.error(x)}var o=!1;reg_dets.scope=="merchant_checkout"&&(n=e.total_point_value,o=!0),e.sales_items.forEach((x,P)=>{var C="/images/placeholder.png";if(x.img_url!=null)try{C=x.img_url}catch{C="/images/placeholder.png"}var S='  <span class="font-sm text-info "><span class="format-integer">'+x.item_pv*x.qty+"</span> PV</span>";o&&(S=""),s.push(`

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
                                background-image: url('`+C+`');
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
                                background-image: url('`+C+`');
                                ">
                </div>
              </div>
              <div class="d-flex flex-column">
                <span>`+x.item_name+" <small>(x"+x.qty+`)</small></span>
                <div>`+x.remarks+`</div>
              </div>
            </div>
            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
              <div class="d-flex flex-column align-items-end">
                <span class="font-sm ">RP <span class="format-float">`+(x.item_price*x.qty).toFixed(2)+`</span></span>
              `+S+`
              </div>
             
            </div>
          </div>

        
          `)});var d="Total PV";o&&(d="RP Received");var u=`

             <div class="d-flex justify-content-between align-items-center">
                <span class="fs-4">Subtotal</span>
                <span class=" me-4">RP <span class="format-float">`+a+`</span></span>
              </div>
             <div class="d-flex justify-content-between align-items-center">
                <span class="fs-4">Shipping</span>
                <span class=" me-4">RP <span class="format-float">`+r+`</span></span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fs-5">`+d+`</span>
                <span class="text-info me-4"><span class="format-integer">`+n+` PV</span></span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-secondary">Eligible Rank</span>
                <span class="text-info me-4"><span class="format-integer">`+i+`</span></span>
              </div>

    `;try{shipping=reg_dets.user.shipping,console.log("shippnig..."),console.info(shipping),payment=e.payment}catch(x){console.error(x)}var h={};if(e.payment!=null){e.payment.payment_url!=null&&(u=`

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Subtotal</span>
                  <span class=" ">RP <span class="format-float">`+a+`</span></span>
                </div>
               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Shipping</span>
                  <span class=" me-4">RP <span class="format-float">`+r+`</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">`+d+`</span>
                  <span class="text-info "><span class="format-integer">`+n+` PV</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info "><span class="format-integer">`+i+`</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Paid with</span>
                  <span class="text-primary "><span class="">`+payment.payment_method.split("_").map((x,P)=>I.capitalize(x)).join(" ")+`</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Payment Link</span>
                  <span class="text-primary "><a target="_blank" href="`+payment.payment_url+'" class="">'+payment.payment_url+`</a></span>
                </div>

      `);try{if(console.info(e.payment),e.payment.webhook_details!=null){e.payment.webhook_details.split("|").map((x,P)=>{data=x.split(": ");var C=data[0].replace(" ","_");console.log(C),h[C]=parseFloat(data[1])}),console.info(h),drp_amount=0;var b="DRP";o&&(b="Merchant Point"),(h.drp_paid!=null||h.mp_paid!=null)&&(drp_amount=h.drp_paid,o&&(drp_amount=h.mp_paid)),h.pp_paid!=null&&(n=0);var _=n-drp_amount,f=a+r-drp_amount-(h.rp_paid||0),g=` <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info "><span class="format-integer">`+i+`</span></span>
                </div>`;o&&(g="",_=n,f=a+r),u=`

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Subtotal</span>
                  <span class=" ">RP <span class="format-float">`+a+`</span></span>
                </div>
               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Shipping + Tax</span>
                  <span class=" ">RP <span class="format-float">`+r+`</span></span>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">`+b+`</span>
                  <span class=" ">- RP <span class="format-float">`+drp_amount+`</span></span>
                </div>

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Grand Total </span>
                  <span class=" ">RP <span class="format-float">`+(a+r)+`</span></span>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">`+d+`</span>
                  <span class="text-info "><span class="format-integer">`+_+` PV</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Grand Total  After Payment</span>
                  <span class=" ">RP <span class="format-float">`+f+` </span></span>
                </div>

               `+g+`
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Paid with</span>
                  <span class="text-primary "><span class="">`+payment.payment_method.split("_").map((x,P)=>I.capitalize(x)).join(" ")+`</span></span>
                        </div>

              `}}catch(x){console.error(x)}}var y="      ";try{shipping!=null?y=`
        <span class="text-secondary">Deliver To:</span> 
                         <span>`+shipping.line1+", "+shipping.line2+`</span>
                         <span>`+shipping.city+" "+shipping.postcode+", "+shipping.state+` </span>

    `:shipping={phone:null,fullname:null},e.pick_up_point!=null&&(y=`           <span class="text-secondary">Pick Up Point: </span>
                      <span>`+e.pick_up_point.name+` </span>
                    <span>`+e.pick_up_point.address+` </span>

        `)}catch(x){console.error(x)}console.info(y);var k='    <a class="btn btn-primary" href="/pdf?id='+e.id+'" target="_blank">Print</a>';e.payment==null&&e.status=="pending_payment"&&(k='<div class="btn btn-success approve-sale" aria-id="'+e.id+'">Approve</div>'),e.merchant_id!=null&&(k='   <a class="btn btn-primary" href="/pdf?type=merchant&id='+e.id+'" target="_blank">Print</a>  <a class="d-none mdo btn btn-primary" href="/pdf?type=merchant_do&id='+e.id+'" target="_blank">Print DO</a>'),console.info(e),$("salesItems").customHtml(`
      <div class="d-flex align-items-center justify-content-between gap-2">
        <h2>Sales Details</h2><small class="badge bg-primary">`+e.status+`</small>
      </div>
              <div class="d-flex flex-column mb-4 ">
                 <span class="text-secondary">Sold To:</span> 
                 <span>`+(reg_dets.user.fullname||l.user.fullname)+", "+(reg_dets.user.phone||l.user.phone)+`</span>
                 
              </div>
              <div class="d-flex flex-column mb-4 ">
                 <span class="text-secondary">Recipient:</span> 
                 <span>`+(shipping.fullname||l.user.fullname)+", "+(shipping.phone||l.user.phone)+`</span>
                 
              </div>


              <div class="d-flex flex-column mb-4 ">
               
                  `+y+`
              </div>

                 <span class="text-secondary">Items:</span>
              <div class="d-flex flex-column gap-2">`+s.join("")+`
              `+u+`
              </div>
              <div class="my-4">
            `+k+`
              </div>

      `),$(".approve-sale").click(function(){var x=$(this).attr("aria-id");l.modal({selector:"#mySubModal",content:`<div>

          <p>Approve this sale ?</p>

          <div class="btn btn-outline-primary confirm-approve">Approve</div>

          </div>`,header:"Confirmation",autoClose:!1}),$(".confirm-approve").click(()=>{l.api("manual_approve_bank_in",{id:x})},null,()=>{l.navigateTo(location.pathname)})}),I.formatDate()},evalStates(){$("select[name='user[shipping][state]']").customHtml("<option></option>");var e=l.countries_.filter((s,n)=>s.name=="Malaysia")[0];if(e.id==l.chosen_country_id_.id){$("[name='user[pick_up_point_id]']").val()==null?$(".ss1").customHtml(`
              <select class="form-select" required id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
              </select>
              <label class="ms-2" for="floatingInput">State</label>
        `):$(".ss1").customHtml(`
              <select class="form-select"  id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
              </select>
              <label class="ms-2" for="floatingInput">State</label>
        `);var t=[["jhr","Johor"],["kdh","Kedah"],["ktn","Kelantan"],["mlk","Melaka"],["nsn","Negeri Sembilan"],["phg","Pahang"],["prk","Perak"],["pls","Perlis"],["png","Pulau Pinang"],["sgr","Selangor"],["trg","Terengganu"],["kul","Kuala Lumpur"],["pjy","Putra Jaya"],["srw","Sarawak"],["sbh","Sabah"],["lbn","Labuan"]];t.forEach((s,n)=>{window.selectedState==s[1]?$("select[name='user[shipping][state]']").append(`
            <option selected value="`+s[1]+'">'+s[1]+"</option>"):$("select[name='user[shipping][state]']").append(`
            <option value="`+s[1]+'">'+s[1]+"</option>")}),$("select[name='user[shipping][state]']").change(()=>{window.selectedState=$("select[name='user[shipping][state]']").val(),m.components.updateCart(),m.components.cartItems()})}else $("[name='user[pick_up_point_id]']").val()==null?$(".ss1").customHtml(`
              <input class="form-control" required id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
              </input>
              <label class="ms-2" for="floatingInput">State</label>
        `):$(".ss1").customHtml(`
              <input class="form-control"  id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
              </input>
              <label class="ms-2" for="floatingInput">State</label>
        `)},evalShipping(e){var t=$("cartItems").attr("merchant")=="",s=0,n=l.countries_.filter((r,i)=>r.name=="Malaysia")[0],a=l.countries_.filter((r,i)=>r.name=="Singapore")[0];return n.id==l.chosen_country_id_.id?$("[name='user[pick_up_point_id]']").val()!=""?s=0:["Sabah","Sarawak","Labuan"].includes(window.selectedState)?s=Math.ceil(e/200)*4:t?s=Math.ceil(e/200)*2:e>=100?s=0:s=2:(s=e*.1,a.id==l.chosen_country_id_.id&&(s=e*.05,t&&(s=e*.1))),s},evalShippingAddresses(){try{l.api("list_pick_up_point_by_country",{country_id:l.chosen_country_id_.id},null,e=>{if(l.pick_up_points=e,$("[name='user[pick_up_point_id]']").length>0&&$("[name='user[pick_up_point_id]']").val()!=""){var t=$("[name='user[pick_up_point_id]']").val(),s=l.pick_up_points.filter((a,r)=>a.id==t)[0];try{$("[name='user[shipping][state]']").removeAttr("required"),console.log("attr removed"),$(".self-pickup-form").customHtml(`
                 <div class="d-flex flex-column">
                    <span>`+s.name+`</span>
                    <span class="text-secondary">`+s.address+`</span>
                    <span class="mt-4">
                    </span>
                  </div>

          `)}catch{$(".shipping-form").removeClass("d-none"),$(".self-pickup-form").addClass("d-none"),l.notify("No pick up points in this region",{type:"danger"})}}var n=[];e.forEach((a,r)=>{n.push(`
            <div class="card my-2" style="cursor: pointer;">
              <div class="card-body">
                <div class="d-flex flex-column">
                  <span>`+a.name+`</span>
                  <span class="text-secondary">`+a.address+`</span>
                  <span class="mt-4">
                    <div class="btn btn-primary" aria-address="`+a.id+`">Choose</div>
                  </span>
                </div>
              </div>
            </div>
          `)}),$(".self-pickup").unbind(),$(".self-pickup").click(()=>{window.selectedState=null,$(".shipping-form").addClass("d-none"),$(".self-pickup-form").removeClass("d-none"),l.modal({autoClose:!1,selector:"#mySubModal",content:`
          <div class="d-flex flex-column">
            `+n.join("")+`
          </div>
          `,header:"Pick Up Points"}),$("[aria-address]").click(function(){var a=$(this).attr("aria-address"),r=l.pick_up_points.filter((i,o)=>i.id==a)[0];try{$("[name='user[shipping][state]']").removeAttr("required"),console.log("attr removed"),$(".self-pickup-form").customHtml(`
                 <div class="d-flex flex-column">
                    <span>`+r.name+`</span>
                    <span class="text-secondary">`+r.address+`</span>
                    <span class="mt-4">
                    </span>
                  </div>

          `)}catch{$(".shipping-form").removeClass("d-none"),$(".self-pickup-form").addClass("d-none"),l.notify("No pick up points in this region",{type:"danger"})}$("[name='user[pick_up_point_id]']").val(a),$("#mySubModal").modal("hide"),$("[name='user[shipping][state]']").val(null),m.components.cartItems()})})}),pageParams.share_code!=null||l.api("list_user_sales_addresses_by_username",{username:l.user.username},null,e=>{if(l.addresses=e,e.length>0&&window.choosenAddress!=null){var t=e.filter((n,a)=>n.id==window.choosenAddress)[0];$("[name='user[shipping][phone]']").val(t.phone),$("[name='user[shipping][fullname]']").val(t.fullname),$("[name='user[shipping][line1]']").val(t.line1),$("[name='user[shipping][line2]']").val(t.line2),$("[name='user[shipping][city]']").val(t.city),$("[name='user[shipping][postcode]']").val(t.postcode),setTimeout(()=>{$("[name='user[shipping][state]']").val(t.state)},500)}$(".change-address").unbind();var s=[];e.forEach((n,a)=>{s.push(`
            <div class="card my-2" style="cursor: pointer;">
              <div class="card-body">
                <div class="d-flex flex-column">
                  <span>`+n.fullname+`</span>
                  <span class="text-secondary">`+n.line1+", "+n.line2+`</span>
                  <span class="mt-4">
                    <div class="btn btn-primary" aria-address="`+n.id+`">Choose</div>
                  </span>
                </div>
              </div>
            </div>
          `)}),$(".change-address").click(()=>{$("[name='user[pick_up_point_id]']").val(""),$(".shipping-form").removeClass("d-none"),$(".self-pickup-form").addClass("d-none"),$("[name='user[shipping][state]']").attr("required"),console.log("attr add"),l.modal({autoClose:!1,selector:"#mySubModal",content:`
          <div class="d-flex flex-column">
            `+s.join("")+`
          </div>
          `,header:"Change address"}),$("[aria-address]").click(function(){var n=$(this).attr("aria-address");window.choosenAddress=n;var a=l.addresses.filter((r,i)=>r.id==n)[0];$("[name='user[shipping][phone]']").val(a.phone),$("[name='user[shipping][fullname]']").val(a.fullname),$("[name='user[shipping][line1]']").val(a.line1),$("[name='user[shipping][line2]']").val(a.line2),$("[name='user[shipping][city]']").val(a.city),$("[name='user[shipping][postcode]']").val(a.postcode),setTimeout(()=>{$("[name='user[shipping][state]']").val(a.state)},500),$("#mySubModal").modal("hide"),m.components.cartItems()})})})}catch(e){console.error(e)}},cartItems(){var e=$("cartItems").attr("merchant")=="";const t=e?m.mcart_:m.cart_;var s,n=!1,a=2,r=[],i=0,o=0;i=t.map((v,T)=>v.qty*v.point_value).reduce((v,T)=>v+T,0),o=t.map((v,T)=>v.qty*v.retail_price).reduce((v,T)=>v+T,0),e&&(i=o),t.map((v,T)=>v.qty).reduce((v,T)=>v+T,0),this.evalShippingAddresses(),this.evalStates(),$("cartItems").attr("upgrade")!=null?(window.upgradeTarget!=null?(accumulated_sales=l.api("get_accumulated_sales",{username:window.upgradeTarget}),o=o,s=this.evalRank(o+accumulated_sales)):(o=o,s=this.evalRank(o+w.user.rank.retail_price)),$(".only-downline").click(()=>{l.notify("Only available for direct recruited downline.")})):s=this.evalRank(o),a=this.evalShipping(o),t.forEach((v,T)=>{var j='<span class="font-sm text-info "><span class="format-integer">'+v.point_value*v.qty+"</span> PV</span>";e&&(j="");var A="/images/placeholder.png";if(v.img_url!=null)try{A=v.img_url}catch{A="/images/placeholder.png"}var D="";if(t==m.cart&&parseInt(localStorage.first_cart_country_id)!=l.chosen_country_id_.id)D="border border-danger",r.push(`

          <div class="d-flex align-items-center justify-content-between gap-2 `+D+` rounded p-2 me-3">
         
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
                                background-image: url('`+A+`');
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
                                background-image: url('`+A+`');
                                ">
                </div>
              </div>
              <span>`+v.name+" <small>(x"+v.qty+`)</small> <br><small> <i class="fa fa-exclamation-triangle text-danger "></i>Product not available for this region</small></span>
            </div>
            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
              
              <div class="text-center">
                <div class="btn btn-sm" delete-product-id="`+v.id+`"><i class="text-danger fa fa-times"></i></div>
              </div>
            </div>
          </div>

        
          `);else{v.override_pv&&(n=!0);var M='RP <span class="format-float">'+(v.retail_price*v.qty).toFixed(2);showRP==!1&&(M='MYR <span class="format-float">'+(v.retail_price*v.qty*l.chosen_country_id_.conversion).toFixed(2));var R="",E="";if(v.selectedInstalmentId!=null){var N=v.selectedInstalment;try{E='<div class="text-sm text-secondary">'+N.name+"</div>",R='<input type="hidden"  name="user[products]['+T+'][remarks]" value="instalment_product_id:'+v.selectedInstalmentId+'">'}catch(z){console.error(z)}}try{if($("input[name='user[instalment]']").val()!=null){var H=$("input[name='user[instalment]']").val();E=H}}catch(z){console.error(z)}r.push(`

            <div class="d-flex align-items-center justify-content-between gap-2 `+D+` rounded p-2 me-3">
            <input type="hidden"  name="user[products][`+T+'][item_name]" value="'+v.name+`">
            <input type="hidden"  name="user[products][`+T+'][item_price]" value="'+v.retail_price+`">
            <input type="hidden"  name="user[products][`+T+'][item_pv]" value="'+v.point_value+`">
            <input type="hidden"  name="user[products][`+T+'][img_url]" value="'+v.img_url+`">
            <input type="hidden"  name="user[products][`+T+'][qty]" value="'+v.qty+`">
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
                                  background-image: url('`+A+`');
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
                                  background-image: url('`+A+`');
                                  ">
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <span>`+v.name+" <small>(x"+v.qty+`)</small></span>
                  `+E+`
                </div>
              </div>
              <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <div class="d-flex flex-column align-items-end">
                  <span class="font-sm ">`+M+`</span></span>
                  `+j+`
                </div>
                <div class="text-center">
                  <div class="btn btn-sm" add-product-id="`+v.id+`"><i class="text-info fa fa-plus"></i></div>
                  <div class="btn btn-sm" minus-product-id="`+v.id+`"><i class="text-danger fa fa-minus"></i></div>
                  <div class="btn btn-sm" delete-product-id="`+v.id+`"><i class="text-danger fa fa-times"></i></div>
                </div>
              </div>
            </div>

          
            `)}});var d=!1;try{$("input[name='user[instalment]']").val()!=null&&(d=!0)}catch(v){console.error(v)}try{$("input[name='user[stockist_user_id]']").val()!=null&&(a=0)}catch(v){console.error(v)}d&&(a=0),console.log("merchant?"),console.log(e),e&&(a=o*.025,a=0);var u="RP",h=o+a,b=a,_=`

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info me-4"><span class="format-integer">`+s+`</span></span>
                </div>

  `,f=`

    Total PV

  `,g='RP <span class="format-float">'+o;e&&(_="",f="RP received"),showRP||(g='MYR <span class="format-float">'+o*l.chosen_country_id_.conversion,b=a*l.chosen_country_id_.conversion,h=(o+a)*l.chosen_country_id_.conversion,u="MYR"),$("cartItems").customHtml(`

                <div class="d-flex flex-column gap-1">`+r.join("")+`
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Subtotal</span>
                    <span class=" me-4">`+g+`</span></span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Shipping_Tax</span>
                    <span class=" me-4">`+u+' <span class="format-float">'+b+`</span></span>
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">Grand Total</span>
                    <span class=" me-4">`+u+' <span class="format-float fs-4">'+h+`</span></span>
                  </div>
                <div class="d-flex justify-content-between align-items-center pv_label d-none">
                  <span class="fs-5">`+f+`</span>
                  <span class="text-info me-4"><span class="format-integer">`+i+` PV</span></span>
                </div>
                `+_+`

              </div>



      `);var y=w.user,k=[];y!=null&&(y.wallets==null?(k=l.api("user_wallet",{token:y.token}),y.wallets=k):k=y.wallets);function x(){k.length==0||$("wallet").each((v,T)=>{var j=k.filter((M,R)=>M.wallet_type=="direct_recruitment");if(e&&(j=k.filter((M,R)=>M.wallet_type=="merchant")),j.length>0){var A=j[0];if(e)$("#drp_payment").attr("max",o*.2),$("#drp_payment").attr("min",0),$("#drp_payment").attr("step",.01),$("#drp_payment").attr("value",o*.2);else if(n){console.info("here ovier");var D=t.map((M,R)=>M.qty*M.retail_price*M.override_perc).reduce((M,R)=>M+R,0);$("#drp_payment").attr("min",Math.round(D)),$("#drp_payment").attr("value",Math.round(D))}else $("#drp_payment").attr("max",A.total),$("#drp_payment").attr("min",Math.round(o*.5)),$("#drp_payment").attr("value",Math.round(o*.5))}})}$("input[name='user[payment][method]']").unbind(),$("input[name='user[payment][method]']").on("change",()=>{$("#coupon-detail").addClass("d-none"),$("input[name='user[payment][method]']").each((v,T)=>{$(T)[0].checked==!0&&(["register_point","merchant_point"].includes($(T).val())?($("#coupon-detail").removeClass("d-none"),P()):($("#drp_payment").removeAttr("max"),$("#drp_payment").removeAttr("min"),$("#drp_payment").removeAttr("value"),e?m.components.updateMCart():m.components.updateCart(),m.components.cartItems()))})});function P(){x();var v=0,T=2,j=0,A=0;if($("#drp_payment").length>0)try{v=parseFloat($("#drp_payment").val())}catch{v=$("#drp_payment").val()}T=m.components.evalShipping(o),d&&(T=0),j=o+T-v,A=i-v,e&&(T=o*.025,T=0,j=o+T,console.log("w"),A=o-v+T);var D=`


                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">DRP</span>
                    <span class=" me-4">- RP <span class="format-float">`+v+`</span></span>
                  </div>
      `;e&&(D=`


                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">MP</span>
                    <span class=" me-4">- RP <span class="format-float">`+v+`</span></span>
                  </div>
        `),$("cartItems").customHtml(`

                <div class="d-flex flex-column gap-1">`+r.join("")+`
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Subtotal</span>
                    <span class=" me-4">RP <span class="format-float">`+o+`</span></span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Shipping_Tax</span>
                    <span class=" me-4">RP <span class="format-float">`+T+`</span></span>
                  </div>
                  `+D+`
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">Grand Total</span>
                    <span class=" me-4">RP <span class="format-float fs-4">`+j+`</span></span>
                  </div>

                  <div class="d-flex justify-content-between align-items-center pv_label d-none">
                    <span class="fs-5">`+f+`</span>
                    <span class="text-info me-4"><span class="format-integer">`+A+` PV</span></span>
                  </div>
                 `+_+`
                </div>


        `),e&&$("cartItems").customHtml(`

                          <div class="d-flex flex-column gap-1">`+r.join("")+`
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Subtotal</span>
                              <span class=" me-4">RP <span class="format-float">`+o+`</span></span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Shipping_Tax</span>
                              <span class=" me-4">RP <span class="format-float">`+T+`</span></span>
                            </div>
                            `+D+`
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fs-4">Grand Total</span>
                              <span class=" me-4">RP <span class="format-float fs-4">`+A+`</span></span>
                            </div>

                            <div class="d-flex justify-content-between align-items-center pv_label d-none">
                              <span class="fs-5">`+f+`</span>
                              <span class="text-info me-4"><span class="format-integer">`+A+` PV</span></span>
                            </div>
                           `+_+`
                          </div>


                  `),I.formatDate(),$("[add-product-id]").each((M,R)=>{var E=$(R).attr("add-product-id");function N(){m.addItemById_(E,e),e?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(R)[0].onclick=N}),$("[minus-product-id]").each((M,R)=>{var E=$(R).attr("minus-product-id");function N(){m.minusItem_(E,e),e?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(R)[0].onclick=N}),$("[delete-product-id]").each((M,R)=>{var E=$(R).attr("delete-product-id");function N(){m.removeItem_(E,e),e?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(R)[0].onclick=N})}function C(v){$("#drp_payment").removeAttr("max"),$("#drp_payment").removeAttr("min"),$("#drp_payment").removeAttr("value"),P()}var S=document.getElementById("drp_payment");S!=null&&(S.removeEventListener("change",C),S.addEventListener("change",C)),$("[add-product-id]").each((v,T)=>{var j=$(T).attr("add-product-id");function A(){m.addItemById_(j,e),e?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(T)[0].onclick=A}),$("[minus-product-id]").each((v,T)=>{var j=$(T).attr("minus-product-id");function A(){m.minusItem_(j,e),e?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(T)[0].onclick=A}),$("[delete-product-id]").each((v,T)=>{var j=$(T).attr("delete-product-id");function A(){m.removeItem_(j,e),e?m.components.updateMCart():m.components.updateCart(),m.components.cartItems(),m.toastChanges()}$(T)[0].onclick=A}),$("input[name='user[payment][method]']").each((v,T)=>{$(T)[0].checked==!0&&(["register_point","merchant_point"].includes($(T).val())?($("#coupon-detail").removeClass("d-none"),P()):($("#drp_payment").removeAttr("max"),$("#drp_payment").removeAttr("min"),$("#drp_payment").removeAttr("value")))}),I.formatDate()},evalRank(e){var t="n/a",s,n=[];return w.ranks.map((a,r)=>{n.push(a)}),n.sort((a,r)=>r.retail_price-a.retail_price),s=n.filter((a,r)=>a.retail_price<=e)[0],s&&(t=s.name,$("input[name='user[rank_id]']").length>0&&$("input[name='user[rank_id]']").val(s.id)),t},updateCart(){var e=0,t=[],s=0;s=m.cart_.map((d,u)=>d.qty*d.retail_price).reduce((d,u)=>d+u,0),e=m.cart_.map((d,u)=>d.qty).reduce((d,u)=>d+u,0),$(".bc").html(e),m.cart_.forEach((d,u)=>{var h='<div class="font-sm">RP <span class="font-sm format-float">'+(d.retail_price*d.qty).toFixed(2)+"</span></div>";showRP||(h='<div class="font-sm">MYR <span class="font-sm format-float">'+(d.retail_price*d.qty*l.chosen_country_id_.conversion).toFixed(2)+"</span></div>"),t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>`+d.name+" <small>(x"+d.qty+`)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              `+h+`

              <div class="d-lg-block d-none">
                <div class="btn btn-sm" minus-product-id="`+d.id+`"><i class="text-danger fa fa-minus"></i></div>
                <div class="btn btn-sm" delete-product-id="`+d.id+`"><i class="text-danger fa fa-times"></i></div>
              </div>
              

            </div>
          </div>

        </a></li>

          `)}),t.length==0&&t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `);var n,a=[],r=[];w.ranks.map((d,u)=>{r.push(d)}),r.sort((d,u)=>d.retail_price-u.retail_price),r.map((d,u)=>{a.push(`
        <div class="col ">
          <div class="d-flex flex-column">
            <span>`+d.name+`</span>
            <span class="format-float">`+d.retail_price+`</span>
            
          </div>
        </div>`)}),$("cartItems").attr("upgrade")!=null?(window.upgradeTarget!=null?(accumulated_sales=l.api("get_accumulated_sales",{username:window.upgradeTarget}),s=s,console.log(s),n=this.evalRank(s+accumulated_sales)):(s=s,console.log(s),n=this.evalRank(s+w.user.rank.retail_price)),$(".only-downline").click(()=>{l.notify("Only available for direct recruited downline.")})):(s=s,console.log(s),n=this.evalRank(s));var i=w.ranks.sort((d,u)=>d.retail_price-u.retail_price).findIndex(d=>d.name===n);console.log(i);var o=(i+1)*25;$(".ac").each((d,u)=>{var h=t.join("")+`
              <li id="divider">
                <hr class="dropdown-divider">
              </li>
             <li>                  

             <a class="dropdown-item navi" href="/register">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Checkout</span>
                      <span class="format-float">`+s+`</span>
                    </div>
                 

                    <div class="d-flex justify-content-between align-items-center">
                      <small>Eligible</small>
                      <small class="text-info">`+n+`</small>
                    </div>

                    <div class="progress my-2" style="height: 4px;">
                      <div class="progress-bar bg-success" role="progressbar" style="width: `+o+'%;" aria-valuenow="'+o+`" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="row text-sm">
                      `+a.join("")+`
                    </div>

                  
                  </div>
                </a>
              </li>`;$(u).html(h)}),$("[minus-product-id]").each((d,u)=>{var h=$(u).attr("minus-product-id");function b(){m.minusItem_(h),m.components.updateCart(),m.toastChanges()}$(u)[0].onclick=b}),$("[delete-product-id]").each((d,u)=>{var h=$(u).attr("delete-product-id");function b(){m.removeItem_(h),m.components.updateCart(),m.toastChanges()}$(u)[0].onclick=b}),I.formatDate()},updateMCart(){var e=0,t=[],s=0;s=m.mcart_.map((n,a)=>n.qty*n.retail_price).reduce((n,a)=>n+a,0),e=m.mcart_.map((n,a)=>n.qty).reduce((n,a)=>n+a,0),$(".mbc").html(e),m.mcart_.forEach((n,a)=>{t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>`+n.name+" <br><small>(x"+n.qty+`)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              <span class="font-sm format-float">`+(n.retail_price*n.qty).toFixed(2)+`</span>

           
              

            </div>
          </div>

        </a></li>

          `)}),t.length==0&&t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `),$(".mac").each((n,a)=>{var r=t.join("")+`
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
              </li>`;$(a).html(r)}),$("[minus-product-id]").each((n,a)=>{var r=$(a).attr("minus-product-id");function i(){m.minusItem_(r,!0),m.components.updateMCart(),m.toastChanges()}$(a)[0].onclick=i}),$("[delete-product-id]").each((n,a)=>{var r=$(a).attr("delete-product-id");function i(){m.removeItem_(r,!0),m.components.updateMCart(),m.toastChanges()}$(a)[0].onclick=i}),I.formatDate()},cart(){var e=0,t=[],s=0;s=m.cart_.map((o,d)=>o.qty*o.retail_price).reduce((o,d)=>o+d,0),e=m.cart_.map((o,d)=>o.qty).reduce((o,d)=>o+d,0),console.log("subtotal",s),console.log("count",e),m.cart_.forEach((o,d)=>{var u='<div class="font-sm">RP <span class="font-sm format-float">'+(o.retail_price*o.qty).toFixed(2)+"</span></div>";showRP||(u='<div class="font-sm">MYR <span class="font-sm format-float">'+(o.retail_price*o.qty*l.chosen_country_id_.conversion).toFixed(2)+"</span></div>"),t.push(`

                <li><a class="dropdown-item" href="javascript:void(0);">
                <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
                    <span>`+o.name+" <small>(x"+o.qty+`)</small></span>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                    `+u+`


                    <div class="d-lg-block d-none">
                        <div class="btn btn-sm" minus-product-id="`+o.id+`"><i class="text-danger fa fa-minus"></i></div>
                        <div class="btn btn-sm" delete-product-id="`+o.id+`"><i class="text-danger fa fa-times"></i></div>
                    </div>

                    </div>
                </div>

                </a></li>

                `)}),t.length==0&&t.push(`

                <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

                `);var n=[],a=[];w.ranks.map((o,d)=>{a.push(o)}),a.sort((o,d)=>o.retail_price-d.retail_price),a.map((o,d)=>{n.push(`
                <div class="col ">
                <div class="d-flex flex-column">
                    <span>`+o.name+`</span>
                    <span class="format-float">`+o.retail_price+`</span>
                    
                </div>
                </div>`)}),$("cartItems").attr("upgrade")!=null&&(s=s+w.user.rank.retail_price);var r=this.evalRank(s),i=s/(w.ranks.length>0?w.ranks[0].retail_price:1)*100;$("cart").each((o,d)=>{var u="dropstart";$(d).attr("dropup")!=null&&(u="dropup"),$(d).customHtml(`
                            <div class="`+u+`  ">
                                <div class="mx-3 py-2 btn btn-outline-success rounded-xl position-relative"  data-bs-toggle="dropdown" aria-expanded="false">
                                <div style="top: 4px !important;" class="badge bg-warning position-absolute top-0 start-100 translate-middle bc">`+e+`</div>
                                <i class="fa fa-shopping-cart"></i>
                                </div>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start ac">
                                `+t.join("")+`
                                <li id="divider">
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item navi" href="/register">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex justify-content-between align-items-center">
                                        <span>Checkout</span>
                                        <span class="format-float">`+s+`</span>
                                        </div>
                                    

                                        <div class="d-flex justify-content-between align-items-center">
                                        <small>Eligible</small>
                                        <small class="text-info">`+r+`</small>
                                        </div>

                                        <div class="progress my-2" style="height: 4px;">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: `+i+'%;" aria-valuenow="'+i+`" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div class="row text-sm">
                                        `+n.join("")+`
                                        </div>

                                    
                                    </div>
                                    </a>
                                </li>

                                </ul>
                            </div>
                        `)}),$("[minus-product-id]").each((o,d)=>{var u=$(d).attr("minus-product-id");function h(){m.minusItem_(u),m.components.updateCart()}$(d)[0].onclick=h}),$("[delete-product-id]").each((o,d)=>{var u=$(d).attr("delete-product-id");function h(){m.removeItem_(u),m.components.updateCart()}$(d)[0].onclick=h}),I.formatDate()},mcart(){var e=0,t=[],s=0;s=m.mcart_.map((n,a)=>n.qty*n.retail_price).reduce((n,a)=>n+a,0),e=m.mcart_.map((n,a)=>n.qty).reduce((n,a)=>n+a,0),m.mcart_.forEach((n,a)=>{t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>`+n.name+"<br><small>(x"+n.qty+`)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              <span class="font-sm format-float">`+(n.retail_price*n.qty).toFixed(2)+`</span>


            </div>
          </div>

        </a></li>

          `)}),t.length==0&&t.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `),$("mcart").each((n,a)=>{var r="dropstart";$(a).attr("dropup")!=null&&(r="dropup"),$(a).customHtml(`
          <div class="`+r+`  ">
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
      `)}),$("[minus-product-id]").each((n,a)=>{var r=$(a).attr("minus-product-id");function i(){m.minusItem_(r,!0),m.components.updateMCart()}$(a)[0].onclick=i}),$("[delete-product-id]").each((n,a)=>{var r=$(a).attr("delete-product-id");function i(){m.removeItem_(r,!0),m.components.updateMCart()}$(a)[0].onclick=i}),I.formatDate()},light(){$("light").customHtml(`
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
      `),l.api("get_product",{id:pageParams.id},null,e=>{$("title").html(e.name);function t(){m.first_cart_country_id==null&&m.cart_.length==0&&(m.first_cart_country_id=l.chosen_country_id_.id,console.log("first country id is "+l.chosen_country_id_.id),localStorage.setItem("first_cart_country_id",l.chosen_country_id_.id)),console.info(check),e.countries.map((i,o)=>i.id).includes(parseInt(m.first_cart_country_id))?(m.addItem_(e),m.components.updateCart(),l.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),l.toast({content:'<div class=""><ul class="">'+$(".ac").html()+"</ul></div>"})):m.first_cart_country_id==null?(m.addItem_(e),m.components.updateCart(),l.notify("Added "+e.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}}),l.toast({content:'<div class=""><ul class="">'+$(".ac").html()+"</ul></div>"})):l.notify("Not Added ! Please choose your region products.",{delay:2e3,type:"danger",placement:{from:"top",align:"center"}})}$(".spinner-border.loading2").parent().remove(),$(".loading2").removeClass("d-none");var s;if(e.img_url!=null)try{s=e.img_url}catch{s="/images/placeholder.png"}var n='<div class="font-sm fw-light text-secondary text-center ">RP <span class="format-float">'+e.retail_price+"</span></div>";l.chosen_country_id_.name=="Malaysia"?includeShippingTax=!1:includeShippingTax=!0,includeShippingTax&&(n='<div class="font-sm fw-light text-secondary text-center "><span class="format-float">'+e.retail_price*1.1+" </span> RP</div>",l.chosen_country_id_.name=="Singapore"&&(n='<div class="font-sm fw-light text-secondary text-center "><span class="format-float">'+e.retail_price*1.05+" </span> RP</div>"),l.chosen_country_id_.name=="China"&&["DT2体验卡配套","DT2启动配套","2张99次开机卡 DT2启动配套"].includes(e.name)&&(n='<div class="font-sm fw-light text-secondary text-center "><span class="format-float">'+e.retail_price*1+" </span> RP</div>")),showRP||(n='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+e.retail_price*l.chosen_country_id_.conversion+"</span></div>",l.chosen_country_id_.name=="Malaysia"?includeShippingTax=!1:includeShippingTax=!0,includeShippingTax&&(n='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+e.retail_price*l.chosen_country_id_.conversion*1.1+"</span></div>",l.chosen_country_id_.name=="Singapore"&&(n='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+e.retail_price*l.chosen_country_id_.conversion*1.05+"</span></div>")));var a='<div class="btn btn-outline-primary mt-4" product-id="'+e.id+'">Add</div>';if(e.instalment_packages.length>0){var r=[];e.instalment_packages.forEach((i,o)=>{c=`
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

          `,r.push(c)}),a='<div class="row w-100">'+r.join("")+"</div>"}$("#pcontent").customHtml(`

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
        `+n+`
        <div class="font-sm fw-light text-info text-center pv_label d-none">PV <span class="format-float">`+e.point_value+`</span></div>
        `+a+`
      </div>

      `),$("#ptitle").html(e.name);try{$("[product-id='"+e.id+"']")[0].onclick=t}catch{}})},products(){function e(n){var a="v2";return n=="Thailand"&&(a="th"),n=="Vietnam"&&(a="vn"),n=="China"&&(a="cn"),a}if(l.chosen_country_id_==null){var t=[];l.countries_.forEach((n,a)=>{t.push(`
          <button type="button" aria-name="`+n.name+'" aria-country="'+n.id+'" class="btn btn-primary ">'+n.name+" "+(n.alias||"")+`</button>
        `)}),l.modal({selector:"#mySubModal",content:`
        <center>
          <div class="btn-group-vertical">
          `+t.join("")+`
          </div>
        </center>
      `,header:"Choose region",autoClose:!1}),$("[aria-country]").unbind(),$("[aria-country]").click(function(){var n=$(this).attr("aria-country"),a=$(this).attr("aria-name");l.chosen_country_id_=n,l.notify("Chosen region: "+a),localStorage.setItem("region",a),setTimeout(()=>{$("#chosen-region").html(a)},1e3),localStorage.region!=null&&(langPrefix=e(a)),translationRes=l.api("translation",{lang:langPrefix}),$("#mySubModal").modal("hide"),m.components.country(),pageParams.share_code!=null?l.api("get_share_link_by_code",{code:pageParams.share_code},null,r=>{m.components.cartItems(),l.navigateTo(location.pathname),$(".sponsor-name").customHtml("_sponsor: "+r.user.username+" _position: "+r.position),$(".sponsor-bank").html(`

            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold">Bank Details</span>
              <span class=" my-4 me-4 d-flex justify-content-end align-items-end gap-1 flex-column">
                <div>`+r.user.bank_name+`</div>
                <div>`+r.user.bank_account_holder+`</div>
                <div>`+r.user.bank_account_no+`</div>
              </span>
            </div>

              `)}):l.navigateTo("/home")})}if(l.chosen_country_id_!=null){let n=function(a){var r=$(a).attr("product-id"),i=l.api("get_product",{id:r});try{m.first_cart_country_id==null&&m.cart_.length==0&&(m.first_cart_country_id=l.chosen_country_id_.id,console.log("first country id is "+l.chosen_country_id_.id),localStorage.setItem("first_cart_country_id",l.chosen_country_id_.id)),i.countries.map((o,d)=>o.id).includes(parseInt(m.first_cart_country_id))?(m.selectedInstalment=i,m.addItem_(i),m.components.updateCart(),m.components.cartItems(),l.notify("Added "+i.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):m.first_cart_country_id==null?(m.selectedInstalment=i,m.addItem_(i),m.components.updateCart(),m.components.cartItems(),l.notify("Added "+i.name,{delay:2e3,type:"success",placement:{from:"top",align:"center"}})):l.notify("Not Added ! Please choose your region products.",{delay:2e3,type:"danger",placement:{from:"top",align:"center"}})}catch(o){console.error(o)}};var s=n;$("products").each((a,r)=>{$(r).customHtml(`
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
        `).then(()=>{console.log("products loading?");var i=null,o="products",d=new F({onDrawFn:()=>{setTimeout(()=>{$("[product-id]").each((u,h)=>{h.onclick=()=>{n(h)}}),I.formatDate(),$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none")},800)},xcard:u=>{var h=u.product,b="",_="/images/placeholder.png",f=`onclick="phxApp.navigateTo('/products/`+h.id+"/"+h.name+`')"`;if($(r).attr("direct")!=null&&(f="",b='<div class="btn btn-outline-primary mt-4" product-id="'+h.id+'">Add</div>'),h.img_url!=null)try{_=h.img_url}catch{_="/images/placeholder.png"}var g='<div class="font-sm fw-light text-secondary text-center ">RP <span class="format-float">'+h.retail_price+"</span></div>";l.chosen_country_id_.name=="Malaysia"?includeShippingTax=!1:includeShippingTax=!0,includeShippingTax&&(g='<div class="font-sm fw-light text-secondary text-center "><span class="format-float">'+h.retail_price*1.1+"</span> RP</div>",l.chosen_country_id_.name=="Singapore"&&(g='<div class="font-sm fw-light text-secondary text-center "><span class="format-float">'+h.retail_price*1.05+"</span> RP</div>"),l.chosen_country_id_.name=="China"&&["DT2体验卡配套","DT2启动配套","2张99次开机卡 DT2启动配套"].includes(h.name)&&(g='<div class="font-sm fw-light text-secondary text-center "><span class="format-float">'+h.retail_price*1+"</span> RP</div>")),showRP||(g='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+h.retail_price*l.chosen_country_id_.conversion+"</span></div>",l.chosen_country_id_.name=="Malaysia"?includeShippingTax=!1:includeShippingTax=!0,includeShippingTax&&(g='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+h.retail_price*l.chosen_country_id_.conversion*1.1+"</span></div>",l.chosen_country_id_.name=="Singapore"&&(g='<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">'+h.retail_price*l.chosen_country_id_.conversion*1.05+"</span></div>")));var y=`
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
                    background-image: url('`+_+`');
                    
                    ">
              </div>
              <div class="rounded py-2 foreground-p" style="
                   
                    width:  100%;
                    z-index: 1;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain; 
                    background-image: url('`+_+`');
                    ">
              </div>
            </div>
            <div class="d-flex flex-column justify-content-center gap-2 mt-4">
              <div class="font-sm fw-bold text-center">`+h.name+`</div>
               <div class="d-flex flex-column justify-content-center ">
                  `+g+`
                  <div class="font-sm fw-light text-info text-center pv_label d-none">PV <span class="format-float">`+h.point_value+`</span></div>
               </div>
               `+b+`

           
            </div>
          </div>
          `;return y},data:{pageLength:12,sorts:[[2,"desc"]],additional_join_statements:[{product:"product"}],additional_search_queries:["b.is_instalment=false"],country_id:l.chosen_country_id_.id,preloads:["product"],grid_class:"col-4 col-lg-3",dom:`

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

            `},columns:[{label:"id",data:"id"},{label:"product_id",data:"product_id"},{label:"Action",data:"id"}],moduleName:"ProductCountry",link:"ProductCountry",customCols:i,buttons:[],tableSelector:"#"+o});d.load(o,"#product_tab1")})})}},announcement(){try{$(".anc").slick("destroy")}catch{}$("announcement").customHtml(`
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      `),l.api("announcements",{},null,e=>{$("announcement").customHtml(""),e.forEach((t,s)=>{function n(){l.modal({selector:"#mySubModal",content:t.content,autoClose:!1,header:t.title})}var a=t.img_url,r=`
          <div class="d-flex flex-column align-items-center" >

            <div class="d-flex justify-content-center " style="cursor: pointer;   
            position: relative; height: 240px;" announcement-id="`+t.id+`">
              <div class="sub rounded py-2" style="
               
                  position: absolute;
                  filter: blur(10px); 
                              background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain; 
                  background-image: url('`+a+`');
                 ">
              </div>
              <div class="su rounded py-2" style="
            
           

                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover; 
                  background-image: url('`+a+`');
                  z-index: 1;
                  top: 16px;
                  position: absolute;">
              </div>
            </div>
            <span class="mt-3">`+t.title+`</span>
            <small>`+t.subtitle+`</small>
            
          </div>

        `;$("announcement").append(r),$("[announcement-id='"+t.id+"']")[0].onclick=n})}),$(".anc").slick()},rewardList(){$("rewardList").each((e,t)=>{$(t).customHtml(`
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
      `);var s=$(t).attr("prev")!=null;console.log(s),l.api("get_reward_summary",{user_id:w.user.id,is_prev:s},null,n=>{$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none");var a=["sharing bonus","team bonus","matching bonus","elite leader","travel fund","repurchase bonus","drp sales level bonus","stockist register bonus","merchant sales level bonus","biz incentive bonus","matching biz incentive bonus"],r=[];a.forEach((i,o)=>{n.forEach((d,u)=>{i==d.name&&r.push(`

                                  <div class="my-2 d-flex align-items-center justify-content-between">

                                    <span class="fs-5">
                                      `+I.capitalize(d.name)+`
                                    </span>
                                    <span class="d-flex justify-content-between gap-2 align-items-center">
                                      <span class="format-float">
                                        `+d.sum+`
                                      </span>
                                      <a href="/reward_details/`+d.name+"/"+d.period[0]+"/"+d.period[1]+`" class="navi btn btn-primary btn-sm">
                                      <i class="fa fa-info"></i>
                                      </a>
                                    </span>
                                  </div>


                              `)})}),$("#tab"+e).customHtml(""+r.join("")),phxApp.formatDate()})})},rewardSummary(){$("rewardSummary").each((e,t)=>{$(t).customHtml(`
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
                  `);var s=!1;console.log(s),l.api("get_reward_summary_by_years",{user_id:w.user.id},null,n=>{var a=[];$(".spinner-border.loading").parent().remove(),$(".loading").removeClass("d-none"),console.log("testst");var r=Object.keys(n.years);r.forEach((i,o)=>{a.push(`

                                  <div class="my-2 d-flex align-items-center justify-content-between">

                                    <span class="fs-5">
                                      `+i+`
                                    </span>
                                    <span class="d-flex justify-content-between gap-2 align-items-center">
                                      <div>
                                      <span class="format-float">
                                        `+n.years[i][0].sum+` 
                                      </span>
                                      BP
                                        </div>
                                        <a class="btn btn-primary btn-sm" target="_blank" href="/pdf?type=commission&id=`+w.user.id+"&year="+i+`">
                                        Download
                                      </a>
                                    </span>
                                  </div>


                              `)}),console.info(a),$("#tabw"+e).customHtml(""+a.join("")),phxApp.formatDate()})})},wallet(){if(w.user!=null){var e=w.user,t=l.api("user_wallet",{token:e.token});t.length==0?$("wallet").parent().customHtml('<div class="p-4">Wallet info expired</div>'):$("wallet").each((s,n)=>{var a=t.filter((d,u)=>d.wallet_type==$(n).attr("aria-data"));if(a.length>0){var r=a[0],i=$(n).attr("aria-data").split("_").map((d,u)=>I.capitalize(d)).join(" "),o=i.split(" ").map((d,u)=>d.split("")[0].toUpperCase()).join("")+"P";$(n).customHtml(`
            <a href="/wallets/`+r.id+`" class="navi" >

            <div class=" card mb-3 mb-lg-0">
              <div style="
                width: 4px;
                position: absolute;
                height: 100%;
                background: rgb(251,254,253);
                background: linear-gradient(45deg, rgb(86, 253, 197) 0%, rgb(218, 216, 216) 100%);

              " class="card-body p-0 "></div>
              <div class="card-body p-1 py-2 " style="width: 220px;">
                <div class="d-flex gap-1 align-items-center">
                  <div wallet-id="`+r.id+`" class="d-none d-lg-block mx-2 py-2 btn btn-outline-success rounded-xl">
                    <i class=" fa fa-dollar-sign "></i>
                  </div>
                  <div class="ps-2 ps-lg-0">
                    <span class="text-sm text-secondary text-truncate">`+i+", <b>"+o+`</b></span>
                    <div class="d-flex align-items-center gap-2">
                      <div class="fs-4 format-int" style="">`+r.total+`</div>
                      <small>pts</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-body p-0 d-none" style="

                background: rgb(251,254,253);
                background: linear-gradient(90deg, rgb(86, 253, 197) 0%, rgb(218, 216, 216) 100%);
                height: 2px;

              "></div>
            </div>
            </a>

        `)}}),I.formatDate()}},userProfile(){var e=w.user;if(e){var t=["Bronze","Silver","Gold","Diamond","Shopper"],s=["Bronze","Silver","Gold","Diamond","Shopper"],n=e.rank!=null?e.rank.name:e.rank_name,a=t[s.indexOf(n)];l.chosen_country_id_.name=="China"&&(a=n);var r=e!=null?'Welcome! <a href="/profile" class="navi">'+e.fullname+" ("+a+")</a>":'<a href="/login" class="navi">Login</a>';$("userProfile").customHtml(`
          
            `+r+`
         
      `)}else $("userProfile").customHtml(`
          
          <a href="/login" class="navi">Login</a>
         
      `)}}};window.commerceApp=m;const O="staging_api.netspheremall.com",U="https://";let l={endpoint:U+O,Page:{createTable(e,t){var s=`
            <div class="table-responsive">
                <table class="table"  style="width: 100%;" id="`+e+`">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
    `;$(t).append(s)}},chosen_country_id_:null,countries_:[],route_names:[{html:"landing.html",title:"Home",route:"/home",public:!0}],render(e){m.components[e]()},rowData(e){var t=e.dataSource;window.currentSelector=t.tableSelector;var s=t.table;s.row(e.row);var n=s.data()[e.index];return n},override(e){w.override(e)},updateUser(e){w.updateUser(e)},login(e){w.login(e)},logout(){w.logout()},user:null,addItem(e){var t=l.api("get_product",{id:e});t.payInstalment=!0,m.addItem_(t),m.components.updateCart(),m.components.cartItems()},filterItemsByName(e){return m.filterItemsByName(e)},hasCartItems(){return console.log("checking..."),console.log(m.hasCartItems()),m.hasCartItems()>0},merchantCheckout(e){w.merchantCheckout(e)},redeem(e){w.redeem(e)},upgrade(e){w.upgrade(e)},linkRegister(e){w.linkRegister(e)},register(e){w.register(e)},formatDate(){I.formatDate()},ping(){console.log("tell ping o")},reinit(){$(".dataTable").each((e,t)=>{if(t.offsetParent!=null){var s=window.phoenixModels.filter((n,a)=>n.tableSelector=="#"+t.id)[0];s.reload()}})},evalTitle(e){if(localStorage.getItem("default-lang")=="cn")switch(e.replace(" ","")){case"Home":e="首页";break;case"Profile":e="个人";break;case"Upgrade":e="升级";break;case"Restocks":e="朴货";break;case"Registrations":e="审核";break;case"Sales":e="业绩";break;case"Commissions":e="佣金";break;default:e=e}return e},async navigateTo(e,t){e==null&&(e=window.location.pathname);var s=e.split("/").filter((f,g)=>f!=""),n=this.route_names.filter((f,g)=>{var y=f.route.split("/").filter((k,x)=>k!="");return y[y.length-1].includes(":")?y.length==s.length:y.length==s.length&&y[y.length-1]==s[y.length-1]}),a=n.filter((f,g)=>{var y=f.route.split("/").filter((k,x)=>k!="");return y[0]==s[0]});if(this.hide(),w.restoreUser(),a.length>0){var r={};a.forEach((f,g)=>{f.route.split("/").forEach((y,k)=>{y.includes(":")&&(r[y.replace(":","")]=s[k-1])})}),console.info(a),a[0].public||(await w.restoreUser(),console.log("resting?"),w.user!=null||l.navigateTo("/logout")),window.pageParams=r;var i="";if(t==null?i="":i=t,window.back)window.back=!1;else{var o={route:e,fn:"phxApp.navigateTo('"+e+"', '"+i+"')",params:r};window.stateObj=o,window.matchTitle=a[0].title,window.matchRoute=e,Object.keys(r).includes("title")?(history.pushState(o,evalTitle(r.title),e),$("title").html(this.evalTitle(r.title))):(history.pushState(o,this.evalTitle(a[0].title),e),$("title").html(this.evalTitle(a[0].title)))}var d=this.html("blog_nav.html"),u=this.html("footer_modals.html"),h=this.html(a[0].html),b=`
      <div class="page-content pb-0">
        `+h+`
      </div>
        `+u+`
          `,_=Object.keys(a[0]);if(_.includes("skipNav"))$("#content").html(b),this.navigateCallback();else{if(_.includes("customNav"))var d=this.html(a[0].customNav);$("#content").html(d),$("#content").append(b),this.navigateCallback()}return a[0]}else{console.info(n);var d=this.html("blog_nav.html"),u=this.html("footer_modals.html"),h=this.html("landing.html"),b=`
      <div class="page-content pb-0">
        `+h+`
      </div>        `+u;$("#content").html(d),$("#content").append(b),this.navigateCallback()}},modal(e){var t={selector:"#myModal",body:".modal-body",title:".modal-title",foot:".modal-footer",header:"Modal Header",content:"Here is content for modal body",footer:"",drawFn:()=>{},autoClose:!0},s=Object.keys(t);s.forEach((n,a)=>{this[n]=t[n]}),s.forEach((n,a)=>{e[n]!=null&&(this[n]=e[n])}),$(this.selector).find(this.title).customHtml(this.header),$(this.selector).find(this.body).customHtml(this.content),$(this.selector).find(this.foot).customHtml(this.footer),$(this.selector).modal("show"),this.drawFn(),this.autoClose&&setTimeout(()=>{$(this.selector).modal("hide")},5e3)},toast(e){var t={selector:"#notification-1",body:".toast-body",title:".tbody",foot:".modal-footer",header:"Modal Header",content:"Here is content for modal body",footer:"",drawFn:()=>{},autoClose:!0},s=Object.keys(t);s.forEach((n,a)=>{this[n]=t[n]}),s.forEach((n,a)=>{e[n]!=null&&(this[n]=e[n])}),$(this.selector).find(this.title).customHtml(this.header),$(this.selector).find(this.body).customHtml(this.content),$(this.selector).toast("show"),this.drawFn(),this.autoClose},notify(e,t){t==null&&(t={});var s={delay:2e3,type:"info"},i=Object.keys(s);i.forEach((o,d)=>{this[o]=s[o]}),i.forEach((o,d)=>{t[o]!=null&&(this[o]=t[o])});var n={},a={};typeof e=="object"?a=e:a={message:e};var r={message:"Your text here",title:"System Message:",icon:"fa fa-exclamation-circle"},i=Object.keys(r);i.forEach((o,d)=>{n[o]=r[o]}),i.forEach((o,d)=>{a[o]!=null&&(n[o]=a[o])});try{typeof $.notify=="function"?(console.log(t),$.notify(n,t)):this.toast({content:n.message,header:n.title})}catch{this.toast({content:n.message,header:n.title})}},reflect(e){var t={};return e.forEach((s,n)=>{console.log(n);var a={};if(n.includes("[")){console.log("has child");var r=n.split("[")[0],i=n.split("[")[1].split("]")[0];a[i]=s,t[r]={...t[r],...a}}else{if(!Reflect.has(t,n)){t[n]=s;return}Array.isArray(t[n])||(t[n]=[t[n]]),t[n].push(s)}}),t},validateForm(e,t){var s=$(e).find("[name]").filter((a,r)=>($(r).removeClass("is-invalid"),r.checkValidity()==!1));if(s.length>0){var n=[];s.map((a,r)=>{$(r).addClass("is-invalid");var i=$(r).closest(".input-style").find("label div").html();i==null&&(i=$(r).attr("name")),n.push(i)}),l.notify("This input: "+n.join(", ")+" is not valid!",{type:"danger"})}else t()},form(e,t,s,n,a){l.show();var r="",i=new FormData($(e)[0]);if(i.append("scope",t),a!=null){var o=Object.keys(a);o.forEach((u,h)=>{i.append(u,a[u])})}t=="login"&&(r="/login");var d=this.csrf_();$.ajax({url:this.endpoint+"/svt_api/webhook"+r,dataType:"json",headers:{"phx-request":"true",Authorization:"Basic "+(l.user!=null?l.user.token:null),"x-csrf-token":d},method:"POST",enctype:"multipart/form-data",processData:!1,contentType:!1,data:i}).done(function(u){if(l.hide(),u.status=="ok"){l.notify("Added!",{type:"success"});try{u.res!=null&&s(u.res)}catch{}}else u.reason!=null?l.notify("Not added! "+u.reason,{type:"danger"}):l.notify("Not added!",{type:"danger"})}).fail(function(u){u.status==403&&w.logout(),l.notify("Not added!",{type:"danger"})})},html(e){$(".modal-body").each((a,r)=>{$(r).html("")});var t="v2";function s(a){var r="v2";return a=="Thailand"&&(r="th"),a=="Vietnam"&&(r="vn"),a=="China"&&(r="cn"),r}localStorage.region!=null&&(t=s(localStorage.region));var n="";return $.ajax({async:!1,method:"get",url:this.endpoint+"/html/"+t+"/"+e}).done(a=>{n=a}),n},token:null,csrf_(e){if(this.token==null)this.token=$("input[name='_csrf_token_ori']").val();else if(e)this.token=$("input[name='_csrf_token_ori']").val();else return this.token},api(e,t,s,n){var a="",r=this.csrf_();return $.ajax({async:!1,method:"get",headers:{"phx-request":"true",Authorization:"Basic "+(l.user!=null?l.user.token:null),"X-CSRF-Token":r},url:this.endpoint+"/svt_api/webhook?scope="+e,data:t}).done(i=>{console.log(i),n!=null&&n(i),a=i}).fail(function(i){i.status==403&&w.logout();try{l.notify("Not Added! reason: "+i.responseJSON.reason,{type:"danger"})}catch{l.notify("Ops, somethings' not right!",{type:"danger"})}l.show(),setTimeout(()=>{s!=null&&s(),l.hide()},500)}),a},post(e,t,s,n){var a="",r=$("input[name='_csrf_token_ori']").val(),i={...t,_csrf_token:r};return console.log(i),$.ajax({async:!1,method:"post",headers:{"phx-request":"true",Authorization:"Basic "+(l.user!=null?l.user.token:null),"X-CSRF-Token":r},url:this.endpoint+"/svt_api/webhook?scope="+e,data:i}).done(o=>{n!=null&&n(o),a=o}).fail(function(o){o.status==403,l.notify("Ops, somethings' not right!",{type:"danger"}),setTimeout(()=>{s!=null&&s(),this.hide()},500)}),a},evaluateLang(){},toTop(){$("body")[0].scrollIntoView()},async putToken(){this.csrf_(!0),$("input#need-token")&&$("input[name='_csrf_token']").val($("input[name='_csrf_token_ori']").val())},evalCart(){window.location.pathname.includes("merchant")&&($(".showMcart").toggleClass("d-none"),$(".showCart").toggleClass("d-none"))},async navigateCallback(){w.restoreUser(),m.restoreCart(),m.restoreCart(!0),this.user=w.user,this.user!=null&&(this.user.wallets=null);try{m.render()}catch{}this.evaluateLang(),this.toTop(),this.hide(),this.putToken(),this.evalCart()},show(){console.log("drop shadow.."),$(".wrapper-ring").show(),setTimeout(()=>{$(".wrapper-ring").hide()},1e3)},hide(){console.log("hide shadow..");try{$(".wrapper-ring").hide()}catch{}},repopulateFormInput(e,t){console.log(e);var s=$(t).find("[name]");$(s).each(function(n,a){var r=$(a).attr("aria-label");r==null&&(r=$(a).attr("name"));var i=$(a).attr("aria-value"),o=r.split("[")[0],d=r.replace("[","").replace("]","").replace(o,"");if($(a).prop("localName")=="select")console.log("is select"),r.includes("[")?$(a).val(e[o][d]):$(a).val(e[r]);else if(i!=null)$(a).val(i);else if($(a).hasClass("code"))try{$(a).val(e[r]);var u=document.createElement("input");u.setAttribute("type","hidden"),u.setAttribute("name",$(a).attr("name")),$(a).after(u);var h=ace.edit($("textarea")[0],{mode:"ace/mode/html",selectionStyle:"text"});h.resize(),window.editor=h,h.session.setUseWrapMode(!0),h.session.on("change",function(k){$(u).val(window.editor.getValue()),console.log("ace here")})}catch(k){console.log(k),$(a).val(e[r])}else if($(a).attr("type")=="checkbox")if(console.log("got data?"),console.log(e[r]),$(a).hasClass("many_2_many")){var b=parseInt(a.name.split("][")[1].split("]")[0]);try{var _=e[r].filter((k,x)=>k.id==b);_.length>0&&$(a).prop("checked",e[r])}catch(k){console.log(k),$(a).prop("checked",!1)}}else $(a).prop("checked",e[r]);else if(e!=null)if(console.log(r),console.log("name: "+r+", data: "+e[r]),r.includes("."))try{var f=$(a).closest("form").attr("id"),g=r.split(".");g.length==2&&($(a).val(e[g[0]][g[1]]),$(a).parent().append(`<input type='hidden' value="`+e[g[0]].id+'" name="'+f+"["+g[0]+'][id]"></input>')),g.length==3&&($(a).val(e[g[0]][g[1]][g[2]]),$(a).parent().append(`<input type='hidden' value="`+e[g[0]].id+'" name="'+f+"["+g[0]+'][id]"></input>')),g.length==1&&($(a).val(e[g[0]]),$(a).parent().append(`<input type='hidden' value="`+e[g[0]].id+'" name="'+f+"["+g[0]+'][id]"></input>'))}catch(k){console.log(k),$(a).val(e[r])}else if(r.includes("["))try{$(a).val(e[o][d])}catch(k){console.log(k),$(a).val(e[r])}else if(r=="_csrf_token"){var y=$("input[name='_csrf_token_ori']").val();$(a).val(y)}else try{$(a).val(e[r])}catch(k){console.log(k),console.log("missing dom?")}else console.log("name: "+r+", data: ?")})},generateInputs(e,t,s,n){var a="",r="",i="col-12 col-lg-6",d=t.charAt(0).toUpperCase()+t.slice(1);typeof n=="object"&&(n.alt_name!=null&&(d=n.alt_name),n.alt_class!=null&&(i=n.alt_class));var o=Object.keys(r),d=o.reduce((g,y)=>{var k=new RegExp(y,"g");return g.replace(k,r[y])},d);switch(e[t]){case"string":a='<div class="'+i+`">
                      <div class="ps-1 py-2">`+d+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control">
                        </div>
                      </div>
                    </div>`;break;case"boolean":a=`<div class="row d-flex align-items-center ">
                      <label class="offset-lg-1 col-sm-3 col-form-label text-start label-checkbox">`+d+`</label>
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
                    </div>`;break;case"integer":t.includes("id")||t=="id "?a='<input  aria-label="'+t+'" name="'+s+"["+t+']" type="hidden" class="form-control" value="0">':a='<div class="'+i+`">
                      <div class="ps-1 py-2">`+d+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="number" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control">
                        </div>
                      </div>
                    </div>`;break;case"date":a='<div class="'+i+`">
                      <div class="ps-1 py-2">`+d+`</div>
                      <div class="col-sm-12">
                        <div class="form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datepicker">
                        </div>
                      </div>
                    </div>`;break;case"naive_datetime":a='<div class="'+i+`">
                      <div class="ps-1 py-2">`+d+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datetimepicker">
                        </div>
                      </div>
                    </div>`;break;default:t=="id"||t.includes("_id")?a='<input  aria-label="'+t+'" name="'+s+"["+t+']" type="hidden" class="form-control" value="0">':a='<div class="'+i+`">
                      <div class="ps-1 py-2">`+d+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <input type="text" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control">
                        </div>
                      </div>
                    </div>`}if(typeof n=="object"){var u=[];if(n.selection!=null){var h="",b="";n.live_search!=null&&n.live_search&&(h='data-live-search="true"'),n.multiple!=null&&n.multiple&&(b="multiple"),$(n.selection).each(function(g,y){var k,x;typeof y=="object"?(k=y.name,x=y.id):(k=y,x=y),u.push('<option value="'+x+'">'+k+"</option>")}),a='<div class="'+i+`">
                      <div class="ps-1 py-2">`+d+`</div>
                      <div class="col-sm-12">
                        <div class="form-group">
                         <select `+b+" "+h+'aria-label="'+t+'" name="'+s+"["+t+`]" class="form-control selectpicker" >
                         `+u.join("")+`
                         </select>
                        </div>
                      </div>
                    </div>`}if(n.binary&&(a='<div class="'+i+`">
                      <div class="ps-1 py-2">`+d+`</div>
                      <div class="col-sm-12">
                        <div class="form-group bmd-form-group">
                          <textarea rows=12 cols=12 aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control"></textarea>
                        </div>
                      </div>
                    </div>`),n.placeholder&&(a='<div class="'+i+`">
                      `+n.placeholder+`
                    </div>`),n.code&&(a=`<div class="row">
                      <label class="col-sm-3 col-form-label text-end">`+d+`</label>
                      <div class="col-sm-9">
                        <div class="form-group bmd-form-group">
                          <textarea rows=4 cols=12 aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control code"></textarea>
                        </div>
                      </div>
                    </div>`),n.checkboxes!=null){var _=[];n.checkboxes.sort(function(g,y){return g.name.localeCompare(y.name)}),$(n.checkboxes).each((g,y)=>{var k=`
                    <div class="form-check">
                      <label class="text-capitalize">
                        <input aria-label="`+t+'" class="form-check-input many_2_many" type="checkbox" name="'+s+"["+t+"]["+y.id+']"  value="true"> '+y.name+`
                        <span class="form-check-sign">
                          <span class="check"></span>
                        </span>
                      </label>
                    </div>`;_.push(k)}),a=`<div class="row">
                      <label class="col-sm-2 col-form-label text-end">`+d+`</label>
                      <div class="col-sm-8">
                        <div class="form-group bmd-form-group">
                          `+_.join("")+`
                        </div>
                      </div>
                    </div>`}if(n.upload&&(a='<div class="'+i+`">
                      <div class="pb-1 pt-1 ps-1 text-start">`+d+`</div>
                      <div class="col-sm-12">
                        
                        <img style="display: none;" id="myImg" src="#" alt="your image" width=300>
                          <input style="padding-top: 2vh;" type="file" aria-label="`+t+'" name="'+s+"["+t+`]" class="">
                        
                      </div>
                    </div>`),n.editor&&(a='<div class="'+i+`">
              <div class="form-group bmd-form-group">
              <label class="bmd-label-floating my-2">`+d+`</label>
                  <textarea id="editor1" rows=10 cols=12 aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control" ></textarea>
              </div>
          </div>`),n.datetime&&(a=`<div class="row">
                      <label class="offset-lg-1 col-sm-3 col-form-label text-start">`+d+`</label>
                      <div class="col-sm-6">
                        <div class="form-group bmd-form-group">
                          <input type="datetime-local" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datepicker">
                        </div>
                      </div>
                    </div>`),n.date&&(a=`<div class="row">
                      <label class="offset-lg-1 col-sm-3 col-form-label text-start">`+d+`</label>
                      <div class="col-sm-6">
                        <div class="form-group bmd-form-group">
                          <input type="date" aria-label="`+t+'" name="'+s+"["+t+`]" class="form-control datepicker">
                        </div>
                      </div>
                    </div>`),n.alias){var f=t.split(".");console.log("not sure if onclick"),n.onClickFn!=null?(f.length==2&&(a='<div class="'+i+`">
                        <div class="pb-1 pt-1 ps-1 text-start">`+d+`</div>
                        <div class="row gx-0">
                          <div class="col-10">
                            <div class="form-group bmd-form-group">
                              <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control">
                            </div>
                          </div>
                          <div class="col-2">
                            <div class="btn btn-outline-primary" onclick="`+n.onClickFn+`">Change</div>
                          </div>
                        </div>
                      </div>`),f.length==3&&(a='<div class="'+i+`">
                        <div class="pb-1 pt-1 ps-1 text-start">`+d+`</div>
                        <div class="row">
                          <div class="col-10">
                            <div class="form-group bmd-form-group">
                              <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+"]["+f[2]+`]" class="form-control">
                            </div>
                          </div>
                          <div class="col-2">
                            <div class="btn btn-outline-primary" onclick="`+n.onClickFn+`">Change</div>
                          </div>
                        </div>
                      </div>`)):(f.length==2&&(a='<div class="'+i+`">
                              <div class="pb-1 pt-1 ps-1 text-start">`+d+`</div>
                              <div class="row">
                                <div class="col-12">
                                  <div class="form-group bmd-form-group">
                                    <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control">
                                  </div>
                                </div>
                               
                              </div>
                            </div>`,n.binary&&(a='<div class="'+i+`">
                                        <div class="ps-1 py-2">`+d+`</div>
                                        <div class="col-sm-12">
                                          <div class="form-group bmd-form-group">
                                            <textarea rows=4 cols=12 aria-label="`+t+'"  name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control"></textarea>
                                          </div>
                                        </div>
                                      </div>`),n.editor&&(a='<div class="'+i+`">
                                        <div class="ps-1 py-2">`+d+`</div>
                                        <div class="col-sm-12">
                                          <div class="form-group bmd-form-group">
                                            <textarea id="editor1" rows=10 cols=12 aria-label="`+t+'"  name="'+s+"["+f[0]+"]["+f[1]+`]" class="form-control"></textarea>
                                          </div>
                                        </div>
                                      </div>`)),f.length==3&&(a='<div class="'+i+`">
                              <div class="pb-1 pt-1 ps-1 text-start">`+d+`</div>
                              <div class="row">
                                <div class="col-12">
                                  <div class="form-group bmd-form-group">
                                    <input type="text" aria-label="`+t+'" name="'+s+"["+f[0]+"]["+f[1]+"]["+f[2]+`]" class="form-control">
                                  </div>
                                </div>
                               
                              </div>
                            </div>`))}if(n.hidden)if(t.includes(".")){var f=t.split(".");a='<input type="hidden" aria-label="'+t+'" name="'+s+"["+f[0]+"]["+f[1]+']"  aria-value="'+n.data+'">'}else console.log("qv",n.data),a='<input type="hidden" aria-label="'+t+'" name="'+s+"["+t+']"  aria-value="'+n.data+'">';n.required&&(a=a.replaceAll("input type","input required type"))}return a},appendInputs(e,t,s,n){$(t).each(function(a,r){var i;typeof r=="object"?i=r.label:i=r;var o="";if(o=l.generateInputs(s,i,n,r),typeof r=="object"&&!r.binary){if(r.sub!=null){var d=r.sub.moduleName,u=r.sub.link,h=r.sub.customCols;$.ajax({headers:{"phx-request":"true"},url:this.endpoint+"/svt_api/webhook?scope=gen_inputs",dataType:"json",async:!1,data:{module:d}}).done(function(b){var _=Object.keys(b);h!=null&&h.length>0&&(_=h);var f=[];$(_).each((g,y)=>{var k;typeof y=="object"?k=y.label:k=y;var x="";x=l.generateInputs(b,k,u,y),f.push(x)}),o=o+'<div class="row subform" style="display: none;"><div class="offset-1 col-sm-9">'+f.join("")+"</div></div>"}).fail(function(b){b.status==403&&w.logout(),l.notify("Not Added!",{type:"danger"})})}}$(e).append(o)})},form_new(e,t,s,n,a){console.log(t);var r=window.phoenixModels.filter((d,u)=>d.tableSelector==e)[0],i="#mySubModal";t.modalSelector!=null&&(i=t.modalSelector),s==null&&(s=r.customCols);var o='<form style="" class="with_mod" id="'+r.link+'"  module="'+r.moduleName+`">
      </form>`;$(i).find(".modal-title").html("Create  New "+r.moduleName),$(i).find(".modal-body").html(o),l.createForm({id:0,...t},r.table,s,n,a),$(i).modal("show")},createForm(e,t,s,n,a){$(".with_mod").each(function(r,i){$(i).html("");var o=$(this).attr("module"),d=$(this).attr("id");$.ajax({async:!1,headers:{"phx-request":"true"},url:phxApp.endpoint+"/svt_api/webhook?scope=gen_inputs",dataType:"json",data:{module:o}}).then((u,h,b)=>{var _=Object.keys(u);s!=null?typeof s[0]=="object"&&s[0]!==null?(console.log("has multi list,"+s.length),$(i).customHtml(`<input type="hidden" name="_csrf_token"  value="">
                            <div class="row">
                              <div class="col-12 col-lg-4">
                                <ul class="nav nav-pills flex-column form_nav">
                                 
                               
                                </ul>

                              </div>
                              <div class="col-12 col-lg-8 p-4 pt-lg-0 px-lg-4 " id="form_panels">

                              </div>
                            </div>

                        `),$(s).each((P,C)=>{P==0?$(i).find(".form_nav").customAppend(`
                                   <li class="nav-item">
                                      <a class="active nav-link fnc" aria-index="`+P+'" href="javascript:void(0);"  >'+C.name+`</a>
                                    </li>
                          `):$(i).find(".form_nav").customAppend(`
                                   <li class="nav-item">
                                      <a class="nav-link fnc" aria-index="`+P+'" href="javascript:void(0);"  >'+C.name+`</a>
                                    </li>
                          `),$(i).find(".fnc").each((S,v)=>{v.onclick=()=>{var T=$(v).attr("aria-index");$(".form_nav .nav-link").removeClass("active"),$(".nav-link[aria-index='"+T+"']").toggleClass("active"),$(".fp").addClass("d-none"),$("#panel_"+T).toggleClass("d-none")}}),P==0?$(i).find("#form_panels").customAppend('<div class="fp row" id="panel_'+P+'"></div>'):$(i).find("#form_panels").customAppend('<div class="fp row d-none"  id="panel_'+P+'"></div>'),$(i).find("#panel_"+P).customAppend('<div class="col-lg-12"><b class="pb-4">'+C.name+"</b></div>"),l.appendInputs($(i).find("#panel_"+P),C.list,u,d)})):(_=s,$(i).append('<input type="hidden" name="_csrf_token"  value="">'),l.appendInputs(i,_,u,d),console.log(_.join("','"))):(_=_.filter((P,C)=>P!="inserted_at"),_=_.filter((P,C)=>P!="updated_at"),l.appendInputs(i,_,u,d),console.log(_.join("','"))),$($(i).find("select")).on("change",function(){var P=$(this).val(),C=$($(this).closest(".subform")).length;console.log(P),C==0&&(P==0?$(".subform").fadeIn():$(".subform").hide())});function f(){$("#myModal .modal-dialog").hasClass("modal-lg")&&$("#myModal .modal-dialog").toggleClass("modal-lg");var P=new FormData($(i).closest("form")[0]);$(i).find("input[type='checkbox']").each((S,v)=>{$(v).val($(v).prop("checked")),P.append(d+"["+$(v).attr("aria-label")+"]",$(v).prop("checked"))}),$(i).find("textarea").each((S,v)=>{P.append(d+"["+$(v).attr("aria-label")+"]",$(v).val())});var C=$(".with_mod").closest("form").find("input").filter((S,v)=>(console.log("checking vaidity"),console.log(v),v.checkValidity()==!1));console.log(C),C.length>0?C.map((S,v)=>{l.notify("This input: "+$(v).attr("placeholder")+" is not valid!",{type:"danger"})}):(l.csrf_(!0),$.ajax({url:phxApp.endpoint+"/svt_api/"+d,dataType:"json",headers:{Authorization:"Basic "+(l.user!=null?l.user.token:null)},method:"POST",enctype:"multipart/form-data",processData:!1,contentType:!1,data:P}).done(function(S){if(l.notify("Added!",{type:"success"}),$("#mySubModal").modal("hide"),$("#sideModal").modal("hide"),t!=null){console.log("redrawing table.. "+window.currentSelector),console.log(d),console.log(window.currentSelector);var v=window.phoenixModels.filter((T,j)=>T.moduleName==d&&T.tableSelector==window.currentSelector);v.forEach((T,j)=>{try{window.prev_page=T.table.page(),T.reload()}catch{console.log("cant find the table")}})}n!=null&&(e.xparams!=null?n(e.xparams):n(S))}).fail(function(S){S.status==403&&w.logout();try{console.log(S.responseJSON.status),l.notify("Not Added! reason: "+S.responseJSON.status,{type:"danger"})}catch{l.notify("Not Added!",{type:"danger"})}}))}var g=document.createElement("div");g.className="row";var y=document.createElement("div");y.className="pt-4 col-lg-12",g.append(y);try{var k=CKEDITOR.replace("editor1",{height:500,on:{instanceReady:function(){this.document.appendStyleSheet("/css/bootstrap.min.css")}}});CKEDITOR.config.allowedContent=!0,CKEDITOR.config.removeButtons="Image",CKEDITOR.instances.editor1.on("change",function(){var P=CKEDITOR.instances.editor1.getData();$(CKEDITOR.instances.editor1.element.$).val(P)}),k.addCommand("mySimpleCommand",{exec:function(P){try{callStoredMedia(CKEDITOR.instances.editor1)}catch{}}}),k.ui.addButton("SuperButton",{label:"Click me",command:"mySimpleCommand",toolbar:"insert",icon:"/images/image-solid.svg"})}catch{console.log("no editor")}var x=l.formButton({iconName:"check",color:"primary subm",name:"Submit"},{},f);y.append(x),$(i).find(".subm").length==0&&$(i).append(g),console.info(e),l.repopulateFormInput(e,i)}).fail(function(u){u.status==403&&w.logout(),console.log(u.responseJSON.status),l.notify("Not Added!",{type:"danger"})})}),a!=null&&a()},submitFormData(e,t,s,n){$("#myModal .modal-dialog").hasClass("modal-lg")&&$("#myModal .modal-dialog").toggleClass("modal-lg");var a=t,r=$(e)[0],i=new FormData(r);$(r).find("input[type='checkbox']").each((o,d)=>{$(d).val($(d).prop("checked")),i.append(a+"["+$(d).attr("aria-label")+"]",$(d).prop("checked"))}),console.log(i),$.ajax({url:this.endpoint+"/api/"+a,dataType:"json",method:"POST",headers:{Authorization:"Basic "+(l.user!=null?l.user.token:null)},enctype:"multipart/form-data",processData:!1,contentType:!1,data:i,xhr:function(){$("#helper").fadeIn();var o=$.ajaxSettings.xhr();return o.upload.onprogress=function(d){var u=Math.round(d.loaded/d.total*100);$("[role='progressbar']").css("width",u+"%"),$("#helper").text(u+"%")},o},error:function(o){console.error("Error has occurred while uploading the media file.")}}).done(function(o){l.notify("Added!",{type:"success"});try{l.reinit(),$("#myModal").modal("hide")}catch{}try{s!=null&&s(n)}catch{}l.hide()}).fail(function(o){o.status==403&&w.logout();try{console.log(o.responseJSON.status),l.notify("Not Added! reason: "+o.responseJSON.status,{type:"danger"})}catch{l.notify("Not Added! reason: 404",{type:"danger"})}})},formButton(e,t,s){var n={iconName:"fa fa-check",color:"btn btn-primary",onClickFunction:null,fnParams:null,name:"Submit",tooltipText:"Hints"},a=Object.keys(n);a.forEach((u,h)=>{this[u]=n[u]}),a.forEach((u,h)=>{e[u]!=null&&(this[u]=e[u])});var r=document.createElement("button");r.setAttribute("type","button"),r.setAttribute("data-bs-toggle","tooltip"),r.setAttribute("data-bs-original-title",""),r.setAttribute("data-bs-placement","left"),r.setAttribute("class","btn btn-"+this.color+" btn-sm"),r.setAttribute("title",this.tooltipText);var i=document.createElement("i");i.className=this.iconName,r.append(i);var o=document.createElement("span");this.name==null?this.name="":o.setAttribute("style","padding: 0 10px;"),o.innerHTML=this.name,r.append(o);var d=document.createElement("div");if(d.className="ripple-container",r.append(d),r.style="margin-left: 10px;",s!=null){try{r.id=this.fnParams.dtdata.id}catch{console.log("dont hav id in fnParams")}r.onclick=function(){$($(r).closest("tr")).attr("aria-index")==null?t.index=parseInt($($(r).closest("div")).attr("aria-index")):t.index=parseInt($($(r).closest("tr")).attr("aria-index")),t.row=$(r).closest("tr"),t.tbody=$(r).closest("tbody"),s(t)}}return r},groupedFormButton(e,t,s,n){var a=l.makeid(6),r=document.createElement("div");r.setAttribute("class","btn-group"),r.setAttribute("role","group"),r.setAttribute("aria-label","Button group with nested dropdown"),r.setAttribute("style","margin-left: 10px;");var i=document.createElement("button");i.setAttribute("type","button"),i.setAttribute("class","manage btn btn-sm btn-"+t),i.innerHTML=e,r.append(i);var o=document.createElement("div");o.setAttribute("class","btn-group"),o.setAttribute("role","group");var d=document.createElement("button");d.setAttribute("id",a),d.setAttribute("type","button"),d.setAttribute("class","btn btn-sm btn-"+t+" dropdown-toggle"),d.setAttribute("data-bs-toggle","dropdown"),d.setAttribute("aria-haspopup","true"),d.setAttribute("aria-expanded","false"),o.append(d);var u=document.createElement("div");return u.setAttribute("class","dropdown-menu"),u.setAttribute("aria-labelledby",a),$(s).each((h,b)=>{b.fnParams!=null?b.fnParams.dataSource=n.dataSource:b.fnParams=n;var _=l.childGroupedFormButton(b.name,b.onClickFunction,b.fnParams);u.append(_)}),o.append(u),r.append(o),r},childGroupedFormButton(e,t,s){var n=document.createElement("a");if(n.setAttribute("class","dropdown-item"),n.setAttribute("href","javascript:void(0);"),n.innerHTML=e,t!=null){try{n.id=s.dtdata.id}catch{}n.onclick=function(){s.index=parseInt($($(n).closest("tr")).attr("aria-index")),s.index>-1||(s.index=parseInt($($(n).closest(".card-footer")).attr("aria-index"))),s.row=$(n).closest("tr"),t(s)}}return n},makeid(e){for(var t="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=s.length,a=0;a<e;a++)t+=s.charAt(Math.floor(Math.random()*n));return t},appendDtButtons(e,t,s){$(e).closest(t).find(".module_buttons").customHtml(`
                <button type="submit" onclick="toggleView('`+e+`')" class="btn btn-fill btn-round btn-primary" data-href="" data-module="" data-ref="">
                <i class="fa fa-th-large"></i></button>
                <button type="submit" onclick="phxApp.reinit()" class="btn btn-fill btn-round btn-primary" data-href="" data-module="" data-ref="">
                <i class="fa fa-circle-notch
      "></i></button>
                <button type="submit" class="btn btn-fill btn-round btn-primary"  data-href="" data-module="add_new" data-ref=""><i class="fa fa-plus"></i></button>
                `);var n=$(e).closest(t).find(".module_buttons button[data-module='add_new']");try{n[0].onclick=function(){window.currentSelector=e,console.log("sub sub table data"),console.log(s),form_new(e,s)}}catch{}},appendRowDtButtons(e,t){$(e.buttons).each((s,n)=>{if(n.buttonType!=null)if(n.buttonType=="grouped"){console.log("creating grouped...button..."),n.fnParams.dataSource=e,n.fnParams.aParams=e.data;var a=l.groupedFormButton(n.name,n.color,n.buttonList,n.fnParams);$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").removeClass("d-none"),$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").append(a)}else{n.fnParams.dataSource=e,n.fnParams.aParams=e.data;var a=l.formButton({iconName:n.iconName,color:n.color,name:n.name},n.fnParams,n.onClickFunction);$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").removeClass("d-none"),$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").append(a)}else{console.log("appending gd buttons : "+s),n.fnParams.dataSource=e,n.fnParams.aParams=e.data;var a=l.formButton({iconName:n.iconName,color:n.color,name:n.name,tooltipText:n.tooltipText},n.fnParams,n.onClickFunction);$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").removeClass("d-none"),$(e.tableSelector).closest(".table-responsive").find(".gd[aria-index='"+t+"']").append(a)}})},getTableData(e,t,s){var n=100;t!=null&&(n=t);var a=Object.keys(e.data),r=[];$(a).each((i,o)=>{r.push("&"+o+"="+e.data[o])}),$.ajax({async:!1,url:this.endpoint+"/api/"+e.link+"?foo=bar"+r.join(""),data:{draw:"1",order:{0:{column:"0",dir:"desc"}},columns:{0:{data:"id"}},length:n,start:0}}).done(function(i){$(i.data).each((o,d)=>{var u=$(e.allData).filter(function(h,b){return b.id==d.id});u.length==0&&e.allData.push(d)}),s!=null&&s()}).fail(function(i){i.status==403&&w.logout(),l.notify("Not Added!",{type:"danger"})})},copyToClipboard(e){navigator.clipboard.writeText(e).then(()=>{console.log("Text copied to clipboard:",e),alert("Text copied to clipboard!")}).catch(t=>{console.error("Could not copy text: ",t),alert("Could not copy text: "+t)})},populateTableData(e,t,s){this.getTableData(e,t,s)},populateGridView(e){console.log("populateGridView",e);var t="col-12 col-lg-3 xc";try{e.data.grid_class!=null&&(t=e.data.grid_class+" xc")}catch{}$(e.tableSelector).closest(".dataTables_wrapper").find(".grid_view").html("<div></div>");var s=[];for(e.table.data().length,n=0,a=e.table.data().length;n<a;n++)e.table.data()[n].index=n,s.push(e.table.data()[n]);var n,a,r=12,i=[];for(n=0,a=s.length;n<a;n+=r)i.push(s.slice(n,n+r));i.forEach((o,d)=>{var u=document.createElement("div");u.setAttribute("class","row gx-0 "),o.forEach((h,b)=>{var _=h,f=document.createElement("div");f.setAttribute("class",t);var g=document.createElement("div");g.setAttribute("id",_.id),g.className="card-footer gd d-none",f.data=h,f.data.dataSource=e,_.index!=null&&g.setAttribute("aria-index",_.index),f.appendChild(g),u.appendChild(f)}),$(e.tableSelector).closest(".dataTables_wrapper").find(".grid_view").append(u)}),$(e.tableSelector).closest(".table-responsive").find(" .gd").each((o,d)=>{var u=$(d).attr("aria-index");console.log("there is index... d"+o),l.appendRowDtButtons(e,u)})},populateTable(e){var t=[[0,"desc"]],s=phxApp.endpoint+"/svt_api/";e.data.host!=null&&(s=e.data.host+"/svt_api/");var n=10,a=`

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

    `;e.data.dom!=null&&(a=e.data.dom),e.data.sorts!=null&&(t=e.data.sorts),e.data.pageLength!=null&&(n=e.data.pageLength);var r=document.createElement("tr"),i=document.createElement("tr");$(e.columns).each(function(f,g){var y=document.createElement("td");y.innerHTML=g.label,r.append(y)}),$(e.columns).each(function(f,g){var y=document.createElement("td");i.append(y)}),console.info(t),$(e.tableSelector).find("thead").append(r),$(e.tableSelector).find("tfoot").html(i),console.log(e.data);var o=Object.keys(e.data),d=[];$(o).each((f,g)=>{["modalSelector","sorts","dom","footerFn","rowFn","preloads","grid_class"].includes(g)||d.push("&"+g+"="+e.data[g]),["preloads"].includes(g)&&d.push("&"+g+"="+JSON.stringify(e.data[g])),["additional_join_statements"].includes(g)&&d.push("&"+g+"="+JSON.stringify(e.data[g]))});var u=e.tableSelector,h=$(u).DataTable({pageLength:n,processing:!0,responsive:!0,serverSide:!0,ajax:{url:s+e.link+"?foo=bar"+d.join("")},columns:e.columns,lengthMenu:[8,10,12,25,50,100],rowCallback:function(f,g,y){console.log("dt rowcallback index "+y);var k=$(e.allData).filter(function(P,C){return C.id==g.id});k.length==0&&e.allData.push(g),$(f).addClass("d-none"),$(f).attr("aria-index",y);var x=$(f).find("td").length-1;f.dataset.dtdata=JSON.stringify(g),I.datetime(f,g,e),I.img(f,g,e),I.bool(f,g,e),I.float(f,g,e),I.child(f,g,e),I.json(f,g,e),I.subtitle(f,g,e),I.progress(f,g,e),I.custom(f,g,e),$("td:eq("+x+")",f).attr("class","td-actions text-end"),$("td:eq("+x+")",f).html(""),$(e.buttons).each((P,C)=>{if(C.buttonType!=null)if(C.buttonType=="grouped"){console.log("creating grouped...button..."),C.fnParams.dataSource=e,C.fnParams.aParams=e.data;var S=l.groupedFormButton(C.name,C.color,C.buttonList,C.fnParams);$("td:eq("+x+")",f).append(S)}else{C.fnParams.dataSource=e,C.fnParams.aParams=e.data;var S=l.formButton({iconName:C.iconName,color:C.color,name:C.name},C.fnParams,C.onClickFunction);$("td:eq("+x+")",f).append(S)}else{C.fnParams.dataSource=e,C.fnParams.aParams=e.data;var S=l.formButton({iconName:C.iconName,color:C.color,name:C.name,tooltipText:C.tooltipText},C.fnParams,C.onClickFunction);$("td:eq("+x+")",f).append(S)}}),e.data.rowFn!=null&&e.data.rowFn(f,g,y)},footerCallback:function(f,g,y,k,x){e.data!=null&&e.data.footerFn!=null&&e.data.footerFn(f,g,y,k,x)},order:t,dom:a,autoWidth:!1});e.table=h,h.on("preXhr",()=>{console.log("fetching...")}),h.on("draw",()=>{$(".jsv"+e.makeid.id).closest("tr").each((f,g)=>{var y=e.columns.filter((k,x)=>k.showJson==!0);y.forEach((k,x)=>{$($(g).find(".jsv"+e.makeid.id)[x]).jsonViewer(h.data()[f][k.data],{collapsed:!0})})}),$(".table tbody tr").each((f,g)=>{setTimeout(()=>{$(g).removeClass("d-none")},10*f+1)}),console.log("table draw"),typeof e.onDrawFn=="function"&&e.onDrawFn()}),h.on("xhr",()=>{console.log("fetched")});var b=window.phoenixModels.findIndex((f,g)=>f.tableSelector=="#subSubTable");b!=-1&&window.phoenixModels.splice(b,1);var _=window.phoenixModels.filter((f,g)=>f.moduleName==e.moduleName&&f.tableSelector==e.tableSelector);if(_.length==0)window.phoenixModels.push(e);else{console.info("the dt already exist, consider reinsert?");var b=window.phoenixModels.findIndex((g,y)=>g.moduleName==e.moduleName&&g.tableSelector==e.tableSelector);b!=-1&&(window.phoenixModels.splice(b,1),window.phoenixModels.push(e))}return h},editData(e){console.log("editing data...");var t=e.dataSource;window.currentSelector=t.tableSelector;var s=t.table,n=s.row(e.row),a=s.data()[e.index],r;e.link!=null?r=e.link:r=t.link;var i="#sideModal";$(i).length==0&&(i="#mySubModal"),t.data.modalSelector!=null&&(i=t.data.modalSelector);function o(){console.log(a);var d='<form style="margin-top: 0px;" class="with_mod" id="'+r+'"  module="'+t.moduleName+'"></form>';$(i).find(".modal-title").html("Edit "+t.moduleName),$(i).find(".modal-body").html(d),$(i).modal("show"),l.createForm(a,s,e.customCols,e.postFn),e.drawFn!=null&&e.drawFn()}n.child.isShown()?(n.child.hide(),o()):(s.rows().every(function(d,u,h){this.child.hide()}),gParent=this,o())},deleteData(e){console.log("editing data...");var t=e.dataSource;window.currentSelector=t.tableSelector;var s=t.table;s.row(e.row);var n=s.data()[e.index];$("#myModal").find(".modal-title").html("Confirm delete this data?");var a=l.formButton("fa fa-check","outline-danger"),r=this.csrf_();a.onclick=function(){console.log(t),$("#myModal").modal("hide"),$.ajax({url:this.endpoint+"/api/"+t.link+"/"+n.id,dataType:"json",headers:{Authorization:"Basic "+(l.user!=null?l.user.token:null),"x-csrf-token":r},method:"DELETE"}).done(function(o){if($("#myModal").modal("hide"),l.notify("Deleted!",{type:"info"}),s!=null){console.log("redrawing table.. "+window.currentSelector),console.log(t.link),console.log(window.currentSelector);var d=window.phoenixModels.filter((u,h)=>u.moduleName==t.link&&u.tableSelector==window.currentSelector);d.forEach((u,h)=>{try{window.prev_page=u.table.page(),u.reload()}catch{console.log("cant find the table")}})}}).fail(function(o){console.log(o.responseJSON.status),l.notify("Not Added! reason: "+o.responseJSON.status,{type:"warning"})})};var i=document.createElement("center");i.append(a),$("#myModal").find(".modal-body").html(i),$("#myModal").modal("show")}};window.phxApp=l;class B{constructor(){this.init()}init(){$("html").attr("data-bs-theme",localStorage.getItem("data-bs-theme")||"light"),window.showRP=!0,window.includeShippingTax=!0,window.toggleMcart=!1,this.initializeApps(),m.restoreCart(),m.restoreCart(!0),$(document).on("click","a.navi",function(t){l.show(),t.preventDefault(),setTimeout(()=>{$(this).attr("href").includes("#")||l.navigateTo($(this).attr("href"))},200)}),window.addEventListener("popstate",t=>{try{history.state!=null?(window.back=!0,window.parsePage=!0,l.navigateTo(history.state.route)):(l.notify("Can't go back"),l.navigateTo("/home"))}catch(s){console.log("Navigation error:",s)}},!0),this.initializeTranslation(),this.loadCountries(),this.addRoutes(),l.navigateTo()}initializeApps(){window.phoenixModel=F,window.phoenixModels=[],window.phxApp=l,window.location.hostname==="localhost"&&(window.commerceApp=m,window.memberApp=w)}initializeTranslation(){let t="v2",s="";function n(a){return a==="Thailand"?"th":a==="Vietnam"?"vn":a==="China"?"cn":"v2"}try{localStorage.region!=null&&(t=n(localStorage.region)),s=l.api("translation",{lang:t})}catch(a){console.error("Error fetching translation:",a)}$.fn.extend({customHtml:async function(a){console.log("customHtml parsing..");var r=Object.keys(s),i=r.reduce((o,d)=>{var u=new RegExp(d,"g");return o.replace(u,s[d])},a);return this.html(i)},customAppend:async function(a){var r=Object.keys(s),i=r.reduce((o,d)=>{var u=new RegExp(d,"g");return o.replace(u,s[d])},a);return this.append(i)}})}loadCountries(){l.api("countries",{},null,t=>{window.countries=t,l.countries_=t})}addRoutes(){[{html:"merchant_withdrawal.html",title:"Merchant Withdrawal ",route:"/merchant_withdrawals"},{html:"merchant_application.html",title:"Merchant Application ",route:"/merchant_application"},{html:"merchant_profile.html",title:"Merchant Profile ",route:"/merchant_profile"},{html:"merchant_checkout_register.html",title:"Merchant Checkout ",route:"/merchant_checkout_register"},{html:"merchant_checkout.html",title:"Merchant Checkout ",route:"/merchant_checkout"},{html:"merchant_checkout_bd.html",title:"Merchant Checkout Back Date",route:"/merchant_checkout_bd"},{html:"merchant_purchases.html",title:"Merchant Purchases",route:"/merchant_purchases"},{html:"merchant_sales.html",title:"Merchant Sales",route:"/merchant_sales"},{html:"merchant_mall.html",title:"Merchant Mall",route:"/merchant_mall"},{html:"merchant_products.html",title:"Merchant Products",route:"/merchant_products"},{html:"mproduct.html",title:"Merchant Product",route:"/merchant_products/:id/:name"},{html:"refund_policy.html",title:"Refund Policy ",route:"/refund_policy",public:!0,skipNav:!0},{html:"terms_condition.html",title:"Terms Condition ",route:"/terms_condition",public:!0,skipNav:!0},{html:"merchant_code_register.html",title:"Register ",route:"/merchant_code_register/:share_code",public:!0,skipNav:!0},{html:"code_register.html",title:"Register ",route:"/code_register/:share_code",public:!0,skipNav:!0},{html:"register_wallet.html",title:"Register Wallet ",route:"/register_wallet"},{html:"bonus_wallet.html",title:"Bonus Wallet ",route:"/bonus_wallet"},{html:"new_topup.html",title:"Register Point Topup ",route:"/topup_register_point"},{html:"upgrade.html",title:"Upgrade ",route:"/upgrade"},{html:"redeem.html",title:"Redeem ",route:"/redeem"},{html:"withdrawal.html",title:"Withdrawal ",route:"/withdrawals"},{html:"reward_details.html",title:"Reward Details ",route:"/reward_details/:name/:month/:year"},{html:"sales_detail.html",title:"Sales Details",route:"/sales/:id"},{html:"sales.html",title:"Sales History",route:"/sales"},{html:"pay_instalment.html",title:"Pay Instalment",route:"/pay_instalment"},{html:"instalment_payments.html",title:"Instalment Payments",route:"/instalment_payments"},{html:"wallet_transaction.html",title:"Transactions ",route:"/wallets/:id"},{html:"product.html",title:"Product",route:"/products/:id/:name"},{html:"topup_card_register.html",title:"Topup Card Register",route:"/topup_card_register"},{html:"register.html",title:"Register",route:"/register"},{html:"logout.html",title:"Logout",route:"/logout",public:!0},{html:"thank_you.html",title:"Login",route:"/thank_you",public:!0},{html:"login.html",title:"Login",route:"/login",public:!0},{html:"profile.html",title:"Profile",route:"/profile"},{html:"placement.html",title:"Placement",route:"/placement"},{html:"placement_full.html",title:"Placement(Full)",route:"/placement_full"},{html:"referal.html",title:"Referal",route:"/referal"},{html:"gs_summary.html",title:"Group Sales",route:"/group_sales"}].forEach((s,n)=>{l.route_names.push(s)})}}document.addEventListener("DOMContentLoaded",()=>{new B});
