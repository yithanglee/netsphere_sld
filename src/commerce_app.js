import {
  ColumnFormater
} from './column_formatter.js';

import {
  memberApp_
} from './member_app.js';
import {
  phxApp_
} from './phx_app.js';

import {
  phoenixModel
} from './phoenixModel.js';
import { ethers } from 'ethers';
export let commerceApp_ = {
  cart_: [],
  mcart_: [],
  region: "MY",
  selectedInstalment: null,


  emptyCart_(is_merchant) {
      const cartKey = is_merchant ? "mcart" : "cart";
      const firstCartCountryIdKey = is_merchant ? "first_mcart_country_id" : "first_cart_country_id";

      if (is_merchant) {
          this.mcart_ = [];
      } else {
          this.cart_ = [];
      }

      localStorage.setItem(cartKey, JSON.stringify([]));
      localStorage.removeItem(firstCartCountryIdKey);
      commerceApp_[firstCartCountryIdKey] = null;
  },
  restoreCart(is_merchant) {
      const cartKey = is_merchant ? "mcart" : "cart";
      const firstCartCountryIdKey = is_merchant ? "first_mcart_country_id" : "first_cart_country_id";
      const cartData = localStorage.getItem(cartKey);

      if (cartData != null) {
          if (is_merchant) {
              this.mcart_ = JSON.parse(cartData);
              commerceApp_.first_mcart_country_id = localStorage.getItem(firstCartCountryIdKey);
          } else {
              this.cart_ = JSON.parse(cartData);
              commerceApp_.first_cart_country_id = localStorage.getItem(firstCartCountryIdKey);
          }
      }
  },
  filterItemsByName(itemName) {

      const cart = this.cart_;
      // const index = cart.findIndex(cartItem => cartItem.id === item.id);
      var res = cart.filter((v, i) => {
          return v.name.includes(itemName)
      })
      console.log(res)

      return res;
  },
  hasCartItems(is_merchant) {
      const cart = is_merchant ? this.mcart_ : this.cart_;
      return cart.length;
  },

  addItem_(item, is_merchant) {
      console.info(item)
      const cart = is_merchant ? this.mcart_ : this.cart_;
      const index = cart.findIndex(cartItem => cartItem.id === item.id);

      if (item.is_instalment) {
          if (item.payInstalment) {

          } else {

              instalment_name = item.name
              product_instalment_id = item.id
              item = item.first_payment_product
              item.selectedInstalmentId = product_instalment_id
              item.selectedInstalment = {
                  id: product_instalment_id,
                  name: instalment_name
              }
          }
      }


      if (index >= 0) {
          cart[index].qty += 1;
      } else {
          item.qty = 1;
          cart.unshift(item);
      }

      const cartKey = is_merchant ? "mcart" : "cart";
      localStorage.setItem(cartKey, JSON.stringify(cart));
  },
  addItemById_(id, is_merchant) {
      const cartKey = is_merchant ? "mcart" : "cart";
      const cart = is_merchant ? this.mcart_ : this.cart_;
      const index = cart.findIndex(cartItem => cartItem.id == parseInt(id));

      if (index >= 0) {

          var foundItem = cart[index]
          phxApp_.notify("item " + foundItem.name + " added !", {
              delay: 2000,
              type: "success",
              placement: {
                  from: "top",
                  align: "center"
              }
          })
          foundItem.qty += 1


      } else {
          // item.qty = 1
          // this.cart_ = [item, ...this.cart_]

      }



      localStorage.setItem(cartKey, JSON.stringify(cart))

  },
  minusItem_(id, is_merchant) {


      const cartKey = is_merchant ? "mcart" : "cart";
      const cart = is_merchant ? this.mcart_ : this.cart_;
      const index = cart.findIndex(cartItem => cartItem.id == parseInt(id));


      if (index >= 0) {

          var foundItem = cart[index]
          phxApp_.notify("item " + foundItem.name + " deducted !", {
              delay: 2000,
              type: "success",
              placement: {
                  from: "top",
                  align: "center"
              }
          })
          foundItem.qty -= 1

          if (foundItem.qty == 0) {

              this.removeItem_(id, is_merchant)
          }


      } else {
          // item.qty = 1
          // this.cart_ = [item, ...this.cart_]

      }

      localStorage.setItem(cartKey, JSON.stringify(cart))

  },
  removeItem_(id, is_merchant) {
      const cartKey = is_merchant ? "mcart" : "cart";
      const cart = is_merchant ? this.mcart_ : this.cart_;
      const index = cart.findIndex(cartItem => cartItem.id == parseInt(id));

      var foundItem = cart[index]

      phxApp_.notify("item " + foundItem.name + " removed !", {
          delay: 2000,
          type: "warning",
          placement: {
              from: "top",
              align: "center"
          }
      })

      var removed = cart.splice(index, 1)

      localStorage.setItem(cartKey, JSON.stringify(cart))

      if (commerceApp_.cart_.length == 0) {
          commerceApp_.first_cart_country_id = null
      }

  },
  toastChanges() {
      if ($("input[name='user[share_code]']").length > 0) {

      } else {

          phxApp_.toast({
              content: `<div class=""><ul class="">` + $(".ac").html() + `</ul></div>`
          })
      }
  },
  total_(is_merchant) {
      const cart = is_merchant ? this.mcart_ : this.cart_;
      var amount = this.cart.map((v, i) => {
          return v.price
      }).reduce((a, b) => {
          return a + b
      })
      return amount
  },
  render() {
      // this find all all the related components on the page and transform them.
      // has to be done after rendering page, 
      // callback function to call this render
      var list = ["swap_back","merchantProducts", "merchantproduct", "merchantProfile", "sponsorInfo", "merchant", "recruit", "topup", "country",
          "light", "primaryBuy", "secondaryBuy", "assetTranches","userProfile", "wallet", "crypto_wallet", "metamask_wallet", "crypto_wallet_balance", "announcement", "products", "product", "bonusLimit",
          "rewardList", "rewardSummary","mcart", "cart", "cartItems", "salesItems", "upgradeTarget", "upgradeTargetMerchant", "sponsorTarget", "stockistTarget", "choosePayment"
      ]

      list.forEach((v, i) => {

          if ($(v).length > 0) {
              try {
                  this.components[v]()
              } catch(e) {
                  console.error(e)
              }
          }
      })
  },
  components: {
      
      merchantproduct() {
          $("merchantproduct").customHtml(`
        <div class="text-center mt-4">
          <div class="spinner-border loading2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          
      <div class="loading2 d-none" id="mpcontent" />
      `)

          phxApp_.api("get_mproduct", {
              id: pageParams.id
          }, null, (data) => {
              $("title").html(data.name)

              function addToMCart() {

                  // check current cart if they have other merchant' items


                  var check = commerceApp_.mcart_.filter((v, i) => {
                      return v.merchant_id == data.merchant_id
                  })


                  if (check.length > 0) {
                      commerceApp_.addItem_(data, true)
                      commerceApp_.components["updateMCart"]()

                      phxApp_.notify("Added " + data.name, {
                          delay: 2000,
                          type: "success",
                          placement: {
                              from: "top",
                              align: "center"
                          }
                      })

                  } else {
                      if (commerceApp_.mcart_.length == 0) {
                          commerceApp_.addItem_(data, true)
                          commerceApp_.components["updateMCart"]()

                          phxApp_.notify("Added " + data.name, {
                              delay: 2000,
                              type: "success",
                              placement: {
                                  from: "top",
                                  align: "center"
                              }
                          })
                      } else {

                          alert("cant add due to different merchants, empty it first.")
                      }
                  }


              }

              $(".spinner-border.loading2").parent().remove()
              $(".loading2").removeClass("d-none")


              var img
              if (data.img_url != null) {

                  try {
                      img = data.img_url
                  } catch (e) {
                      img = '/images/placeholder.png'
                  }
              }
              $("#mpcontent").customHtml(`

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
                  background-image: url('` + img + `');
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
                  background-image: url('` + img + `');
                  ">
            </div>
          </div>
        <div style="margin-top: 50px;">` + data.description + `</div>
        <div class="font-sm fw-light text-secondary text-center "><span class="format-float">` + data.retail_price + ` </span> RP</div>
        <div class="btn btn-outline-primary mt-4" mproduct-id="` + data.id + `">Add</div>
      </div>

      `)
              $("#ptitle").html(
                  data.name
              )
              $("[mproduct-id='" + data.id + "']")[0].onclick = addToMCart

          })


      },
      swap_back() {
          $("swap_back").each((i, v) => {
              var wallet = phxApp.api("crypto_wallet", { token: phxApp.user && phxApp.user.token }) || {}
              var assetsCfg = phxApp.api("crypto_assets", { token: phxApp.user && phxApp.user.token }) || {}

              function shortAddr(addr){
                  if(!addr) return ""
                  var a = String(addr)
                  if (a.length <= 10) return a
                  return a.substring(0,6)+"..."+a.substring(a.length-4)
              }

              function iconFor(sym){
                  var m = {
                      POL: "https://e8b864cf8d55fbd854f43ae53b6c824c.ipfscdn.io/ipfs/Qmd58rKLnBfteouAcmdjQ1HzDvRLSLjMbHjuXRytsKwAkD",
                      USDT: "https://polygonscan.com/token/images/tether_32.png",
                      USDC: "https://polygonscan.com/token/images/centre-usdc_32.png",
                      KTDFI: "https://ipfs.io/ipfs/QmSLo5e3PSBWgF3wysabPzsBjoRLngrFoVNrGwgL3vm2Zn/KTDFI_600x600.png",
                      NETSPH: "https://ipfs.io/ipfs/QmSLo5e3PSBWgF3wysabPzsBjoRLngrFoVNrGwgL3vm2Zn/KTDFI_600x600.png"
                  }
                  return m[sym] || m.POL
              }

              function getTokenContract(sym){
                  var arr = (assetsCfg.assets || [])
                  var it = arr.filter(function(a){ return a && a.symbol == sym })[0]
                  return it && it.contract
              }

              async function getTreasuryInfo(){
                  var api_res = await phxApp.api("swap_back_config", { token: phxApp.user && phxApp.user.token }) || {}
                  var cfg = api_res.res || {}
                  var arr = (assetsCfg.assets || [])
                  var nst = arr.filter(function(a){ return a && a.symbol == 'NETSPH' })[0] || {}
                  var treasury = cfg.treasury_address || assetsCfg.treasury || nst.treasury || ""
                  var rate = (typeof cfg.rate === 'number') ? cfg.rate : (typeof nst.rate === 'number' ? nst.rate : 1.0)
                  var min_amount = (typeof cfg.min_amount === 'number') ? cfg.min_amount : 0
                  var confirmations = (typeof cfg.confirmations === 'number') ? cfg.confirmations : 5
                  return { treasury: treasury, rate: rate, min_amount: min_amount, confirmations: confirmations }
              }

              var sym = 'NETSPH'
              var contract = getTokenContract(sym)
              var tinfo = {
                treasury: "0xc36340f58ff6561e428df698189ce0361c90586f",
                rate: 1.0,
                min_amount: 0,
                confirmations: 5
              }
              
              var chainCfg = phxApp.api("chain_config", {}) || {}
              var explorer = (chainCfg && String(chainCfg.chain_id) === '80002') ? 'https://amoy.polygonscan.com' : 'https://polygonscan.com'

              // Prepare treasury dropdown options (configured + provided address)
              var altTreasury = "0xc36340f58ff6561e428df698189ce0361c90586f"
              var treasuries = []
              if (tinfo.treasury) treasuries.push(String(tinfo.treasury))
              treasuries.push(altTreasury)
              treasuries = treasuries
                .filter(Boolean)
                .map(function(a){ return String(a).trim() })
                .filter(function(v, i, arr){ return arr.findIndex(function(x){ return x.toLowerCase() === v.toLowerCase() }) === i })
              var selectedTreasury = treasuries[0] || ""

              var balanceDisplay = '0.000000'
              if (contract) {
                  var rb = phxApp.api('crypto_wallet_balance', { token: phxApp.user && phxApp.user.token, token_address: contract })
                  if (rb && !rb.status) balanceDisplay = Number(rb.formatted || 0).toFixed(6)
              }

              $("swap_back").html(`
                <div class="card" style="max-width:520px;margin:0 auto;">
                  <div class="card-body">
                    <div class="d-flex flex-column" style="gap:8px;">
                      <div class="d-flex align-items-center gap-3" style="padding: 4px 0 6px 0;">
                        <img src="${iconFor(sym)}" style="height:28px;width:28px;"/>
                        <div class="d-flex flex-column">
                          <div class="fw-semibold">Swap Back ${sym} → Points</div>
                          <div class="text-muted small">Admin approval required</div>
                        </div>
                        <div class="ms-auto small text-muted">Bal: ${balanceDisplay} ${sym}</div>
                      </div>
                      <div class="alert alert-secondary small" role="alert">
                        <ol class="m-0 ps-3">
                          <li>Send ${sym} to treasury address.</li>
                          <li>(Optional) Paste transaction hash and verify.</li>
                          <li>Submit request for admin approval. Our system will match your transfer in the background.</li>
                        </ol>
                      </div>

                      <div class="mb-1">
                        <label class="form-label">Treasury Address</label>
                        <div class="input-group">
                          <select class="form-select" id="sb-treasury">
                            ${treasuries.map(function(a){ return `<option value="${a}" ${a===selectedTreasury?'selected':''}>${a}</option>` }).join("")}
                          </select>
                          <button class="btn btn-outline-secondary" id="sb-copy-treasury">Copy</button>
                          <a class="btn btn-outline-secondary${selectedTreasury?'':' disabled'}" id="sb-view-treasury" target="_blank" rel="noopener" href="${selectedTreasury? (explorer + '/address/' + selectedTreasury):'#'}">View</a>
                        </div>
                      </div>

                      <div class="row g-2">
                        <div class="col-12">
                          <label class="form-label">Transaction Hash <span class="text-muted small">(optional)</span></label>
                          <input class="form-control" id="sb-txhash" placeholder="0x..." />
                        </div>
                        <div class="col-12">
                          <label class="form-label">Amount (${sym})</label>
                          <input type="number" step="0.000001" class="form-control" id="sb-amount" placeholder="0.0" />
                          <div class="form-text">Minimum: ${tinfo.min_amount || 0}</div>
                        </div>
                        <div class="col-12">
                          <div class="d-flex align-items-center">
                            <div class="text-muted">Rate</div>
                            <div class="ms-auto"><span id="sb-rate">${Number(tinfo.rate||1).toFixed(6)}</span> pts per ${sym}</div>
                          </div>
                          <div class="d-flex align-items-center">
                            <div class="text-muted">You will receive</div>
                            <div class="ms-auto fw-semibold"><span id="sb-points">0.000000</span> pts</div>
                          </div>
                        </div>
                      </div>

                      <div class="d-flex gap-2">
                        <button class="btn btn-outline-secondary flex-fill" id="sb-verify">Verify Tx</button>
                        <button class="btn btn-primary flex-fill" id="sb-submit">Submit Request</button>
                      </div>

                      <div>
                        <button class="btn btn-light w-100" id="sb-history">View History</button>
                      </div>

                      <div id="sb-res" class="small"></div>
                    </div>
                  </div>
                </div>
              `)

              function updatePoints(){
                  var amt = parseFloat($("#sb-amount").val() || "0")
                  var rate = parseFloat($("#sb-rate").text() || "1")
                  if (!isFinite(amt) || !isFinite(rate)) { $("#sb-points").text("0.000000"); return }
                  var pts = (amt * rate)
                  $("#sb-points").text(Number(pts||0).toFixed(6))
              }

              $(document).off('input', '#sb-amount').on('input', '#sb-amount', updatePoints)
              $(document).off('click', '#sb-copy-treasury').on('click', '#sb-copy-treasury', function(){
                  var t = $("#sb-treasury").val() || ""; if (t) phxApp.copyToClipboard(t)
              })
              $(document).off('change', '#sb-treasury').on('change', '#sb-treasury', function(){
                  var t = $(this).val() || ""
                  if (t) {
                    $("#sb-view-treasury").removeClass('disabled').attr('href', `${explorer}/address/${t}`)
                  } else {
                    $("#sb-view-treasury").addClass('disabled').attr('href', '#')
                  }
              })

              $(document).off('click', '#sb-verify').on('click', '#sb-verify', function(){
                  var txh = $("#sb-txhash").val() || ""
                  if (txh && !/^0x[0-9a-fA-F]{64}$/.test(txh)) { $("#sb-res").html(`<div class='text-danger'>Invalid transaction hash format</div>`); return }
                  $("#sb-res").html(`<div class='text-muted'>Verifying...</div>`)
                  var tz = $("#sb-treasury").val() || tinfo.treasury
                  phxApp_.post('swap_back_verify_tx', { token: phxApp.user && phxApp.user.token, tx_hash: txh, contract: contract, treasury: tz }, null, function(r){
                      if (r && r.status === 'ok') {
                          if (r.amount) { $("#sb-amount").val(r.amount) }
                          if (r.rate) { $("#sb-rate").text(Number(r.rate).toFixed(6)) }
                          updatePoints()
                          $("#sb-res").html(`<div class='text-success'>Verified. From ${shortAddr(r.from)} → ${shortAddr(r.to)} · ${Number(r.amount||0).toFixed(6)} ${sym}</div>`)
                      } else {
                          $("#sb-res").html(`<div class='text-danger'>Verification failed: ${r && (r.reason||r.message) || 'unknown'}</div>`)
                      }
                  })
              })

              $(document).off('click', '#sb-submit').on('click', '#sb-submit', function(){
                  var txh = $("#sb-txhash").val() || ""
                  var amt = parseFloat($("#sb-amount").val() || "0")
                  if (!contract) { $("#sb-res").html(`<div class='text-danger'>Missing token contract</div>`); return }
                  if (!tinfo.treasury) { $("#sb-res").html(`<div class='text-danger'>Missing treasury address</div>`); return }
                  // if (!txh || !/^0x[0-9a-fA-F]{64}$/.test(txh)) { $("#sb-res").html(`<div class='text-danger'>Enter a valid transaction hash</div>`); return }
                  if (!isFinite(amt) || amt <= 0) { $("#sb-res").html(`<div class='text-danger'>Enter a valid amount</div>`); return }
                  if (tinfo.min_amount && amt < tinfo.min_amount) { $("#sb-res").html(`<div class='text-danger'>Amount must be ≥ ${tinfo.min_amount}</div>`); return }
                  $("#sb-res").html(`<div class='text-muted'>Submitting...</div>`)
                  var tz = $("#sb-treasury").val() || tinfo.treasury
                  var tx_payload = txh ? txh : null
                  var payload = { token: phxApp.user && phxApp.user.token, tx_hash: tx_payload, amount: amt, symbol: sym, contract: contract, treasury: tz, wallet_address: wallet.address }
                  phxApp_.post('swap_back_create', payload, null, function(r){
                      if (r && r.status === 'ok') {
                          $("#sb-res").html(`<div class='text-success'>Request submitted. Status: pending review</div>`)
                          try { phxApp_.toast({ content: 'Swap-back request submitted' }) } catch(_){ }
                      } else {
                          $("#sb-res").html(`<div class='text-danger'>Submit failed: ${r && (r.reason||r.message) || 'unknown'}</div>`)
                      }
                  })
              })

              $(document).off('click', '#sb-history').on('click', '#sb-history', function(){
                  var list = phxApp.api('swap_back_history', { token: phxApp.user && phxApp.user.token }) || []
                  if (!Array.isArray(list)) list = []
                  phxApp.modal({
                      selector: '#mySubModal',
                      autoClose: false,
                      header: 'Swap Back History',
                      content: `
                        <div style="max-width:520px;">
                          <div id="sb-hlist"></div>
                        </div>
                      `
                  })
                  var html = list.map(function(x){
                      var st = (x.status||'').toString()
                      var pts = (typeof x.points_credited === 'number') ? Number(x.points_credited).toFixed(6) : '-'
                      var amt = (typeof x.amount === 'number') ? Number(x.amount).toFixed(6) : '-'
                      var l = x.tx_hash ? (explorer + '/tx/' + x.tx_hash) : '#'
                      return `
                        <div class="d-flex flex-column border rounded p-2 mb-2" style="gap:4px;">
                          <div class="d-flex align-items-center small">
                            <span class="text-muted">${shortAddr(x.tx_hash)}</span>
                            <a class="ms-2" href="${l}" target="_blank" rel="noopener">View</a>
                            <span class="ms-auto badge bg-${st==='credited'?'success':(st==='approved'?'primary':(st==='rejected'?'danger':'secondary'))}">${st}</span>
                          </div>
                          <div class="d-flex align-items-center small">
                            <span>${amt} ${sym}</span>
                            <span class="ms-auto">${pts} pts</span>
                          </div>
                        </div>
                      `
                  }).join("")
                  $("#sb-hlist").html(html || `<div class='text-muted text-center py-4'>No records</div>`)
              })

          })
      },
      merchantProducts() {

          let selectedCountry;


          function evalCt() {

              if (phxApp.user == null) {

                  return "b.is_approved=true|b.country_id=" + phxApp_.chosen_country_id_.id
              } else {
                  return "b.is_approved=true|b.country_id=" + phxApp.user.country_id
              }

          }

          function evalCard(onclickAttr, img, merchant, data, showBtn) {
              var card = `
                    <div  class="position-relative m-2 d-flex flex-column gap-2" ` + onclickAttr + `>
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
                              background-image: url('` + img + `');
                              
                              ">
                        </div>
                        <div class="rounded py-2 foreground-p" style="
                             
                              width:  100%;
                              z-index: 1;
                              background-position: center;
                              background-repeat: no-repeat;
                              background-size: cover; 
                              background-image: url('` + img + `');
                              ">
                        </div>
                      </div>
                      <div class="d-flex position-absolute" style="left: 10px; top: 12px;z-index: 10;">
                        <div class="bg-primary badge">` + merchant.name + `</div>
                      </div>
                      <div class="d-flex flex-column justify-content-center gap-2 mt-4">
                        <div class="font-sm fw-bold text-center">` + data.name + `</div>
                         <div class="d-flex flex-column justify-content-center ">
                            <div class="font-sm fw-light text-secondary text-center "><span class="format-float">` + data.retail_price + `</span> RP</div>
                         </div>
                         ` + showBtn + `
                      </div>
                    </div>
                    `
              return card
          }


          function evalCountry(countryName) {
              var prefix = "v2"

              if (countryName == "Thailand") {
                  prefix = "th"
              }
              if (countryName == "Vietnam") {
                  prefix = "vn"
              }
              if (countryName == "China") {
                  prefix = "cn"
              }

              return prefix;
          }

          var countries = []


          phxApp_.countries_.forEach((v, i) => {
              countries.push(`
                <button type="button" aria-name="` + v.name + `" aria-country="` + v.id + `" class="btn btn-primary ">` + v.name + ` ` + (v.alias || "") + `</button>
              `)
          })


          if (phxApp_.chosen_country_id_ == null && pageParams.share_code == null) {

              phxApp_.modal({
                  selector: "#mySubModal",
                  content: `
                    <center>
                      <div class="btn-group-vertical">
                      ` + countries.join("") + `
                      </div>
                    </center>
                  `,
                  header: "Choose region",
                  autoClose: false
              })

              $("[aria-country]").unbind()
              $("[aria-country]").click(function() {
                  var country_id = $(this).attr("aria-country"),
                      name = $(this).attr("aria-name")
                  phxApp_.chosen_country_id_ = country_id
                  phxApp_.notify("Chosen region: " + name)
                  localStorage.setItem("region", name)
                  setTimeout(() => {

                      $("#chosen-region").html(name)
                  }, 1000)
                  if (localStorage.region != null) {
                      langPrefix = evalCountry(name)
                  }
                  translationRes = phxApp_.api("translation", {
                      lang: langPrefix
                  });


                  $("#mySubModal").modal('hide')
                  commerceApp_.components["country"]()


                  // if (pageParams.share_code != null) {

                  //     phxApp_.api("get_share_link_by_code", {
                  //         code: pageParams.share_code
                  //     }, null, (sponsor) => {

                  //         commerceApp_.components["cartItems"]()

                  //         phxApp_.navigateTo(location.pathname)
                  //         $(".sponsor-name").customHtml("_sponsor: " + sponsor["user"]["username"] + " _position: " + sponsor.position)

                  //         $(".sponsor-bank").html(`

                  //           <div class="d-flex justify-content-between align-items-center">
                  //             <span class="fw-bold">Bank Details</span>
                  //             <span class=" my-4 me-4 d-flex justify-content-end align-items-end gap-1 flex-column">
                  //               <div>` + sponsor["user"]["bank_name"] + `</div>
                  //               <div>` + sponsor["user"]["bank_account_holder"] + `</div>
                  //               <div>` + sponsor["user"]["bank_account_no"] + `</div>
                  //             </span>
                  //           </div>

                  //             `)

                  //     })
                  // } else {

                  phxApp_.navigateTo("/home")
                      // }
              })

          }

          if (pageParams.share_code != null) {


              phxApp_.api("get_share_link_by_code", {
                  code: pageParams.share_code
              }, null, (sponsor) => {

                  selectedCountry = phxApp_.countries_.filter((v, i) => {
                      return v.id == sponsor["user"]["country_id"]
                  })[0]

                  console.info(selectedCountry)

                  phxApp_.chosen_country_id_ = sponsor["user"]["country_id"]
                  var country_id = sponsor["user"]["country_id"],
                      name = selectedCountry.name

                  phxApp_.notify("Chosen region: " + selectedCountry.name)
                  localStorage.setItem("region", selectedCountry.name)
                  setTimeout(() => {

                      $("#chosen-region").html(name)
                  }, 1000)
                  if (localStorage.region != null) {
                      langPrefix = evalCountry(name)
                  }
                  translationRes = phxApp_.api("translation", {
                      lang: langPrefix
                  });

                  commerceApp_.components["country"]()

                  // commerceApp_.components["cartItems"]()
                  // phxApp_.navigateTo(location.pathname)
                  $(".sponsor-name").customHtml("_sponsor: " + sponsor["user"]["username"] + " _position: " + sponsor.position)

                  $(".sponsor-bank").html(`

                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Bank Details</span>
                              <span class=" my-4 me-4 d-flex justify-content-end align-items-end gap-1 flex-column">
                                <div>` + sponsor["user"]["bank_name"] + `</div>
                                <div>` + sponsor["user"]["bank_account_holder"] + `</div>
                                <div>` + sponsor["user"]["bank_account_no"] + `</div>
                              </span>
                            </div>

                              `)


              })

          }




          if (phxApp_.chosen_country_id_ != null) {
              function addToMCart(dom) {
                  var id = $(dom).attr("mproduct-id")
                  var zdata = phxApp_.api("get_mproduct", {
                      id: id
                  }, () => {}, (data) => {
                      var check = commerceApp_.mcart_.filter((v, i) => {
                          return v.merchant_id == data.merchant_id
                      })

                      if (check.length > 0) {

                          try {

                              commerceApp_.addItem_(data, true)
                              commerceApp_.components["updateMCart"]()
                              commerceApp_.components["cartItems"]()

                              phxApp_.notify("Added " + data.name, {
                                  delay: 2000,
                                  type: "success",
                                  placement: {
                                      from: "top",
                                      align: "center"
                                  }
                              })

                          } catch (E) {
                              console.error(E)
                          }

                      } else {

                          if (commerceApp_.mcart_.length == 0) {
                              commerceApp_.addItem_(data, true)
                              commerceApp_.components["updateMCart"]()
                              commerceApp_.components["cartItems"]()

                              phxApp_.notify("Added " + data.name, {
                                  delay: 2000,
                                  type: "success",
                                  placement: {
                                      from: "top",
                                      align: "center"
                                  }
                              })
                          } else {

                              alert("cant add due to different merchants, empty it first.")
                          }

                      }

                  })

              }

              $("merchantProducts").each((i, products) => {
                  $(products).customHtml(`
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
                `).then(() => {

                      var customCols = null,
                          random_id = 'mproducts',
                          productSource = new phoenixModel({
                              onDrawFn: () => {
                                  $(".spinner-border.loading").parent().remove()
                                  $(".loading").removeClass("d-none")


                                  setTimeout(() => {
                                      $("[mproduct-id]").each((i, v) => {
                                          v.onclick = () => {
                                              addToMCart(v)
                                          }
                                      })
                                      ColumnFormater.formatDate()
                                  }, 1200)

                              },
                              xcard: (params) => {

                                  var data = params,
                                      showBtn = '',
                                      img = '/images/placeholder.png',
                                      onclickAttr = `onclick="phxApp.navigateTo('/merchant_products/` + data.id + `/` + data.name + `')"`;


                                  if ($(products).attr("direct") != null) {
                                      onclickAttr = ''
                                      showBtn = `<div class="btn btn-outline-primary mt-4" mproduct-id="` + data.id + `">Add</div>`
                                  }
                                  if (data.img_url != null) {

                                      try {
                                          img = data.img_url
                                      } catch (e) {
                                          img = '/images/placeholder.png'
                                      }
                                  }

                                  var merchant = data.merchant

                                  return evalCard(onclickAttr, img, merchant, data, showBtn)


                              },
                              data: {
                                  sorts: [
                                      [1, "asc"]
                                  ],

                                  additional_join_statements: [{
                                      merchant: "merchant"

                                  }],
                                  additional_search_queries: [
                                      evalCt()

                                  ],

                                  preloads: ["merchant"],
                                  grid_class: "col-4 col-lg-3",
                                  dom: `

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

                                                `
                              },
                              columns: [

                                  {
                                      label: 'id',
                                      data: 'id'
                                  },
                                  // {
                                  //   label: 'retail_price',
                                  //   data: 'retail_price'
                                  // },

                                  {
                                      label: 'Action',
                                      data: 'id'
                                  }

                              ],
                              moduleName: "MerchantProduct",
                              link: "MerchantProduct",
                              customCols: customCols,
                              buttons: [],
                              tableSelector: "#" + random_id
                          })
                      productSource.load(random_id, "#mproduct_tab1")

                  })


              })

          }




      },

      merchantProfile() {
          $("merchantProfile").html(`
      <form class="with_mod row" module="Merchant" id="Merchant">
      </form>
      `)

          var merc = phxApp_.user.merchant

          if (phxApp_.user.merchant == null) {
              merc = {
                  id: "0",
                  user_id: phxApp.user.id
              }
          }
          var merchant_categorySourcex = new phoenixModel({
              columns: [{
                  label: 'Action',
                  data: 'id'
              }],
              moduleName: "MerchantCategory",
              link: "MerchantCategory",
              buttons: [],
              tableSelector: "#" + 'bc2c'
          })
          var bcs = phxApp_.populateTableData(merchant_categorySourcex, 100, () => {

          })

          try {

              console.info(bcs.allData)
          } catch (e) {

              console.error(e)

          }

          phxApp.createForm(merc,
              null, [{
                      name: 'General',
                      list: [

                          'id',
                          'user_id',
                          'name', {
                              label: 'merchant_category_id',
                              alt_name: 'Business Category',
                              alt_class: "col-12",
                              selection: merchant_categorySourcex.allData
                          }, {
                              alt_name: 'Merchant Logo',
                              label: 'img_url',
                              upload: true
                          }, {
                              label: 'description',
                              binary: true,
                              alt_class: "col-12"
                          },

                          {
                              label: 'commission_perc',
                              alt_name: 'Percentage Contribution',
                              selection: [{
                                  id: 0.05,
                                  name: "5%"
                              }, {
                                  id: 0.1,
                                  name: "10%"
                              }, {
                                  id: 0.15,
                                  name: "15%"
                              }, {
                                  id: 0.2,
                                  name: "20%"
                              }, {
                                  id: 0.22,
                                  name: "25%"
                              }, {
                                  id: 0.3,
                                  name: "30%"
                              }, {
                                  id: 0.35,
                                  name: "35%"
                              }, {
                                  id: 0.4,
                                  name: "40%"
                              }, {
                                  id: 0.45,
                                  name: "45%"
                              }, {
                                  id: 0.5,
                                  name: "50%"
                              }]
                          },

                      ]
                  }, {
                      name: 'CompanyDetails',
                      list: [

                          {
                              label: 'company_address',
                              alt_name: "Address",
                              alt_class: "col-12",
                              binary: true
                          }, {
                              label: 'company_email',
                              alt_name: "Email",
                              alt_class: "col-12"
                          }, {
                              label: 'company_phone',
                              alt_name: "Phone",
                              alt_class: "col-12"
                          },



                          {
                              label: 'company_reg_no',
                              alt_name: "Reg No",
                              alt_class: "col-12"
                          }, {
                              label: 'company_ssm_image_url',
                              alt_name: "SSM Image",
                              alt_class: "col-12",
                              upload: true
                          },


                      ]
                  }, {
                      name: 'BankDetails',
                      list: [

                          {
                              label: 'bank_name',
                              alt_name: "Bank Name",
                              alt_class: "col-12"
                          }, {
                              label: 'bank_account_holder',
                              alt_name: "Bank Account Holder",
                              alt_class: "col-12"
                          }, {
                              label: 'bank_account_no',
                              alt_name: "Account Number",
                              alt_class: "col-12"
                          },

                      ]
                  }


              ],

              (j) => {
                  console.info(j)
                      // phxApp_.user.merchant = j
                  memberApp_.extendUser()
                  phxApp.navigateTo("/merchant_profile")
              }

          )
      },

      merchant() {
          var cta = ` <div class="btn btn-primary btn-lg merchant-apply mb-4 disabled">Apply</div>`

          if (phxApp_.user.merchant != null) {
              if (phxApp_.user.merchant.is_approved == false) {
                  cta = ` <div class="btn btn-primary btn-lg merchant-apply ">Pending Approval</div>`

              } else {
                  phxApp_.navigateTo("/merchant_profile")
              }

          }

          function agree() {
              console.log("agree")

              $(".merchant-apply ").toggleClass("disabled")
          }

          window.agree = agree


          $("merchant").html(`
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
         ` + cta + `
        </div>

      `)


          $(".merchant-apply").on("click", () => {


              phxApp_.post("apply_merchant", {
                  id: phxApp_.user.id
              }, null, () => {

                  phxApp_.navigateTo("/merchant_profile")

              })


          })
      },
      recruit() {

          $("recruit").each((i, recruit) => {
              console.log(recruit)

              var v = $(recruit).attr("merchant")
              console.log(v == "")
              if (v == "") {
                  $(recruit).customHtml(`

                <div class="">
                    <label class="my-2">Position</label>
                    <select class="form-control" name="mposition">
                
                      <option>left</option>
                      <option>right</option>
                    </select>
                    <div class="mt-4 btn btn-primary generate-mlink">Generate</div>
                </div>



          `)
              } else {

                let rc = $(recruit).attr("recruit")
                console.log("rc", rc)
                if (rc == undefined) {
                  rc = "U1"
                } 

                if (phxApp.user.stockist_users.length > 0 && ["u2", "u3"].includes(rc)) {
                  $(recruit).customHtml(`

                    <div class="">
                        <label class="my-2">${rc} Position</label>
                        <select class="form-control" name="position">
                    
                          <option>left</option>
                          <option>right</option>
                        </select>
                        <div class="mt-4 btn btn-primary generate-link">Generate</div>
                    </div>
                  `)

                } else {

                  if (rc == "U1") {

                    $(recruit).customHtml(`

                      <div class="">
                          <label class="my-2">${rc} Position</label>
                          <select class="form-control" name="position">
                         
                            <option>left</option>
                            <option>right</option>
                          </select>
                          <div class="mt-4 btn btn-primary generate-link">Generate</div>
                      </div>
                    `)

                  }


                }



              }

              $(".generate-mlink").click(() => {

                  phxApp_.api("get_merchant_share_link", {
                      username: phxApp_.user.username,
                      position: $("select[name='mposition']").val()
                  }, null, (code) => {




                      phxApp_.modal({
                          autoClose: false,
                          header: 'Share Link',
                          selector: "#mySubModal",
                          content: `

                <label class="my-2">Generated</label>
                <input class="form-control" name="link"></input>
                <div class="mt-4 btn btn-primary copy-link">Copy</div>




              `
                      })

                      $("input[name='link']").val(code.link)
                      $(".copy-link").click(() => {
                          try {
                              navigator.clipboard.writeText(code.link);
                              console.log('Content copied to clipboard');
                              phxApp_.notify("Copied!")

                          } catch (E) {
                              phxApp_.notify("Cant copy", {
                                  type: "danger"
                              })
                          }
                      })

                  })

              })
              $(".generate-link").click((i) => {

               let  rc =   $(i.target).closest("recruit").attr("recruit")

               console.log("rc", rc)

                  phxApp_.api("get_share_link", {
                      recruit: rc,
                      username: phxApp_.user.username,
                      position: $("select[name='position']").val()
                  }, null, (code) => {




                      phxApp_.modal({
                          autoClose: false,
                          header: 'Share Link',
                          selector: "#mySubModal",
                          content: `

                <label class="my-2">Generated</label>
                <input class="form-control" name="link"></input>
                <div class="mt-4 btn btn-primary copy-link">Copy</div>




              `
                      })

                      $("input[name='link']").val(code.link)
                      $(".copy-link").click(() => {
                          try {
                              navigator.clipboard.writeText(code.link);
                              console.log('Content copied to clipboard');
                              phxApp_.notify("Copied!")

                          } catch (E) {
                              phxApp_.notify("Cant copy", {
                                  type: "danger"
                              })
                          }
                      })

                  })

              })
          })

      },
      choosePayment() {



          var razerList = phxApp.api("razer_list", {}),
              channels =
              Object.keys(razerList),
              sections = [];



          channels.forEach((channel, i) => {
              var subSections = []

              razerList[channel].forEach((child, ii) => {

                  var div = `

          <div class="py-1 col-6 col-lg-4 use-channel" aria-channel-label='` + child.channel_map.direct.request + `' >
            <img class="w-100 m-2 m-lg-0" src="` + child.logo_url_120x43 + `"></img>
          </div>
          `
                  if (child.currency.includes("MYR")) {

                      if (child.status == 1) {

                          if (child.channel_map.direct.request != "") {

                              subSections.push(div)
                          }
                      }
                  }
              })


              sections.push(`

          <div class="row mt-2 pb-1 border-success border-bottom">
         
          ` + subSections.join("") + `
          </div>


          `)

          })

          $("choosePayment").html(`
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
                      ` + sections.join("") + `
                      </section>
             
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
      `)




          $(".use-channel").click(function() {
              var channel = $(this).attr("aria-channel-label")
              $(".use-channel").removeClass("border border-primary rounded")
              $(this).addClass("border border-primary rounded")
              console.info("use channel: " + channel)
              $("input[name='user[payment][channel]']").val(channel)


              var p = $(this).html()
              $("#chosen-payment").html(p)
              $('#myPaymentModal').modal('hide')
          })



      },
      metamask_wallet() {
        $("metamask_wallet").each(async (i, v) => {
          $(v).customHtml(`
           
              <div class="my-4 mx-2">
                <div class="fs-5">MetaMask Wallet</div>
                <div id="wallet-info" class="mt-3">
                  <button id="connect-wallet-btn" class="btn btn-primary">Connect MetaMask</button>
                  <div id="wallet-address" class="mt-3 d-none">
                    <label class="form-label">Wallet Address:</label>
                    <div class="input-group">
                      <input type="text" class="form-control" id="address-display" readonly>
                      <button class="btn btn-outline-secondary" id="copy-address" type="button">
                        <i class="bi bi-clipboard"></i> Copy
                      </button>
                    </div>
                  </div>
                  <div id="wallet-error" class="alert alert-danger mt-3 d-none"></div>
                </div>
              </div>
           
          `)

          // Connect wallet button handler
          $("#connect-wallet-btn").click(async function() {
            try {
              // Check if MetaMask is installed
              if (typeof window.ethereum === 'undefined') {
                $("#wallet-error").text("MetaMask is not installed. Please install MetaMask extension.").removeClass("d-none");
                return;
              }

              $(this).prop('disabled', true).text('Connecting...');
              $("#wallet-error").addClass("d-none");

              // Request account access
              const provider = new ethers.BrowserProvider(window.ethereum);
              const accounts = await provider.send("eth_requestAccounts", []);
              
              if (accounts.length > 0) {
                const address = accounts[0];
                
                // Display the wallet address
                $("#address-display").val(address);
                $("#wallet-address").removeClass("d-none");
                $(this).addClass("d-none");
                
                console.log("Connected wallet address:", address);
              }
            } catch (error) {
              console.error("Error connecting to MetaMask:", error);
              $("#wallet-error").text(`Error: ${error.message}`).removeClass("d-none");
              $(this).prop('disabled', false).text('Connect MetaMask');
            }
          });

          // Copy address button handler
          $("#copy-address").click(function() {
            const address = $("#address-display").val();
            navigator.clipboard.writeText(address).then(() => {
              const originalText = $(this).html();
              $(this).html('<i class="bi bi-check"></i> Copied!');
              setTimeout(() => {
                $(this).html(originalText);
              }, 2000);
            });
          });

          // Listen for account changes
          if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts) => {
              if (accounts.length > 0) {
                $("#address-display").val(accounts[0]);
                $("#wallet-address").removeClass("d-none");
                $("#connect-wallet-btn").addClass("d-none");
              } else {
                $("#wallet-address").addClass("d-none");
                $("#connect-wallet-btn").removeClass("d-none").prop('disabled', false).text('Connect MetaMask');
              }
            });
          }
        })
      },
      crypto_wallet_balance() {
        let transfers = [];
        $("crypto_wallet_balance").each((i, el) => {
            $(el).customHtml(`
              <div class="card">
                <div class="card-body d-flex flex-column gap-2">
                  <div class="d-flex justify-content-between align-items-center">
                    <h5 class="card-title m-0">Crypto Wallet</h5>
                    <button class="btn btn-sm btn-outline-primary" id="refresh-cw">Refresh</button>
                  </div>
                  <div id="cw-address" class="text-truncate text-secondary">Loading...</div>
                  <div class="d-flex align-items-end gap-2">
                    <div class="display-6 format-int" id="cw-balance">-</div>
                    <small class="text-muted" id="cw-symbol">tokens</small>
                  </div>
                </div>
              </div>
              <div class="card mt-4">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="card-title m-0">Recent Transfers</h6>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-sm align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Time</th>
                          <th scope="col">From</th>
                          <th scope="col">To</th>
                          <th scope="col" class="text-end">Amount</th>
                          <th scope="col">Tx</th>
                        </tr>
                      </thead>
                      <tbody id="cw-transfers-body">
                        <tr>
                          <td colspan="5" class="text-center text-muted">No transfers</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            `)

            

            function formatTokenAmount(valueStr, decimals) {
                if (!valueStr) return "0";
                var ds = typeof decimals === "number" ? decimals : parseInt(decimals || "18", 10);
                var v = (valueStr + "").replace(/\D/g, "");
                if (v.length === 0) return "0";
                if (v.length <= ds) {
                    var padded = ("0".repeat(ds + 1) + v).slice(-(ds + 1));
                    var whole = padded.slice(0, padded.length - ds);
                    var frac = padded.slice(-ds).replace(/0+$/, "");
                    return frac ? whole + "." + frac.slice(0, 6) : whole;
                }
                var wholePart = v.slice(0, v.length - ds);
                var fracPart = v.slice(v.length - ds).replace(/0+$/, "");
                // thousands separators for whole part
                wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return fracPart ? wholePart + "." + fracPart.slice(0, 6) : wholePart;
            }

            function formatAddress(addr) {
                if (!addr) return "-";
                var a = addr + "";
                if (a.length <= 10) return a;
                return a.slice(0, 6) + "…" + a.slice(-4);
            }

            function formatTime(ts) {
                if (!ts) return "-";
                var n = parseInt(ts, 10);
                if (!isFinite(n)) return "-";
                var d = new Date(n * 1000);
                return d.toLocaleString();
            }

            function renderTransfers() {
                var $tbody = $("#cw-transfers-body");
                if (!Array.isArray(transfers) || transfers.length === 0) {
                    $tbody.html('<tr><td colspan="5" class="text-center text-muted">No transfers</td></tr>');
                    return;
                }
                var rows = transfers.slice(0, 20).map(function(t){
                    var amount = formatTokenAmount(t.value, parseInt(t.tokenDecimal || "18", 10));
                    var symbol = t.tokenSymbol || "";
                    var time = formatTime(t.timeStamp);
                    var from = formatAddress(t.from);
                    var to = formatAddress(t.to);
                    var tx = t.hash ? ('<a href="https://polygonscan.com/tx/' + t.hash + '" target="_blank" rel="noopener">' + formatAddress(t.hash) + '</a>') : "-";
                    return '<tr>' +
                           '<td>' + time + '</td>' +
                           '<td class="font-monospace">' + from + '</td>' +
                           '<td class="font-monospace">' + to + '</td>' +
                           '<td class="text-end">' + amount + (symbol ? (' ' + symbol) : '') + '</td>' +
                           '<td class="font-monospace">' + tx + '</td>' +
                           '</tr>';
                }).join("");
                $tbody.html(rows);
            }

            function loadBalance() {
                var res = phxApp_.api("crypto_wallet_balance", { token: phxApp_.user && phxApp_.user.token })
                if (res && res.status == "error") {
                    $("#cw-address").html(res.reason || "Error")
                    $("#cw-balance").html("-")
                    return
                }
                if (res) {
                    $("#cw-address").html(res.address)
                    $("#cw-balance").html(res.formatted)
                    $("#cw-symbol").html("tokens")
                    ColumnFormater.formatDate();
                    transfers = res.transfers || []
                    renderTransfers()
                }
            }

            loadBalance()
            $(document).off("click", "#refresh-cw").on("click", "#refresh-cw", function(){
                loadBalance()
            })
        })
    },
    setSecondPassword(secondPassword) {
      var onSuccess = (typeof secondPassword === 'function') ? secondPassword : null
      var header = "Set Second Password"
      var content = `
        <div class="row g-2">
          <div class="col-12">
            <label class="form-label">Current Second Password <span class="text-muted small">(leave blank if never set)</span></label>
            <input type="password" class="form-control" id="old-second-password" placeholder="Current second password" />
          </div>
          <div class="col-12">
            <label class="form-label">New Second Password</label>
            <input type="password" class="form-control" id="new-second-password" placeholder="Enter new second password" />
          </div>
          <div class="col-12">
            <label class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="confirm-second-password" placeholder="Confirm second password" />
          </div>
          <div class="col-12 d-flex gap-2">
            <button class="btn btn-primary" id="btn-do-set-second">Save</button>
            <button class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          </div>
          <div class="col-12" id="set-second-res"></div>
        </div>
      `
      phxApp.modal({ selector: "#myModal", autoClose: false, header: header, content: content })

      $(document).off("click", "#btn-do-set-second").on("click", "#btn-do-set-second", function(){
        var oldp = $("#old-second-password").val() || ""
        var np = $("#new-second-password").val() || ""
        var cp = $("#confirm-second-password").val() || ""
        if (np.trim() === "" || cp.trim() === "") {
          $("#set-second-res").html(`<div class='text-danger'>Please fill new and confirm fields</div>`)
          return
        }
        if (np !== cp) {
          $("#set-second-res").html(`<div class='text-danger'>Passwords do not match</div>`)
          return
        }
        $("#set-second-res").html(`<div class='text-muted'>Saving...</div>`)
        var payload = { token: phxApp.user && phxApp.user.token, second_password: np }
        if (oldp.trim() !== "") payload.old_password = oldp
        phxApp_.post('set_second_password', payload, null, function(rr){
          if (rr && rr.status === 'ok') {
            $("#set-second-res").html(`<div class='text-success'>Saved</div>`) 
            try { phxApp_.toast && phxApp_.toast({ content: "Second password saved" }) } catch(_){ }
            setTimeout(function(){ $("#myModal").modal("hide"); if (onSuccess) onSuccess() }, 200)
          } else {
            $("#set-second-res").html(`<div class='text-danger'>Failed to save</div>`) 
          }
        })
      })
    },
      crypto_wallet() {
          $("crypto_wallet").each((i, v) => {
              var wallet = phxApp.api("crypto_wallet", { token: phxApp.user.token })
              var assetsCfg = phxApp.api("crypto_assets", { token: phxApp.user.token })

              function shortAddr(addr){
                  if(!addr) return ""
                  var a = String(addr)
                  if (a.length <= 10) return a
                  return a.substring(0,6)+"..."+a.substring(a.length-4)
              }

              // Fetch native POL for display on network row
              var polInfo = phxApp.api("crypto_native_balance", { token: phxApp.user.token })
              var polDisplay = (polInfo && !polInfo.status) ? Number(polInfo.formatted||0).toFixed(6) : "0"

              function iconFor(sym){
                  var m = {
                      POL: "https://e8b864cf8d55fbd854f43ae53b6c824c.ipfscdn.io/ipfs/Qmd58rKLnBfteouAcmdjQ1HzDvRLSLjMbHjuXRytsKwAkD",
                      USDT: "https://polygonscan.com/token/images/tether_32.png",
                      USDC: "https://polygonscan.com/token/images/centre-usdc_32.png",
                      KTDFI: "https://ipfs.io/ipfs/QmSLo5e3PSBWgF3wysabPzsBjoRLngrFoVNrGwgL3vm2Zn/KTDFI_600x600.png",
                      NETSPH: "https://ipfs.io/ipfs/QmSLo5e3PSBWgF3wysabPzsBjoRLngrFoVNrGwgL3vm2Zn/KTDFI_600x600.png"
                  }
                  return m[sym] || m.POL
              }

              function getTokenContract(sym){
                  var arr = (assetsCfg.assets || [])
                  var it = arr.filter(function(a){ return a && a.symbol == sym })[0]
                  return it && it.contract
              }

              function updateNetworkRow(sym){
                  if (sym === 'POL') {
                      $("#cw-network").html(
                        '<img src="'+iconFor('POL')+'" style="height:24px;width:24px;"/>'+
                        '<span class="ms-2">POL</span>'+
                        '<span class="ms-2 text-white">'+polDisplay+' POL</span>'+
                        '<svg width="16" height="16" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-left:auto;"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
                      )
                      return
                  }
                  var c = getTokenContract(sym)
                  var display = '0.000000'
                  if (c) {
                      var r = phxApp.api('crypto_wallet_balance', { token: phxApp.user.token, token_address: c })
                      if (r && !r.status) display = Number(r.formatted || 0).toFixed(6)
                  }
                  $("#cw-network").html(
                    '<img src="'+iconFor(sym)+'" style="height:24px;width:24px;"/>'+
                    '<span class="ms-2">'+sym+'</span>'+
                    '<span class="ms-2 text-white">'+display+' '+sym+'</span>'+
                    '<svg width="16" height="16" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="margin-left:auto;"><path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>'
                  )
              }

              $("crypto_wallet").html(`
                <div class="card" style="max-width:400px;margin:0 auto;">
                  <div class="card-body">
                    <div class="d-flex flex-column">
                      <div style="height:8px;"></div>
                      <div class="d-flex align-items-center gap-3" style="padding: 12px 0;">
                        <div style="height:48px; width:48px; position:relative;">
                          <div style="border-radius:100%; height:48px; width:48px; overflow:hidden;">
                            <div style="background-image: radial-gradient(at left bottom, rgb(103,232,249), rgb(14,116,144)); height:64px; width:64px;"></div>
                          </div>
                          <div style="position:absolute; right:-2px; bottom:-2px;">
                            <div style="display:flex; place-items:center; border:1px solid rgb(254,254,32); border-radius:100%; padding:4px; background: rgb(30,29,89);">
                              <svg fill="none" height="12" viewBox="0 0 16 16" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M13.3335 2.6665H2.66683C1.93045 2.6665 1.3335 3.26346 1.3335 3.99984V11.9998C1.3335 12.7362 1.93045 13.3332 2.66683 13.3332H13.3335C14.0699 13.3332 14.6668 12.7362 14.6668 11.9998V3.99984C14.6668 3.26346 14.0699 2.6665 13.3335 2.6665Z" stroke="hsl(0, 100%, 60%)" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.6668 4.6665L8.68683 8.4665C8.48101 8.59545 8.24304 8.66384 8.00016 8.66384C7.75728 8.66384 7.51931 8.59545 7.3135 8.4665L1.3335 4.6665" stroke="hsl(0, 100%, 60%)" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </div>
                          </div>
                        </div>
                        <div class="d-flex flex-column gap-1">
                          <div class="d-flex align-items-center gap-2">
                            <span class="fw-semibold">${shortAddr(wallet.address)}</span>
                            <button class="btn btn-sm btn-outline-secondary" id="cw-copy" title="Copy">
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </button>
                          </div>
                          <span class="text-muted small">${phxApp.user && phxApp.user.email ? phxApp.user.email : ""}</span>
                        </div>
                      </div>

                      <div class="d-flex gap-2" style="padding: 0 8px 8px 8px;">
                        <button class="btn btn-outline-primary flex-fill" id="cw-send">Send</button>
                        <button class="btn btn-outline-primary flex-fill" id="cw-receive">Receive</button>
                      </div>

                      <div class="mb-2" style="padding: 0 8px;">
                        <button class="btn btn-light w-100 d-flex align-items-center" id="cw-network"></button>
                      </div>

                      <div style="padding: 0 8px;">
                        <div class="list-group">
                          <button class="list-group-item list-group-item-action d-flex align-items-center" id="cw-transactions">
                            <span>Transactions</span>
                          </button>
                          <button class="list-group-item list-group-item-action d-flex align-items-center" id="cw-assets">
                            <span>View Assets</span>
                          </button>
                      <button class="list-group-item list-group-item-action d-flex align-items-center" id="cw-second-password">
                        <span>Set / Change Second Password</span>
                      </button>
                          
                        </div>
                      </div>

                      <div style="height: 12px;"></div>
                      <div style="padding: 0 8px;">
                        <button class="btn btn-outline-danger w-100" id="cw-disconnect">Disconnect Wallet</button>
                      </div>
                    </div>
                  </div>
                </div>
              `)

              $(document).off("click", "#cw-copy").on("click", "#cw-copy", function(){
                  phxApp.copyToClipboard(wallet.address)
              })

              // Receive modal
              $(document).off("click", "#cw-receive").on("click", "#cw-receive", function(){
                  phxApp.modal({
                      selector: "#mySubModal",
                      autoClose: false,
                      header: "Receive",
                      content: `
                        <div class="d-flex flex-column gap-2">
                          <div>Share this address to receive assets:</div>
                          <div class="fw-bold">${wallet.address}</div>
                          <div class="btn btn-outline-primary" id="cw-copy2">Copy</div>
                        </div>
                      `
                  })
                  $(document).off("click", "#cw-copy2").on("click", "#cw-copy2", function(){
                      phxApp.copyToClipboard(wallet.address)
                  })
              })



              function performSendAction(){
                var sym = $("#send-asset").val(); try { localStorage.setItem('current_sym', sym) } catch(_){}
                var to = $("#send-to").val()
                var amt = $("#send-amt").val()
                if (sym === 'POL') {
                  $("#send-res").html(`<div class='text-muted'>Sending native POL...</div>`)
                  phxApp_.toast({
                    content: "Sending native POL..."
                  })
                  phxApp_.post('crypto_send_native', { token: phxApp.user && phxApp.user.token, to: to, amount: amt }, null, function(r){
                    if (r && r.status === 'ok') $("#send-res").html(`<div class='text-success'>Sent. Tx: ${r.tx_hash}</div>`); else $("#send-res").html(`<div class='text-danger'>Failed: ${r && r.reason || 'unknown'}</div>`)
                  })
                  return
                }
                var contract = (assetsCfg.assets||[]).filter(a=>a.symbol==sym)[0]?.contract
                if (!contract) { $("#send-res").html(`<div class='text-danger'>Missing contract address</div>`); return }
                $("#send-res").html(`<div class='text-muted'>Sending ${sym}...</div>`)
                phxApp_.post('crypto_send_erc20', { token: phxApp.user && phxApp.user.token, contract: contract, to: to, amount: amt }, null, function(r){
                  if (r && r.status === 'ok') {
                    $("#send-res").html(`<div class='text-success'>Sent. Tx: ${r.tx_hash}</div>`);
                    phxApp_.notify("Sent. Tx: " + r.tx_hash, {
                      type: "success",
                      header: "Sent"
                    })
                  } else {
                    $("#send-res").html(`<div class='text-danger'>Failed: ${r && r.reason || 'unknown'}</div>`);
                    phxApp_.toast({
                      content: "Failed: " + (r && r.reason || 'unknown')
                    })
                  }
                })

              }


              // Send modal (native + ERC-20 simple transfer)
              $(document).off("click", "#cw-send").on("click", "#cw-send", function(){
                  var currentSym = (function(){ try { return localStorage.getItem('current_sym') } catch(_) { return null } })() || 'NETSPH'
                  phxApp.modal({
                      selector: "#mySubModal",
                      autoClose: false,
                      header: "Send",
                      content: `
                        <div class="row g-2">
                          <div class="col-12">
                            <label class="form-label">Asset</label>
                            <select class="form-select" id="send-asset">
                              <option value="NETSPH" ${currentSym==='NETSPH'?'selected':''}>NETSPH</option>
                              <option value="USDT" ${currentSym==='USDT'?'selected':''}>USDT</option>
                              <option value="POL" ${currentSym==='POL'?'selected':''}>POL</option>
                            </select>
                          </div>
                          <div class="col-12">
                            <label class="form-label">To Address</label>
                            <input class="form-control" id="send-to" placeholder="0x..." />
                          </div>
                          <div class="col-12">
                            <label class="form-label">Amount</label>
                            <input type="number" step="0.000001" class="form-control" id="send-amt" placeholder="0.0" />
                          </div>
                          <div class="col-12">
                            <button class="btn btn-primary" id="btn-do-send">Send</button>
                          </div>
                          <div class="col-12" id="send-res"></div>
                        </div>
                      `
                  })




              })

              $(document).off("click", "#btn-do-send").on("click", "#btn-do-send", function(){
                $("#mySubModal").modal("hide")
                phxApp.modal({
                  selector: "#myModal",
                  autoClose: false,
                  header: "Confirm Send",
                  content: `
                    <div class="row g-2">
                      <div class="col-12">
                        <label class="form-label">Second Password</label>
                        <input type="password" class="form-control" id="second-password" placeholder="Enter your second password" />
                      </div>
                      <div class="col-12">
                        <button class="btn btn-primary" id="btn-do-confirm-send">Send</button>
                      </div>
                      <div class="col-12" id="send-res"></div>
                    </div>
                  `
                })
              })


              $(document).off("click", "#btn-do-confirm-send").on("click", "#btn-do-confirm-send", function(){
                var secondPassword = $("#second-password").val()

                phxApp.api("check_second_password", { token: phxApp.user && phxApp.user.token, second_password: secondPassword }, function(r){

                  if (r && r.reason === 'not_set') {
                    $("#myModal").modal("hide")
                    if (typeof commerceApp !== 'undefined' && commerceApp && typeof commerceApp.setSecondPassword === 'function') {
                      commerceApp.setSecondPassword(function(){ performSendAction() })
                    }
                  } else {
                    $("#send-res").html(`<div class='text-danger'>Invalid second password</div>`)
                  }

                }, function(r){
                  if (r && r.status === 'ok') {
                    $("#myModal").modal("hide")
                    performSendAction()
                  } else {
                   
                   
                  }
                })
                  
              })


              // Optional actions
              $(document).off("click", "#cw-transactions").on("click", "#cw-transactions", function(){
                  function short(a){ if(!a) return "-"; a = String(a); return a.length>10? a.slice(0,6)+"..."+a.slice(-4): a }
                  function fmtAmt(valueStr, decimals){
                      if (!valueStr) return "0";
                      var ds = typeof decimals === "number" ? decimals : parseInt(decimals || "18", 10);
                      var v = (valueStr + "").replace(/\D/g, "");
                      if (v.length === 0) return "0";
                      if (v.length <= ds) {
                          var padded = ("0".repeat(ds + 1) + v).slice(-(ds + 1));
                          var whole = padded.slice(0, padded.length - ds);
                          var frac = padded.slice(-ds).replace(/0+$/, "");
                          return frac ? whole + "." + frac.slice(0, 6) : whole;
                      }
                      var wholePart = v.slice(0, v.length - ds);
                      var fracPart = v.slice(v.length - ds).replace(/0+$/, "");
                      wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return fracPart ? wholePart + "." + fracPart.slice(0, 6) : wholePart;
                  }
                  function fmtTime(ts){ if(!ts) return "-"; var n=parseInt(ts,10); if(!isFinite(n)) return "-"; return new Date(n*1000).toLocaleString() }

                  phxApp.modal({
                      selector: "#mySubModal",
                      autoClose: false,
                      header: "Transactions",
                      content: `
                        <div class="d-flex flex-column" style="max-width:400px;">
                          <div class="mb-2 d-flex align-items-center justify-content-center position-relative">
                            <h6 class="m-0">Transactions</h6>
                          </div>
                          <div class="border-top"></div>
                          <div style="padding: 8px 0; min-height: 250px; max-height: 370px; overflow:auto;" id="tx-list">
                            <div class="d-flex flex-column align-items-center justify-content-center text-muted" style="gap: 8px; min-height: 200px;">
                              <svg width="48" height="48" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                              <span>No Transactions</span>
                            </div>
                          </div>
                          <div class="border-top"></div>
                          <div class="pt-2">
                            <a href="https://polygonscan.com/address/${wallet.address}" target="_blank" rel="noopener" class="text-decoration-none">View on Explorer
                              <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                            </a>
                          </div>
                        </div>
                      `
                  })

                  

                  // Load transfers for selected ERC-20 asset based on current_sym (NETSPH/USDT)
                  var currentSym = (function(){ try { return localStorage.getItem('current_sym') } catch(_) { return null } })() || 'NETSPH'
                  var symbols = (currentSym === 'POL') ? [] : [currentSym]
                  var items = []
                  symbols.forEach(function(sym){
                      var contract = (assetsCfg.assets||[]).filter(function(a){ return a.symbol==sym })[0]?.contract
                      if (!contract) return
                      var r = phxApp.api("crypto_wallet_balance", { token: phxApp.user.token, token_address: contract })
                      if (r && !r.status && Array.isArray(r.transfers)) {
                          items = items.concat(r.transfers)
                      }
                  })
                  if (currentSym === 'POL') {
                      var nat = phxApp.api("crypto_native_transfers", { token: phxApp.user && phxApp.user.token })
                      if (nat && !nat.status && Array.isArray(nat.transfers)) {
                          items = items.concat(nat.transfers.map(function(t){
                              return { hash: t.hash, from: t.from, to: t.to, value: t.value, timeStamp: t.timeStamp, tokenSymbol: 'POL', tokenDecimal: '18' }
                          }))
                      }
                  }
                  // Sort desc by timestamp
                  items.sort(function(a,b){ return parseInt(b.timeStamp||"0",10) - parseInt(a.timeStamp||"0",10) })

                  var $list = $("#tx-list")
                  if (!items.length) return

                  var html = items.slice(0,50).map(function(t){
                      var sym = t.tokenSymbol || ""
                      var dec = parseInt(t.tokenDecimal || "18", 10)
                      var amt = fmtAmt(t.value, dec)
                      var from = short(t.from)
                      var to = short(t.to)
                      var ts = fmtTime(t.timeStamp)
                      var link = t.hash ? ('https://polygonscan.com/tx/' + t.hash) : '#'
                      return `
                        <div class="d-flex flex-column border rounded p-2 mb-2" style="gap:4px;">
                          <div class="d-flex align-items-center">
                            <span class="text-muted small">${ts}</span>
                            <span class="ms-auto fw-semibold">${amt} ${sym}</span>
                          </div>
                          <div class="d-flex align-items-center small">
                            <span class="font-monospace">${from}</span>
                            <span class="mx-1">→</span>
                            <span class="font-monospace">${to}</span>
                          </div>
                          <div>
                            <a href="${link}" target="_blank" rel="noopener" class="small">View Tx</a>
                          </div>
                        </div>
                      `
                  }).join("")
                  $list.html(html)
              })


            function showAssetModal(){
                function iconFor(sym){
                    var m = {
                        POL: "https://e8b864cf8d55fbd854f43ae53b6c824c.ipfscdn.io/ipfs/Qmd58rKLnBfteouAcmdjQ1HzDvRLSLjMbHjuXRytsKwAkD",
                        USDT: "https://polygonscan.com/token/images/tether_32.png",
                        USDC: "https://polygonscan.com/token/images/centre-usdc_32.png",
                        KTDFI: "https://ipfs.io/ipfs/QmSLo5e3PSBWgF3wysabPzsBjoRLngrFoVNrGwgL3vm2Zn/KTDFI_600x600.png"
                    }
                    return m[sym] || m.POL
                }
                function row(sym, amount){
                    return `
                      <div class="d-flex align-items-center" style="gap:12px; padding:12px;">
                        <div style="display:inline-flex; place-items:center; position:relative; flex-shrink:0;">
                          <img src="${iconFor(sym)}" style="height:32px;width:32px;object-fit:contain;"/>
                        </div>
                        <div class="d-flex flex-column" style="gap:6px;">
                          <span class="fw-semibold">${sym}</span>
                          <span class="text-muted">${amount} ${sym}</span>
                        </div>
                      </div>
                    `
                }

                phxApp.modal({
                    selector: "#mySubModal",
                    autoClose: false,
                    header: "View Assets (Tokens)",
                    content: `
                      <div class="d-flex flex-column" style="max-width:400px;">
                      
                        <div style="height:12px;"></div>
                        <div id="assets-scroll" style="max-height:300px; overflow:auto;">
                          <div id="assets-list" class="d-flex flex-column"></div>
                        </div>
                        <div style="height:24px;"></div>
                      </div>
                    `
                })

                

                var listHtml = []
                // Native POL
                var pol = phxApp.api("crypto_native_balance", { token: phxApp.user.token })
                var polAmt = (pol && !pol.status) ? Number(pol.formatted||0).toFixed(6) : "0"
                listHtml.push(row("POL", polAmt))

                // ERC-20 balances from configured assets
                var assets = (assetsCfg.assets || [])
                assets.forEach(function(a){
                    if (!a || !a.symbol || !a.contract) return
                    var r = phxApp.api("crypto_wallet_balance", { token: phxApp.user.token, token_address: a.contract })
                    if (r && !r.status) {
                        var amt = Number(r.formatted || 0).toFixed(6)
                        listHtml.push(row(a.symbol, amt))
                    }
                })

                if (!listHtml.length) {
                    listHtml.push('<div class="text-center text-white py-4">No assets</div>')
                }
                $("#assets-list").html(listHtml.join(""))

                $(document).off('click', '#assets-list .d-flex.align-items-center').on('click', '#assets-list .d-flex.align-items-center', function(){
                    var sym = $(this).find('span.fw-semibold').text() || ''
                    sym = sym.trim().split(/\s+/)[0]
                    if (sym) {
                        try { localStorage.setItem('current_sym', sym) } catch(_){}
                        updateNetworkRow(sym)
                    }
                    $("#mySubModal").modal('hide')
                })
            }
              $(document).off("click", "#cw-assets").on("click", "#cw-assets", () => showAssetModal())
              $(document).off("click", "#cw-second-password").on("click", "#cw-second-password", function(){
                  if (phxApp && typeof phxApp.setSecondPassword === 'function') {
                    phxApp.setSecondPassword()
                  } else if (typeof commerceApp !== 'undefined' && commerceApp && typeof commerceApp.components.setSecondPassword === 'function') {
                    commerceApp.components.setSecondPassword()
                  } else {
                    phxApp.modal({ selector: "#myModal", autoClose: false, header: "Set Second Password", content: `<div class='text-muted'>Please try again.</div>` })
                  }
              })
              $(document).off("click", "#cw-network").on("click", "#cw-network", () => showAssetModal())
              $(document).off("click", "#cw-disconnect").on("click", "#cw-disconnect", function(){
                  phxApp.notify("Disconnect not implemented in this environment.", { type: "warning" })
              })

              // Default selected token: NETSPH
              updateNetworkRow('NETSPH')
          })
      },
      async claimFromOwner(owner, amount){

        // commerceApp.components.claimFromOwner("0xB33499F76983110D5d74b8b0C551F204815c4BD2", 100.00)
        try {
          if (!window.ethereum) {
            phxApp_.modal({
              selector: "#mySubModal",
              autoClose: false,
              header: "Install MetaMask",
              content: `
                <div class="p-2">
                  <p>To claim tokens, please install a Web3 wallet (MetaMask).</p>
                  <a class="btn btn-primary" target="_blank" rel="noopener" href="https://metamask.io/download/">Install MetaMask</a>
                </div>
              `
            })
            return { status: 'error', reason: 'no_provider' }
          }

          // request account access if needed
          try {
            if (window.ethereum.request) {
              await window.ethereum.request({ method: 'eth_requestAccounts' })
            }
          } catch (e) {
            phxApp_.notify("Wallet connection rejected.", { type: "danger" })
            return { status: 'error', reason: 'wallet_rejected' }
          }

          const tokenAddress = "0xa17c6fc7d9ecef353ceb3132ddd619037d134125";
          const abi = [
            "function transferFrom(address from, address to, uint256 amount) returns (bool)",
            "function allowance(address owner, address spender) view returns (uint256)",
            "function balanceOf(address account) view returns (uint256)",
            "function decimals() view returns (uint8)"
          ];

          const provider = new ethers.BrowserProvider(window.ethereum);
          // ensure correct network (configured chain)
          try {
            const cfg = (typeof phxApp !== 'undefined' && phxApp.api) ? phxApp.api("chain_config", {}) : (typeof phxApp_ !== 'undefined' && phxApp_.api ? phxApp_.api("chain_config", {}) : null)
            const CHAIN_ID = (cfg && cfg.chain_id) ? Number(cfg.chain_id) : 137
            const CHAIN_ID_HEX = (cfg && cfg.chain_id_hex) ? cfg.chain_id_hex : '0x89'
            const isAmoy = CHAIN_ID === 80002
            const chainMeta = {
              chainId: CHAIN_ID_HEX,
              chainName: isAmoy ? 'Polygon Amoy' : 'Polygon Mainnet',
              nativeCurrency: { name: 'POL', symbol: 'POL', decimals: 18 },
              rpcUrls: [ isAmoy ? 'https://rpc-amoy.polygon.technology' : 'https://polygon-rpc.com/' ],
              blockExplorerUrls: [ isAmoy ? 'https://amoy.polygonscan.com' : 'https://polygonscan.com' ]
            }
            const net = await provider.getNetwork()
            if (net && net.chainId && Number(net.chainId) !== CHAIN_ID) {
              try {
                await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CHAIN_ID_HEX }] })
              } catch (switchErr) {
                // attempt to add chain if missing
                if (switchErr && switchErr.code === 4902) {
                  try {
                    await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [chainMeta] })
                  } catch (_) {}
                }
              }
            }
          } catch (_) {}

          const signer = await provider.getSigner();
          const contract = new ethers.Contract(tokenAddress, abi, signer);

          let decimals = 18;
          try { decimals = await contract.decimals() } catch (_) {}
          const amountInWei = ethers.parseUnits(amount.toString(), Number(decimals));

          // pre-check owner balance and allowance
          const spender = await signer.getAddress()
          const [ownerBal, allowance] = await Promise.all([
            contract.balanceOf(owner),
            contract.allowance(owner, spender)
          ])

          if (ownerBal < amountInWei) {
            phxApp_.notify("Owner balance is insufficient for this amount.", { type: "danger" })
            return { status: 'error', reason: 'insufficient_owner_balance' }
          }

          if (allowance < amountInWei) {
            phxApp_.modal({
              selector: "#mySubModal",
              autoClose: false,
              header: "Approval required",
              content: `
                <div class="p-2">
                  <p>The token owner must approve your address to spend ${amount} tokens before claiming.</p>
                  <ol class="mb-2">
                    <li>Ask owner to run approve(your address, amount) in their wallet;</li>
                    <li>Or contact admin to approve on-chain for this token.</li>
                  </ol>
                </div>
              `
            })
            return { status: 'error', reason: 'insufficient_allowance' }
          }

          const tx = await contract.transferFrom(owner, await signer.getAddress(), amountInWei);
          await tx.wait();
          return { status: 'ok', txHash: tx.hash };
        } catch (err) {
          console.error(err)
          phxApp_.notify("Claim failed. " + (err && err.message ? err.message : ''), { type: "danger" })
          return { status: 'error', reason: 'tx_failed' }
        }
      },
      topup() {
          function payData(params) {
              var msg, rowData = phxApp.rowData(params)
              console.log(rowData)
              if (rowData.payment != null) {
                  if (rowData.payment.payment_method == "nowpayments") {


                      msg = ''

                      if (rowData.is_approved == false) {
                          msg = `<p>You will be redirected to pay this topup.</p>
            <a target="_blank" href="` + rowData.payment.payment_url + `" class="btn btn-primary">Pay
            </a>`
                      }


                      phxApp.modal({
                          autoClose: false,
                          selector: "#mySubModal",
                          header: "NowPayments",
                          content: `

            ` + msg + `
            <div class="btn btn-primary check">Recheck
            </div>

            `
                      })

                      $(".check").click(() => {
                          phxApp.api("check_bill", {
                              id: rowData.payment.billplz_code
                          })
                      })

                  } else {
                      phxApp.modal({
                          selector: "#mySubModal",
                          header: "Details",
                          content: `

          <div class="btn btn-primary delete">Delete Request
            </div>


            `
                      })
                  }

              } else {

                  phxApp.modal({
                      selector: "#mySubModal",
                      header: "Details",
                      content: `

            <p>` + rowData.remarks + `</p>

            `
                  })
              }



              $(".delete").unbind()
              $(".delete").click(() => {
                  phxApp.api("delete_topup_request", {
                      id: rowData.id
                  }, null, (r) => {

                      $("#mySubModal").modal('hide')
                      if (r.status == "error") {
                          if (r.reason != "") {
                              phxApp.notify("Not Deleted! Reason: " + r.reason, {
                                  type: "danger"
                              })
                          }
                      } else {
                          phxApp.notify("Deleted!")
                          phxApp.navigateTo("/topup_register_point")
                      }
                  })
              })

          }
          $("topup").customHtml(`    
                <div class="card-body ">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3>Topup Transaction</h3>
                    <div class="btn btn-primary " id="new_topup">
                        <span class="d-flex align-items-center"><i class="fa fa-plus me-1"></i>Topup</span></div>
                    </div>
                    <div class="" id="tab2"></div>
                </div>
                    `)

          window.selectedBank = (bank) => {
              var valu = $("input[name='WalletTopup[bank]']").val(bank)
          }


          var sections = [];





          $("#new_topup").click(() => {

              phxApp.modal({
                  selector: "#mySubModal",
                  autoClose: false,
                  header: 'New Register Point Topup',
                  content: `
                        <div class="row ">
                            <form class="col-12 offset-lg-1 col-lg-10 with_mod row p-4" module="WalletTopup" 
                            id="WalletTopup">
                            

                            </form>

                        </div>
                    `
              })



              phxApp.createForm({
                      id: "0",
                      user_id: phxApp.user.id,
                      payment_method: "nowpayments"
                  },
                  null, ['id', {
                          label: 'amount',
                          alt_name: 'Amount (USDT-POLYGON)',
                          alt_class: "col-12"
                      }, {
                          label: 'remarks',
                          alt_name: 'Description',
                          alt_class: "col-12"
                      }, {
                          label: 'payment-placeholder',
                          alt_name: 'Choose Payment',
                          alt_class: "col-12",
                          placeholder: `


              <div id="payment-placeholder">
                <section class="py-4 razer-display">
                  <h3>Choose 1 of these methods</h3>
                ` + sections.join("") + `
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

          `
                      },

                      {
                          label: 'payment_method',
                          selection: [{
                              id: 'nowpayments',
                              name: 'NowPayments'
                          }, {
                              id: 'bank in slip',
                              name: 'BANK IN SLIP'
                          }],
                          alt_class: "d-none"
                      }, {
                          label: 'img_url',
                          upload: true,
                          alt_class: "d-none upload-display"
                      }, {
                          label: 'bank',
                          data: 'bank',
                          hidden: true
                      },
                      'user_id'

                  ],

                  (j) => {
                      console.info(j)
                      if (j.payment_method == "nowpayments") {


                          function postRedirect(url, data) {
                              // Create a form element
                              var form = $('<form>', {
                                  'method': 'POST',
                                  'action': url
                              });

                              // Append input elements for each data key-value pair to the form
                              $.each(data, function(key, value) {
                                  $('<input>', {
                                      'type': 'hidden',
                                      'name': key,
                                      'value': value
                                  }).appendTo(form);
                              });

                              // Append the form to the body and submit it
                              form.appendTo('body').submit();
                          }


                        //   postRedirect(j.payment.payment_url, JSON.parse(j.payment.webhook_details));
                          window.open(j.payment_url, '_blank');
                      } else {

                          phxApp.navigateTo("/topup_register_point")
                      }

                  }

              )


              $(document).on("click",".show-upload",() => {
                  $(".upload-display").removeClass("d-none")
                  $(".razer-display").addClass("d-none")
                  $("select[name='WalletTopup[payment_method]']").val('bank in slip')
              })
              $(document).on("click",".show-razer",() => {
                  $(".upload-display").addClass("d-none")
                  $(".razer-display").removeClass("d-none")
                  $("select[name='WalletTopup[payment_method]']").val('nowpayments')
              })


    


          })

          var customCols = null;
          var random_id = phxApp.makeid(4),
          wallet_topupSource = new phoenixModel({
              onDrawFn: () => {
                  setTimeout(() => {
                      phxApp.formatDate()
                  }, 200)
              },
              xcard: (params) => {
                  console.log(params)
                  var data = params

                  var font_class = "text-success"
                  if (data.amount < 0) {
                      font_class = "text-danger"
                  }
                  var status = `<span class="badge bg-warning">PENDING</span>`
                  if (data.is_approved) {
                      status = `<span class="badge bg-success">APPROVED</span>`
                  }
                  var card = `
       

        <div class="row border-1 border-top py-2">
          <div class="col-6 text-start text-sm">` + status + `</div>
         <div class="col-6 text-end text-sm">Amount (RP)</div>
        </div>
        <div class="row">
          <div class="col-6 text-start text-sm format_datetime">` + data.inserted_at + `</div>
     
         <div class="col-6 text-end "> <span class='format-integer'>` + data.amount + `</span></div>
        </div>

        `
                  return card
              },
              data: {
                  grid_class: "col-12 ",
                  dom: `
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
    `,
                  preloads: ["user", "payment"],
                  additional_join_statements: [{
                      user: "user"
                  }, ],
                  additional_search_queries: [
                      "a.user_id=" + phxApp.user.id
                  ],
              },
              columns: [

                  {
                      label: 'id',
                      data: 'id'
                  }, {
                      label: 'Date',
                      data: 'inserted_at',
                      formatDateTime: true,
                      offset: 0
                  },



                  {
                      customized: true,

                      label: 'Approved?',
                      data: 'is_approved',
                      xdata: {
                          formatFn: (d, index) => {
                              if (d.is_approved) {
                                  html = `<div  ><i class="fa fa-check text-success"></i><span  class="ms-2">Approved</span></div>`
                              } else {
                                  html = `<div  ><i class="fa fa-hourglass text-warning"></i><span class="ms-2">Pending</span></div>`

                              }
                              return html
                          }
                      }
                  },

                  {
                      label: "Payment",
                      data: "id",
                      showChild: true,
                      xdata: {
                          child: 'payment',
                          data: 'payment_method'
                      }
                  }, {
                      label: 'Amount',
                      data: 'amount',
                      className: "format-float"
                  }, {
                      label: 'Action',
                      data: 'id',
                      className: ""
                  }

              ],
              moduleName: "WalletTopup",
              link: "WalletTopup",
              customCols: customCols,
              buttons: [{
                  name: "Details",
                  iconName: "fa fa-info",
                  color: "btn-sm btn-outline-warning",
                  onClickFunction: payData,
                  fnParams: {

                  }
              }, ],
              tableSelector: "#" + random_id
          })
          wallet_topupSource.load(random_id, "#tab2")
      },
      country() {
          if (localStorage.getItem("region") != null) {


              var sel =
                  phxApp_.countries_.filter((v, i) => {
                      return v.name == localStorage.getItem("region")
                  })[0]


              phxApp_.chosen_country_id_ = sel

              $("country").customHtml(`


      <li class="nav-item">
        <a class="nav-link choose-region" href="javascript:void(0);" > <i class="fa fa-globe"></i>` + localStorage.getItem("region") + `</a>
      </li>

    `)

          } else {

              $("country").customHtml(`


      <li class="nav-item">
        <a class="nav-link choose-region" href="javascript:void(0);" > <i class="fa fa-globe"></i> MY</a>
      </li>

    `)

          }
          var countries = []


          phxApp_.countries_.forEach((v, i) => {
              countries.push(`
          <button type="button" aria-name="` + v.name + `" aria-country="` + v.id + `" class="btn btn-primary ">` + v.name + `</button>
        `)
          })
          $(".choose-region").click(() => {
              commerceApp_.emptyCart_()
              phxApp_.modal({
                  selector: "#mySubModal",
                  content: `
        <center>
          <div class="btn-group-vertical">
          ` + countries.join("") + `
          </div>
        </center>
      `,
                  header: "Choose region",
                  autoClose: false
              })
              $("[aria-country]").unbind()
              $("[aria-country]").click(function() {
                  var country_id = $(this).attr("aria-country"),
                      name = $(this).attr("aria-name")
                  phxApp_.chosen_country_id_ = country_id
                  phxApp_.notify("Chosen region: " + name)
                  localStorage.setItem("region", name)
                  setTimeout(() => {

                      $("#chosen-region").html(name)
                  }, 1000)
                  $("#mySubModal").modal('hide')

                  try {


                      var langPrefix = "v2";

                      function evalCountry(countryName) {
                          var prefix = "v2"

                          if (countryName == "Thailand") {
                              prefix = "th"
                          }
                          if (countryName == "Vietnam") {
                              prefix = "vn"
                          }
                          if (countryName == "China") {
                              prefix = "cn"
                          }

                          return prefix;
                      }

                      if (localStorage.region != null) {
                          langPrefix = evalCountry(localStorage.region)
                      }

                      translationRes = phxApp_.api("translation", {
                          lang: langPrefix
                      });
                  } catch (error) {
                      console.error("Error fetching translation:", error);
                  }

                  commerceApp_.components["country"]()
                  commerceApp_.components["products"]()
                  if ($("[name='user[pick_up_point_id]']").length > 0) {

                      commerceApp_.components["cartItems"]()
                  }



              })

          })

      },

      upgradeTarget() {
          var needInstalment = false,
              freebie = null,
              instalmentProduct;
          if ($("upgradeTarget").attr("instalment") != null) {
              console.log("ok")
              needInstalment = true
              commerceApp_.emptyCart_()
          }

          window.upgradeTarget
          if (window.upgradeTarget == null) {
              window.upgradeTarget = memberApp_.user.username
              $("input[name='user[upgrade]']").val(window.upgradeTarget)
          } else {
              $("input[name='user[upgrade]']").val(window.upgradeTarget)
          }
          $("upgradeTarget").customHtml(`<span>for: <span id="upgradeTarget">` + window.upgradeTarget + `</span> <a class="ms-4" href="javascript:void(0);" aria-upgrade=true> <i class="fa fa-edit"></i> Change</a> </span>`)

          $("[aria-upgrade]").click(() => {
              phxApp_.modal({
                  selector: "#mySubModal",
                  autoClose: false,
                  content: `
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" type="text" name='upgrade[username]'></input>
              <div class="form-text text-muted pv-info"></div>

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,
                  header: 'Change Upgrade User',
              })
              $(".checkUser").click(() => {


                  phxApp_.api("get_accumulated_sales", {
                          show_instalment: true,
                          parent_id: memberApp_.user.id,
                          show_rank: true,
                          username: $("[name='upgrade[username]']").val(),

                      }, () => {
                          window.upgradeTarget = memberApp_.user.username
                          $("input[name='user[upgrade]']").val(window.upgradeTarget)
                          $(".selectUser").addClass("disabled")

                      },
                      (res) => {
                          phxApp_.notify("User verified!")
                          $(".selectUser").removeClass("disabled")
                          $(".pv-info").customHtml(`Accumulated sales PV: ` + res[0] + ` | Rank: ` + res[1])

                          if (res[2].is_direct_downline) {
                              $(".to-upgrade").removeClass("disabled")
                          } else {


                              phxApp_.notify("User not direct downline!", {
                                  type: 'warning'
                              })

                              $("label[for='btnradio3']").click()
                              $(".to-upgrade").addClass("disabled")
                              if (res[4].outstanding_instalments != null) {
                                  if (res[4].outstanding_instalments.product.can_pay_by_drp) {
                                      $(".to-upgrade").removeClass("disabled")
                                  }
                              } else {

                              }
                          }
                          // please stick DRP
                          console.info(res[4].outstanding_instalments)
                          try {
                              if (res[4].outstanding_instalments != null) {


                                  $("input[name='user[shipping][fullname]']").val(res[4].outstanding_instalments.user.fullname)
                                  $("input[name='user[shipping][phone]']").val(res[4].outstanding_instalments.user.phone)
                                  $("input[name='user[instalment]']").val('Month no: ' + res[4].outstanding_instalments.month_no + '/' + res[4].outstanding_instalments.instalment.no_of_months)
                                  instalmentProduct = res[4].outstanding_instalments.product
                                  freebie = res[4].outstanding_instalments.member_instalment_product.product
                              }
                          } catch (e) {
                              console.error(e)
                          }
                      })


              })
              $(".selectUser").click(() => {
                  $("input[name='user[upgrade]']").val($("[name='upgrade[username]']").val())
                  phxApp_.notify("User selected!")

                  $("#mySubModal").modal('hide')
                  window.upgradeTarget = $("[name='upgrade[username]']").val()
                  $("#upgradeTarget").html($("[name='upgrade[username]']").val())
                  if (instalmentProduct != null) {

                      phxApp_.addItem(instalmentProduct.id)
                      if (freebie != null) {

                          phxApp_.addItem(freebie.id)
                      }

                  }
                  commerceApp_.components["cartItems"]()
                  console.info("need to check if member is direct sponsor")




              })
          })

      },
      upgradeTargetMerchant() {
          var needInstalment = false,
              freebie = null,
              instalmentProduct;
          if ($("upgradeTarget").attr("instalment") != null) {
              console.log("ok")
              needInstalment = true
              commerceApp_.emptyCart_()
          }

          window.upgradeTarget
          if (window.upgradeTarget == null) {
              window.upgradeTarget = memberApp_.user.username
              $("input[name='user[upgrade]']").val(window.upgradeTarget)
          } else {
              $("input[name='user[upgrade]']").val(window.upgradeTarget)
          }
          $("upgradeTargetMerchant").customHtml(`<span>for: <span id="upgradeTarget">` + window.upgradeTarget + `</span> <a class="ms-4" href="javascript:void(0);" aria-upgrade=true> <i class="fa fa-edit"></i> Change</a> </span>`)

          $("[aria-upgrade]").click(() => {
              phxApp_.modal({
                  selector: "#mySubModal",
                  autoClose: false,
                  content: `
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" type="text" name='upgrade[username]'></input>
              <div class="form-text text-muted pv-info"></div>

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,
                  header: 'Change Upgrade User',
              })
              $(".checkUser").click(() => {


                  phxApp_.api("get_accumulated_sales_merchant", {
                          show_instalment: true,
                          parent_id: memberApp_.user.id,
                          show_rank: true,
                          username: $("[name='upgrade[username]']").val(),

                      }, () => {
                          window.upgradeTarget = memberApp_.user.username
                          $("input[name='user[upgrade]']").val(window.upgradeTarget)
                          $(".selectUser").addClass("disabled")

                      },
                      (res) => {
                          phxApp_.notify("User verified!")
                          $(".selectUser").removeClass("disabled")
                          $(".pv-info").customHtml(`Accumulated sales PV: ` + res[0] + ` | Rank: ` + res[1])

                          if (res[2].is_direct_downline) {
                              $(".to-upgrade").removeClass("disabled")
                          } else {


                              phxApp_.notify("User not direct downline!", {
                                  type: 'warning'
                              })

                              $("label[for='btnradio3']").click()
                              $(".to-upgrade").addClass("disabled")
                              if (res[4].outstanding_instalments != null) {
                                  if (res[4].outstanding_instalments.product.can_pay_by_drp) {
                                      $(".to-upgrade").removeClass("disabled")
                                  }
                              } else {

                              }
                          }
                          // please stick DRP
                          console.info(res[4].outstanding_instalments)
                          try {
                              if (res[4].outstanding_instalments != null) {


                                  $("input[name='user[shipping][fullname]']").val(res[4].outstanding_instalments.user.fullname)
                                  $("input[name='user[shipping][phone]']").val(res[4].outstanding_instalments.user.phone)
                                  $("input[name='user[instalment]']").val('Month no: ' + res[4].outstanding_instalments.month_no + '/' + res[4].outstanding_instalments.instalment.no_of_months)
                                  instalmentProduct = res[4].outstanding_instalments.product
                                  freebie = res[4].outstanding_instalments.member_instalment_product.product
                              }
                          } catch (e) {
                              console.error(e)
                          }
                      })


              })
              $(".selectUser").click(() => {
                  $("input[name='user[upgrade]']").val($("[name='upgrade[username]']").val())
                  phxApp_.notify("User selected!")

                  $("#mySubModal").modal('hide')
                  window.upgradeTarget = $("[name='upgrade[username]']").val()
                  $("#upgradeTarget").html($("[name='upgrade[username]']").val())
                  if (instalmentProduct != null) {

                      phxApp_.addItem(instalmentProduct.id)
                      if (freebie != null) {

                          phxApp_.addItem(freebie.id)
                      }

                  }
                  commerceApp_.components["cartItems"]()
                  console.info("need to check if member is direct sponsor")




              })
          })

      },
      sponsorTarget() {

          window.sponsorTarget
          if (window.sponsorTarget == null) {
              window.sponsorTarget = memberApp_.user.username
          } else {}
          $("input[name='user[sponsor]']").val('')
          $("sponsorTarget").customHtml(`<span>for: <span id="sponsorTarget">` + window.sponsorTarget + `</span>
     <a class="ms-4" href="javascript:void(0);" aria-sponsor=true> <i class="fa fa-edit"></i> Change</a> </span>`)

          $("[aria-sponsor]").click(() => {
              phxApp_.modal({
                  selector: "#mySubModal",
                  autoClose: false,
                  content: `
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" value="` + memberApp_.user.username + `" type="text" name='sponsor[username]'></input>
            

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,
                  header: 'Change Sponsor User',
              })
              $(".checkUser").click(() => {


                  phxApp_.api("get_accumulated_sales", {
                          parent_id: memberApp_.user.id,
                          show_rank: true,
                          username: $("[name='sponsor[username]']").val(),

                      }, () => {
                          window.sponsorTarget = memberApp_.user.username
                          $("input[name='user[sponsor]']").val(window.sponsorTarget)
                          $(".selectUser").addClass("disabled")

                      },
                      (res) => {

                          $(".selectUser").removeClass("disabled")
                          $(".pv-info").customHtml(`Accumulated sales PV: ` + res[0] + ` | Rank: ` + res[1])

                          if (res[2].is_direct_downline) {
                              $(".to-upgrade").removeClass("disabled")
                          } else {
                              $("label[for='btnradio3']").click()
                              $(".to-upgrade").addClass("disabled")
                          }


                          if (res[3].is_downline) {
                              phxApp_.notify("User verified!")
                                  // $(".to-upgrade").removeClass("disabled")
                          } else {
                              if ($("input[name='sponsor[username]']").val() == memberApp_.user.username) {
                                  phxApp_.notify("User verified!")
                              } else {
                                  phxApp_.notify("Not downline!", {
                                      type: "warning"
                                  })
                                  $(".selectUser").addClass("disabled")
                              }
                          }



                      })


              })
              $(".selectUser").click(() => {
                  $("input[name='user[sponsor]']").val($("[name='sponsor[username]']").val())
                  $("input[name='view[sponsor]']").val($("[name='sponsor[username]']").val())
                  phxApp_.notify("User selected!")

                  $("#mySubModal").modal('hide')
                  window.sponsorTarget = $("[name='sponsor[username]']").val()
                  $("#sponsorTarget").html($("[name='sponsor[username]']").val())

                  commerceApp_.components["cartItems"]()
                  console.info("need to check if member is direct sponsor")




              })
          })

      },
      stockistTarget() {

          window.stockistTarget
          if (window.stockistTarget == null) {
              window.stockistTarget = memberApp_.user.username
          } else {}
          $("input[name='user[stockist_user_id]']").val('')
          $("stockistTarget").customHtml(`<span>for: <span id="stockistTarget">` + window.stockistTarget + `</span>
     <a class="ms-4" href="javascript:void(0);" aria-stockist=true> <i class="fa fa-edit"></i> Change</a> </span>`)

          $("[aria-stockist]").click(() => {
              phxApp_.modal({
                  selector: "#mySubModal",
                  autoClose: false,
                  content: `
        <div>
          <div class="form-group">
            <label>Username</label>
            <input class="my-2 form-control" value="` + memberApp_.user.username + `" type="text" name='sponsor[username]'></input>
            

            <button class="mt-4 btn btn-outline-primary checkUser">Check</button>
            <button class="mt-4 btn btn-primary disabled selectUser">Select this user</button>
          </div>
        </div>
        `,
                  header: 'Change Stockist User',
              })
              $(".checkUser").click(() => {


                  phxApp_.api("get_stockist", {
                          parent_id: memberApp_.user.id,
                          show_rank: true,
                          username: $("[name='sponsor[username]']").val(),

                      }, () => {
                          window.stockistTarget = memberApp_.user.username
                          $("input[name='user[stockist_user_id]']").val(null)

                          $(".selectUser").addClass("disabled")

                      },
                      (res) => {

                          $(".selectUser").removeClass("disabled")
                              // $(".pv-info").customHtml(`Accumulated sales PV: ` + res[0] + ` | Rank: ` + res[1])

                          if (res[1].is_stockist) {
                              window.stockistTargetData = res[2]
                              $("input[name='user[stockist_user_id]']").val(window.stockistTargetData.id)
                              phxApp_.notify("User verified!")

                          } else {
                              phxApp_.notify("Not stockist!", {
                                  type: "warning"
                              })
                              $(".selectUser").addClass("disabled")

                          }



                      })


              })
              $(".selectUser").click(() => {
                  $("input[name='user[stockist]']").val($("[name='sponsor[username]']").val())
                  $("input[name='view[stockist]']").val($("[name='sponsor[username]']").val())
                  phxApp_.notify("User selected!")

                  $("#mySubModal").modal('hide')
                  window.stockistTarget = $("[name='sponsor[username]']").val()
                  $("#stockistTarget").html($("[name='sponsor[username]']").val())

                  commerceApp_.components["cartItems"]()





              })
          })

      },


      salesItems() {


          var sale = phxApp_.api("get_sale", {
              id: pageParams.id
          })

          if (sale.status == "pending_payment") {
              if (sale.payment != null) {

                //   var res = phxApp_.api("check_bill", {
                //       id: sale.payment.billplz_code
                //   })

                //   if (res.paid == true) {
                //       phxApp_.notify("Payment updated!")
                //   }
              }
          }
          $("title").html("Order ID: " + sale.id)
          window.sale = sale
          var reg_dets,shipping, count = 0,
              list = [],
              total_pv = 0,
              subtotal = 0.0;
          total_pv = sale.sales_items.map((v, i) => {
              return (v.qty * v.item_pv)
          }).reduce((a, b) => {
              return a + b
          }, 0)

          subtotal = sale.sales_items.map((v, i) => {
              return (v.qty * v.item_price)
          }).reduce((a, b) => {
              return a + b
          }, 0)
          count = sale.sales_items.map((v, i) => {
              return v.qty
          }).reduce((a, b) => {
              return a + b
          }, 0)


         var shipping_fee = sale.shipping_fee || 0
         var  eligible_rank = this.evalRank(subtotal)
          try {

              reg_dets = JSON.parse(sale.registration_details)
          } catch (e) {
              console.error(e)
          }
          var is_merchant = false
          if (reg_dets.scope == "merchant_checkout") {
              total_pv = sale.total_point_value
              is_merchant = true
          }

          sale.sales_items.forEach((v, i) => {
              var img = '/images/placeholder.png';
              if (v.img_url != null) {

                  try {
                      img = v.img_url
                  } catch (e) {
                      img = '/images/placeholder.png'
                  }
              }

              var l2 = `  <span class="font-sm text-info "><span class="format-integer">` + (v.item_pv * v.qty) + `</span> PV</span>`
              if (is_merchant) {
                  l2 = ''
              }
              list.push(`

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
                                background-image: url('` + img + `');
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
                                background-image: url('` + img + `');
                                ">
                </div>
              </div>
              <div class="d-flex flex-column">
                <span>` + v.item_name + ` <small>(x` + v.qty + `)</small></span>
                <div>` + v.remarks + `</div>
              </div>
            </div>
            <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
              <div class="d-flex flex-column align-items-end">
                <span class="font-sm ">RP <span class="format-float">` + (v.item_price * v.qty).toFixed(2) + `</span></span>
              ` + l2 + `
              </div>
             
            </div>
          </div>

        
          `)


          })

          var tpv = 'Total PV'

          if (is_merchant) {
              tpv = 'RP Received'
          }


          var payment_info = `

             <div class="d-flex justify-content-between align-items-center">
                <span class="fs-4">Subtotal</span>
                <span class=" me-4">RP <span class="format-float">` + subtotal + `</span></span>
              </div>
             <div class="d-flex justify-content-between align-items-center">
                <span class="fs-4">Shipping</span>
                <span class=" me-4">RP <span class="format-float">` + shipping_fee + `</span></span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fs-5">` + tpv + `</span>
                <span class="text-info me-4"><span class="format-integer">` + total_pv + ` PV</span></span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-secondary">Eligible Rank</span>
                <span class="text-info me-4"><span class="format-integer">` + eligible_rank + `</span></span>
              </div>

    `

          try {
              shipping = reg_dets.user.shipping
              console.log("shippnig...")
              console.info(shipping)
              payment = sale.payment
          } catch (e) {
              console.error(e)
          }

          var drp_details = {};
          if (sale.payment != null) {

              if (sale.payment.payment_url != null) {
                  payment_info = `

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Subtotal</span>
                  <span class=" ">RP <span class="format-float">` + subtotal + `</span></span>
                </div>
               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Shipping</span>
                  <span class=" me-4">RP <span class="format-float">` + shipping_fee + `</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">` + tpv + `</span>
                  <span class="text-info "><span class="format-integer">` + total_pv + ` PV</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info "><span class="format-integer">` + eligible_rank + `</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Paid with</span>
                  <span class="text-primary "><span class="">` + (payment.payment_method.split("_").map((v, i) => {
                      return ColumnFormater.capitalize(v)

                  }).join(" ")) + `</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Payment Link</span>
                  <span class="text-primary "><a target="_blank" href="` + payment.payment_url + `" class="">` + payment.payment_url + `</a></span>
                </div>

      `
              }
              try {
                  console.info(sale.payment)
                  if (sale.payment.webhook_details != null) {

                      sale.payment.webhook_details.split("|").map((v, i) => {

                          data = v.split(": ")
                          var key = data[0].replace(" ", "_")
                          console.log(key)
                          drp_details[key] = parseFloat(data[1])


                      })
                      console.info(drp_details)

                      drp_amount = 0
                      var dpp = `DRP`
                      if (is_merchant) {
                          dpp = 'Merchant Point'
                      }
                      if (drp_details.drp_paid != null || drp_details.mp_paid != null) {

                          drp_amount = drp_details.drp_paid
                          if (is_merchant) {
                              drp_amount = drp_details.mp_paid
                          }
                      }
                      if (drp_details.pp_paid != null) {
                          total_pv = 0
                      }
                      var tt4 = (total_pv - drp_amount)
                      var tt5 = (subtotal + shipping_fee - drp_amount - (drp_details.rp_paid || 0))
                      var elb = ` <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info "><span class="format-integer">` + eligible_rank + `</span></span>
                </div>`
                      if (is_merchant) {
                          elb = ''
                          tt4 = total_pv
                          tt5 = (subtotal + shipping_fee)
                      }


                      payment_info = `

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Subtotal</span>
                  <span class=" ">RP <span class="format-float">` + subtotal + `</span></span>
                </div>
               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Shipping + Tax</span>
                  <span class=" ">RP <span class="format-float">` + shipping_fee + `</span></span>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">` + dpp + `</span>
                  <span class=" ">- RP <span class="format-float">` + drp_amount + `</span></span>
                </div>

               <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">Grand Total </span>
                  <span class=" ">RP <span class="format-float">` + (subtotal + shipping_fee) + `</span></span>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-5">` + tpv + `</span>
                  <span class="text-info "><span class="format-integer">` + tt4 + ` PV</span></span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fs-4">Grand Total  After Payment</span>
                  <span class=" ">RP <span class="format-float">` + tt5 + ` </span></span>
                </div>

               ` + elb + `
                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Paid with</span>
                  <span class="text-primary "><span class="">` + (payment.payment_method.split("_").map((v, i) => {
                          return ColumnFormater.capitalize(v)

                      }).join(" ")) + `</span></span>
                        </div>

              `




                  }
              } catch (e) {
                  console.error(e)
              }

          }

          var addre = `      `
          try {

              if (shipping != null) {
                  addre = `
        <span class="text-secondary">Deliver To:</span> 
                         <span>` + shipping.line1 + `, ` + shipping.line2 + `</span>
                         <span>` + shipping.city + ` ` + shipping.postcode + `, ` + shipping.state + ` </span>

    `

              } else {
                  shipping = {
                      phone: null,
                      fullname: null
                  }
              }

              if (sale.pick_up_point != null) {
                  addre =

                      `           <span class="text-secondary">Pick Up Point: </span>
                      <span>` + sale.pick_up_point.name + ` </span>
                    <span>` + sale.pick_up_point.address + ` </span>

        `

              }

          } catch (e) {
              console.error(e)
          }






          console.info(addre)



          var print_or_check = `    <a class="btn btn-primary" href="/pdf?id=` + sale.id + `" target="_blank">Print</a>`



          if (sale.payment == null && sale.status == "pending_payment") {
              print_or_check = `<div class="btn btn-success approve-sale" aria-id="` + sale.id + `">Approve</div>`
          }


          if (sale.merchant_id != null) {
              print_or_check = `   <a class="btn btn-primary" href="/pdf?type=merchant&id=` + sale.id + `" target="_blank">Print</a>  <a class="d-none mdo btn btn-primary" href="/pdf?type=merchant_do&id=` + sale.id + `" target="_blank">Print DO</a>`
          }
          console.info(sale)

          $("salesItems").customHtml(`
      <div class="d-flex align-items-center justify-content-between gap-2">
        <h2>Sales Details</h2><small class="badge bg-primary">` + sale.status + `</small>
      </div>
              <div class="d-flex flex-column mb-4 ">
                 <span class="text-secondary">Sold To:</span> 
                 <span>` + (reg_dets.user.fullname || phxApp_.user.fullname) + `, ` + (reg_dets.user.phone || phxApp_.user.phone) + `</span>
                 
              </div>
              <div class="d-flex flex-column mb-4 ">
                 <span class="text-secondary">Recipient:</span> 
                 <span>` + (shipping.fullname || phxApp_.user.fullname) + `, ` + (shipping.phone || phxApp_.user.phone) + `</span>
                 
              </div>


              <div class="d-flex flex-column mb-4 ">
               
                  ` + addre + `
              </div>

                 <span class="text-secondary">Items:</span>
              <div class="d-flex flex-column gap-2">` + list.join("") + `
              ` + payment_info + `
              </div>
              <div class="my-4">
            ` + print_or_check + `
              </div>

      `)

          $(".approve-sale").click(function() {
              var id = $(this).attr("aria-id")
              phxApp_.modal({
                  selector: "#mySubModal",
                  content: `<div>

          <p>Approve this sale ?</p>

          <div class="btn btn-outline-primary confirm-approve">Approve</div>

          </div>`,
                  header: "Confirmation",
                  autoClose: false
              })



              $(".confirm-approve").click(() => {
                  phxApp_.api("manual_approve_bank_in", {
                      id: id
                  })
              }, null, () => {
                  phxApp_.navigateTo(location.pathname)
              })

          })




          ColumnFormater.formatDate();
      },
      evalStates() {
          $("select[name='user[shipping][state]']").customHtml(`<option></option>`)
          var malaysia = phxApp_.countries_.filter((v, i) => {
              return v.name == "Malaysia"
          })[0]

          try {



                if (malaysia.id == phxApp_.chosen_country_id_.id) {


                    if ($("[name='user[pick_up_point_id]']").val() == null) {

                        $(".ss1").customHtml(`
                                    <select class="form-select" required id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                    </select>
                                    <label class="ms-2" for="floatingInput">State</label>
                                `)
                    } else {
                        $(".ss1").customHtml(`
                                        <select class="form-select"  id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                        </select>
                                        <label class="ms-2" for="floatingInput">State</label>
                                    `)
                    }
                    var states = [
                        ["jhr", "Johor"],
                        ["kdh", "Kedah"],
                        ["ktn", "Kelantan"],
                        ["mlk", "Melaka"],
                        ["nsn", "Negeri Sembilan"],
                        ["phg", "Pahang"],
                        ["prk", "Perak"],
                        ["pls", "Perlis"],
                        ["png", "Pulau Pinang"],
                        ["sgr", "Selangor"],
                        ["trg", "Terengganu"],
                        ["kul", "Kuala Lumpur"],
                        ["pjy", "Putra Jaya"],
                        ["srw", "Sarawak"],
                        ["sbh", "Sabah"],
                        ["lbn", "Labuan"]
                    ]
                    states.forEach((v, i) => {
                        if (window.selectedState == v[1]) {
                            $("select[name='user[shipping][state]']").append(`
                                        <option selected value="` + v[1] + `">` + v[1] + `</option>`)
                        } else {
                            $("select[name='user[shipping][state]']").append(`
                                        <option value="` + v[1] + `">` + v[1] + `</option>`)
                        }
                    })
                    $("select[name='user[shipping][state]']").change(() => {
                        window.selectedState = $("select[name='user[shipping][state]']").val()
                        commerceApp_.components["updateCart"]()
                        commerceApp_.components["cartItems"]()
                    })
                } else {
                    if ($("[name='user[pick_up_point_id]']").val() == null) {

                        $(".ss1").customHtml(`
                                    <input class="form-control" required id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                    </input>
                                    <label class="ms-2" for="floatingInput">State</label>
                                `)
                    } else {

                        $(".ss1").customHtml(`
                                    <input class="form-control"  id="s1" onchange="window.choosenAddress = null" name="user[shipping][state]">
                                    </input>
                                    <label class="ms-2" for="floatingInput">State</label>
                                `)
                    }
                }
            } catch(e){
                console.error(e)
            }

      },
      evalShipping(_subtotal){
        var s =  commerceApp_.cart_.map((v, i) => {
            return (v.qty * v.base_shipping_fee)
        }).reduce((a, b) => {
            return a + b
        }, 0)

        if ($("[name='user[pick_up_point_id]']").val() != "") {
            s = 0
        } 

        return s 
      },
      evalShippingLegacy(subtotal) {
          var is_merchant = $("cartItems").attr("merchant") == "" ? true : false;
          var s = 0

          var malaysia = phxApp_.countries_.filter((v, i) => {
              return v.name == "Malaysia"
          })[0]

          var singapore = phxApp_.countries_.filter((v, i) => {
              return v.name == "Singapore"
          })[0]
          if (malaysia.id == phxApp_.chosen_country_id_.id) {
              if ($("[name='user[pick_up_point_id]']").val() != "") {
                  s = 0
              } else {

                  if (["Sabah", "Sarawak", "Labuan"].includes(window.selectedState)) {
                      s = Math.ceil(subtotal / 200) * 4
                  } else {
                      if (is_merchant) {
                          s = Math.ceil(subtotal / 200) * 2
                      } else {

                          if (subtotal >= 100) {
                              s = 0
                          } else {
                              s = 2
                          }
                      }
                  }
              }

          } else {
              s = subtotal * 0.10
              if (singapore.id == phxApp_.chosen_country_id_.id) {
                  s = subtotal * 0.05

                  if (is_merchant) {
                      s = subtotal * 0.10
                  }
              }
          }


          return s
      },
      evalShippingAddresses() {


          try {
              phxApp_.api("list_pick_up_point_by_country", {
                  country_id: phxApp_.chosen_country_id_.id
              }, null, (list) => {
                  phxApp_.pick_up_points = list

                  if ($("[name='user[pick_up_point_id]']").length > 0) {

                      if ($("[name='user[pick_up_point_id]']").val() != "") {
                          var id = $("[name='user[pick_up_point_id]']").val()
                          var pup = phxApp_.pick_up_points.filter((v, i) => {
                              return v.id == id
                          })[0]
                          try {
                              $("[name='user[shipping][state]']").removeAttr("required")
                              console.log("attr removed")
                              $(".self-pickup-form").customHtml(`
                 <div class="d-flex flex-column">
                    <span>` + pup.name + `</span>
                    <span class="text-secondary">` + pup.address + `</span>
                    <span class="mt-4">
                    </span>
                  </div>

          `)
                          } catch (e) {
                              $(".shipping-form").removeClass("d-none")
                              $(".self-pickup-form").addClass("d-none")
                              phxApp_.notify("No pick up points in this region", {
                                  type: "danger"
                              })

                          }
                      }
                  }


                  var adds = []
                  list.forEach((v, i) => {
                      adds.push(`
            <div class="card my-2" style="cursor: pointer;">
              <div class="card-body">
                <div class="d-flex flex-column">
                  <span>` + v.name + `</span>
                  <span class="text-secondary">` + v.address + `</span>
                  <span class="mt-4">
                    <div class="btn btn-primary" aria-address="` + v.id + `">Choose</div>
                  </span>
                </div>
              </div>
            </div>
          `)
                  })
                  $(".self-pickup").unbind()
                  $(".self-pickup").click(() => {
                      window.selectedState = null


                      $(".shipping-form").addClass("d-none")
                      $(".self-pickup-form").removeClass("d-none")
                      phxApp_.modal({
                          autoClose: false,
                          selector: "#mySubModal",
                          content: `
          <div class="d-flex flex-column">
            ` + adds.join("") + `
          </div>
          `,
                          header: "Pick Up Points"
                      })
                      $("[aria-address]").click(function() {
                          var id = $(this).attr("aria-address")

                          var pup = phxApp_.pick_up_points.filter((v, i) => {
                              return v.id == id
                          })[0]
                          try {
                              $("[name='user[shipping][state]']").removeAttr("required")
                              console.log("attr removed")
                              $(".self-pickup-form").customHtml(`
                 <div class="d-flex flex-column">
                    <span>` + pup.name + `</span>
                    <span class="text-secondary">` + pup.address + `</span>
                    <span class="mt-4">
                    </span>
                  </div>

          `)
                          } catch (e) {
                              $(".shipping-form").removeClass("d-none")
                              $(".self-pickup-form").addClass("d-none")
                              phxApp_.notify("No pick up points in this region", {
                                  type: "danger"
                              })

                          }
                          $("[name='user[pick_up_point_id]']").val(id)

                          $("#mySubModal").modal('hide')
                          $("[name='user[shipping][state]']").val(null)

                          commerceApp_.components["cartItems"]()
                      })
                  })
              })
              if (pageParams.share_code != null) {

              } else {
                  // if its an instalment



                  phxApp_.api("list_user_sales_addresses_by_username", {
                      username: phxApp_.user.username
                  }, null, (list) => {
                      phxApp_.addresses = list
                      if (list.length > 0) {
                          if (window.choosenAddress != null) {

                              var address = list.filter((v, i) => {
                                  return v.id == window.choosenAddress
                              })[0]
                              $("[name='user[shipping][phone]']").val(address.phone)
                              $("[name='user[shipping][fullname]']").val(address.fullname)
                              $("[name='user[shipping][line1]']").val(address.line1)
                              $("[name='user[shipping][line2]']").val(address.line2)
                              $("[name='user[shipping][city]']").val(address.city)
                              $("[name='user[shipping][postcode]']").val(address.postcode)
                              setTimeout(() => {
                                  $("[name='user[shipping][state]']").val(address.state)
                              }, 500)
                          }
                      }
                      $(".change-address").unbind()
                      var adds = []
                      list.forEach((v, i) => {
                          adds.push(`
            <div class="card my-2" style="cursor: pointer;">
              <div class="card-body">
                <div class="d-flex flex-column">
                  <span>` + v.fullname + `</span>
                  <span class="text-secondary">` + v.line1 + `, ` + v.line2 + `</span>
                  <span class="mt-4">
                    <div class="btn btn-primary" aria-address="` + v.id + `">Choose</div>
                  </span>
                </div>
              </div>
            </div>
          `)
                      })
                      $(".change-address").click(() => {
                          $("[name='user[pick_up_point_id]']").val("")
                          $(".shipping-form").removeClass("d-none")
                          $(".self-pickup-form").addClass("d-none")
                          $("[name='user[shipping][state]']").attr("required")
                          console.log("attr add")
                          phxApp_.modal({
                              autoClose: false,
                              selector: "#mySubModal",
                              content: `
                                            <div class="d-flex flex-column">
                                                ` + adds.join("") + `
                                            </div>
                                            `,
                              header: "Change address"
                          })
                          $("[aria-address]").click(function() {
                              var id = $(this).attr("aria-address")
                              window.choosenAddress = id
                              var address = phxApp_.addresses.filter((v, i) => {
                                  return v.id == id
                              })[0]
                              $("[name='user[shipping][phone]']").val(address.phone)
                              $("[name='user[shipping][fullname]']").val(address.fullname)
                              $("[name='user[shipping][line1]']").val(address.line1)
                              $("[name='user[shipping][line2]']").val(address.line2)
                              $("[name='user[shipping][city]']").val(address.city)
                              $("[name='user[shipping][postcode]']").val(address.postcode)
                              setTimeout(() => {
                                  $("[name='user[shipping][state]']").val(address.state)
                              }, 500)
                              $("#mySubModal").modal('hide')
                              commerceApp_.components["cartItems"]()
                          })
                      })
                  })
              }



          } catch (e) {
              console.error(e)
          }

      },
      cartItems() {


          var accumulated_sales, is_merchant = $("cartItems").attr("merchant") == "" ? true : false;
          const cart = is_merchant ? commerceApp_.mcart_ : commerceApp_.cart_;
          var eligible_rank, hasOverride = false,
              count = 0,
              shipping_fee = 2,
              list = [],
              total_pv = 0,
              subtotal = 0.0;
          total_pv = cart.map((v, i) => {
              return (v.qty * v.point_value)
          }).reduce((a, b) => {
              return a + b
          }, 0)
          subtotal = cart.map((v, i) => {
              return (v.qty * v.retail_price)
          }).reduce((a, b) => {
              return a + b
          }, 0)
          if (is_merchant) {
              total_pv = subtotal
          }
          count = cart.map((v, i) => {
              return v.qty
          }).reduce((a, b) => {
              return a + b
          }, 0)

          this.evalShippingAddresses()

          this.evalStates()

          if ($("cartItems").attr("upgrade") != null) {
              if (window.upgradeTarget != null) {
                  accumulated_sales = phxApp_.api("get_accumulated_sales", {
                      username: window.upgradeTarget
                  })
                  subtotal = subtotal

                  eligible_rank = this.evalRank(subtotal + accumulated_sales)
              } else {
                  subtotal = subtotal

                  eligible_rank = this.evalRank(subtotal + memberApp_.user.rank.retail_price)
              }


              $(".only-downline").click(() => {
                  phxApp_.notify("Only available for direct recruited downline.")
              })
          } else {
              eligible_rank = this.evalRank(subtotal)
          }
          shipping_fee = this.evalShipping(subtotal)


          cart.forEach((v, i) => {


              var lpv = `<span class="font-sm text-info "><span class="format-integer">` + (v.point_value * v.qty) + `</span> PV</span>`

              if (is_merchant) {
                  lpv = ``
              }

              var img = '/images/placeholder.png';
              if (v.img_url != null) {

                  try {
                      img = v.img_url
                  } catch (e) {
                      img = '/images/placeholder.png'
                  }
              }

              var linePassed = '';

              if (cart == commerceApp_.cart && parseInt(localStorage.first_cart_country_id) != phxApp_.chosen_country_id_.id) {

                  linePassed = `border border-danger`

                  list.push(`

                                    <div class="d-flex align-items-center justify-content-between gap-2 ` + linePassed + ` rounded p-2 me-3">
                                    
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
                                                            background-image: url('` + img + `');
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
                                                            background-image: url('` + img + `');
                                                            ">
                                            </div>
                                        </div>
                                        <span>` + v.name + ` <small>(x` + v.qty + `)</small> <br><small> <i class="fa fa-exclamation-triangle text-danger "></i>Product not available for this region</small></span>
                                        </div>
                                        <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
                                        
                                        <div class="text-center">
                                            <div class="btn btn-sm" delete-product-id="` + v.id + `"><i class="text-danger fa fa-times"></i></div>
                                        </div>
                                        </div>
                                    </div>

                                    
                                    `)
              } else {

                  if (v.override_pv) {
                      hasOverride = true
                  }

                  var rp = `RP <span class="format-float">` + (v.retail_price * v.qty).toFixed(2) + ``
                  if (showRP == false) {

                      rp = `MYR <span class="format-float">` + (v.retail_price * v.qty * phxApp_.chosen_country_id_.conversion).toFixed(2) + ``
                  }
                  var instalment_input = ``,
                      instalment_info = ``



                  if (v.selectedInstalmentId != null) {
                      var instalment = v.selectedInstalment
                      try {

                          instalment_info = `<div class="text-sm text-secondary">` + instalment.name + `</div>`
                          instalment_input = `<input type="hidden"  name="user[products][` + i + `][remarks]" value="instalment_product_id:` + v.selectedInstalmentId + `">`
                      } catch (e) {
                          console.error(e)
                      }
                  }

                  try {
                      if ($("input[name='user[instalment]']").val() != null) {

                          var form_instalment_info = $("input[name='user[instalment]']").val()
                          instalment_info = form_instalment_info
                      }
                      // very likely this is for the repurchase....
                  } catch (e) {
                      console.error(e)
                  }


                  list.push(`

            <div class="d-flex align-items-center justify-content-between gap-2 ` + linePassed + ` rounded p-2 me-3">
            <input type="hidden"  name="user[products][` + i + `][item_name]" value="` + v.name + `">
            <input type="hidden"  name="user[products][` + i + `][item_price]" value="` + v.retail_price + `">
            <input type="hidden"  name="user[products][` + i + `][item_pv]" value="` + v.point_value + `">
            <input type="hidden"  name="user[products][` + i + `][img_url]" value="` + v.img_url + `">
            <input type="hidden"  name="user[products][` + i + `][qty]" value="` + v.qty + `">
            ` + instalment_input + `
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
                                  background-image: url('` + img + `');
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
                                  background-image: url('` + img + `');
                                  ">
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <span>` + v.name + ` <small>(x` + v.qty + `)</small></span>
                  ` + instalment_info + `
                </div>
              </div>
              <div class="d-flex flex-column flex-lg-row justify-content-between align-items-center">
                <div class="d-flex flex-column align-items-end">
                  <span class="font-sm ">` + rp + `</span></span>
                  ` + lpv + `
                </div>
                <div class="text-center">
                  <div class="btn btn-sm" add-product-id="` + v.id + `"><i class="text-info fa fa-plus"></i></div>
                  <div class="btn btn-sm" minus-product-id="` + v.id + `"><i class="text-danger fa fa-minus"></i></div>
                  <div class="btn btn-sm" delete-product-id="` + v.id + `"><i class="text-danger fa fa-times"></i></div>
                </div>
              </div>
            </div>

          
            `)
              }



          })




          var has_instalment_info = false;

          try {
              if ($("input[name='user[instalment]']").val() != null) {

                  has_instalment_info = true

              }
              // very likely this is for the repurchase....
          } catch (e) {
              console.error(e)
          }


          try {
              if ($("input[name='user[stockist_user_id]']").val() != null) {

                  shipping_fee = 0

              }
              // very likely this is for the repurchase....
          } catch (e) {
              console.error(e)
          }
          if (has_instalment_info) {
              shipping_fee = 0
          }
          console.log("merchant?")
          console.log(is_merchant)
          if (is_merchant) {
              shipping_fee = subtotal * 0.025
              shipping_fee = 0
          }
      
          var currency = `RP`,
              srp = (subtotal + shipping_fee),
              cshipping_fee = shipping_fee,
              elr = `

                <div class="d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-secondary">Eligible Rank</span>
                  <span class="text-info me-4"><span class="format-integer">` + eligible_rank + `</span></span>
                </div>

  `,
              tpv = `

    Total PV

  `,
              crp = `RP <span class="format-float">` + subtotal + ``

          if (is_merchant) {
              elr = ''
              tpv = `RP received`
          }
          if (!showRP) {
              crp = `MYR <span class="format-float">` + (subtotal * phxApp_.chosen_country_id_.conversion) + ``
              cshipping_fee = shipping_fee * phxApp_.chosen_country_id_.conversion
              srp = (subtotal + shipping_fee) * phxApp_.chosen_country_id_.conversion
              currency = `MYR`
          }

          $("cartItems").customHtml(`

                <div class="d-flex flex-column gap-1">` + list.join("") + `
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Subtotal</span>
                    <span class=" me-4">` + crp + `</span></span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Shipping_Tax</span>
                    <span class=" me-4">` + currency + ` <span class="format-float">` + cshipping_fee + `</span></span>
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">Grand Total</span>
                    <span class=" me-4">` + currency + ` <span class="format-float fs-4">` + srp + `</span></span>
                  </div>
                <div class="d-flex justify-content-between align-items-center pv_label d-none">
                  <span class="fs-5">` + tpv + `</span>
                  <span class="text-info me-4"><span class="format-integer">` + total_pv + ` PV</span></span>
                </div>
                ` + elr + `

              </div>



      `)

          var user = memberApp_.user,
              wallets = []

          if (user != null) {

              if (user.wallets == null) {
                  wallets = phxApp_.api("user_wallet", {
                      token: user.token
                  })
                  user.wallets = wallets
              } else {
                  wallets = user.wallets
              }
          }


          function appendWalletAttr() {
              if (wallets.length == 0) {} else {
                  $("wallet").each((i, v) => {
                      var check = wallets.filter((wv, wi) => {
                          return wv.wallet_type == "direct_recruitment"
                      })

                      if (is_merchant) {
                          check = wallets.filter((wv, wi) => {
                              return wv.wallet_type == "merchant"
                          })

                      }

                      // DRP use
                      if (check.length > 0) {
                          var wallet = check[0]

                          if (is_merchant) {
                              $("#drp_payment").attr("max", subtotal * 0.2)
                              $("#drp_payment").attr("min", 0)
                              $("#drp_payment").attr("step", 0.01)
                              $("#drp_payment").attr("value", subtotal * 0.2)

                          } else {

                              // check if the cart has item that's override_pv 
                              if (hasOverride) {
                                  var reg_pv = subtotal * 0.7;

                                  console.info("here ovier")
                                  var subtotal2 = cart.map((v, i) => {
                                      return (v.qty * v.retail_price * v.override_perc)
                                  }).reduce((a, b) => {
                                      return a + b
                                  }, 0)



                                  $("#drp_payment").attr("min", Math.round(subtotal2))
                                  $("#drp_payment").attr("value", Math.round(subtotal2))
                              } else {
                                  $("#drp_payment").attr("max", wallet.total)
                                  $("#drp_payment").attr("min", Math.round(subtotal * 0.5))
                                  $("#drp_payment").attr("value", Math.round(subtotal * 0.5))

                              }

                          }
                      } else {}
                  })
              }
          }
          $("input[name='user[payment][method]']").unbind()
          $("input[name='user[payment][method]']").on("change", () => {
              $("#coupon-detail").addClass("d-none")

              $("input[name='user[payment][method]']").each((i, v) => {

                  if ($(v)[0].checked == true) {

                      if (["register_point", "merchant_point"].includes($(v).val())) {
                          $("#coupon-detail").removeClass("d-none")

                          drpChanged()
                      } else {

                          $("#drp_payment").removeAttr("max")
                          $("#drp_payment").removeAttr("min")
                          $("#drp_payment").removeAttr("value")
                          if (is_merchant) {
                              commerceApp_.components["updateMCart"]()

                          } else {

                              commerceApp_.components["updateCart"]()
                          }
                          commerceApp_.components["cartItems"]()
                      }

                  }
              })


          })


          function drpChanged() {
              appendWalletAttr()
              var drp_amount = 0,
                  shipping_fee = 2,
                  tt3 = 0,
                  tt4 = 0;
              if ($("#drp_payment").length > 0) {
                  try {

                      drp_amount = parseFloat($("#drp_payment").val())
                  } catch (e) {
                      drp_amount = $("#drp_payment").val()
                  }
              }
              shipping_fee = commerceApp_.components.evalShipping(subtotal)
              if (has_instalment_info) {
                  shipping_fee = 0.0
              }
              tt3 = (subtotal + shipping_fee - drp_amount);
              tt4 = (total_pv - drp_amount)
              if (is_merchant) {
                  shipping_fee = subtotal * 0.025
                  shipping_fee = 0
                  tt3 = (subtotal + shipping_fee)
                  console.log("w")
                  tt4 = subtotal - drp_amount + shipping_fee
              } else {

              }



              var drpa = `


                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">DRP</span>
                    <span class=" me-4">- RP <span class="format-float">` + drp_amount + `</span></span>
                  </div>
      `

              if (is_merchant) {
                  drpa = `


                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">MP</span>
                    <span class=" me-4">- RP <span class="format-float">` + drp_amount + `</span></span>
                  </div>
        `
              }



              $("cartItems").customHtml(`

                <div class="d-flex flex-column gap-1">` + list.join("") + `
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Subtotal</span>
                    <span class=" me-4">RP <span class="format-float">` + subtotal + `</span></span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold">Shipping_Tax</span>
                    <span class=" me-4">RP <span class="format-float">` + shipping_fee + `</span></span>
                  </div>
                  ` + drpa + `
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">Grand Total</span>
                    <span class=" me-4">RP <span class="format-float fs-4">` + tt3 + `</span></span>
                  </div>

                  <div class="d-flex justify-content-between align-items-center pv_label d-none">
                    <span class="fs-5">` + tpv + `</span>
                    <span class="text-info me-4"><span class="format-integer">` + tt4 + ` PV</span></span>
                  </div>
                 ` + elr + `
                </div>


        `)




              if (is_merchant) {
                  $("cartItems").customHtml(`

                          <div class="d-flex flex-column gap-1">` + list.join("") + `
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Subtotal</span>
                              <span class=" me-4">RP <span class="format-float">` + subtotal + `</span></span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fw-bold">Shipping_Tax</span>
                              <span class=" me-4">RP <span class="format-float">` + shipping_fee + `</span></span>
                            </div>
                            ` + drpa + `
                            <div class="d-flex justify-content-between align-items-center">
                              <span class="fs-4">Grand Total</span>
                              <span class=" me-4">RP <span class="format-float fs-4">` + tt4 + `</span></span>
                            </div>

                            <div class="d-flex justify-content-between align-items-center pv_label d-none">
                              <span class="fs-5">` + tpv + `</span>
                              <span class="text-info me-4"><span class="format-integer">` + tt4 + ` PV</span></span>
                            </div>
                           ` + elr + `
                          </div>


                  `)

              }


              ColumnFormater.formatDate();
              $("[add-product-id]").each((i, v) => {
                  var id = $(v).attr("add-product-id")

                  function addItem() {
                      commerceApp_.addItemById_(id, is_merchant)
                      if (is_merchant) {
                          commerceApp_.components["updateMCart"]()
                      } else {
                          commerceApp_.components["updateCart"]()
                      }
                      commerceApp_.components["cartItems"]()
                      commerceApp_.toastChanges()

                  }
                  $(v)[0].onclick = addItem
              })
              $("[minus-product-id]").each((i, v) => {
                  var id = $(v).attr("minus-product-id")

                  function minusItem() {
                      commerceApp_.minusItem_(id, is_merchant)
                      if (is_merchant) {
                          commerceApp_.components["updateMCart"]()
                      } else {
                          commerceApp_.components["updateCart"]()
                      }
                      commerceApp_.components["cartItems"]()
                      commerceApp_.toastChanges()

                  }
                  $(v)[0].onclick = minusItem
              })

              $("[delete-product-id]").each((i, v) => {
                  var id = $(v).attr("delete-product-id")

                  function deleteItem() {
                      commerceApp_.removeItem_(id, is_merchant)
                      if (is_merchant) {
                          commerceApp_.components["updateMCart"]()
                      } else {
                          commerceApp_.components["updateCart"]()
                      }
                      commerceApp_.components["cartItems"]()
                      commerceApp_.toastChanges()
                  }
                  $(v)[0].onclick = deleteItem
              })
          }


          function drpChangeHandler(event) {

              $("#drp_payment").removeAttr("max")
              $("#drp_payment").removeAttr("min")
              $("#drp_payment").removeAttr("value")

              drpChanged()
          }

         var drp_elem = document.getElementById("drp_payment")
          if (drp_elem != null) {
              drp_elem.removeEventListener("change", drpChangeHandler)
              drp_elem.addEventListener("change", drpChangeHandler)
          }

          $("[add-product-id]").each((i, v) => {
              var id = $(v).attr("add-product-id")

              function addItem() {
                  commerceApp_.addItemById_(id, is_merchant)
                  if (is_merchant) {
                      commerceApp_.components["updateMCart"]()
                  } else {
                      commerceApp_.components["updateCart"]()
                  }
                  commerceApp_.components["cartItems"]()
                  commerceApp_.toastChanges()

              }
              $(v)[0].onclick = addItem
          })
          $("[minus-product-id]").each((i, v) => {
              var id = $(v).attr("minus-product-id")

              function minusItem() {
                  commerceApp_.minusItem_(id, is_merchant)
                  if (is_merchant) {
                      commerceApp_.components["updateMCart"]()
                  } else {
                      commerceApp_.components["updateCart"]()
                  }
                  commerceApp_.components["cartItems"]()
                  commerceApp_.toastChanges()

              }
              $(v)[0].onclick = minusItem
          })

          $("[delete-product-id]").each((i, v) => {
              var id = $(v).attr("delete-product-id")

              function deleteItem() {
                  commerceApp_.removeItem_(id, is_merchant)
                  if (is_merchant) {
                      commerceApp_.components["updateMCart"]()
                  } else {
                      commerceApp_.components["updateCart"]()
                  }
                  commerceApp_.components["cartItems"]()
                  commerceApp_.toastChanges()
              }
              $(v)[0].onclick = deleteItem
          })


          $("input[name='user[payment][method]']").each((i, v) => {

              if ($(v)[0].checked == true) {

                  if (["register_point", "merchant_point"].includes($(v).val())) {
                      $("#coupon-detail").removeClass("d-none")

                      drpChanged()
                  } else {
                      $("#drp_payment").removeAttr("max")
                      $("#drp_payment").removeAttr("min")
                      $("#drp_payment").removeAttr("value")
                  }

              }
          })



          ColumnFormater.formatDate();
      },
      evalRank(subtotal) {


          var eligible_rank = "n/a", check, rankSort = [];
          memberApp_.ranks.map((v, i) => {
            rankSort.push(v)
          })

          rankSort.sort((a, b) => {
              return b.retail_price - a.retail_price
          })


          check = rankSort.filter((v, i) => {
              return v.retail_price <= subtotal
          })[0]

    

          if (check) {
              eligible_rank = check.name
              if ($("input[name='user[rank_id]']").length > 0) {

                  $("input[name='user[rank_id]']").val(check.id)
              }
          }

          return eligible_rank
      },
      updateCart() {
          var accumulated_sales, count = 0,
              list = [],
              subtotal = 0.0;

          subtotal = commerceApp_.cart_.map((v, i) => {
              return (v.qty * v.retail_price)
          }).reduce((a, b) => {
              return a + b
          }, 0)
          count = commerceApp_.cart_.map((v, i) => {
              return v.qty
          }).reduce((a, b) => {
              return a + b
          }, 0)

          $(".bc").html(count)

          commerceApp_.cart_.forEach((v, i) => {

              var frp = `<div class="font-sm">RP <span class="font-sm format-float">` + (v.retail_price * v.qty).toFixed(2) + `</span></div>`
              if (!showRP) {
                  frp = `<div class="font-sm">MYR <span class="font-sm format-float">` + (v.retail_price * v.qty * phxApp_.chosen_country_id_.conversion).toFixed(2) + `</span></div>`

              }


              list.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>` + v.name + ` <small>(x` + v.qty + `)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              ` + frp + `

              <div class="d-lg-block d-none">
                <div class="btn btn-sm" minus-product-id="` + v.id + `"><i class="text-danger fa fa-minus"></i></div>
                <div class="btn btn-sm" delete-product-id="` + v.id + `"><i class="text-danger fa fa-times"></i></div>
              </div>
              

            </div>
          </div>

        </a></li>

          `)


          })

          if (list.length == 0) {

              list.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `)

          }

          var eligible_rank, bg_ranks2 = [],
              sort = [];
          memberApp_.ranks.map((v, i) => {
              sort.push(v)
          })

          sort.sort((a, b) => {
              return a.retail_price - b.retail_price
          })

          sort.map((v, i) => {
              bg_ranks2.push(`
        <div class="col ">
          <div class="d-flex flex-column">
            <span>` + v.name + `</span>
            <span class="format-float">` + v.retail_price + `</span>
            
          </div>
        </div>`)
          })

          // if ($("cartItems").attr("upgrade") != null) {
          //   subtotal = subtotal + memberApp_.user.rank.retail_price

          // }
          // eligible_rank = this.evalRank(subtotal)


          if ($("cartItems").attr("upgrade") != null) {
              if (window.upgradeTarget != null) {
                  accumulated_sales = phxApp_.api("get_accumulated_sales", {
                      username: window.upgradeTarget
                  })
                  subtotal = subtotal
                  console.log(subtotal)
                  eligible_rank = this.evalRank(subtotal + accumulated_sales)
              } else {
                  subtotal = subtotal
                  console.log(subtotal)
                  eligible_rank = this.evalRank(subtotal + memberApp_.user.rank.retail_price)
              }


              $(".only-downline").click(() => {
                  phxApp_.notify("Only available for direct recruited downline.")
              })
          } else {
              subtotal = subtotal
              console.log(subtotal)
              eligible_rank = this.evalRank(subtotal)
          }

          var bg_ranks = [

              `  <div class="progress-bar bg-danger" role="progressbar" style="width: 15%;" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>`,
              `  <div class="progress-bar bg-warning" role="progressbar" style="width: 30%;" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>`,
              `  <div class="progress-bar bg-info" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>`

          ]


          var rankSubtotal = memberApp_.ranks.sort((a, b) => {
              return a.retail_price - b.retail_price
          }).findIndex(item => item.name === eligible_rank);
          console.log(rankSubtotal)
        var  perc = (rankSubtotal + 1) * 25



          $(".ac").each((i, vv) => {


              var html = list.join("") + `
              <li id="divider">
                <hr class="dropdown-divider">
              </li>
             <li>                  

             <a class="dropdown-item navi" href="/upgrade">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Checkout</span>
                      <span class="format-float">` + subtotal + `</span>
                    </div>
                 

                    <div class="d-flex justify-content-between align-items-center">
                      <small>Eligible</small>
                      <small class="text-info">` + eligible_rank + `</small>
                    </div>

                    <div class="progress my-2" style="height: 4px;">
                      <div class="progress-bar bg-success" role="progressbar" style="width: ` + perc + `%;" aria-valuenow="` + perc + `" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="row text-sm">
                      ` + bg_ranks2.join("") + `
                    </div>

                  
                  </div>
                </a>
              </li>`


              $(vv).html(html)

          })



          $("[minus-product-id]").each((i, v) => {
              var id = $(v).attr("minus-product-id")

              function minusItem() {
                  commerceApp_.minusItem_(id)
                  commerceApp_.components["updateCart"]()
                  commerceApp_.toastChanges()
              }
              $(v)[0].onclick = minusItem
          })

          $("[delete-product-id]").each((i, v) => {
              var id = $(v).attr("delete-product-id")

              function deleteItem() {
                  commerceApp_.removeItem_(id)
                  commerceApp_.components["updateCart"]()
                  commerceApp_.toastChanges()
              }
              $(v)[0].onclick = deleteItem
          })

          ColumnFormater.formatDate();

      },
      updateMCart() {
          var count = 0,
              list = [],
              subtotal = 0.0;

          subtotal = commerceApp_.mcart_.map((v, i) => {
              return (v.qty * v.retail_price)
          }).reduce((a, b) => {
              return a + b
          }, 0)
          count = commerceApp_.mcart_.map((v, i) => {
              return v.qty
          }).reduce((a, b) => {
              return a + b
          }, 0)

          $(".mbc").html(count)

          commerceApp_.mcart_.forEach((v, i) => {

              list.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>` + v.name + ` <br><small>(x` + v.qty + `)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              <span class="font-sm format-float">` + (v.retail_price * v.qty).toFixed(2) + `</span>

           
              

            </div>
          </div>

        </a></li>

          `)


          })

          if (list.length == 0) {

              list.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `)

          }
          $(".mac").each((i, vv) => {


              var html = list.join("") + `
              <li id="divider">
                <hr class="dropdown-divider">
              </li>
             <li>                  

             <a class="dropdown-item navi" href="/merchant_checkout">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Checkout</span>
                      <span class="format-float">` + subtotal + `</span>
                    </div>
              
                  </div>
                </a>
              </li>`


              $(vv).html(html)

          })

          $("[minus-product-id]").each((i, v) => {
              var id = $(v).attr("minus-product-id")

              function minusItem() {
                  commerceApp_.minusItem_(id, true)
                  commerceApp_.components["updateMCart"]()
                  commerceApp_.toastChanges()
              }
              $(v)[0].onclick = minusItem
          })

          $("[delete-product-id]").each((i, v) => {
              var id = $(v).attr("delete-product-id")

              function deleteItem() {
                  commerceApp_.removeItem_(id, true)
                  commerceApp_.components["updateMCart"]()
                  commerceApp_.toastChanges()
              }
              $(v)[0].onclick = deleteItem
          })

          ColumnFormater.formatDate();

      },
      cart() {
          var count = 0,
              list = [],
              subtotal = 0.0;

          subtotal = commerceApp_.cart_.map((v, i) => {
              return (v.qty * v.retail_price)
          }).reduce((a, b) => {
              return a + b
          }, 0)
          count = commerceApp_.cart_.map((v, i) => {
              return v.qty
          }).reduce((a, b) => {
              return a + b
          }, 0)


          console.log('subtotal', subtotal);
          console.log('count', count);

          commerceApp_.cart_.forEach((v, i) => {
              var frp = `<div class="font-sm">RP <span class="font-sm format-float">` + (v.retail_price * v.qty).toFixed(2) + `</span></div>`
              if (!showRP) {
                  frp = `<div class="font-sm">MYR <span class="font-sm format-float">` + (v.retail_price * v.qty * phxApp_.chosen_country_id_.conversion).toFixed(2) + `</span></div>`

              }
              list.push(`

                <li><a class="dropdown-item" href="javascript:void(0);">
                <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
                    <span>` + v.name + ` <small>(x` + v.qty + `)</small></span>
                    <div class="d-flex align-items-center justify-content-between gap-2">
                    ` + frp + `


                    <div class="d-lg-block d-none">
                        <div class="btn btn-sm" minus-product-id="` + v.id + `"><i class="text-danger fa fa-minus"></i></div>
                        <div class="btn btn-sm" delete-product-id="` + v.id + `"><i class="text-danger fa fa-times"></i></div>
                    </div>

                    </div>
                </div>

                </a></li>

                `)


          })

          if (list.length == 0) {

              list.push(`

                <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

                `)

          }
          var bg_ranks2 = [],
              sort = [];
          memberApp_.ranks.map((v, i) => {
              sort.push(v)
          })

          sort.sort((a, b) => {
              return a.retail_price - b.retail_price
          })

          sort.map((v, i) => {
              bg_ranks2.push(`
                <div class="col ">
                <div class="d-flex flex-column">
                    <span>` + v.name + `</span>
                    <span class="format-float">` + v.retail_price + `</span>
                    
                </div>
                </div>`)
          })

          if ($("cartItems").attr("upgrade") != null) {
              subtotal = subtotal + memberApp_.user.rank.retail_price
          }
          var eligible_rank = this.evalRank(subtotal)
          var perc = subtotal / (memberApp_.ranks .length > 0  ?  memberApp_.ranks[0].retail_price : 1) * 100

          $("cart").each((i, v) => {
              var needDropUp = `dropstart`

              if ($(v).attr("dropup") != null) {
                  needDropUp = `dropup`
              }
              $(v).customHtml(`
                            <div class="` + needDropUp + `  ">
                                <div class="mx-3 py-2 btn btn-outline-light text-white rounded-xl position-relative"  data-bs-toggle="dropdown" aria-expanded="false">
                                <div style="top: 4px !important;" class="badge bg-warning position-absolute top-0 start-100 translate-middle bc">` + count + `</div>
                                <i class="fa fa-shopping-cart"></i>
                                </div>
                                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start ac">
                                ` + list.join("") + `
                                <li id="divider">
                                    <hr class="dropdown-divider">
                                </li>
                                <li>
                                    <a class="dropdown-item navi" href="/upgrade">
                                    <div class="d-flex flex-column">
                                        <div class="d-flex justify-content-between align-items-center">
                                        <span>Checkout</span>
                                        <span class="format-float">` + subtotal + `</span>
                                        </div>
                                    

                                        <div class="d-flex justify-content-between align-items-center">
                                        <small>Eligible</small>
                                        <small class="text-info">` + eligible_rank + `</small>
                                        </div>

                                        <div class="progress my-2" style="height: 4px;">
                                        <div class="progress-bar bg-success" role="progressbar" style="width: ` + perc + `%;" aria-valuenow="` + perc + `" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                        <div class="row text-sm">
                                        ` + bg_ranks2.join("") + `
                                        </div>

                                    
                                    </div>
                                    </a>
                                </li>

                                </ul>
                            </div>
                        `)
          })





          $("[minus-product-id]").each((i, v) => {
              var id = $(v).attr("minus-product-id")

              function minusItem() {
                  commerceApp_.minusItem_(id)
                  commerceApp_.components["updateCart"]()
              }
              $(v)[0].onclick = minusItem
          })

          $("[delete-product-id]").each((i, v) => {
              var id = $(v).attr("delete-product-id")

              function deleteItem() {
                  commerceApp_.removeItem_(id)
                  commerceApp_.components["updateCart"]()
              }
              $(v)[0].onclick = deleteItem
          })

          ColumnFormater.formatDate();

      },
      mcart() {
          var count = 0,
              list = [],
              subtotal = 0.0;

          subtotal = commerceApp_.mcart_.map((v, i) => {
              return (v.qty * v.retail_price)
          }).reduce((a, b) => {
              return a + b
          }, 0)
          count = commerceApp_.mcart_.map((v, i) => {
              return v.qty
          }).reduce((a, b) => {
              return a + b
          }, 0)

          commerceApp_.mcart_.forEach((v, i) => {

              list.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">
          <div style="width: 240px;" class="d-flex justify-content-between align-items-center">
            <span>` + v.name + `<br><small>(x` + v.qty + `)</small></span>
            <div class="d-flex align-items-center justify-content-between gap-2">
              <span class="font-sm format-float">` + (v.retail_price * v.qty).toFixed(2) + `</span>


            </div>
          </div>

        </a></li>

          `)


          })

          if (list.length == 0) {

              list.push(`

        <li><a class="dropdown-item" href="javascript:void(0);">Empty</a></li>

          `)

          }



          $("mcart").each((i, v) => {
              var needDropUp = `dropstart`

              if ($(v).attr("dropup") != null) {
                  needDropUp = `dropup`
              }
              $(v).customHtml(`
          <div class="` + needDropUp + `  ">
            <div class="mx-3 py-2 btn btn-outline-danger rounded-xl position-relative"  data-bs-toggle="dropdown" aria-expanded="false">
              <div style="top: 4px !important;" class="badge bg-warning position-absolute top-0 start-100 translate-middle mbc">` + count + `</div>
              <i class="fa fa-shopping-cart"></i>
            </div>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start mac">
              ` + list.join("") + `
              <li id="divider">
                <hr class="dropdown-divider">
              </li>
              <li>
                <a class="dropdown-item navi" href="/merchant_checkout">
                  <div class="d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                      <span>Checkout</span>
                      <span class="format-float">` + subtotal + `</span>
                    </div>
                  </div>
                </a>
              </li>

            </ul>
          </div>
      `)
          })





          $("[minus-product-id]").each((i, v) => {
              var id = $(v).attr("minus-product-id")

              function minusItem() {
                  commerceApp_.minusItem_(id, true)
                  commerceApp_.components["updateMCart"]()
              }
              $(v)[0].onclick = minusItem
          })

          $("[delete-product-id]").each((i, v) => {
              var id = $(v).attr("delete-product-id")

              function deleteItem() {
                  commerceApp_.removeItem_(id, true)
                  commerceApp_.components["updateMCart"]()
              }
              $(v)[0].onclick = deleteItem
          })

          ColumnFormater.formatDate();

      },
      light() {
          $("light").customHtml(`
            <div class=" py-2 btn btn-outline-success rounded-xl position-relative light"  >
              <i class="fa fa-lightbulb far"></i>
            </div>
      `)
              // $("html").attr("data-bs-theme", localStorage.get("data-bs-theme"))

          $(".light").unbind()
          $(".light").on("click", () => {

              if ($("html").attr("data-bs-theme") == "light") {

                  localStorage.setItem("data-bs-theme", "dark")
                  $("html").attr("data-bs-theme", "dark")
              } else {

                  localStorage.setItem("data-bs-theme", "light")
                  $("html").attr("data-bs-theme", "light")
              }

          })
      },
      product() {
          $("product").customHtml(`
        <div class="text-center mt-4">
          <div class="spinner-border loading2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          
      <div class="loading2 d-none" id="pcontent" />
      `)

          phxApp_.api("get_product", {
              id: pageParams.id
          }, null, (data) => {
              $("title").html(data.name)

              function addToCart_() {

                  if (commerceApp_.first_cart_country_id == null && commerceApp_.cart_.length == 0) {
                      commerceApp_.first_cart_country_id = phxApp_.chosen_country_id_.id
                      console.log("first country id is " + phxApp_.chosen_country_id_.id)
                      localStorage.setItem("first_cart_country_id", phxApp_.chosen_country_id_.id)
                  }

                  console.info(check)
                  if (data.countries.map((vv, ii) => {
                          return vv.id
                      }).includes(parseInt(commerceApp_.first_cart_country_id))) {

                      commerceApp_.addItem_(data)
                      commerceApp_.components["updateCart"]()

                      phxApp_.notify("Added " + data.name, {
                          delay: 2000,
                          type: "success",
                          placement: {
                              from: "top",
                              align: "center"
                          }
                      })
                      phxApp_.toast({
                          content: `<div class=""><ul class="">` + $(".ac").html() + `</ul></div>`
                      })
                  } else if (commerceApp_.first_cart_country_id == null) {
                      commerceApp_.addItem_(data)
                      commerceApp_.components["updateCart"]()
                      phxApp_.notify("Added " + data.name, {
                          delay: 2000,
                          type: "success",
                          placement: {
                              from: "top",
                              align: "center"
                          }
                      })
                      phxApp_.toast({
                          content: `<div class=""><ul class="">` + $(".ac").html() + `</ul></div>`
                      })
                  } else {
                      phxApp_.notify("Not Added ! Please choose your region products.", {
                          delay: 2000,
                          type: "danger",
                          placement: {
                              from: "top",
                              align: "center"
                          }
                      })
                  }

              }

              $(".spinner-border.loading2").parent().remove()
              $(".loading2").removeClass("d-none")


              var img
              if (data.img_url != null) {

                  try {
                      img = data.img_url
                  } catch (e) {
                      img = '/images/placeholder.png'
                  }
              }



              var rp = `<div class="font-sm fw-light text-secondary text-center ">RP <span class="format-float">` + data.retail_price + `</span></div>`
              
              if (includeShippingTax) {
                  rp = `<div class="font-sm fw-light text-secondary text-center "><span class="format-float">` + (data.retail_price + data.base_shipping_fee) + ` </span> RP</div>`
              }


              if (!showRP) {
                  rp = `<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">` + (data.retail_price * phxApp_.chosen_country_id_.conversion) + `</span></div>`

                 
                  if (includeShippingTax) {
                      rp = `<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">` + (data.retail_price * phxApp_.chosen_country_id_.conversion * 1.1) + `</span></div>`
                      if (phxApp_.chosen_country_id_.name == "Singapore") {
                          rp = `<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">` + (data.retail_price * phxApp_.chosen_country_id_.conversion * 1.05) + `</span></div>`

                      }
                  }

              }
             var addBtn = `<div class="btn btn-outline-primary mt-4" product-id="` + data.id + `">Add</div>`
              if (data.instalment_packages.length > 0) {

                  var cards = []
                  data.instalment_packages.forEach((p, i) => {

                      c = `
            <div class=" col-12 col-lg-8 offset-lg-2 ">
              <div class="card m-4 p-4 ">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="fs-4">` + p.name + `</div>
                  <span class="d-flex flex-column">
                    <div class="text-secondary">` + p.retail_price + ` RP</div>
                    <div>` + p.point_value + ` PV</div> 
                  </span>
                  <span><div class="btn btn-outline-primary" product-id="` + p.id + `">Choose</div></span>
                </div>
              </div>
            </div>

          `
                      cards.push(c)
                  })

                  addBtn = `<div class="row w-100">` + cards.join("") + `</div>`
              }


              $("#pcontent").customHtml(`

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
                  background-image: url('` + img + `');
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
                  background-image: url('` + img + `');
                  ">
            </div>
          </div>
        <div style="margin-top: 50px;">` + data.desc + `</div>
        ` + rp + `
        <div class="font-sm fw-light text-info text-center pv_label d-none">PV <span class="format-float">` + data.point_value + `</span></div>
        ` + addBtn + `
      </div>

      `)
              $("#ptitle").html(
                  data.name
              )
              try {

                  $("[product-id='" + data.id + "']")[0].onclick = addToCart_
              } catch (e) {

              }

          })


      },
      sponsorInfo() {
        phxApp_.api("get_sponsor_info", { token: phxApp.user && phxApp.user.token , code: pageParams.share_code}, null, function(r){
          if (r && r.status === 'ok') {
            $("sponsorInfo").customHtml(`
              <div class="d-flex justify-content-between align-items-center">
                <span>Sponsor: ` + r.res.user.username + `</span>
                <span>Position: ` + r.res.placement.user.username + ` `+ r.res.position+`</span>
              </div>
            `)
          }
        })
      },
      products() {
          function evalCountry(countryName) {
              var prefix = "v2"

              if (countryName == "Thailand") {
                  prefix = "th"
              }
              if (countryName == "Vietnam") {
                  prefix = "vn"
              }
              if (countryName == "China") {
                  prefix = "cn"
              }

              return prefix;
          }


          if (phxApp_.chosen_country_id_ == null) {
              var countries = []


              phxApp_.countries_.forEach((v, i) => {
                  countries.push(`
                                <button type="button" aria-name="` + v.name + `" aria-country="` + v.id + `" class="btn btn-primary ">` + v.name + ` ` + (v.alias || "") + `</button>
                                `)
              })
              phxApp_.modal({
                  selector: "#mySubModal",
                  content: `
                            <center>
                            <div class="btn-group-vertical">
                            ` + countries.join("") + `
                            </div>
                            </center>
                        `,
                  header: "Choose region",
                  autoClose: false
              })

              $("[aria-country]").unbind()
              $("[aria-country]").click(function() {
                  var translationRes, langPrefix, country_id = $(this).attr("aria-country"),
                      name = $(this).attr("aria-name")
                  phxApp_.chosen_country_id_ = country_id
                  phxApp_.notify("Chosen region: " + name)
                  localStorage.setItem("region", name)
                  setTimeout(() => {

                      $("#chosen-region").html(name)
                  }, 1000)
                  if (localStorage.region != null) {
                      langPrefix = evalCountry(name)
                  }
                  translationRes = phxApp_.api("translation", {
                      lang: langPrefix
                  });


                  $("#mySubModal").modal('hide')
                  commerceApp_.components["country"]()
                      // commerceApp_.components["products"]()

                  if (pageParams.share_code != null) {
                      // commerceApp_.components["products"]()
                      phxApp_.api("get_share_link_by_code", {
                          code: pageParams.share_code
                      }, null, (sponsor) => {

                          commerceApp_.components["cartItems"]()

                          phxApp_.navigateTo(location.pathname)
                          $(".sponsor-name").customHtml("_sponsor: " + sponsor["user"]["username"] + " _position: " + sponsor.position)

                          $(".sponsor-bank").html(`

                                <div class="d-flex justify-content-between align-items-center">
                                <span class="fw-bold">Bank Details</span>
                                <span class=" my-4 me-4 d-flex justify-content-end align-items-end gap-1 flex-column">
                                    <div>` + sponsor["user"]["bank_name"] + `</div>
                                    <div>` + sponsor["user"]["bank_account_holder"] + `</div>
                                    <div>` + sponsor["user"]["bank_account_no"] + `</div>
                                </span>
                                </div>

                                `)

                      })
                  } else {

                      phxApp_.navigateTo("/home")
                  }
              })

          }
          if (phxApp_.chosen_country_id_ != null) {
              function addToCart2_(dom) {
                  var id = $(dom).attr("product-id")

                  var data = phxApp_.api("get_product", {
                      id: id
                  })
                  try {
                      // var data = {}
                      if (commerceApp_.first_cart_country_id == null && commerceApp_.cart_.length == 0) {
                          commerceApp_.first_cart_country_id = phxApp_.chosen_country_id_.id
                          console.log("first country id is " + phxApp_.chosen_country_id_.id)
                          localStorage.setItem("first_cart_country_id", phxApp_.chosen_country_id_.id)
                      }

                 
                      if (data.countries.map((vv, ii) => {
                              return vv.id
                          }).includes(parseInt(commerceApp_.first_cart_country_id))) {

                          commerceApp_.selectedInstalment = data
                          commerceApp_.addItem_(data)
                          commerceApp_.components["updateCart"]()
                          commerceApp_.components["cartItems"]()


                          phxApp_.notify("Added " + data.name, {
                                  delay: 2000,
                                  type: "success",
                                  placement: {
                                      from: "top",
                                      align: "center"
                                  }
                              })
                              // phxApp_.toast({ content: `<div class=""><ul class="">` + $(".ac").html() + `</ul></div>` })
                      } else if (commerceApp_.first_cart_country_id == null) {
                          commerceApp_.selectedInstalment = data
                          commerceApp_.addItem_(data)
                          commerceApp_.components["updateCart"]()
                          commerceApp_.components["cartItems"]()
                          phxApp_.notify("Added " + data.name, {
                                  delay: 2000,
                                  type: "success",
                                  placement: {
                                      from: "top",
                                      align: "center"
                                  }
                              })
                              // phxApp_.toast({ content: `<div class=""><ul class="">` + $(".ac").html() + `</ul></div>` })
                      } else {
                          phxApp_.notify("Not Added ! Please choose your region products.", {
                              delay: 2000,
                              type: "danger",
                              placement: {
                                  from: "top",
                                  align: "center"
                              }
                          })
                      }

                  } catch (E) {
                      console.error(E)
                  }

              }


              $("products").each((i, products) => {

                  $(products).customHtml(`
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
                        `).then(() => {
                            console.log('products loading?')

                                    var customCols = null,
                                        random_id = 'products',
                                        productSource = new phoenixModel({
                                            onDrawFn: () => {



                                                setTimeout(() => {
                                                    $("[product-id]").each((i, v) => {
                                                        v.onclick = () => {
                                                            addToCart2_(v)
                                                        }
                                                    })
                                                    ColumnFormater.formatDate()

                                                    $(".spinner-border.loading").parent().remove()
                                                    $(".loading").removeClass("d-none")
                                                }, 800)

                                            },
                                            xcard: (params) => {



                                                var data = params.product,
                                                    showBtn = '',
                                                    img = '/images/placeholder.png',
                                                    onclickAttr = `onclick="phxApp.navigateTo('/products/` + data.id + `/` + data.name + `')"`;


                                                if ($(products).attr("direct") != null) {
                                                    onclickAttr = ''
                                                    showBtn = `<div class="btn btn-outline-primary mt-4" product-id="` + data.id + `">Add</div>`
                                                }
                                                if (data.img_url != null) {

                                                    try {
                                                        img = data.img_url
                                                    } catch (e) {
                                                        img = '/images/placeholder.png'
                                                    }
                                                }


                                                var rp = `<div class=" text-primary text-center ">RP <span class="format-float">` + data.retail_price + `</span></div>`
                                                // if (phxApp_.chosen_country_id_.name == "Malaysia") {
                                                //     includeShippingTax = false
                                                // } else {
                                                //     includeShippingTax = true
                                                // }
                                                if (includeShippingTax) {
                                                    rp = `<div class="text-white text-center "><span class="format-float">` + (data.retail_price + data.base_shipping_fee) + `</span> RP</div>`


                                                }
                                                if (!showRP) {
                                                    rp = `<div class="font-sm fw-light text-white text-center ">MYR <span class="format-float">` + (data.retail_price * phxApp_.chosen_country_id_.conversion) + `</span></div>`

                                                    if (includeShippingTax) {
                                                        rp = `<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">` + (data.retail_price * phxApp_.chosen_country_id_.conversion * 1.1) + `</span></div>`


                                                        if (phxApp_.chosen_country_id_.name == "Singapore") {

                                                            rp = `<div class="font-sm fw-light text-secondary text-center ">MYR <span class="format-float">` + (data.retail_price * phxApp_.chosen_country_id_.conversion * 1.05) + `</span></div>`
                                                        }


                                                    }
                                                }


                                                var card = `
                                                            <div  class="m-2 d-flex flex-column gap-2" ` + onclickAttr + `>
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
                                                                        background-image: url('` + img + `');
                                                                        
                                                                        ">
                                                                </div>
                                                                <div class="rounded py-2 foreground-p" style="
                                                                    
                                                                        width:  100%;
                                                                        z-index: 1;
                                                                        background-position: center;
                                                                        background-repeat: no-repeat;
                                                                        background-size: contain; 
                                                                        background-image: url('` + img + `');
                                                                        ">
                                                                </div>
                                                                </div>
                                                                <div class="d-flex flex-column justify-content-center gap-2 mt-4">
                                                                <div class="font-sm fw-bold text-center">` + data.name + `</div>
                                                                <div class="d-flex flex-column justify-content-center ">
                                                                    ` + rp + `
                                                                    <div class="font-sm fw-light text-info text-center pv_label d-none">PV <span class="format-float">` + data.point_value + `</span></div>
                                                                </div>
                                                                ` + showBtn + `

                                                            
                                                                </div>
                                                            </div>
                                                            `
                                                return card
                                            },
                                            data: {
                                                pageLength: 12,
                                                sorts: [
                                                    [2, "desc"]
                                                ],

                                                additional_join_statements: [{
                                                    product: "product"
                                                        // product_country: "product_country",

                                                }],
                                                additional_search_queries: [
                                                    "b.is_instalment=false"
                                                ],

                                                country_id: phxApp_.chosen_country_id_.id,
                                                preloads: ["product"],
                                                grid_class: "col-6 col-lg-3",
                                                dom: `

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

                                                `
                                            },
                                            columns: [

                                                {
                                                    label: 'id',
                                                    data: 'id'
                                                },

                                                {
                                                    label: 'product_id',
                                                    data: 'product_id'
                                                },

                                                // {
                                                //   label: 'retail_price',
                                                //   data: 'retail_price'
                                                // },

                                                {
                                                    label: 'Action',
                                                    data: 'id'
                                                }

                                            ],
                                            moduleName: "ProductCountry",
                                            link: "ProductCountry",
                                            customCols: customCols,
                                            buttons: [],
                                            tableSelector: "#" + random_id
                                        })
                                    productSource.load(random_id, "#product_tab1")

                                })


                            })




          }






      },
      announcement() {
          try {

              $(".anc").slick('destroy')
          } catch (e) {

          }
          $("announcement").customHtml(`
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      `)

          phxApp_.api("announcements", {

          }, null, (list) => {

              $("announcement").customHtml(``)

              list.forEach((v, i) => {

                  function showContent() {
                      phxApp_.modal({
                          selector: "#mySubModal",
                          content: v.content,
                          autoClose: false,
                          header: v.title
                      })
                  }


                  var url = v.img_url,
                      doc = `
          <div class="d-flex flex-column align-items-center" >

            <div class="d-flex justify-content-center " style="cursor: pointer;   
            position: relative; height: 240px;" announcement-id="` + v.id + `">
              <div class="sub rounded py-2" style="
               
                  position: absolute;
                  filter: blur(10px); 
                              background-repeat: no-repeat;
                  background-position: center;
                  background-size: contain; 
                  background-image: url('` + url + `');
                 ">
              </div>
              <div class="su rounded py-2" style="
            
           

                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: cover; 
                  background-image: url('` + url + `');
                  z-index: 1;
                  top: 16px;
                  position: absolute;">
              </div>
            </div>
            <span class="mt-3">` + v.title + `</span>
            <small>` + v.subtitle + `</small>
            
          </div>

        `

                  $("announcement").append(doc)

                  $("[announcement-id='" + v.id + "']")[0].onclick = showContent



              })

          })

          $(".anc").slick()
      },
      bonusLimit() {


        phxApp_.api("get_bonus_limit", {
          token: memberApp_.user.token
        }, null, (r) => {
            var limit = Number(r.limit) || 0;
            var accumulated = Number(r.accumulated) || 0;
            var remaining = Math.max(0, limit - accumulated);
            var percent = limit > 0 ? Math.min(100, Math.round((accumulated / limit) * 100)) : 0;

            $("bonusLimit").customHtml(`
                <div class="d-flex flex-column gap-2">
                  <span> Remaining bonus: <span class="">` + remaining + `</span> BP</span>
                  <div class="progress" role="progressbar" aria-valuenow="` + percent + `" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: ` + percent + `%;"></div>
                  </div>
                  <span>Please repurchase package, to increase earning limit.</span>
                </div>
              `)
        })

        
      },
      rewardList() {

        function replaceLabel(label) {
          return label.replace("matching bonus", "weekly matching bonus").replace("elite leader", "3% Pool Bonus");
        }

          $("rewardList").each((rii, v) => {

              $(v).customHtml(`
        <div class="text-center mt-4">
          <div class="spinner-border loading" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
          

        <div class="row gx-0 d-none loading">
          <div class="col-12">
            <div id="tab` + rii + `">No rewards</div>
          </div>
        </div>
      `)

              var isPrev = $(v).attr("prev") != null

              console.log(isPrev)

              phxApp_.api("get_reward_summary", {
                  user_id: memberApp_.user.id,
                  is_prev: isPrev
              }, null, (r) => {

                  $(".spinner-border.loading").parent().remove()
                  $(".loading").removeClass("d-none")
                  var rewards = ["sharing bonus", "team bonus", "matching bonus", "elite leader", "travel fund", "repurchase bonus", "drp sales level bonus", "stockist register bonus", "merchant sales level bonus", "biz incentive bonus", "matching biz incentive bonus"
                          // "royalty bonus"
                      ],
                      list = []
                  rewards.forEach((r2, ii) => {


                      r.forEach((v, i) => {
                          if (r2 == v.name) {

                              list.push(`

                                  <div class="my-2 d-flex align-items-center justify-content-between">

                                    <span class="fs-5">
                                      ` + ColumnFormater.capitalize(replaceLabel(v.name)) + `
                                    </span>
                                    <span class="d-flex justify-content-between gap-2 align-items-center">
                                      <span class="format-float">
                                        ` + v.sum + `
                                      </span>
                                      <a href="/reward_details/` + v.name + `/` + v.period[0] + `/` + v.period[1] + `" class="navi btn btn-primary btn-sm">
                                      <i class="fa fa-info"></i>
                                      </a>
                                    </span>
                                  </div>


                              `)

                          }
                      })
                  })

                  $("#tab" + rii).customHtml(`` + list.join("") + ``)
                  phxApp.formatDate()
              })
          })



      },
      rewardSummary() {

          $("rewardSummary").each((rii, v) => {

              $(v).customHtml(`
                    <div class="text-center mt-4">
                      <div class="spinner-border loading" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                      

                    <div class="row gx-0 d-none loading">
                      <div class="col-12">
                        <div id="tabw` + rii + `">No rewards</div>
                      </div>
                    </div>
                  `)

              var isPrev = false

              console.log(isPrev)

              phxApp_.api("get_reward_summary_by_years", {
                  user_id: memberApp_.user.id
              }, null, (r) => {
                  var list = []

                  $(".spinner-border.loading").parent().remove()
                  $(".loading").removeClass("d-none")
               console.log("testst")
               var years = Object.keys(r["years"])


                    years.forEach((v, i) => {
                            list.push(`

                                  <div class="my-2 d-flex align-items-center justify-content-between">

                                    <span class="fs-5">
                                      ` + v + `
                                    </span>
                                    <span class="d-flex justify-content-between gap-2 align-items-center">
                                      <div>
                                      <span class="format-float">
                                        ` + r["years"][v][0].sum + ` 
                                      </span>
                                      BP
                                        </div>
                                        <a class="btn btn-primary btn-sm" target="_blank" href="/pdf?type=commission&id=`+memberApp_.user.id+`&year=`+v+`">
                                        Download
                                      </a>
                                    </span>
                                  </div>


                              `)
                      })


                    console.info(list)

                  $("#tabw" + rii).customHtml(``+list.join("")+``)
                  phxApp.formatDate()
              })
          })



      },
      wallet() {
          if (memberApp_.user != null) {

              var user = memberApp_.user,
                  wallets = phxApp_.api("user_wallet", {
                      token: user.token
                  })


              if (wallets.length == 0) {
                  $("wallet").parent().customHtml(`<div class="p-4">Wallet info expired</div>`)
              } else {

                  $("wallet").each((i, v) => {
                      var check = wallets.filter((wv, wi) => {
                          return wv.wallet_type == $(v).attr("aria-data")
                      })

                      if (check.length > 0) {

                          var wallet = check[0],  suffix = "PTS"


                          var wallet_name = $(v).attr("aria-data").split("_").map((v, i) => {
                              return ColumnFormater.capitalize(v)
                          }).join(" ")

                          var short_name = wallet_name.split(" ").map((i, v) => {
                              return i.split("")[0].toUpperCase()
                          }).join("") + "P"

                          if (wallet_name == "Asset") {
                            wallet_name = "Asset Token";
                            short_name = "TK"
                            suffix = "TK"
                          } else if (wallet_name == "Active Token") {
                            short_name = "ATK"
                            suffix = "ATK"
                          } else if (wallet_name == "Bonus") {
                            
                            suffix = "USDT"
                          }

                          $(v).customHtml(`
            <a href="/wallets/` + wallet.id + `" class="navi" >

            <div class=" card mb-3 mb-lg-0">
 
              <div class="card-body p-1 py-2 " style="width: 220px;">
                <div class="d-flex gap-1 align-items-center">
                  <div wallet-id="` + wallet.id + `" class="d-none d-lg-block mx-2 py-2 btn btn-outline-success rounded-xl">
                    <i class=" fa fa-dollar-sign "></i>
                  </div>
                  <div class="ps-2 ps-lg-0">
                    <span class="text-sm text-secondary text-truncate">` + wallet_name + `, <b>` + short_name + `</b></span>
                    <div class="d-flex align-items-center gap-2">
                      <div class="fs-4 format-int" style="">` + wallet.total + `</div>
                      <small>${suffix}</small>
                    </div>
                  </div>
                </div>
              </div>

        
            </div>
            </a>

        `)
                      } else {

                      }



                  })
              }

              ColumnFormater.formatDate()
          }





      },
      primaryBuy() {
        function renderQuote(q){
            if(!q || !q.lines){
              $("#quote-summary").html("No quote yet.");
              $("#quote-lines").html("");
              return;
            }
            $("#quote-summary").html(`Filled Qty: <b>${q.filled_qty}</b> • Total Cost: <b>${q.total_cost}</b>`);
            if(q.lines.length === 0){ $("#quote-lines").html(""); return; }
            var rows = q.lines.map(l => `
              <tr>
                <td>#${l.seq}</td>
                <td class="text-end">${l.qty}</td>
                <td class="text-end">${l.unit_price}</td>
              </tr>sudo /netsphere/bin/commerce_front 
            `).join("");
            $("#quote-lines").html(`
              <div class="table-responsive">
                <table class="table table-sm">
                  <thead>
                    <tr><th>Tranche</th><th class="text-end">Qty</th><th class="text-end">Unit Price</th></tr>
                  </thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            `);
          }
      
          $(document).on("click", "#btn-quote", function(){
            var asset_id = parseInt($("#asset_id").val()||"0");
            var qty = $("#qty").val()||"0";
            phxApp_.api("primary_buy_quote", { asset_id: asset_id, qty: qty }, null, function(q){
              renderQuote(q);
            });
          });
          let options = "";
      
          $(document).on("click", "#btn-execute", function(){
            var asset_id = parseInt($("#asset_id").val()||"0");
            var qty = $("#qty").val()||"0";
            var idk = crypto.randomUUID ? crypto.randomUUID() : (Date.now().toString(36)+Math.random().toString(36).slice(2));
            phxApp_.post("primary_buy_execute", { token: phxApp_.user && phxApp_.user.token, asset_id: asset_id, qty: qty, idempotency_key: idk }, null, function(r){
              $("#result-card").removeClass("d-none");
              if(r.status === "ok"){
                $("#result-summary").html(`Order #${r.order_id} • Filled: ${r.filled_qty} • Paid: ${r.total_cost} • Status: ${r.status2}`);
              } else {
                $("#result-summary").html(`<span class="text-danger">${r.reason||"Error"}</span>`);
              }
            });
          });
          phxApp_.api("list_assets", { token: phxApp_.user && phxApp_.user.token }, null, function(r){
             options = r.map(a => `<option value="${a.id}">${a.name}</option>`).join("");
         

          });


        $("primaryBuy").customHtml(`
                            <div class="card">
                                <div class="card-body">
                                    <div class="row g-2">
                                        <div class="col-12">
                                            <label class="form-label">Asset ID</label>
                                            <select class="form-control" id="asset_id">
                                                <option value="0">Select Asset</option>
                                                `+ options +`
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
        `)
      },
      secondaryBuy() {
        function renderMarketDepth(depth) {
          if (!depth) {
            $("#market-depth").html("Loading market data...");
            return;
          }

          
            let sellRows = depth.sell_orders.map(order => {

                let cancelBtn  = '';
                if (phxApp_.user && phxApp_.user.id) {
                    if (phxApp_.user.id == order.user.id) {
                        cancelBtn = `<div class="btn btn-sm btn-danger cancel-order" id="cancel-sell-${order.id}" style="padding: 4px 12px !important;">Cancel</div>`;
                    }

                }

        return        `
            <tr>
              <td class="text-end">${Number(order.quantity).toFixed(2)}</td>
              <td class="text-end text-danger">${Number(order.price_per_unit).toFixed(5)}</td>
              <td class="text-end">${order.user.username}</td>
              <td>

                ${cancelBtn}
              </td>
            </tr>
          `
            }

            ).join("");
          
          let buyRows = depth.buy_orders.map(order => `
            <tr>
              <td class="text-end">${Number(order.quantity).toFixed(2)}</td>
              <td class="text-end text-success">${Number(order.price_per_unit).toFixed(5)}</td>
              <td class="text-end">${order.user.username}</td>
              <td></td>
            </tr>
          `).join("");
          
          $("#market-depth").html(`
            <div class="row">
              <div class="col-12 col-lg-6">
                <h6 class="text-danger">Sell Orders</h6>
                <div class="table-responsive">
                  <table class="table table-sm table-striped">
                    <thead>
                      <tr><th class="text-end">Qty</th><th class="text-end">Price</th><th class="text-end">User</th><td></td></tr>
                    </thead>
                    <tbody>${sellRows || '<tr><td colspan="4" class="text-center text-muted">No sell orders</td></tr>'}</tbody>
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
                    <tbody>${buyRows || '<tr><td colspan="4" class="text-center text-muted">No buy orders</td></tr>'}</tbody>
                  </table>
                </div>
              </div>
            </div>
          `);
        }
        function cancelSellOrder(orderId){
          phxApp_.post("cancel_order", {
            token: phxApp_.user && phxApp_.user.token,
            order_id: orderId,
            user_id: phxApp_.user && phxApp_.user.id
          }, null, function(r){
            if (r.status === "ok") {
              $("#mySubModal").modal("hide");
              $("#cancel-sell-" + orderId).remove();
            //   $("#sm_asset_id").trigger("change");
              phxApp_.notify("Sell order cancelled successfully");
            } else {
              phxApp_.notify("Failed to cancel sell order", {
                type: "danger"
              });
            }
          });
        }

        $(document).on("click", ".cancel-order", function(){
          var orderId = $(this).attr("id").split("-")[2];

          phxApp_.modal({
            selector: "#mySubModal",
            content: `
              <center>
              <p>Cancel this order?</p>
                <div class="btn-group-vertical">
                    <button class="btn btn-danger" id="btn-cancel-sell-${orderId}">Cancel</button>
                </div>
              </center>
            `,
            header: "Cancel Order",
            autoClose: false
        })
        $(document).on("click", "#btn-cancel-sell-" + orderId, function(){
          cancelSellOrder(orderId);
        });
        });
        
        function renderRecentTrades(trades) {
          if (!trades || trades.length === 0) {
            $("#recent-trades").html('<div class="text-center text-muted">No recent trades</div>');
            return;
          }
          
          let rows = trades.map(trade => `
            <tr>
              <td>${new Date(trade.trade_date).toLocaleString()}</td>
              <td class="text-end">${Number(trade.quantity).toFixed(2)}</td>
              <td class="text-end">${trade.price_per_unit}</td>
              <td class="text-end">${Number(trade.total_amount).toFixed(2)}</td>
              <td class="text-end">${trade.buyer.username}</td>
              <td class="text-end">${trade.seller.username}</td>
            </tr>
          `).join("");
          
          $("#recent-trades").html(`
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
                <tbody>${rows}</tbody>
              </table>
            </div>
          `);
        }

        function loadData(){
            var asset_id = parseInt($("#sm_asset_id").val() || "0");
            if (asset_id > 0) {
              // Load market depth
              phxApp_.api("get_market_depth", { asset_id: asset_id }, null, function(depth){
                renderMarketDepth(depth);
              });
              
              // Load recent trades
              phxApp_.api("get_recent_trades", { asset_id: asset_id }, null, function(trades){
                renderRecentTrades(trades);
              });
            } else {
              $("#market-depth").html("");
              $("#recent-trades").html("");
            }
        }        
        // Load market data when asset is selected
        $(document).on("change", "#sm_asset_id", function(){
            var asset_id = parseInt($(this).val() || "0");
            if (asset_id > 0) {
              // Load market depth
              phxApp_.api("get_market_depth", { asset_id: asset_id }, null, function(depth){
                renderMarketDepth(depth);
              });
              
              // Load recent trades
              phxApp_.api("get_recent_trades", { asset_id: asset_id }, null, function(trades){
                renderRecentTrades(trades);
              });
            } else {
              $("#market-depth").html("");
              $("#recent-trades").html("");
            }
         
        });
        
        // Create sell order
        $(document).on("click", "#btn-create-sell", function(){
          var asset_id = parseInt($("#sm_asset_id").val() || "0");
          var quantity = parseFloat($("#sm_sell_qty").val() || "0");
          var price = parseFloat($("#sm_sell_price").val() || "0");
          
          if (asset_id === 0 || quantity <= 0 || price <= 0) {
            alert("Please fill in all fields with valid values");
            return;
          }
          
          phxApp_.api("create_sell_order", { 
            token: phxApp_.user && phxApp_.user.token,
            asset_id: asset_id, 
            quantity: quantity, 
            price_per_unit: price 
          }, null, function(r){
            if (r.status === "ok") {
            //   $("#sell-result").html(`<div class="alert alert-success">Sell order created successfully! Order ID: ${r.order_id}</div>`);

              phxApp_.notify("Sell order created successfully! Order ID: " + r.res.id);
              // Refresh market data
              $("#sm_asset_id").trigger("change");
              // Clear form
              $("#sm_sell_qty, #sm_sell_price").val("");
            } else {
              $("#sell-result").html(`<div class="alert alert-danger">Error: ${r.reason || "Failed to create sell order"}</div>`);
            }
          });
        });
        
        // Create buy order
        $(document).on("click", "#btn-create-buy", function(){
          var asset_id = parseInt($("#sm_asset_id").val() || "0");
          var quantity = parseFloat($("#sm_buy_qty").val() || "0");
          var price = parseFloat($("#sm_buy_price").val() || "0");
          
          if (asset_id === 0 || quantity <= 0 || price <= 0) {
            alert("Please fill in all fields with valid values");
            return;
          }
          
          phxApp_.api("create_buy_order", { 
            token: phxApp_.user && phxApp_.user.token,
            asset_id: asset_id, 
            quantity: quantity, 
            price_per_unit: price 
          }, null, function(r){
            if (r.status === "ok") {
              $("#buy-result").html(`<div class="alert alert-success">Buy order created successfully! Order ID: ${r.order_id}</div>`);
              // Refresh market data
              $("#sm_asset_id").trigger("change");
              // Clear form
              $("#sm_buy_qty, #sm_buy_price").val("");
            } else {
              $("#buy-result").html(`<div class="alert alert-danger">Error: ${r.reason || "Failed to create buy order"}</div>`);
            }
          });
        });
        
        // Load assets for dropdown
        let smOptions = "";
        phxApp_.api("list_assets", { token: phxApp_.user && phxApp_.user.token }, null, function(r){
          smOptions = r.map(a => `<option value="${a.id}">${a.name}</option>`).join("");
        });

        $("secondaryBuy").customHtml(`
          <div class="row">
            <div class="col-12">
              <div class="card mb-3">
                <div class="card-header">
                  <h5 class="card-title mb-0">Profit Board</h5>
                  <small class="text-muted">Trade your staked assets with other users</small>
                </div>
                <div class="card-body">
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="form-label">Select Asset</label>
                      <select class="form-select" id="sm_asset_id">
                        <option value="0">Choose an asset to trade</option>
                        ${smOptions}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-lg-8 offset-lg-2">
              <div class="card mb-3">
                <div class="card-header">
                  <h6 class="card-title mb-0 text-danger">Create Sell Order</h6>
                  <small class="text-muted">Sell your active tokens for cash</small>
                </div>
                <div class="card-body">
                  <div class="row g-2">
                    <div class="col-12 col-lg-6">
                      <label class="form-label">Quantity</label>
                      <input type="number" class="form-control" id="sm_sell_qty" placeholder="Enter quantity" step="0.01" />
                    </div>
                    <div class="col-12 col-lg-6">
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
        `)

        $("select#sm_asset_id").val(1);
        loadData();


      },
      assetTranches(){
        $("assetTranches").customHtml(`
            <div class="row">
              <div class="col-12">
                <div class="card mb-3">
                  <div class="card-body">
                    <div id="asset-tranches" class="text-center text-muted">Loading asset tranches...</div>
                  </div>
                </div>
              </div>
            </div>
          `)

        phxApp_.api("secondary_qty_by_price_with_tranche", { token: phxApp_.user && phxApp_.user.token }, null, function(r){

            let list = []

            r.forEach(item => {
                list.push(`
                    <tr>
                  
                        <td>${item.unit_price}</td>
                           <td>${item.total_quantity}</td>
                        <td>${Number(item.total_quantity - (item.member_sell_quantity + item.company_sell_quantity)).toFixed(2)}</td>
                     
                        <td class="ctraded">${Number(item.company_traded).toFixed(2)}</td>
                        <td class="mtraded">${Number(item.member_traded).toFixed(2)}</td>
                        <td>${Number(item.company_sell_quantity).toFixed(2)}</td>
                        <td>${Number(item.member_sell_quantity).toFixed(2)}</td>
                     
                        
                        
                    </tr>
                `)
            })


          $("assetTranches").customHtml(`
            <div class="row">
                <div class="col-12">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h6 class="card-title mb-0">Profit Board</h6>
                            <small class="text-muted">Current tranches</small>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead class="table-light">
                                        <tr>
                                 
                                             <th scope="col">Unit Price</th>
                                            <th scope="col">Total Quantity</th>
                                            <th scope="col">Balance</th>
                                            <th class="ctraded" scope="col">Company Traded</th>
                                            <th class="mtraded" scope="col">Members Traded</th>
                                            
                                            <th scope="col">Company Orders</th>
                                            <th scope="col">Member Orders</th>
                                           
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        `+ list.join("") +`
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
        });
      },
      userProfile() {


          var user = memberApp_.user;

          if (user) {

              var ranks = ["Bronze", "Silver", "Gold", "Diamond", "Shopper"],
                  cranks = ["Bronze", "Silver", "Gold", "Diamond", "Shopper"],
                  rank_name = user.rank != null ? user.rank.name : user.rank_name;

              var display_rank = ranks[cranks.indexOf(rank_name)]

              if (phxApp_.chosen_country_id_.name == "China") {
                  display_rank = rank_name
              }

              var name = user != null ? "Welcome! " + `<a href="/profile" class="navi">` + user.fullname + ` (` + display_rank + `)</a>` : `<a href="/login" class="navi">Login</a>`
              $("userProfile").customHtml(`
          
            ` + name + `
         
      `)
          } else {
              $("userProfile").customHtml(`
          
          <a href="/login" class="navi">Login</a>
         
      `)

          }
      },


  }

}


window.commerceApp = commerceApp_;