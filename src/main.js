// Import all Phoenix components

import { phxApp_ } from './phx_app.js';
import { commerceApp_ } from './commerce_app.js';
import { memberApp_ } from './member_app.js';
import { phoenixModel } from './phoenixModel.js';
import { MENUS } from './menu.js';
import { ColumnFormater } from './column_formatter.js';

// Main Application Class
class App {
  constructor() {

    
    this.init();
  }

  init() {
    // Initialize theme
    
    $("html").attr("data-bs-theme", localStorage.getItem("data-bs-theme") || "light");
    
    // Set global variables
    window.showRP = true;
    window.includeShippingTax = true;
    window.toggleMcart = false;
    
    // Initialize apps
    this.initializeApps();
    
    // Load cart from localStorage
    commerceApp_.restoreCart();

    commerceApp_.restoreCart(true);
    

    
    // Navigation event listeners
    $(document).on("click", "a.navi", function(event) {
      phxApp_.show();
      event.preventDefault();
      setTimeout(() => {
        if ($(this).attr("href").includes("#")) {
          // Handle hash links
        } else {
          phxApp_.navigateTo($(this).attr("href"));
        }
      }, 200);
    });
    
    // Handle browser back/forward
    window.addEventListener("popstate", (event) => {
      try {
        if (history.state != null) {
          window.back = true;
          window.parsePage = true;
          phxApp_.navigateTo(history.state.route);
        } else {
          phxApp_.notify("Can't go back");
          phxApp_.navigateTo("/home");
        }
      } catch (e) {
        console.log("Navigation error:", e);
      }
    }, true);
    
    // Initialize translation
    this.initializeTranslation();
    
    // Load countries
    this.loadCountries();
    
    // Add routes
    this.addRoutes();
    
    // Start navigation
    phxApp_.navigateTo();

  }

  initializeApps() {
    // Make apps globally available
    window.phoenixModel = phoenixModel;
    window.phoenixModels = [];
    window.phxApp = phxApp_;
    
    if (window.location.hostname === "localhost") {
      window.commerceApp = commerceApp_;
      window.memberApp = memberApp_;
    }
  }

  initializeTranslation() {
    let langPrefix = "v2";
    let translationRes = "";
    
    function evalCountry(countryName) {
      if (countryName === "Thailand") return "th";
      if (countryName === "Vietnam") return "vn";
      if (countryName === "China") return "cn";
      return "v2";
    }
    
    try {
      if (localStorage.region != null) {
        langPrefix = evalCountry(localStorage.region);
      }
      translationRes = phxApp_.api("translation", { lang: langPrefix });
    } catch (error) {
      console.error("Error fetching translation:", error);
    }
    
    // Extend jQuery with translation methods
    $.fn.extend({
      customHtml: async function(newHtml) {
        console.log('customHtml parsing..');
        var translation_map = Object.keys(translationRes);
        var v2 = translation_map.reduce((acc, key) => {
          var regex = new RegExp(key, "g");
          return acc.replace(regex, translationRes[key]);
        }, newHtml);
        return this.html(v2);
      },
      customAppend: async function(newHtml) {
        var translation_map = Object.keys(translationRes);
        var v2 = translation_map.reduce((acc, key) => {
          var regex = new RegExp(key, "g");
          return acc.replace(regex, translationRes[key]);
        }, newHtml);
        return this.append(v2);
      }
    });
  }

  loadCountries() {
    phxApp_.api("countries", {}, null, (e) => {
      window.countries = e;
      phxApp_.countries_ = e;
    });
  }

  addRoutes() {
    const route_list = [
      { html: "merchant_withdrawal.html", title: "Merchant Withdrawal ", route: "/merchant_withdrawals" },
      { html: "merchant_application.html", title: "Merchant Application ", route: "/merchant_application" },
      { html: "merchant_profile.html", title: "Merchant Profile ", route: "/merchant_profile" },
      { html: "merchant_checkout_register.html", title: "Merchant Checkout ", route: "/merchant_checkout_register" },
      { html: "merchant_checkout.html", title: "Merchant Checkout ", route: "/merchant_checkout" },
      { html: "merchant_checkout_bd.html", title: "Merchant Checkout Back Date", route: "/merchant_checkout_bd" },
      { html: "merchant_purchases.html", title: "Merchant Purchases", route: "/merchant_purchases" },
      { html: "merchant_sales.html", title: "Merchant Sales", route: "/merchant_sales" },
      { html: "merchant_mall.html", title: "Merchant Mall", route: "/merchant_mall" },
      { html: "merchant_products.html", title: "Merchant Products", route: "/merchant_products" },
      { html: "mproduct.html", title: "Merchant Product", route: "/merchant_products/:id/:name" },
      { html: "refund_policy.html", title: "Refund Policy ", route: "/refund_policy", public: true, skipNav: true },
      { html: "terms_condition.html", title: "Terms Condition ", route: "/terms_condition", public: true, skipNav: true },
      { html: "merchant_code_register.html", title: "Register ", route: "/merchant_code_register/:share_code", public: true, skipNav: true },
      { html: "code_register.html", title: "Register ", route: "/code_register/:share_code", public: true, skipNav: true },
      { html: "register_wallet.html", title: "Register Wallet ", route: "/register_wallet" },
      { html: "bonus_wallet.html", title: "Bonus Wallet ", route: "/bonus_wallet" },
      { html: "new_topup.html", title: "Register Point Topup ", route: "/topup_register_point" },
      { html: "upgrade.html", title: "Upgrade ", route: "/upgrade" },
      { html: "redeem.html", title: "Redeem ", route: "/redeem" },
      { html: "withdrawal.html", title: "Withdrawal ", route: "/withdrawals" },
      { html: "reward_details.html", title: "Reward Details ", route: "/reward_details/:name/:month/:year" },
      { html: "sales_detail.html", title: "Sales Details", route: "/sales/:id" },
      { html: "sales.html", title: "Sales History", route: "/sales" },
      { html: "pay_instalment.html", title: "Pay Instalment", route: "/pay_instalment" },
      { html: "instalment_payments.html", title: "Instalment Payments", route: "/instalment_payments" },
      { html: "wallet_transaction.html", title: "Transactions ", route: "/wallets/:id" },
      { html: "product.html", title: "Product", route: "/products/:id/:name" },
      { html: "topup_card_register.html", title: "Topup Card Register", route: "/topup_card_register" },
      { html: "register.html", title: "Register", route: "/register" },
      { html: "logout.html", title: "Logout", route: "/logout", public: true },
      { html: "thank_you.html", title: "Login", route: "/thank_you", public: true },
      { html: "login.html", title: "Login", route: "/login", public: true },
      { html: "profile.html", title: "Profile", route: "/profile" },
      { html: "placement.html", title: "Placement", route: "/placement" },
      { html: "placement_full.html", title: "Placement(Full)", route: "/placement_full" },
      { html: "referal.html", title: "Referal", route: "/referal" },
      { html: "gs_summary.html", title: "Group Sales", route: "/group_sales" },
    ];

    route_list.forEach((v, i) => {
      phxApp_.route_names.push(v);
    });
  }


}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});