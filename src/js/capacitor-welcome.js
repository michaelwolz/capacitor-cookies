import { SplashScreen } from "@capacitor/splash-screen";
import { CapacitorCookies } from "@capacitor/core";

const WEBHOOK_URL = "https://webhook.site/b6683c18-7643-43f2-ae18-8b654b853077";

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });

      root.innerHTML = `
      <button type="button" id="send-request" style="margin-top:200px; margin-left: 50px">Send Request</button>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#send-request")
        .addEventListener("click", async function (e) {
          await self.sendRequest();
        });
    }

    async sendRequest() {
      await CapacitorCookies.setCookie({
        url: new URL(WEBHOOK_URL).origin,
        key: "capacitor-cookie",
        value: "cookie:with:colons",
      });

      await fetch(WEBHOOK_URL, { mode: "cors" });
    }
  }
);

window.customElements.define(
  "capacitor-welcome-titlebar",
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
